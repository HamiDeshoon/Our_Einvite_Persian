/**
 * Wedding RSVP — Google Apps Script
 *
 * Paste this entire file into your Google Sheet:
 *   Extensions → Apps Script → paste (replace any default code)
 *
 * Then:
 *   Deploy → New deployment → Web app
 *     - Execute as: Me
 *     - Who has access: Anyone
 *   Copy the URL (ends in /exec) and set it as VITE_GOOGLE_SHEET_URL.
 */

// ── CONFIG ───────────────────────────────────────────────
// Set to your email to receive a notification on each RSVP.
// Leave empty string '' to disable email notifications.
var NOTIFY_EMAIL = '';

// Sheet name (the tab label in Google Sheets).
var SHEET_NAME = 'Responses';
// ────────────────────────────────────────────────────────

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet();
    var ss = sheet.getSheetByName(SHEET_NAME) || sheet.insertSheet(SHEET_NAME);

    // Add headers on first use.
    if (ss.getLastRow() === 0) {
      ss.appendRow([
        'Timestamp',
        'Name',
        'Email',
        'Phone',
        'Guests',
        'Attending',
        'Message',
      ]);
      // Bold the header row.
      ss.getRange(1, 1, 1, 7).setFontWeight('bold');
    }

    var data = JSON.parse(e.postData.contents);

    // Honeypot check — bots fill hidden fields.
    if (data.website && data.website.trim() !== '') {
      return json({ result: 'success' });
    }

    var row = [
      new Date().toLocaleString(),
      sanitize(data.name || ''),
      sanitize(data.email || ''),
      sanitize(data.phone || ''),
      sanitize(data.guests || '1'),
      sanitize(data.attending || ''),
      sanitize(data.message || ''),
    ];

    ss.appendRow(row);

    // Optional email notification.
    if (NOTIFY_EMAIL) {
      MailApp.sendEmail(
        NOTIFY_EMAIL,
        'New RSVP: ' + row[1],
        'Attending: ' + row[5] + '\nGuests: ' + row[4] + '\nEmail: ' + row[2] + '\nPhone: ' + row[3] + '\nMessage: ' + row[6]
      );
    }

    return json({ result: 'success' });

  } catch (err) {
    return json({ result: 'error', message: err.toString() });
  } finally {
    lock.releaseLock();
  }
}

// Handle CORS preflight.
function doOptions() {
  return json({ result: 'ok' });
}

function json(obj) {
  return ContentService
    .createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}

function sanitize(str) {
  // Strip HTML tags and trim.
  return str.replace(/<[^>]*>/g, '').trim();
}
