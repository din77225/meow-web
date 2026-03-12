async function run() {
  const res = await fetch('https://www.youtube.com/@miameowai', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  const urls = text.match(/https?:\/\/(?:www\.)?(?:skool\.com|miameow\.ai|linktr\.ee|stan\.store)[^"'\s\\]+/g);
  if (urls) {
    console.log("Found URLs:", [...new Set(urls)]);
  } else {
    console.log("No specific URLs found.");
  }

  // Also look for video count or view count
  const videoCountMatch = text.match(/"videoCountText":\{"runs":\[\{"text":"([^"]+)"\}\]/);
  const subscriberMatch = text.match(/"subscriberCountText":\{"simpleText":"([^"]+)"\}/);
  console.log("Videos:", videoCountMatch ? videoCountMatch[1] : "not found");
  console.log("Subscribers:", subscriberMatch ? subscriberMatch[1] : "not found");
}
run();
