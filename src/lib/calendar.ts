export interface CalendarEventConfig {
  title: string;
  description: string;
  location: string;
  startTime: Date;
  endTime: Date;
}

export function generateGoogleCalendarUrl(event: CalendarEventConfig): string {
  const formatTime = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', event.title);
  url.searchParams.append('dates', `${formatTime(event.startTime)}/${formatTime(event.endTime)}`);
  url.searchParams.append('details', event.description);
  url.searchParams.append('location', event.location);
  return url.toString();
}

export function generateOutlookCalendarUrl(event: CalendarEventConfig): string {
  const url = new URL('https://outlook.live.com/calendar/0/deeplink/compose');
  url.searchParams.append('path', '/calendar/action/compose');
  url.searchParams.append('rru', 'addevent');
  url.searchParams.append('subject', event.title);
  url.searchParams.append('startdt', event.startTime.toISOString());
  url.searchParams.append('enddt', event.endTime.toISOString());
  url.searchParams.append('body', event.description);
  url.searchParams.append('location', event.location);
  return url.toString();
}

export function downloadIcsFile(event: CalendarEventConfig) {
  const formatDate = (d: Date) => d.toISOString().replace(/-|:|\.\d\d\d/g, '');
  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Hamid & Fatemeh Wedding Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:wedding-${Date.now()}@hamidfatemeh.com`,
    `DTSTAMP:${formatDate(new Date())}`,
    `DTSTART:${formatDate(event.startTime)}`,
    `DTEND:${formatDate(event.endTime)}`,
    `SUMMARY:${event.title}`,
    `DESCRIPTION:${event.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${event.location}`,
    'STATUS:CONFIRMED',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', 'hamid-fatemeh-wedding.ics');
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
