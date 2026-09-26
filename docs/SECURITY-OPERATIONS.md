# Ryravel security and operations

Accountable owner: Ryravel Support Team (support@ryravel.com).

## Enquiry delivery

Enquiries and delivery jobs are committed in one database transaction. CRM and confirmation-email failures retry with backoff; after eight failures a job requires operator review. Successful delivery clears the job's customer payload. Alerts contain counts, never customer details, and are throttled to once per six hours. The scheduler runs every 15 minutes. Review the curator desk daily and assign overdue requests.

Non-newsletter enquiries are held for GTMCR until its receiver supports transactional contacts without subscribing them to marketing. After that receiver is deployed and a fresh test is verified in Signals, set the Ryravel secret/variable GTMCR_TRANSACTIONAL_CONTACTS_READY=true. Do not set it early. The scheduler then releases held jobs. Existing contacts' opt-outs must remain respected.

## Access

Browser sessions expire after eight hours and use signed HttpOnly, Secure, SameSite cookies. No access key is stored in browser storage. Rotate ADMIN_API_TOKEN to invalidate all existing sessions. Access remains shared-key based, not individual SSO/MFA. Account owners must enable MFA on Cloudflare, GitHub, mail and CRM accounts and maintain recovery access.

## Retention

Unbooked enquiries: review at 12 months after closure/decline. This is an operational default, not a universal statutory retention period. Support approves deletion after checking disputes, legal holds and future needs. Add LEGAL HOLD to the private note when applicable. Booked/customer financial records are excluded and require a separately approved accounting/legal schedule. No automatic deletion of customer records is enabled.

## Recovery and support

Check Cloudflare D1 Time Travel availability before each migration. A backup is not proven until restored to an isolated database and checked. Never test restoration on production. Keep exported customer data encrypted and outside the web/public directory; never commit it. Document the support team's staffed 24/7 email/call rota and escalation backup; code cannot establish staffing.

## Remaining account controls

Verify SPF and all actual sending providers' DKIM before moving DMARC beyond monitoring. Configure an external uptime alert and periodically test support inbox delivery. Review account audit logs and access on staff changes. The presence of application controls is not a legal or international-standard certification.
