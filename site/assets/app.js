const DATA_PATH = "./data/";
const ELECTION_DATE = { year: 2026, month: 9, day: 13 };
const STOCKHOLM_TIME_ZONE = "Europe/Stockholm";
const MS_PER_DAY = 24 * 60 * 60 * 1000;

const state = {
  lang: localStorage.getItem("forecast_lang") || "en",
  trendMode: "bloc",
  selectedParties: ["s", "sd", "m", "v", "mp", "c", "kd", "l"],
  selectedParty: "s",
  showPollChanges: false,
  data: null
};

const copy = {
  en: {
    navForecast: "Forecast",
    navAnalysis: "Analysis",
    navTrends: "Trends",
    navParty: "Party view",
    navQuestions: "Questions",
    navPolls: "Polls",
    navMethod: "Method",
    navAbout: "About",
    eyebrow: "Updated Swedish election forecast",
    heroTitle: "Where the Swedish parties stand now.",
    heroLead: "A clear view of the latest polling, the model estimate, and the chances of key outcomes in the 2026 Riksdag election.",
    mainSignal: "What the model says now",
    analysisEyebrow: "Analysis",
    analysisTitle: "June 4 update",
    analysisText: "With 101 days until the election, Statistics Sweden (SCB) has released its May Party Preference Survey (PSU), based on a nationwide random sample of 9,260 eligible voters and 4,542 responses. The results show C+S+V+MP leading with 55.2%, compared to 42.6% for M+L+KD+SD. The Liberal Party (L) is at 2.5%, and the Christian Democrats (KD) are near the threshold at 4.5%. These results shift the model further toward the opposition: C+S+V+MP's election-day forecast rises to 54.4%, the Tidö bloc falls to 43.7%, and the probability of a C+S+V+MP majority among parties above 4% increases from 90.3% to 93.2%.",
    analysisTextSecond: "Notably, S+V+MP alone now achieves a majority in 60.2% of simulations, up from 45.9%, mainly due to gains by S and, to a lesser extent, V. This probability increase is also reinforced by the threshold calculations as L is now projected to remain below 4% in further simulations. In this analysis, votes for parties below the threshold are excluded prior to the majority assessment.",
    blocEyebrow: "Bloc balance",
    blocTitle: "How the two parliamentary sides compare",
    probEyebrow: "Model probabilities",
    probTitle: "The headline questions",
    forecastEyebrow: "Vote-share forecast",
    forecastTitle: "Party estimates with uncertainty",
    forecastNote: "This is the model's election-day vote-share forecast, not a polling average. The chart also shows a simple average of the six latest polls, which measures recent opinion rather than the model's estimate for election day.",
    trendEyebrow: "Development",
    trendTitle: "Model trend through the latest poll",
    trendNote: "This chart shows the model's estimated support path up to the latest poll included in the model. It is not a rolling polling average; the line smooths poll evidence through the model.",
    modeBloc: "Blocs",
    modeParty: "Parties",
    partyEyebrow: "Disaggregation",
    partyTitle: "Party view",
    partyNote: "The graph shows the model's estimate of party support up to the latest poll included in the model. The bands show uncertainty for each date. The box on the left is different: it forecasts election day, so its range is wider because support can still move before the election.",
    partySelect: "Party",
    partyComparisons: "Head-to-head probabilities",
    partyPolls: "Latest polls for this party",
    questionsEyebrow: "What could happen",
    questionsTitle: "Questions the current model can answer",
    questionsNote: "For coalition questions, each simulation first removes parties below the national 4% threshold, then checks whether the listed parties have more than half of the remaining modeled party vote. This is a simple parliamentary-majority proxy, not a full seat model; the 12% constituency route is not modeled.",
    pollsEyebrow: "Polling input",
    pollsTitle: "Latest published polls",
    pollsNote: "This table can refresh when SwedishPolls publishes new data. The labels at the top show whether those polls are already included in the current model estimate.",
    showChanges: "Show change from same institute",
    methodEyebrow: "Methodology",
    methodTitle: "How to read this forecast",
    methodBayesTitle: "How the updating works",
    methodBayesText: "Bayesian updating means that the model starts with a reasonable expectation, then shifts that expectation when new polls arrive. If the polls are clear and consistent, the updated estimate moves more. If they are noisy or mixed, it moves less.",
    methodModelTitle: "Model",
    methodModelText: "The model is based on Stoetzer et al. (2019), who forecast multiparty elections by combining published polls with information from earlier elections. In plain language: early in the campaign, the forecast still leans more on a history-based starting point; closer to Election Day, new polls carry more weight and can pull the forecast away from that starting point. For Sweden, this history-based part uses the eight previous Riksdag elections from 1994 through 2022. The time trend is modeled with a backward random walk: the estimate for each day is tied to nearby days, so support can move gradually instead of jumping around whenever a new poll appears.",
    methodDataTitle: "Data",
    methodDataText: "Polling inputs come from SwedishPolls. Official election results used for historical comparison come from Statistics Sweden.",
    methodScopeTitle: "Scope",
    methodScopeText: "The dashboard estimates national vote shares. For coalition questions, it applies a simple 4% threshold rule before checking who would have a majority among the modeled parties. It does not allocate Riksdag seats, and it does not model the 12% constituency route.",
    sourcesTitle: "Sources and downloads",
    aboutEyebrow: "About this project",
    aboutTitle: "Built by Jonathan Rasmusson",
    aboutText: "I am an Economics student at the Stockholm School of Economics and an incoming student at the Hertie School. I am passionate about data and politics, and built this project to bring those interests together through election forecasting.",
    aboutLink: "View LinkedIn profile",
    footerText: "Independent project. Not affiliated with Valmyndigheten, Statistics Sweden, or SwedishPolls.",
    latestUpdate: "Latest update",
    latestModelUpdate: "Model updated",
    latestPublishedPoll: "Latest published poll",
    latestPoll: "Latest poll",
    simulations: "Model scenarios",
    cutoff: "Days to election",
    opposition: "C+S+V+MP",
    tido: "M+L+KD+SD",
    government: "M+L+KD",
    forecast: "Forecast",
    forecastMean: "Model estimate",
    latest6: "Recent poll average",
    interval83: "Likely range (83%)",
    interval95: "Wider range (95%)",
    electionRange83: "Election-day likely range (83%)",
    electionRange95: "Election-day wider range (95%)",
    party: "Party",
    mean: "Estimate",
    pollAvg: "Poll average",
    probability: "Probability",
    support: "Support",
    pollster: "Pollster",
    date: "Date",
    sample: "Sample",
    change: "Change",
    notAvailable: "n/a",
    leadingSide: "C+S+V+MP have the stronger majority path",
    leadingText: "After accounting for the national 4% threshold in each simulation, the model currently gives C+S+V+MP a higher chance than the Tidö parties of winning a majority among the parties that clear the threshold.",
    sourceCredit: "Source note",
    sourceUsedFor: "Used for",
    downloadData: "Download data",
    downloadForecast: "Forecast CSV",
    downloadPolls: "Latest polls CSV",
    downloadQuestions: "Question probabilities CSV",
    compareToPolls: "vs latest polling average",
    threshold: "chance above 4%",
    largestParty: "largest-party chance",
    noThreshold: "not relevant",
    partyTrendTitle: "Estimated support",
    blocTrendTitle: "Bloc trajectory",
    partyTrendTitleAll: "Party trajectory",
    forecastTableTitle: "Forecast table",
    dotLegend: "Dot: model estimate",
    tickLegend: "Tick: latest six-poll average",
    likelyLegend: "Darker band: 83% range",
    widerLegend: "Lighter band: 95% range",
    trendLikelyLegend: "Darker band: 83% range for each date",
    trendWiderLegend: "Lighter band: 95% range for each date",
    bandLegend: "Shaded area: uncertainty around the model line",
    qualifier: {
      very_likely: "Very likely",
      likely: "Likely",
      leans_likely: "Leans likely",
      tossup: "Close to even",
      leans_unlikely: "Leans unlikely",
      unlikely: "Unlikely",
      very_unlikely: "Very unlikely"
    }
  },
  sv: {
    navForecast: "Prognos",
    navAnalysis: "Analys",
    navTrends: "Trender",
    navParty: "Partivy",
    navQuestions: "Frågor",
    navPolls: "Mätningar",
    navMethod: "Metod",
    navAbout: "Om",
    eyebrow: "Uppdaterad svensk valprognos",
    heroTitle: "Så står partierna just nu.",
    heroLead: "En tydlig bild av de senaste mätningarna, modellens bedömning och sannolikheten för viktiga utfall i riksdagsvalet 2026.",
    mainSignal: "Vad modellen visar just nu",
    analysisEyebrow: "Analys",
    analysisTitle: "Uppdatering 4 juni",
    analysisText: "Med 101 dagar kvar till valet har SCB publicerat sin majmätning i Partisympatiundersökningen (PSU), baserad på ett riksomfattande slumpmässigt urval på 9 260 röstberättigade personer och 4 542 svar. Resultaten visar att C+S+V+MP leder med 55,2 procent, jämfört med 42,6 procent för M+L+KD+SD. Liberalerna (L) ligger på 2,5 procent, och Kristdemokraterna (KD) ligger nära spärren på 4,5 procent. Resultaten flyttar modellen ytterligare mot oppositionen: C+S+V+MP:s valprognos stiger till 54,4 procent, Tidöblocket faller till 43,7 procent och sannolikheten för att C+S+V+MP får majoritet bland partier över 4 procent ökar från 90,3 till 93,2 procent.",
    analysisTextSecond: "Noterbart är att S+V+MP ensamma nu når majoritet i 60,2 procent av simuleringarna, upp från 45,9 procent, främst på grund av uppgångar för S och, i mindre utsträckning, V. Sannolikhetsökningen förstärks också av spärrberäkningarna eftersom L nu väntas ligga under 4 procent i fler simuleringar. I den här analysen räknas röster på partier under spärren bort innan majoriteten bedöms.",
    blocEyebrow: "Blockbalans",
    blocTitle: "Så står de parlamentariska sidorna mot varandra",
    probEyebrow: "Modellsannolikheter",
    probTitle: "De viktigaste frågorna",
    forecastEyebrow: "Röstandelsprognos",
    forecastTitle: "Partiskattningar med osäkerhet",
    forecastNote: "Det här är modellens prognos för röstandelarna på valdagen, inte ett mätningssnitt. Diagrammet visar också ett enkelt snitt av de sex senaste mätningarna, som mäter den senaste opinionen snarare än modellens bedömning av valdagen.",
    trendEyebrow: "Utveckling",
    trendTitle: "Modelltrend fram till senaste mätningen",
    trendNote: "Diagrammet visar modellens uppskattade utveckling fram till den senaste mätningen som ingår i modellen. Det är inte ett rullande mätningssnitt; linjen väger in mätningarna och jämnar ut kortsiktigt brus genom modellen.",
    modeBloc: "Block",
    modeParty: "Partier",
    partyEyebrow: "Nedbrytning",
    partyTitle: "Partivy",
    partyNote: "Grafen visar modellens uppskattning av partiets stöd fram till den senaste mätningen som ingår i modellen. Banden visar osäkerheten för varje datum. Rutan till vänster är något annat: den prognostiserar valdagen, och spannet är därför bredare eftersom stödet fortfarande kan förändras före valet.",
    partySelect: "Parti",
    partyComparisons: "Sannolikheter parti mot parti",
    partyPolls: "Senaste mätningar för partiet",
    questionsEyebrow: "Vad kan hända?",
    questionsTitle: "Frågor som modellen kan besvara",
    questionsNote: "För koalitionsfrågorna räknas partier under den nationella fyraprocentsspärren bort i varje simulering. Sedan kontrolleras om de angivna partierna har mer än hälften av rösterna bland de modellerade partier som klarar spärren. Det är en enkel approximation av parlamentariskt läge, inte en mandatfördelning; 12-procentsregeln i en valkrets modelleras inte.",
    pollsEyebrow: "Mätningsunderlag",
    pollsTitle: "Senaste publicerade mätningar",
    pollsNote: "Tabellen kan uppdateras när SwedishPolls publicerar ny data. Etiketterna högst upp visar om de mätningarna redan ingår i den aktuella modellen.",
    showChanges: "Visa förändring från samma institut",
    methodEyebrow: "Metod",
    methodTitle: "Så ska prognosen läsas",
    methodBayesTitle: "Så uppdateras prognosen",
    methodBayesText: "Bayesiansk uppdatering betyder att modellen börjar med en rimlig förväntan och sedan justerar den när nya mätningar kommer. Om mätningarna pekar tydligt åt samma håll flyttas bedömningen mer. Om de spretar flyttas den mindre.",
    methodModelTitle: "Modell",
    methodModelText: "Modellen bygger på Stoetzer med flera (2019), som prognostiserar val i flerpartisystem genom att väga samman publicerade opinionsmätningar med information från tidigare val. Enkelt uttryckt lutar prognosen tidigt i valrörelsen mer mot en historiskt baserad startpunkt. När valdagen närmar sig väger nya mätningar tyngre och kan dra prognosen bort från den startpunkten. För Sverige bygger den historiska delen på de åtta tidigare riksdagsvalen från 1994 till 2022. Tidsutvecklingen modelleras med en backward random walk: bedömningen för varje dag kopplas ihop med dagarna intill, så stödet kan röra sig gradvis i stället för att hoppa runt varje gång en ny mätning publiceras.",
    methodDataTitle: "Data",
    methodDataText: "Opinionsmätningarna kommer från SwedishPolls. Officiella valresultat som används för historiska jämförelser kommer från SCB.",
    methodScopeTitle: "Omfattning",
    methodScopeText: "Sidan uppskattar nationella röstandelar. För koalitionsfrågorna används en enkel fyraprocentsspärr innan modellen kontrollerar vem som skulle ha majoritet bland de modellerade partierna. Den fördelar inte riksdagsmandat och modellerar inte 12-procentsregeln i en valkrets.",
    sourcesTitle: "Källor och nedladdningar",
    aboutEyebrow: "Om projektet",
    aboutTitle: "Byggt av Jonathan Rasmusson",
    aboutText: "Jag läser ekonomi vid Handelshögskolan i Stockholm och börjar snart vid Hertie School. Jag är intresserad av data och politik, och byggde ihop detta projekt för att förena dessa två intressen genom valprognoser.",
    aboutLink: "Visa LinkedIn-profil",
    footerText: "Oberoende projekt. Inte knutet till Valmyndigheten, SCB eller SwedishPolls.",
    latestUpdate: "Senast uppdaterad",
    latestModelUpdate: "Modell uppdaterad",
    latestPublishedPoll: "Senaste publicerade mätning",
    latestPoll: "Senaste mätning",
    simulations: "Modellscenarier",
    cutoff: "Dagar till val",
    opposition: "C+S+V+MP",
    tido: "M+L+KD+SD",
    government: "M+L+KD",
    forecast: "Prognos",
    forecastMean: "Modellens bedömning",
    latest6: "Snitt av senaste mätningarna",
    interval83: "Troligt spann (83%)",
    interval95: "Bredare spann (95%)",
    electionRange83: "Valdagen: troligt spann (83%)",
    electionRange95: "Valdagen: bredare spann (95%)",
    party: "Parti",
    mean: "Bedömning",
    pollAvg: "Mätningssnitt",
    probability: "Sannolikhet",
    support: "Stöd",
    pollster: "Institut",
    date: "Datum",
    sample: "Urval",
    change: "Förändring",
    notAvailable: "saknas",
    leadingSide: "C+S+V+MP har starkare väg till majoritet",
    leadingText: "När den nationella fyraprocentsspärren räknas in i varje simulering ger modellen just nu C+S+V+MP större chans än Tidöpartierna att få majoritet bland partierna som klarar spärren.",
    sourceCredit: "Källa",
    sourceUsedFor: "Används till",
    downloadData: "Ladda ner data",
    downloadForecast: "Prognos som CSV",
    downloadPolls: "Senaste mätningar som CSV",
    downloadQuestions: "Sannolikhetsfrågor som CSV",
    compareToPolls: "mot senaste mätningssnitt",
    threshold: "chans över 4%",
    largestParty: "chans att bli störst",
    noThreshold: "ej relevant",
    partyTrendTitle: "Uppskattat stöd",
    blocTrendTitle: "Blockutveckling",
    partyTrendTitleAll: "Partiutveckling",
    forecastTableTitle: "Prognostabell",
    dotLegend: "Punkt: modellens bedömning",
    tickLegend: "Streck: snitt av de sex senaste mätningarna",
    likelyLegend: "Mörkare band: 83% spann",
    widerLegend: "Ljusare band: 95% spann",
    trendLikelyLegend: "Mörkare band: 83% spann för varje datum",
    trendWiderLegend: "Ljusare band: 95% spann för varje datum",
    bandLegend: "Skuggning: osäkerhet runt modellens linje",
    qualifier: {
      very_likely: "Mycket sannolikt",
      likely: "Sannolikt",
      leans_likely: "Lutar sannolikt",
      tossup: "Jämnt",
      leans_unlikely: "Lutar osannolikt",
      unlikely: "Osannolikt",
      very_unlikely: "Mycket osannolikt"
    }
  }
};

