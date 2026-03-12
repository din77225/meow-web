async function run() {
  const res = await fetch('https://www.youtube.com/@miameowai', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  const match = text.match(/"url":"(https:\/\/yt3\.googleusercontent\.com\/[^"]+)"/g);
  if (match) {
    const uniqueUrls = [...new Set(match.map(m => m.replace(/"url":"/, '').replace(/"$/, '')))];
    console.log('URLs:', uniqueUrls.slice(0, 5));
  }
}
run();
