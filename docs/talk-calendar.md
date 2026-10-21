# Ryravel curator-call calendar

`/talk` is a first-party 25-minute Google Meet booking flow. It does **not** book a journey or charge a traveller. The page remains unlinked and `noindex` until an owner authorizes the calendar connection and a live booking test succeeds.

## Connection required before launch

1. Choose the Google account or shared calendar that will own curator calls and confirm its time zone and weekly hours. The current proposed schedule is weekdays, 10:00–16:30 in `TALK_HOST_TIMEZONE` (default `Africa/Lagos`), 25-minute calls at 30-minute starts, with a 10-minute buffer, 24-hour notice, and a 45-day booking window.
2. In a Google Cloud project controlled by Ryravel, enable Google Calendar API and create a Web OAuth client. Authorize the calendar-owning Google user for offline Calendar access. Do not paste the client secret or refresh token into chat or commit them to Git.
3. Set the following Worker secrets: `TALK_GOOGLE_CLIENT_ID`, `TALK_GOOGLE_CLIENT_SECRET`, `TALK_GOOGLE_REFRESH_TOKEN`, `TALK_GOOGLE_CALENDAR_ID`. Set `TALK_HOST_TIMEZONE` as a Worker variable only if the calendar is not based in Lagos.
4. Apply `drizzle/0006_talk_bookings.sql` to the production D1 database **before** deploying the code. The live route fails closed without the four connection values.
5. Test availability, a real calendar conflict, one consented test booking, the guest invitation and Meet link, and the curator’s view. Only then link `/talk` from the request flow and allow indexing.

The Calendar API’s free/busy response controls visible slots. On confirmation the site inserts a D1 reservation, rechecks Google, creates a unique calendar event with the guest as attendee, and confirms the UI only after Google returns an event ID. Google sends the event invitation; Ryravel does not send a duplicate confirmation email. A separate durable, service-only `ryravel_call_booked` signal informs GTMCR without triggering either existing request-acknowledgement automation; GTMCR list/pipeline rules for this event require separate configuration. A failed or ambiguous create attempt keeps the slot reserved for operator reconciliation and is included in the operating alert after five minutes. Authenticated staff can inspect the most recent records at `/api/admin/talk/bookings`.

The optional brief is shown only to the guest and event participants; it does not grant marketing permission. This first release does not offer self-service cancellation or rescheduling. Guests reply to the invitation or email `support@ryravel.com` with the `RT-` reference. Do not advertise self-service management until it exists.