const partyOrder = ["v", "s", "mp", "c", "l", "m", "kd", "sd", "oth"];
const mainParties = ["v", "s", "mp", "c", "l", "m", "kd", "sd"];
const partyNamesSv = {
  v: "Vänsterpartiet",
  s: "Socialdemokraterna",
  mp: "Miljöpartiet",
  c: "Centerpartiet",
  l: "Liberalerna",
  m: "Moderaterna",
  kd: "Kristdemokraterna",
  sd: "Sverigedemokraterna",
  oth: "Övriga partier"
};

async function loadData() {
  const json = name => fetch(`${DATA_PATH}${name}.json`).then(res => {
    if (!res.ok) throw new Error(`Could not load ${name}.json`);
    return res.json();
  });

  const csvText = await fetch(`${DATA_PATH}polls_long_2026_last_year.csv`).then(res => res.text());
  return {
    metadata: await json("site_metadata"),
    forecast: await json("forecast_summary"),
    latestPolls: await json("latest_polls"),
    latestSix: await json("latest_six_poll_average"),
    partyDetails: await json("party_detail_summary"),
    partyTrends: await json("model_party_trends"),
    blocTrends: await json("model_bloc_trends"),
    blocSummary: await json("bloc_summary"),
    questions: await json("questions"),
    pairwise: await json("pairwise_probabilities"),
    plurality: await json("plurality_probabilities"),
    sources: await json("sources"),
    pollsLong: parseCsv(csvText)
  };
}

