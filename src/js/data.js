const trackingCode = import.meta.env.VITE_ANALYTICS_TRACKING_CODE;

if (trackingCode) {
  const script = document.createElement("script");

  script.async = true;
  script.defer = true;

  script.src = `https://analytics.vvidhya.com/script.js`;
  script.dataset.hostUrl = `https://analytics.vvidhya.com`;
  script.dataset.websiteId = trackingCode;

  document.head.appendChild(script);
} else {
  console.warn("No analytics tracking code found!");
}
