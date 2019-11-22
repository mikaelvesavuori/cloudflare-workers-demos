const HOST =
  "https://europe-west1-mikaelvesavuori-web.cloudfunctions.net/webserver";

async function handleRequest(request) {
	// If protocol is not 'https', send to HTTPS URL right away
	/*
  const PROTOCOL = request.url.split(":")[0];
  if (PROTOCOL !== "https") {
    const SECURE_URL = "https://www.fakeusers.com"; //https://europe-west1-mikaelvesavuori-web.cloudfunctions.net/webserver
    return Response.redirect(SECURE_URL, 301);
	}
	*/

  const DATA = {
    headers: {
      ...request.headers,
      "Content-Type": "text/html;charset=UTF-8"
    }
  };

  const _PATH = request.url.replace("https://", "").split("/")[1];
  const PATH = _PATH ? _PATH : "";

  const response = await fetch(`${HOST}/${PATH}`, DATA);
  const results = await gatherResponse(response);

  console.log(results);

  return new Response(`${results}`, DATA);
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});

/**
 * gatherResponse awaits and returns a response body as a string.
 * Use await gatherResponse(..) in an async function to get the response body
 * @param {Response} response
 */
async function gatherResponse(response) {
  const { headers } = response;
	const contentType = headers.get("content-type");
	console.log('contentType', contentType);
  if (contentType.includes("application/json")) {
    return await response.text(); //response.json()
  } else if (contentType.includes("application/text")) {
    return await response.text();
  } else if (contentType.includes("text/html")) {
    return await response.text();
  } else {
    return await response.text();
  }
}