function parseCsv(text) {
  const rows = text.trim().split(/\r?\n/);
  const header = rows.shift().split(",");
  return rows.map(row => {
    const values = row.split(",");
    return Object.fromEntries(header.map((key, index) => [key, coerce(values[index])]));
  });
}

function coerce(value) {
  if (value === undefined || value === "" || value === "NA") return null;
  if (/^-?\d+(\.\d+)?$/.test(value)) return Number(value);
  return value;
}

function t(key) {
  return copy[state.lang][key] ?? key;
}

function fmtPct(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return t("notAvailable");
  const locale = state.lang === "sv" ? "sv-SE" : "en-US";
  return `${new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(Number(value))}%`;
}

function fmtProb(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return t("notAvailable");
  const numeric = Number(value);
  if (numeric >= 99.95) return `>${fmtNum(99.9, 1)}%`;
  if (numeric <= 0.05) return `<${fmtNum(0.1, 1)}%`;
  return fmtPct(numeric, 1);
}

function fmtNum(value, digits = 1) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return t("notAvailable");
  const locale = state.lang === "sv" ? "sv-SE" : "en-US";
  return new Intl.NumberFormat(locale, { maximumFractionDigits: digits, minimumFractionDigits: digits }).format(Number(value));
}

function fmtDate(value) {
  const locale = state.lang === "sv" ? "sv-SE" : "en-US";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short", year: "numeric" }).format(new Date(value));
}

