/**
 * Worker logic
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  const USER_COUNTRY = request.headers.get("CF-IPCountry");

  const DATA = {
    headers: {
      ...request.headers,
      "X-User-Country": USER_COUNTRY,
      "Content-Type": "text/html;charset=UTF-8"
    }
  };
  return new Response(bodyMarkup(USER_COUNTRY), DATA);
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});

const bodyMarkup = userCountry => `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>Demo: Detecting user country at the edge</title>
	</head>

	<body>
		<main>
			<article>
				<h1>Demo: Detecting user country at the edge</h1>
				<p>Hey there, visitor from ${userCountry}</p>
			</article>
		</main>
	</body>
</html>
`;
