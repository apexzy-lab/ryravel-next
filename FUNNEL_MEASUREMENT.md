# Ryravel journey funnel

This is a first-party, consent-gated analytics stream. It is separate from the identified enquiry record and the GTMCR signal. Declining optional tracking does not affect the enquiry form.

## Events

| Event | Trigger |
| --- | --- |
| `journey_viewed` | A journey or collection route is opened |
| `case_study_opened` | An individual case-study route is opened |
| `plan_journey_clicked` | A link to the request form is clicked |
| `form_started` | First form interaction or Continue click |
| `feeling_selected` | A feeling card is selected |
| `validation_error` | A field or submission validation error occurs |
| `form_abandoned` | A started, unsubmitted form is left |
| `enquiry_submitted` | The enquiry API confirms successful receipt |
| `private_call_requested` | A private-call enquiry is successfully received |

The browser sends only an event ID, an ephemeral session ID and allowlisted attributes: journey slug, case-study slug, feeling, step number and validation-field names. No name, email, telephone, message, answer text, enquiry reference, full URL or query string goes to this stream. The collector validates the values again server-side and does not store IP or user agent in `funnel_events`. The session ID is not added to the enquiry record or GTMCR signal.

Analytics and LinkedIn marketing have independent optional consent choices. The new purpose requests fresh consent; the former marketing-only choice does not silently opt a visitor into analytics. Choices expire after 183 days. Cookie settings can be reopened in the footer.

The private curator view is `/curator-desk/funnel`. It displays unique consenting sessions by event and journey, alongside separately counted identified enquiries and locally qualified curator-desk stages. It does **not** read qualification status back from GTMCR. These are not person-level attribution or a mathematical cohort: consent refusal, blockers, multiple devices and traffic outside the reporting window affect the numbers.

## Release order

1. Run `npm.cmd run test:funnel`, `npm.cmd run test:seo`, `npm.cmd run check`, and `npm.cmd run build`.
2. Apply `drizzle/0003_tired_proudstar.sql` to the production D1 database **before** deploying the Worker: `npm.cmd exec -- wrangler d1 migrations apply DB --remote --config wrangler.jsonc`.
3. Deploy the Worker using the existing production workflow, then verify consent rejection sends no `/api/analytics` requests, analytics-only does not load LinkedIn, and an opted-in journey request records the expected event sequence. Verify `/api/admin/funnel` rejects unauthenticated requests.

No new event is sent to GTMCR by this feature. GTMCR continues to receive only successfully identified enquiries.
