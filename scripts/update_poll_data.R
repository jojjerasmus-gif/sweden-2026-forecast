args <- commandArgs(trailingOnly = FALSE)
file_arg <- grep("^--file=", args, value = TRUE)
script_dir <- if (length(file_arg) > 0) {
  dirname(normalizePath(sub("^--file=", "", file_arg[[1]]), winslash = "/"))
} else {
  getwd()
}

project_dir <- normalizePath(file.path(script_dir, ".."), winslash = "/", mustWork = TRUE)
site_dir <- file.path(project_dir, "site")
data_dir <- file.path(site_dir, "data")
dir.create(data_dir, recursive = TRUE, showWarnings = FALSE)

if (!requireNamespace("jsonlite", quietly = TRUE)) {
  stop("Missing required package: jsonlite", call. = FALSE)
}

poll_url <- Sys.getenv(
  "SWEDISHPOLLS_CSV_URL",
  unset = "https://raw.githubusercontent.com/MansMeg/SwedishPolls/master/Data/Polls.csv"
)
election_year <- as.integer(Sys.getenv("ELECTION_YEAR", unset = "2026"))
election_date <- as.Date(Sys.getenv("ELECTION_DATE", unset = "2026-09-13"))

party_info <- data.frame(
  party = c("m", "l", "c", "kd", "s", "v", "mp", "sd", "oth"),
  source_col = c("M", "L", "C", "KD", "S", "V", "MP", "SD", "oth"),
  short_label = c("M", "L", "C", "KD", "S", "V", "MP", "SD", "Other"),
  display_name = c(
    "Moderates", "Liberals", "Centre Party", "Christian Democrats",
    "Social Democrats", "Left Party", "Green Party", "Sweden Democrats",
    "Other parties"
  ),
  color = c("#1b49a0", "#006ab3", "#009933", "#005baa", "#e11931", "#da291c", "#83cf39", "#ffd500", "#8a8f98"),
  bloc = c("tido", "tido", "opposition", "tido", "opposition", "opposition", "opposition", "tido", "other"),
  stringsAsFactors = FALSE
)

party_cols <- c("M", "L", "C", "KD", "S", "V", "MP", "SD")

polls <- read.csv(poll_url, na.strings = c("", "NA"), stringsAsFactors = FALSE, fileEncoding = "UTF-8")
needed_cols <- c("PublDate", "Company", "house", "n", "collectPeriodFrom", "collectPeriodTo", party_cols)
missing_cols <- setdiff(needed_cols, names(polls))
if (length(missing_cols) > 0) {
  stop("SwedishPolls file is missing expected columns: ", paste(missing_cols, collapse = ", "), call. = FALSE)
}

polls$poll_date <- as.Date(polls$PublDate)
polls$collectPeriodFrom <- as.Date(polls$collectPeriodFrom)
polls$collectPeriodTo <- as.Date(polls$collectPeriodTo)
polls$Election <- as.integer(format(polls$poll_date, "%Y"))
polls$institute <- ifelse(is.na(polls$house) | polls$house == "", polls$Company, polls$house)
polls$sample_size <- polls$n
polls$days_to_election <- as.integer(election_date - polls$poll_date)
polls$source_row_id <- seq_len(nrow(polls))

polls_all <- polls[!is.na(polls$poll_date), , drop = FALSE]
polls_all$oth <- round(100 - rowSums(polls_all[, party_cols], na.rm = TRUE), 2)
polls_all$opposition_bloc <- rowSums(polls_all[, c("C", "S", "V", "MP")], na.rm = TRUE)
polls_all$tido_bloc <- rowSums(polls_all[, c("M", "L", "KD", "SD")], na.rm = TRUE)
polls_all <- polls_all[order(-as.numeric(polls_all$poll_date), -as.numeric(polls_all$collectPeriodTo), polls_all$Company), , drop = FALSE]
polls_all$history_order <- seq_len(nrow(polls_all))

polls <- polls_all[polls_all$Election == election_year, , drop = FALSE]
polls <- polls[order(-as.numeric(polls$poll_date), -as.numeric(polls$collectPeriodTo), polls$Company), , drop = FALSE]
polls$poll_id <- seq_len(nrow(polls))

change_cols <- c("opposition_bloc", "tido_bloc", party_cols, "oth")
polls_with_changes <- polls
for (col in change_cols) {
  polls_with_changes[[paste0(col, "_change")]] <- NA_real_
}

for (row_index in seq_len(nrow(polls_with_changes))) {
  previous_idx <- which(
    polls_all$institute == polls_with_changes$institute[row_index] &
      polls_all$history_order > polls_with_changes$history_order[row_index]
  )
  if (length(previous_idx) > 0) {
    previous_idx <- previous_idx[which.min(polls_all$history_order[previous_idx])]
    for (col in change_cols) {
      polls_with_changes[[paste0(col, "_change")]][row_index] <- round(
        polls_with_changes[[col]][row_index] - polls_all[[col]][previous_idx],
        2
      )
    }
  }
}