function stockholmTodayUtc() {
  const parts = new Intl.DateTimeFormat("en-CA", {
    timeZone: STOCKHOLM_TIME_ZONE,
    year: "numeric",
    month: "2-digit",
    day: "2-digit"
  }).formatToParts(new Date());
  const values = Object.fromEntries(parts.map(part => [part.type, part.value]));
  return Date.UTC(Number(values.year), Number(values.month) - 1, Number(values.day));
}

function daysUntilElection() {
  const election = Date.UTC(ELECTION_DATE.year, ELECTION_DATE.month - 1, ELECTION_DATE.day);
  return Math.max(0, Math.round((election - stockholmTodayUtc()) / MS_PER_DAY));
}

function shortDate(value) {
  const locale = state.lang === "sv" ? "sv-SE" : "en-US";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "short" }).format(new Date(value));
}

function axisDate(value) {
  const locale = state.lang === "sv" ? "sv-SE" : "en-US";
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(new Date(value));
}

function dateTickValues(minDate, maxDate, count = 5) {
  if (count <= 1 || minDate === maxDate) return [minDate, maxDate];
  const step = (maxDate - minDate) / (count - 1);
  return Array.from({ length: count }, (_, index) => minDate + step * index);
}

function partyInfo(party) {
  return state.data.forecast.find(row => row.party === party) || state.data.partyDetails.find(row => row.party === party);
}

function displayName(row) {
  if (!row) return "";
  return state.lang === "sv" ? (partyNamesSv[row.party] || row.display_name) : row.display_name;
}

function setLanguage(lang) {
  state.lang = lang;
  localStorage.setItem("forecast_lang", lang);
  document.documentElement.lang = lang;
  document.querySelectorAll("[data-lang-button]").forEach(button => {
    button.classList.toggle("active", button.dataset.langButton === lang);
  });
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  render();
}

function initControls() {
  document.querySelectorAll("[data-lang-button]").forEach(button => {
    button.addEventListener("click", () => setLanguage(button.dataset.langButton));
  });

  document.querySelectorAll("[data-trend-mode]").forEach(button => {
    button.addEventListener("click", () => {
      state.trendMode = button.dataset.trendMode;
      document.querySelectorAll("[data-trend-mode]").forEach(btn => btn.classList.toggle("active", btn === button));
      renderTrendControls();
      renderTrendChart();
    });
  });

  document.getElementById("partySelect").addEventListener("change", event => {
    state.selectedParty = event.target.value;
    renderPartyView();
  });

  document.getElementById("showPollChanges").addEventListener("change", event => {
    state.showPollChanges = event.target.checked;
    renderPollTable();
  });
}

function render() {
  if (!state.data) return;
  renderMeta();
  renderHero();
  renderBlocChart();
  renderTopQuestions();
  renderForecastChart();
  renderForecastTable();
  renderTrendControls();
  renderTrendChart();
  renderPartySelect();
  renderPartyView();
  renderAllQuestions();
  renderPollTable();
  renderSources();
  renderBayesDiagram();
}

function renderMeta() {
  const meta = state.data.metadata;
  const modelUpdateDate = meta.latest_model_update_date || meta.latest_update_date || (meta.model_run_finished ? meta.model_run_finished.slice(0, 10) : meta.latest_poll_date);
  const publishedPollDate = meta.latest_published_poll_date || meta.latest_poll_date;
  document.getElementById("metaStrip").innerHTML = [
    `${t("latestModelUpdate")}: ${fmtDate(modelUpdateDate)}`,
    `${t("latestPublishedPoll")}: ${fmtDate(publishedPollDate)}`,
    `${t("simulations")}: ${fmtNum(meta.draw_count, 0)}`,
    `${t("cutoff")}: ${fmtNum(daysUntilElection(), 0)}`
  ].map(text => `<span class="pill">${text}</span>`).join("");
}

function renderHero() {
  const questions = Object.fromEntries(state.data.questions.map(q => [q.key, q]));
  document.getElementById("headlineSignal").textContent = t("leadingSide");
  document.getElementById("headlineText").textContent = t("leadingText");

  const metricKeys = ["opposition_threshold_majority", "s_largest", "l_over_4", "mp_over_4"];
  const metrics = metricKeys.map(key => {
    const question = questions[key];
    return {
      label: state.lang === "sv" ? question.label_sv : question.label_en,
      value: question.probability
    };
  });

  document.getElementById("headlineMetrics").innerHTML = metrics.map(metric => `
    <div class="metric">
      <strong>${fmtProb(metric.value)}</strong>
      <span>${metric.label}</span>
    </div>
  `).join("");
}

