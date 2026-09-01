/**
 * Google Apps Script for RSVP form endpoint.
 * Replace SHEET_ID with your Google Sheet ID.
 */

const SHEET_ID = '1wvGA6M_Zt1kR5IU1d80_yxyhRpPNa6al1pTlT44tUJ4'; // <-- replace with your sheet ID

/**
 * Handle GET requests (useful for checking the endpoint in a browser).
 * Returns a simple text message.
 */
function doGet(e) {
  return ContentService
    .createTextOutput('RSVP endpoint is alive. Use POST to submit data.')
    .setMimeType(ContentService.MimeType.TEXT);
}

/**
 * Entry point for HTTP POST from the RSVP form.
 * Expects JSON with fields: name, email, phone, guests, attending, message, website (honeypot).
 */
function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);
    // Honeypot check: if website field is filled, ignore.
    if (data.website && data.website.trim() !== '') {
      return ContentService
        .createTextOutput(JSON.stringify({ result: 'spam' }))
        .setMimeType(ContentService.MimeType.JSON);
    }

    const sheet = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
    const timestamp = new Date();
    const row = [
      timestamp,
      data.name || '',
      data.email || '',
      data.phone || '',
      data.guests || '',
      data.attending || '',
      data.message || ''
    ];
    sheet.appendRow(row);

    // Optional: send email notification
    MailApp.sendEmail({
       to: Session.getActiveUser().getEmail(),
       subject: 'New RSVP',
       body: `New RSVP received:\nName: ${data.name}\nEmail: ${data.email}\nAttending: ${data.attending}\nMessage: ${data.message}`
     });

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}