latest_polls <- polls_with_changes[seq_len(min(20, nrow(polls_with_changes))), c(
  "poll_id", "poll_date", "Company", "institute", "sample_size",
  "collectPeriodFrom", "collectPeriodTo", "days_to_election",
  "opposition_bloc", "tido_bloc", party_cols, "oth",
  paste0(change_cols, "_change")
)]

write.csv(latest_polls, file.path(data_dir, "latest_polls.csv"), row.names = FALSE, na = "")
jsonlite::write_json(latest_polls, file.path(data_dir, "latest_polls.json"), pretty = TRUE, auto_unbox = TRUE, na = "null")

latest_six <- polls[seq_len(min(6, nrow(polls))), , drop = FALSE]
latest_six_values <- vapply(c(party_cols, "oth"), function(col) round(mean(latest_six[[col]], na.rm = TRUE), 2), numeric(1))
latest_six_average <- merge(
  data.frame(source_col = names(latest_six_values), latest_six_poll_average = unname(latest_six_values), stringsAsFactors = FALSE),
  party_info,
  by = "source_col",
  all.x = TRUE,
  sort = FALSE
)
latest_six_average <- latest_six_average[, c("party", "source_col", "short_label", "display_name", "latest_six_poll_average", "color", "bloc")]
jsonlite::write_json(latest_six_average, file.path(data_dir, "latest_six_poll_average.json"), pretty = TRUE, auto_unbox = TRUE, na = "null")

polls_long_source <- polls[polls$days_to_election <= 365, c("poll_id", "poll_date", "institute", "sample_size", "days_to_election", c(party_cols, "oth"))]
polls_long <- do.call(rbind, lapply(c(party_cols, "oth"), function(source_col) {
  info <- party_info[party_info$source_col == source_col, , drop = FALSE]
  data.frame(
    poll_id = polls_long_source$poll_id,
    poll_date = polls_long_source$poll_date,
    institute = polls_long_source$institute,
    sample_size = polls_long_source$sample_size,
    days_to_election = polls_long_source$days_to_election,
    party = info$party,
    source_col = source_col,
    short_label = info$short_label,
    display_name = info$display_name,
    support = polls_long_source[[source_col]],
    color = info$color,
    bloc = info$bloc,
    stringsAsFactors = FALSE
  )
}))
polls_long <- polls_long[order(polls_long$poll_date, match(polls_long$party, party_info$party)), ]
write.csv(polls_long, file.path(data_dir, "polls_long_2026_last_year.csv"), row.names = FALSE, na = "")

party_detail_path <- file.path(data_dir, "party_detail_summary.json")
if (file.exists(party_detail_path)) {
  party_details <- jsonlite::read_json(party_detail_path, simplifyVector = TRUE)
  party_details <- merge(
    party_details[, setdiff(names(party_details), c("latest_six_poll_average", "model_minus_latest_six")), drop = FALSE],
    latest_six_average[, c("party", "latest_six_poll_average")],
    by = "party",
    all.x = TRUE,
    sort = FALSE
  )
  party_details$model_minus_latest_six <- round(party_details$mean - party_details$latest_six_poll_average, 2)
  party_details <- party_details[order(party_details$rank), ]
  jsonlite::write_json(party_details, party_detail_path, pretty = TRUE, auto_unbox = TRUE, na = "null")
}

metadata_path <- file.path(data_dir, "site_metadata.json")
metadata <- if (file.exists(metadata_path)) {
  jsonlite::read_json(metadata_path, simplifyVector = TRUE)
} else {
  list(election = election_year, election_date = as.character(election_date))
}
previous_latest_published_poll_date <- metadata$latest_published_poll_date
if (is.null(metadata$latest_poll_in_model_date) && !is.null(metadata$latest_poll_date)) {
  metadata$latest_poll_in_model_date <- metadata$latest_poll_date
}
if (is.null(metadata$latest_model_update_date) && !is.null(metadata$latest_update_date)) {
  metadata$latest_model_update_date <- metadata$latest_update_date
}
latest_published_poll_date <- as.character(max(polls$poll_date, na.rm = TRUE))
metadata$latest_published_poll_date <- latest_published_poll_date
if (is.null(metadata$poll_data_updated_at) || !identical(previous_latest_published_poll_date, latest_published_poll_date)) {
  metadata$poll_data_updated_at <- format(Sys.time(), "%Y-%m-%d %H:%M:%S %z")
}
metadata <- metadata[names(metadata) %in% c(
  "latest_model_update_date",
  "latest_poll_in_model_date",
  "latest_published_poll_date",
  "poll_data_updated_at",
  "cutoff_days_to_election",
  "draw_count"
)]
jsonlite::write_json(metadata, metadata_path, pretty = TRUE, auto_unbox = TRUE, na = "null")

cat("ok\n")
