// Single source for Brian's booking email and external profiles.
export const bookingEmail = "brianbakaj@icloud.com";
export const auditionRequestHref = `mailto:${bookingEmail}?subject=${encodeURIComponent("Audition request")}`;

export const profiles = [
  { label: "Backstage", href: "https://www.backstage.com/u/brian-bakaj/" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/brian-bakaj" },
];
