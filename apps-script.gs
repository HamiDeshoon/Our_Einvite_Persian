/**
 * Google Apps Script for RSVP form endpoint.
 * Sheet ID: 1wvGA6M_Zt1kR5IU1d80_yxyhRpPNa6al1pTlT44tUJ4
 */

const SHEET_ID = '1wvGA6M_Zt1kR5IU1d80_yxyhRpPNa6al1pTlT44tUJ4';

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

    // ----- Email notification to Hamid & Fatemeh -----
    MailApp.sendEmail({
      to: 'tmha456@gmail.com, fatiniki7728@gmail.com',
      subject: 'New RSVP received — جشن پیوند حمید و فاطمه',
      body: `New RSVP submission received:\n\n` +
            `نام مهمان: ${data.name || ''}\n` +
            `وضعیت حضور: ${data.attending || ''}\n` +
            `تعداد همراهان: ${data.guests || ''}\n` +
            `شماره تماس: ${data.phone || ''}\n` +
            `ایمیل: ${data.email || ''}\n` +
            `پیام تبریک: ${data.message || ''}\n\n` +
            `زمان ثبت: ${timestamp.toLocaleString('fa-IR', { timeZone: 'Asia/Tehran' })}`
    });
    // --------------------------------------------------

    return ContentService
      .createTextOutput(JSON.stringify({ result: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService
      .createTextOutput(JSON.stringify({ result: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}