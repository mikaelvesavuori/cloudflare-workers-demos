/**
 * Worker logic
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
	// Use naive approach for mobile user agents, reference: https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
  const IS_MOBILE = request.headers.get("user-agent").includes("Mobi");
		
  const DATA = {
    headers: {
      ...request.headers,
      "X-User-Mobile": IS_MOBILE,
      "Content-Type": "text/html;charset=UTF-8"
    }
  };
  return new Response(bodyMarkup(IS_MOBILE), DATA);
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});

const bodyMarkup = isMobile => `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>Demo: Checking is user on a mobile device</title>
	</head>

	<body>
		<main>
			<article>
				<h1>Demo: Checking is user on a mobile device</h1>
				<p>You are viewing this on a mobile? <strong>${isMobile}</strong></p>
			</article>
		</main>
	</body>
</html>
`;
