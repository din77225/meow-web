async function run() {
  const res = await fetch('https://www.youtube.com/@miameowai/about', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  const viewsMatch = text.match(/([\d,]+) views/);
  const videosMatch = text.match(/([\d,]+) videos/);
  console.log("Views:", viewsMatch ? viewsMatch[1] : "not found");
  console.log("Videos:", videosMatch ? videosMatch[1] : "not found");
}
run();