function renderBlocChart() {
  const holder = document.getElementById("blocChart");
  const summary = Object.fromEntries(state.data.blocSummary.map(row => [row.key, row]));
  const opposition = summary.opposition_vote;
  const tido = summary.tido_vote;
  const width = 760;
  const height = 245;
  const margin = { top: 24, right: 24, bottom: 34, left: 124 };
  const innerWidth = width - margin.left - margin.right;
  const x = value => margin.left + (value / 65) * innerWidth;
  const rows = [
    { label: t("opposition"), color: "#e11931", value: opposition.mean, low: opposition.low_83, high: opposition.high_83 },
    { label: t("tido"), color: "#1b49a0", value: tido.mean, low: tido.low_83, high: tido.high_83 }
  ];
  const ticks = [0, 10, 20, 30, 40, 50, 60];

  holder.innerHTML = `
    <div class="chart-title">
      <span>${t("blocTitle")}</span>
      <span class="chart-subtitle">${fmtPct(opposition.mean)} vs ${fmtPct(tido.mean)}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("blocTitle")}">
      ${ticks.map(tick => `<line class="grid-line" x1="${x(tick)}" x2="${x(tick)}" y1="16" y2="${height - margin.bottom}"></line><text class="axis" x="${x(tick)}" y="${height - 8}" text-anchor="middle">${tick}</text>`).join("")}
      <line class="mid-line" x1="${x(50)}" x2="${x(50)}" y1="16" y2="${height - margin.bottom}"></line>
      ${rows.map((row, index) => {
        const y = 48 + index * 58;
        return `
          <text x="6" y="${y + 6}" font-weight="700">${row.label}</text>
          <line x1="${x(row.low)}" x2="${x(row.high)}" y1="${y}" y2="${y}" stroke="${row.color}" stroke-opacity="0.38" stroke-width="13" stroke-linecap="round"></line>
          <line x1="${x(0)}" x2="${x(row.value)}" y1="${y}" y2="${y}" stroke="${row.color}" stroke-width="7" stroke-linecap="round"></line>
          <circle cx="${x(row.value)}" cy="${y}" r="7" fill="${row.color}" stroke="#fff" stroke-width="2"></circle>
          <text x="${x(row.value) + 12}" y="${y + 5}" font-weight="760">${fmtPct(row.value)}</text>
        `;
      }).join("")}
    </svg>
  `;
}

function renderTopQuestions() {
  const keys = ["opposition_threshold_majority", "tido_threshold_majority", "l_over_4", "mp_over_4"];
  document.getElementById("topQuestions").innerHTML = state.data.questions
    .filter(q => keys.includes(q.key))
    .map(renderQuestionCard)
    .join("");
}

function renderQuestionCard(question) {
  const label = state.lang === "sv" ? question.label_sv : question.label_en;
  return `
    <article class="question-card">
      <p>${label}</p>
      <strong>${fmtProb(question.probability)}</strong>
      <p class="muted">${copy[state.lang].qualifier[question.qualifier]}</p>
      <div class="prob-bar" aria-hidden="true"><span style="--value:${question.probability}%"></span></div>
    </article>
  `;
}

function renderForecastChart() {
  const holder = document.getElementById("forecastChart");
  const data = [...state.data.forecast].sort((a, b) => a.rank - b.rank);
  const latestSix = Object.fromEntries(state.data.latestSix.map(row => [row.party, row.latest_six_poll_average]));
  const width = 860;
  const rowHeight = 52;
  const height = 72 + data.length * rowHeight;
  const margin = { top: 32, right: 42, bottom: 36, left: 88 };
  const innerWidth = width - margin.left - margin.right;
  const max = 45;
  const x = value => margin.left + (value / max) * innerWidth;
  const ticks = [0, 10, 20, 30, 40];

  holder.innerHTML = `
    <div class="chart-title">
      <span>${t("forecastTitle")}</span>
      <span class="chart-subtitle">${t("interval83")} / ${t("interval95")}</span>
    </div>
    <div class="chart-legend">
      <span><i class="legend-dot"></i>${t("dotLegend")}</span>
      <span><i class="legend-tick"></i>${t("tickLegend")}</span>
      <span><i class="legend-line strong"></i>${t("likelyLegend")}</span>
      <span><i class="legend-line soft"></i>${t("widerLegend")}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("forecastTitle")}">
      ${ticks.map(tick => `<line class="grid-line" x1="${x(tick)}" x2="${x(tick)}" y1="20" y2="${height - margin.bottom}"></line><text class="axis" x="${x(tick)}" y="${height - 10}" text-anchor="middle">${tick}</text>`).join("")}
      ${data.map((row, index) => {
        const y = 54 + index * rowHeight;
        const pollAvg = latestSix[row.party];
        return `
          <text x="8" y="${y + 5}" font-weight="780">${row.short_label}</text>
          <line x1="${x(row.low_95)}" x2="${x(row.high_95)}" y1="${y}" y2="${y}" stroke="${row.color}" stroke-opacity="0.18" stroke-width="15" stroke-linecap="round"></line>
          <line x1="${x(row.low_83)}" x2="${x(row.high_83)}" y1="${y}" y2="${y}" stroke="${row.color}" stroke-opacity="0.44" stroke-width="9" stroke-linecap="round"></line>
          <circle cx="${x(row.mean)}" cy="${y}" r="6.5" fill="${row.color}" stroke="#fff" stroke-width="2"></circle>
          <line x1="${x(pollAvg)}" x2="${x(pollAvg)}" y1="${y - 14}" y2="${y + 14}" stroke="#111827" stroke-width="2"></line>
          <text x="${x(row.mean) + 11}" y="${y + 5}" font-weight="700">${fmtPct(row.mean)}</text>
        `;
      }).join("")}
    </svg>
  `;
}

function renderForecastTable() {
  const rows = [...state.data.partyDetails].sort((a, b) => a.rank - b.rank);
  document.getElementById("forecastTable").innerHTML = `
    <thead>
      <tr>
        <th>${t("party")}</th>
        <th>${t("mean")}</th>
        <th>${t("interval83")}</th>
        <th>${t("interval95")}</th>
        <th>${t("latest6")}</th>
        <th>${t("compareToPolls")}</th>
      </tr>
    </thead>
    <tbody>
      ${rows.map(row => `
        <tr>
          <td><span class="party-cell"><span class="swatch" style="color:${row.color}"></span>${row.short_label} ${displayName(row)}</span></td>
          <td>${fmtPct(row.mean)}</td>
          <td>${fmtPct(row.low_83)}-${fmtPct(row.high_83)}</td>
          <td>${fmtPct(row.low_95)}-${fmtPct(row.high_95)}</td>
          <td>${fmtPct(row.latest_six_poll_average)}</td>
          <td>${formatDelta(row.model_minus_latest_six)}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
}

