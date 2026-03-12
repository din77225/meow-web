async function run() {
  const res = await fetch('https://www.youtube.com/@miameowai/about', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  const match = text.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (match) {
    const data = JSON.parse(match[1]);
    // Try to find the channel about info or links
    const headerLinks = data.header?.c4TabbedHeaderRenderer?.headerLinks?.channelHeaderLinksRenderer?.primaryLinks || [];
    const secondaryLinks = data.header?.c4TabbedHeaderRenderer?.headerLinks?.channelHeaderLinksRenderer?.secondaryLinks || [];
    
    console.log("Links:");
    [...headerLinks, ...secondaryLinks].forEach(l => {
        console.log(l.title.simpleText, l.navigationEndpoint.urlEndpoint.url);
    });

    // Try to find subscriber count and video count
    const subscriberCount = data.header?.c4TabbedHeaderRenderer?.subscriberCountText?.simpleText;
    const videoCount = data.header?.c4TabbedHeaderRenderer?.videosCountText?.runs?.[0]?.text;
    console.log("Subscribers:", subscriberCount);
    console.log("Videos:", videoCount);
  } else {
    console.log("No ytInitialData found");
  }
}
run();
