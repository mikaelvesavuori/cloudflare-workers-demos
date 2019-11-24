/**
 * Worker logic
 *
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  const RANDOM_VERSION = Math.round(Math.random(0, 1) * 100) >= 51 ? "a" : "b";

  const DATA = {
    headers: {
      ...request.headers,
      "X-Website-Version": RANDOM_VERSION,
      "Content-Type": "text/html;charset=UTF-8"
    }
  };

  return new Response(bodyMarkup(RANDOM_VERSION), DATA);
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});

const bodyMarkup = randomVersion => `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>Demo: Setting version header at the edge</title>
	</head>

	<body>
		<main>
			<article>
				<h1>Demo: Setting version header at the edge</h1>
				<p>You are viewing version: ${randomVersion}</p>
			</article>
		</main>
	</body>
</html>
`;
