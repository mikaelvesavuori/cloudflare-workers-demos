/******************************/
/* Edge-side feature toggling */
/******************************/

const FEATURE_TOGGLES = [
  {
    market: "SE",
    newFeatureActive: true,
    abSplitPercentage: { new: 50, current: 50 }
  },
  {
    market: "US",
    newFeatureActive: false,
    abSplitPercentage: { new: 30, current: 70 }
  },
  {
    market: "JP",
    newFeatureActive: true,
    abSplitPercentage: { new: 80, current: 20 }
  },
  {
    market: "default",
    newFeatureActive: false,
    abSplitPercentage: { new: 0, current: 100 }
  }
];

/**
 * Worker logic
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  // We want to know where the user is coming from
  // If this is null, return 'default' so the API will pick a fallback/default flag set
  const USER_COUNTRY = (() => {
    if (request.headers.get("CF-IPCountry")) {
      return request.headers.get("CF-IPCountry");
    } else return "default";
  })();

  const FLAGS = (() => {
    if (
      FEATURE_TOGGLES.find(marketFlags => marketFlags.market === USER_COUNTRY)
    ) {
      return FEATURE_TOGGLES.find(
        marketFlags => marketFlags.market === USER_COUNTRY
      );
    } else
      return FEATURE_TOGGLES.find(
        marketFlags => marketFlags.market === "default"
      );
  })();

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

addEventListener("fetch", event => {
  event.respondWith(handleRequest(event.request));
});
