export function permanentDeletionBlock(enquiry, { activeDeliveries = 0, confirmedConsent = false, consentReviewed = false, wonHistory = false } = {}) {
  if (!enquiry?.deleted_at) return "Only enquiries already in Trash can be permanently deleted.";
  if (enquiry.status === "won" || wonHistory) return "This enquiry has a booking or payment history. Review its accounting and retention obligations before deletion.";
  if (/legal hold/i.test(enquiry.admin_note || "")) return "This enquiry is marked with a legal hold and cannot be deleted.";
  if (activeDeliveries > 0) return "This enquiry still has an unresolved delivery. Resolve it before permanent deletion.";
  if (confirmedConsent && !consentReviewed) return "This enquiry has confirmed journey-notes consent. Review the linked GTMCR contact and consent record, then acknowledge that review before deleting the local enquiry. Deleting it here does not unsubscribe or delete the GTMCR contact.";
  return null;
}
