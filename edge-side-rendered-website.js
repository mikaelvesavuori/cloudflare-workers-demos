/**
 * Worker logic
 * Renders a complete website on the edge
 * Any assets need to be stored in some other location, and pointed to with absolute URLs
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  const DATA = {
    headers: {
      ...request.headers,
      "Content-Type": "text/html;charset=UTF-8"
    }
  };

  return new Response(bodyMarkup, DATA);
}

addEventListener("fetch", event => {
  return event.respondWith(handleRequest(event.request));
});

/**********************/
/*   Inline styles    */
/**********************/
const STYLES = `
<style>
	* {
		font-smooth: always;
		-webkit-font-smoothing: antialiased;
		box-sizing: border-box;
	}

	html {
		padding: 0;
		margin: 0;
	}

	body {
		font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto,
			Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
		font-size: 16px;
		padding: 0;
		margin: 0;
	}
</style>
`;

/**********************/
/*       Markup       */
/**********************/
const MAIN_CONTENT = `
	<h1>Edge-side rendered website</h1>
`;

const bodyMarkup = `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>Edge-side rendered website</title>
		${STYLES}
	</head>

	<body>
		<main>
			<article>
				${MAIN_CONTENT}

				<!-- Note the absolute URL to the image; assets should reside elsewhere and be pointed to with absolute URLs -->
				<img src="https://images.theconversation.com/files/280024/original/file-20190618-118505-aag3r7.jpg">
			</article>
		</main>
	</body>
</html>
`;
