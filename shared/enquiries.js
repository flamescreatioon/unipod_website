export const interests = {
  programmes: "Programmes & training",
  access: "Facility access",
  visit: "Facility visit",
  enterprise: "Enterprise support",
  partnership: "Partnership",
  general: "General enquiry",
};

export function enquiryHref(kind, subject = "") {
  const params = new URLSearchParams({ interest: kind });
  if (subject) params.set("subject", subject);
  return `/contact?${params}#enquiry`;
}