function formatDelta(value) {
  if (value === null || value === undefined || Number.isNaN(Number(value))) return t("notAvailable");
  const className = value > 0 ? "delta-pos" : value < 0 ? "delta-neg" : "";
  const sign = value > 0 ? "+" : "";
  return `<span class="${className}">${sign}${fmtNum(value, 1)}</span>`;
}

function renderTrendControls() {
  const row = document.getElementById("partyFilter");
  if (state.trendMode !== "party") {
    row.innerHTML = "";
    return;
  }
  row.innerHTML = mainParties.map(party => {
    const info = partyInfo(party);
    const active = state.selectedParties.includes(party);
    return `
      <button type="button" class="swatch-pill ${active ? "" : "inactive"}" data-party-filter="${party}">
        <span class="swatch" style="color:${info.color}"></span>${info.short_label}
      </button>
    `;
  }).join("");
  row.querySelectorAll("[data-party-filter]").forEach(button => {
    button.addEventListener("click", () => {
      const party = button.dataset.partyFilter;
      if (state.selectedParties.includes(party)) {
        state.selectedParties = state.selectedParties.filter(p => p !== party);
      } else {
        state.selectedParties = [...state.selectedParties, party];
      }
      if (state.selectedParties.length === 0) state.selectedParties = [party];
      renderTrendControls();
      renderTrendChart();
    });
  });
}

function renderTrendChart() {
  const holder = document.getElementById("trendChart");
  if (state.trendMode === "bloc") {
    drawTrend(holder, state.data.blocTrends.filter(row => row.bloc !== "government"), {
      keyField: "bloc",
      label: row => row.bloc === "opposition" ? t("opposition") : t("tido"),
      color: row => row.bloc === "opposition" ? "#e11931" : "#1b49a0",
      title: t("blocTrendTitle"),
      yMax: 62,
      yMin: 34,
      showBand: false
    });
    return;
  }
  drawTrend(holder, state.data.partyTrends.filter(row => state.selectedParties.includes(row.party)), {
    keyField: "party",
    label: row => row.short_label,
    color: row => row.color,
    title: t("partyTrendTitleAll"),
    yMax: 40,
    yMin: 0,
    showBand: false
  });
}

