/**
 * One-time setup for the portfolio's "Free strategy preview" form.
 *
 * What it does, in your own Google account:
 *   1. Creates a Google Form with the same questions as the website form.
 *   2. Links a Google Sheet that keeps every response.
 *   3. Installs a trigger that emails each new response to NOTIFY_EMAIL,
 *      with Reply-To set to the visitor so you can answer straight from Gmail.
 *   4. Logs the `googleForm` block to paste into src/data/portfolio.ts.
 *
 * How to run: script.google.com → New project → paste this file → Run `setup`
 * → approve the permissions → open View → Logs (or Execution log) and copy the output.
 *
 * Keep the question keys and choice values in sync with portfolio.ts
 * (`StrategyField`, `infraChoices`, `platformChoices`).
 */

const NOTIFY_EMAIL = "jayson.yare.bano@gmail.com";
const INFRA_CHOICES = ["Yes", "No", "Not sure"];
const PLATFORM_CHOICES = ["Smartlead", "Instantly", "EmailBison", "Lemlist", "Apollo", "Other", "None yet"];

/** [key, title, type, required, help text]. Order is the order on the form. */
const QUESTIONS = [
  ["email", "Work email", "text", true, ""],
  ["name", "Name", "text", false, ""],
  ["website", "Company website", "text", false, ""],
  ["offer", "What do you sell?", "paragraph", true, "One or two sentences on the offer, and any results you can prove."],
  ["industries", "Target industries or niches", "paragraph", true, "e.g. law firms with 11 to 200 staff, dental practices, Shopify brands"],
  ["locations", "Target locations", "text", true, "Countries, states or cities"],
  ["hasInfra", "Do you already have cold email infrastructure?", "choice", true, "Sending domains and mailboxes set up for outreach."],
  ["domains", "How many sending domains?", "text", false, "Only if you have infrastructure."],
  ["mailboxes", "How many mailboxes are connected?", "text", false, "Only if you have infrastructure."],
  ["platform", "Sending platform", "list", false, "Only if you have infrastructure."],
  ["currentEmail", "Your current first email", "paragraph", false, "Paste the subject line and body."],
];

function setup() {
  const form = FormApp.create("Free Outbound Strategy Preview · Jayson Bano");
  form
    .setDescription(
      "Tell me who you sell to and what you're sending from. I'll reply with a short proposal: target segments, market size, an infrastructure plan, and a first email.",
    )
    .setConfirmationMessage("Thanks! I'll reply by email with your strategy preview.")
    .setAcceptingResponses(true)
    .setShowLinkToRespondAgain(false);
  // Forms created by script can start unpublished on newer accounts.
  if (typeof form.setPublished === "function") form.setPublished(true);

  const items = {};
  QUESTIONS.forEach(([key, title, type, required, help]) => {
    let item;
    if (type === "paragraph") item = form.addParagraphTextItem();
    else if (type === "choice") item = form.addMultipleChoiceItem().setChoiceValues(INFRA_CHOICES);
    else if (type === "list") item = form.addListItem().setChoiceValues(PLATFORM_CHOICES);
    else item = form.addTextItem();
    item.setTitle(title).setRequired(required);
    if (help) item.setHelpText(help);
    items[key] = { item, type };
  });

  const sheet = SpreadsheetApp.create("Strategy Preview Requests");
  form.setDestination(FormApp.DestinationType.SPREADSHEET, sheet.getId());

  ScriptApp.newTrigger("onStrategyRequest").forForm(form).onFormSubmit().create();

  // Read each question's entry id from a pre-filled link, one question at a time.
  const entries = {};
  Object.keys(items).forEach((key) => {
    const { item, type } = items[key];
    const sample = type === "choice" ? INFRA_CHOICES[0] : type === "list" ? PLATFORM_CHOICES[0] : "x";
    const typed =
      type === "paragraph"
        ? item.asParagraphTextItem()
        : type === "choice"
          ? item.asMultipleChoiceItem()
          : type === "list"
            ? item.asListItem()
            : item.asTextItem();
    const url = form.createResponse().withItemResponse(typed.createResponse(sample)).toPrefilledUrl();
    const match = url.match(/entry\.(\d+)=/);
    if (match) entries[key] = "entry." + match[1];
  });

  const action = form.getPublishedUrl().replace(/\/viewform.*$/, "/formResponse");
  Logger.log("Form (share or test it): " + form.getPublishedUrl());
  Logger.log("Edit form: " + form.getEditUrl());
  Logger.log("Responses sheet: " + sheet.getUrl());
  Logger.log(
    "Paste into src/data/portfolio.ts:\n\nexport const googleForm: { action: string; entries: Partial<Record<StrategyField, string>> } = " +
      JSON.stringify({ action: action, entries: entries }, null, 2) +
      ";",
  );
}

/** Emails every new response to NOTIFY_EMAIL. Installed by setup(). */
function onStrategyRequest(e) {
  const answers = {};
  e.response.getItemResponses().forEach((r) => {
    answers[r.getItem().getTitle()] = String(r.getResponse());
  });
  const get = (key) => {
    const q = QUESTIONS.find((row) => row[0] === key);
    return (q && answers[q[1]]) || "";
  };

  const body = QUESTIONS.map(([key, title]) => {
    const value = get(key);
    return value ? title + "\n" + value : null;
  })
    .filter(Boolean)
    .join("\n\n");

  const visitor = get("email");
  const options = {
    to: NOTIFY_EMAIL,
    subject: "Strategy preview request: " + (get("industries") || "new request").slice(0, 60),
    body: body,
  };
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(visitor)) options.replyTo = visitor;
  MailApp.sendEmail(options);
}
