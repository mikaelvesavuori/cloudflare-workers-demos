/*********************************************************/
/* Edge proxy to get feature flags from closest endpoint */
/*********************************************************/

// This example was created alongside work on https://github.com/mikaelvesavuori/gcp-golang-feature-toggles-api

// This is a simplified, abbreviated example of matching country codes to continents, and later to their closest API endpoints
// You could of course go for full coverage with something like this: https://dev.maxmind.com/geoip/legacy/codes/country_continent/
// NB: Cloudflare Business plan gives you direct access to continent information

const americanCountries = ["US", "MX", "BR"];

const euCountries = ["SE", "NO", "FI", "DK", "IS", "DE", "FR"];

const asianCountries = ["HK", "CN", "JP", "IN"];

/**
 * Worker logic
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  // NB: Edge-side proxying seems to work just fine with TunnelBear, it actually picks up location
  const USER_COUNTRY = (() => {
    if (request.headers.get("CF-IPCountry")) {
      return request.headers.get("CF-IPCountry");
    } else return "default";
  })();

  // We also want to get a nearby endpoint
  const ENDPOINT = getEndpoint(USER_COUNTRY);

  // Match data against USER_COUNTRY
  const QUERY = {
    market: USER_COUNTRY
  };

  const OPTIONS = {
    method: "POST",
    body: JSON.stringify(QUERY)
  };

  const FLAGS = await fetch(ENDPOINT, OPTIONS).then(res => res.json());

  console.log(FLAGS);

  const DATA = {
    headers: {
      ...request.headers,
      "X-User-Country": USER_COUNTRY,
      "Access-Control-Allow-Origin": "*"
    }
  };

  return new Response(JSON.stringify(FLAGS), DATA);
}

/**
 * getEndpoint gets the closest API
 *
 * @param {string}
 * @returns
 */
function getEndpoint(endpointString) {
  // Example endpoint URLs (fake, of course, but in Google Cloud Platform format)
  const ENDPOINT_US = "https://us-east1-PROJECT_ID.cloudfunctions.net/GetFlags";
  const ENDPOINT_EU =
    "https://europe-west1-PROJECT_ID.cloudfunctions.net/GetFlags";
  const ENDPOINT_APAC =
    "https://asia-east2-PROJECT_ID.cloudfunctions.net/GetFlags";

  if (americanCountries.includes(endpointString)) {
    return ENDPOINT_US;
  } else if (euCountries.includes(endpointString)) {
    return ENDPOINT_EU;
  } else if (asianCountries.includes(endpointString)) {
    return ENDPOINT_APAC;
  } else return ENDPOINT_US;
}

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
