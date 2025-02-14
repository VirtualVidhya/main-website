const analyticsSrc = import.meta.env.PUBLIC_ANALYTICS_SRC;
const analyticsDataDomains = import.meta.env.PUBLIC_ANALYTICS_DATA_DOMAINS;
const analyticsDataHost = import.meta.env.PUBLIC_ANALYTICS_DATA_HOST;
const analyticsTrackingCode = import.meta.env.PUBLIC_ANALYTICS_TRACKING_CODE;

if (analyticsTrackingCode) {
  const script = document.createElement("script");

  script.async = true;
  script.defer = true;

  script.setAttribute("src", analyticsSrc);
  script.setAttribute("data-host-url", analyticsDataHost);
  script.setAttribute("data-domains", analyticsDataDomains);
  script.setAttribute("data-website-id", analyticsTrackingCode);

  document.head.appendChild(script);
} else {
  console.warn("No analytics tracking code found!");
}
