export function permanentDeletionBlock(enquiry, { activeDeliveries = 0, confirmedConsent = false, wonHistory = false } = {}) {
  if (!enquiry?.deleted_at) return "Only enquiries already in Trash can be permanently deleted.";
  if (enquiry.status === "won" || wonHistory) return "This enquiry has a booked or won history. Review its retention obligations before deletion.";
  if (/legal hold/i.test(enquiry.admin_note || "")) return "This enquiry is marked with a legal hold and cannot be deleted.";
  if (activeDeliveries > 0) return "This enquiry still has an unresolved delivery. Resolve it before permanent deletion.";
  if (confirmedConsent) return "This enquiry has confirmed journey-notes consent. Review the linked GTMCR contact and consent record before deletion.";
  return null;
}
