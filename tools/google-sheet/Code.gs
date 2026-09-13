/**
 * Popalzai sample maker — entries into a Google Sheet.
 *
 * Paste this into Extensions → Apps Script on the Sheet that should collect
 * entries, then Deploy → New deployment → Web app (Execute as: Me, Who has
 * access: Anyone). The site posts every "Download my mock" to the web app URL
 * that deployment gives you. Full steps: tools/google-sheet/README.md.
 *
 * Each entry becomes one row. The header row is written the first time an
 * entry arrives, so the Sheet can start completely empty.
 */

/** Tab the rows go into. Created if it doesn't exist. */
const SHEET_NAME = 'Entries';

/**
 * An email per entry, like Formspree used to send. Leave empty ('') to turn
 * it off. Personal Google accounts can send about 100 of these a day.
 */
const NOTIFY_EMAIL = 'majid@popalzaiproduction.com';

/** [key the site sends, column heading] — in column order. */
const COLUMNS = [
  ['timestamp', 'Received'],
  ['email', 'Email'],
  ['name', 'Name'],
  ['quantity', 'Quantity'],
  ['garment', 'Garment'],
  ['side', 'Side'],
  ['fit', 'Fit / crown'],
  ['colour', 'Colour'],
  ['method', 'Method'],
  ['text', 'Text'],
  ['typeface', 'Typeface'],
  ['widthCm', 'Width (cm)'],
  ['heightCm', 'Height (cm)'],
  ['positionCm', 'Position (cm)'],
  ['artworkSupplied', 'Artwork uploaded'],
  ['notes', 'Notes'],
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
/** Anyone can post to a public web app, so nothing is stored at any length. */
const MAX_LEN = 500;

function doPost(e) {
  let data;
  try {
    data = JSON.parse((e && e.postData && e.postData.contents) || '{}');
  } catch (err) {
    return reply({ ok: false, error: 'bad-request' });
  }

  const email = String(data.email || '').trim();
  if (!EMAIL_RE.test(email)) return reply({ ok: false, error: 'email' });

  const row = COLUMNS.map(function (col) {
    const key = col[0];
    if (key === 'timestamp') return new Date();
    if (key === 'email') return clean(email);
    return clean(data[key]);
  });

  // Two entries landing at the same moment must not both write the same row.
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    getSheet().appendRow(row);
  } finally {
    lock.releaseLock();
  }

  if (NOTIFY_EMAIL) {
    try {
      const lines = COLUMNS.slice(1).map(function (col, i) {
        return col[1] + ': ' + (row[i + 1] || '—');
      });
      MailApp.sendEmail({
        to: NOTIFY_EMAIL,
        replyTo: email,
        subject: 'Sample maker — ' + (data.garment || 'new entry') + ' — ' + email,
        body: lines.join('\n'),
      });
    } catch (err) {
      // The row is saved; a failed notification (daily quota) must not fail the entry.
    }
  }

  return reply({ ok: true });
}

/** Visiting the URL in a browser shows this — a quick way to check it's live. */
function doGet() {
  return reply({ ok: true, service: 'popalzai-sample-maker-entries' });
}

function getSheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(SHEET_NAME) || ss.insertSheet(SHEET_NAME);
  if (sheet.getLastRow() === 0) {
    sheet.appendRow(COLUMNS.map(function (col) { return col[1]; }));
    sheet.setFrozenRows(1);
    sheet.getRange(1, 1, 1, COLUMNS.length).setFontWeight('bold');
  }
  return sheet;
}

/**
 * Text as it will sit in a cell. Capped in length, and anything starting with
 * = + - or @ is prefixed with an apostrophe: otherwise Sheets runs it as a
 * formula, and a public form is exactly where someone would try that.
 */
function clean(value) {
  if (value === undefined || value === null) return '';
  let s = String(value).slice(0, MAX_LEN);
  if (/^[=+\-@]/.test(s)) s = "'" + s;
  return s;
}

function reply(obj) {
  return ContentService.createTextOutput(JSON.stringify(obj)).setMimeType(ContentService.MimeType.JSON);
}