function drawTrend(holder, rows, options) {
  const width = 900;
  const height = 420;
  const margin = { top: 28, right: 132, bottom: 52, left: 48 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dates = rows.map(row => new Date(row.date).getTime());
  const minDate = Math.min(...dates);
  const maxDate = Math.max(...dates);
  const yMin = options.yMin;
  const yMax = options.yMax;
  const x = date => margin.left + ((new Date(date).getTime() - minDate) / (maxDate - minDate)) * innerWidth;
  const y = value => margin.top + (1 - (value - yMin) / (yMax - yMin)) * innerHeight;
  const grouped = groupBy(rows, options.keyField);
  const ticks = [yMin, Math.round((yMin + yMax) / 2), yMax];
  const xTicks = dateTickValues(minDate, maxDate, 6);

  holder.innerHTML = `
    <div class="chart-title">
      <span>${options.title}</span>
      <span class="chart-subtitle">${fmtDate(new Date(minDate))} - ${fmtDate(new Date(maxDate))}</span>
    </div>
    ${options.showBand ? `<div class="chart-legend"><span><i class="legend-line strong"></i>${t("likelyLegend")}</span><span><i class="legend-line soft"></i>${t("widerLegend")}</span><span><i class="legend-line soft"></i>${t("bandLegend")}</span></div>` : ""}
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${options.title}">
      ${ticks.map(tick => `<line class="grid-line" x1="${margin.left}" x2="${width - margin.right}" y1="${y(tick)}" y2="${y(tick)}"></line><text class="axis" x="6" y="${y(tick) + 4}">${fmtPct(tick, 0)}</text>`).join("")}
      ${xTicks.map(tick => `<line class="grid-line" x1="${x(tick)}" x2="${x(tick)}" y1="${margin.top}" y2="${height - margin.bottom}" opacity="0.45"></line><text class="axis" x="${x(tick)}" y="${height - 14}" text-anchor="middle">${axisDate(tick)}</text>`).join("")}
      ${Object.entries(grouped).map(([key, values]) => {
        const sorted = values.sort((a, b) => new Date(a.date) - new Date(b.date));
        const sample = sorted[sorted.length - 1];
        const line = sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.mean)}`).join(" ");
        const band95 = [
          ...sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.high_95)}`),
          ...[...sorted].reverse().map(row => `L${x(row.date)},${y(row.low_95)}`)
        ].join(" ") + " Z";
        const band83 = [
          ...sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.high_83)}`),
          ...[...sorted].reverse().map(row => `L${x(row.date)},${y(row.low_83)}`)
        ].join(" ") + " Z";
        const labelX = Math.min(x(sample.date) + 10, width - 112);
        return `
          ${options.showBand ? `<path d="${band95}" fill="${options.color(sample)}" opacity="0.08"></path><path d="${band83}" fill="${options.color(sample)}" opacity="0.16"></path>` : ""}
          <path d="${line}" fill="none" stroke="${options.color(sample)}" stroke-width="3" stroke-linecap="round"></path>
          <circle cx="${x(sample.date)}" cy="${y(sample.mean)}" r="4.8" fill="${options.color(sample)}"></circle>
          <text x="${labelX}" y="${y(sample.mean) + 4}" font-weight="760">${options.label(sample)}</text>
        `;
      }).join("")}
    </svg>
  `;
}

function renderPartySelect() {
  const select = document.getElementById("partySelect");
  select.innerHTML = state.data.partyDetails
    .filter(row => row.party !== "oth")
    .sort((a, b) => partyOrder.indexOf(a.party) - partyOrder.indexOf(b.party))
    .map(row => `<option value="${row.party}" ${row.party === state.selectedParty ? "selected" : ""}>${row.short_label} - ${displayName(row)}</option>`)
    .join("");
}

function renderPartyView() {
  renderPartySummary();
  renderPartyTrend();
  renderPairwiseList();
  renderPartyPollTable();
}

function renderPartySummary() {
  const party = state.data.partyDetails.find(row => row.party === state.selectedParty);
  document.getElementById("partySummary").innerHTML = `
    <p class="eyebrow"><span class="swatch" style="color:${party.color}"></span> ${displayName(party)}</p>
    <span class="big-number" style="color:${party.color}">${fmtPct(party.mean)}</span>
    <p>${t("electionRange83")}: <strong>${fmtPct(party.low_83)}-${fmtPct(party.high_83)}</strong></p>
    <p>${t("electionRange95")}: <strong>${fmtPct(party.low_95)}-${fmtPct(party.high_95)}</strong></p>
    <p>${t("latest6")}: <strong>${fmtPct(party.latest_six_poll_average)}</strong> (${formatDelta(party.model_minus_latest_six)})</p>
    <p>${t("largestParty")}: <strong>${fmtProb(party.plurality_probability || 0)}</strong></p>
    <p>${t("threshold")}: <strong>${party.threshold_probability === null ? t("noThreshold") : fmtProb(party.threshold_probability)}</strong></p>
  `;
}

function renderPartyTrend() {
  const party = partyInfo(state.selectedParty);
  const trends = state.data.partyTrends.filter(row => row.party === state.selectedParty);
  const polls = state.data.pollsLong.filter(row => row.party === state.selectedParty && row.support !== null);
  const holder = document.getElementById("partyTrend");
  const width = 900;
  const height = 420;
  const margin = { top: 28, right: 28, bottom: 42, left: 48 };
  const innerWidth = width - margin.left - margin.right;
  const innerHeight = height - margin.top - margin.bottom;
  const dateValues = trends.map(row => new Date(row.date).getTime());
  const minDate = Math.min(...dateValues);
  const maxDate = Math.max(...dateValues);
  const maxValue = Math.max(...trends.map(row => row.high_95), ...polls.map(row => row.support), 8);
  const yMax = Math.ceil(maxValue / 5) * 5;
  const x = date => margin.left + ((new Date(date).getTime() - minDate) / (maxDate - minDate)) * innerWidth;
  const y = value => margin.top + (1 - value / yMax) * innerHeight;
  const sorted = trends.sort((a, b) => new Date(a.date) - new Date(b.date));
  const line = sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.mean)}`).join(" ");
  const band95 = [
    ...sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.high_95)}`),
    ...[...sorted].reverse().map(row => `L${x(row.date)},${y(row.low_95)}`)
  ].join(" ") + " Z";
  const band83 = [
    ...sorted.map((row, index) => `${index === 0 ? "M" : "L"}${x(row.date)},${y(row.high_83)}`),
    ...[...sorted].reverse().map(row => `L${x(row.date)},${y(row.low_83)}`)
  ].join(" ") + " Z";
  const ticks = Array.from({ length: Math.floor(yMax / 10) + 1 }, (_, i) => i * 10);
  const xTicks = dateTickValues(minDate, maxDate, 6);

  holder.innerHTML = `
    <div class="chart-title">
      <span>${t("partyTrendTitle")}: ${party.short_label}</span>
      <span class="chart-subtitle">${fmtPct(sorted[sorted.length - 1].mean)}</span>
    </div>
    <div class="chart-legend">
      <span><i class="legend-line strong"></i>${t("trendLikelyLegend")}</span>
      <span><i class="legend-line soft"></i>${t("trendWiderLegend")}</span>
    </div>
    <svg viewBox="0 0 ${width} ${height}" role="img" aria-label="${t("partyTrendTitle")}">
      ${ticks.map(tick => `<line class="grid-line" x1="${margin.left}" x2="${width - margin.right}" y1="${y(tick)}" y2="${y(tick)}"></line><text class="axis" x="6" y="${y(tick) + 4}">${fmtPct(tick, 0)}</text>`).join("")}
      ${xTicks.map(tick => `<line class="grid-line" x1="${x(tick)}" x2="${x(tick)}" y1="${margin.top}" y2="${height - margin.bottom}" opacity="0.45"></line><text class="axis" x="${x(tick)}" y="${height - 14}" text-anchor="middle">${axisDate(tick)}</text>`).join("")}
      <path d="${band95}" fill="${party.color}" opacity="0.08"></path>
      <path d="${band83}" fill="${party.color}" opacity="0.17"></path>
      <path d="${line}" fill="none" stroke="${party.color}" stroke-width="3.5" stroke-linecap="round"></path>
      ${polls.map(row => `<circle cx="${x(row.poll_date)}" cy="${y(row.support)}" r="3.8" fill="#111827" opacity="0.35"><title>${row.institute} ${fmtPct(row.support)}</title></circle>`).join("")}
    </svg>
  `;
}

function renderPairwiseList() {
  const rows = state.data.pairwise
    .filter(row => row.party === state.selectedParty)
    .sort((a, b) => b.probability - a.probability)
    .slice(0, 4);
  document.getElementById("pairwiseList").innerHTML = rows.map(row => `
    <article class="question-card">
      <p>${row.short_label} > ${row.opponent_label}</p>
      <strong>${fmtProb(row.probability)}</strong>
      <div class="prob-bar"><span style="--value:${row.probability}%"></span></div>
    </article>
  `).join("");
}

function renderPartyPollTable() {
  const party = partyInfo(state.selectedParty);
  const rows = state.data.latestPolls.slice(0, 10);
  const key = party.source_col;
  document.getElementById("partyPollTable").innerHTML = `
    <thead><tr><th>${t("pollster")}</th><th>${t("date")}</th><th>${t("support")}</th><th>${t("change")}</th></tr></thead>
    <tbody>
      ${rows.map(row => `
        <tr>
          <td>${row.institute}</td>
          <td>${shortDate(row.poll_date)}</td>
          <td>${fmtPct(row[key])}</td>
          <td>${formatDelta(row[`${key}_change`])}</td>
        </tr>
      `).join("")}
    </tbody>
  `;
}

function renderAllQuestions() {
  document.getElementById("allQuestions").innerHTML = state.data.questions.map(renderQuestionCard).join("");
}

function renderPollTable() {
  const partyCols = ["V", "S", "MP", "C", "L", "M", "KD", "SD"];
  document.getElementById("pollTable").innerHTML = `
    <thead>
      <tr>
        <th>${t("pollster")}</th>
        <th>${t("date")}</th>
        <th>${t("opposition")}</th>
        <th>${t("tido")}</th>
        ${partyCols.map(col => `<th>${col}</th>`).join("")}
      </tr>
    </thead>
    <tbody>
      ${state.data.latestPolls.map(row => `
        <tr>
          <td>${row.institute}<br><span class="muted">${fmtNum(row.sample_size, 0)}</span></td>
          <td>${shortDate(row.poll_date)}</td>
          <td>${pollCell(row, "opposition_bloc")}</td>
          <td>${pollCell(row, "tido_bloc")}</td>
          ${partyCols.map(col => `<td>${pollCell(row, col)}</td>`).join("")}
        </tr>
      `).join("")}
    </tbody>
  `;
}

function pollCell(row, key) {
  const value = fmtPct(row[key]);
  if (!state.showPollChanges) return value;
  return `${value}<br><small>${formatDelta(row[`${key}_change`])}</small>`;
}

function renderSources() {
  document.getElementById("sourcesList").innerHTML = `
    <div class="source-list">
      ${state.data.sources.map(source => `
        <article>
          <h3><a href="${source.url}" target="_blank" rel="noreferrer">${source.source}</a></h3>
          <p><strong>${t("sourceUsedFor")}:</strong> ${state.lang === "sv" ? source.role_sv : source.role_en}</p>
          <p><strong>${t("sourceCredit")}:</strong> ${state.lang === "sv" ? source.credit_sv : source.credit_en}</p>
        </article>
      `).join("")}
    </div>
    <div class="download-list">
      <h3>${t("downloadData")}</h3>
      <a href="./data/forecast_summary.csv" download>${t("downloadForecast")}</a>
      <a href="./data/latest_polls.csv" download>${t("downloadPolls")}</a>
      <a href="./data/questions.csv" download>${t("downloadQuestions")}</a>
    </div>
  `;
}

function renderBayesDiagram() {
  const holder = document.getElementById("bayesDiagram");
  if (!holder) return;
  const bellPath = (center, spread, peakY) => {
    const baseline = 258;
    const start = 70;
    const end = 694;
    const points = Array.from({ length: 96 }, (_, index) => {
      const x = start + ((end - start) * index) / 95;
      const y = baseline - (baseline - peakY) * Math.exp(-0.5 * ((x - center) / spread) ** 2);
      return `${index === 0 ? "M" : "L"}${x.toFixed(1)},${y.toFixed(1)}`;
    });
    return points.join(" ");
  };
  const beforePath = bellPath(356, 92, 150);
  const evidencePath = bellPath(452, 62, 108);
  const updatedPath = bellPath(424, 48, 78);

  const labels = state.lang === "sv" ? {
    aria: "En förenklad bild av bayesiansk uppdatering i valprognosen",
    before: "Före nya mätningar",
    evidence: "Nya mätningar",
    updated: "Uppdaterad bedömning",
    axis: "Möjligt stöd för ett parti",
    low: "lägre",
    high: "högre",
    caption: "Den röda kurvan visar vad modellen väntade sig innan de senaste mätningarna. Den grå kurvan visar vad mätningarna säger. Den blå kurvan är den uppdaterade bedömningen efter att båda vägts samman."
  } : {
    aria: "A simplified picture of Bayesian updating in the election forecast",
    before: "Before new polls",
    evidence: "New poll evidence",
    updated: "Updated estimate",
    axis: "Possible party support",
    low: "lower",
    high: "higher",
    caption: "The red curve shows what the model expected before the latest polls. The gray curve shows what the polls suggest. The blue curve is the updated estimate after weighing both together."
  };

  holder.innerHTML = `
    <svg viewBox="0 0 760 330" role="img" aria-label="${labels.aria}">
      <rect x="0" y="0" width="760" height="330" rx="8" fill="#ffffff"></rect>
      <g class="bayes-legend">
        <line x1="42" y1="34" x2="78" y2="34" class="bayes-before"></line>
        <text x="88" y="39">${labels.before}</text>
        <line x1="260" y1="34" x2="296" y2="34" class="bayes-evidence"></line>
        <text x="306" y="39">${labels.evidence}</text>
        <line x1="502" y1="34" x2="538" y2="34" class="bayes-updated"></line>
        <text x="548" y="39">${labels.updated}</text>
      </g>
      <g class="bayes-axis">
        <line x1="56" y1="258" x2="704" y2="258"></line>
        ${[0, 1, 2, 3, 4, 5, 6].map(index => {
          const tickX = 80 + index * 96;
          return `<line x1="${tickX}" y1="258" x2="${tickX}" y2="270"></line>`;
        }).join("")}
        <text x="80" y="295" text-anchor="middle">${labels.low}</text>
        <text x="380" y="312" text-anchor="middle">${labels.axis}</text>
        <text x="680" y="295" text-anchor="middle">${labels.high}</text>
      </g>
      <path class="bayes-before" d="${beforePath}"></path>
      <path class="bayes-evidence" d="${evidencePath}"></path>
      <path class="bayes-updated" d="${updatedPath}"></path>
    </svg>
    <p class="bayes-caption">${labels.caption}</p>
  `;
}

function groupBy(rows, key) {
  return rows.reduce((acc, row) => {
    const group = row[key];
    acc[group] ||= [];
    acc[group].push(row);
    return acc;
  }, {});
}

function showError(error) {
  document.body.innerHTML = `<main class="error"><div><h1>Could not load dashboard data</h1><p>${error.message}</p></div></main>`;
}

document.addEventListener("DOMContentLoaded", async () => {
  initControls();
  document.querySelectorAll("[data-i18n]").forEach(el => {
    el.textContent = t(el.dataset.i18n);
  });
  document.querySelectorAll("[data-lang-button]").forEach(button => {
    button.classList.toggle("active", button.dataset.langButton === state.lang);
  });

  try {
    state.data = await loadData();
    render();
    setInterval(renderMeta, 60 * 1000);
  } catch (error) {
    showError(error);
  }
});
