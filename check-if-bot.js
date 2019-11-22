/**
 * Worker logic
 * Checks if user agent is a bot or crawler, and if so, returns a simple string
 * If you are not a bot, you see a complete web page
 * @async
 * @function
 * @param {Request} request - The incoming request data
 * @returns {Response} - Returns markup and headers
 */
async function handleRequest(request) {
  const IS_BOT = checkIfBot(request.headers.get("user-agent"));

  if (IS_BOT) {
    return new Response("Sorry bot! No can do!");
  }

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

/**
 * @function
 * @param {string} userAgent - Incoming user agent string
 * @returns {boolean} - Returns whether the user agent is a bot or not
 */
function checkIfBot(userAgent) {
  if (!userAgent)
    throw new Error("No 'userAgent' parameter passed to checkIfBot()!");
  if (userAgent) {
    console.log("checkIfBot userAgent:", userAgent);

    const botUserAgents = [
      "Baiduspider",
      "bingbot",
      "Embedly",
      "facebookexternalhit",
      "LinkedInBot",
      "outbrain",
      "pinterest",
      "quora link preview",
      "rogerbot",
      "showyoubot",
      "Slackbot",
      "TelegramBot",
      "Twitterbot",
      "vkShare",
      "W3C_Validator",
      "WhatsApp"
    ];

    let containsBotKeyword = botUserAgents.find(element => {
      const substr = new RegExp(`${element}`);
      return substr.test(userAgent.toLowerCase());
    });

    if (containsBotKeyword !== undefined) {
      containsBotKeyword = true;
    } else if (containsBotKeyword === undefined) {
      containsBotKeyword = false;
    }

    console.log("containsBotKeyword:", containsBotKeyword);

    return containsBotKeyword;
  }
}

const bodyMarkup = `
<!DOCTYPE html>
<html lang="en-US">
	<head>
		<title>Demo to check if you are a bot</title>
	</head>

	<body>
		<main>
			<article>
				<h1>Demo to check if you are a bot</h1>
			</article>
		</main>
	</body>
</html>
`;
