async function run() {
  const res = await fetch('https://www.youtube.com/@miameowai/videos', {
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
      'Accept-Language': 'en-US,en;q=0.9'
    }
  });
  const text = await res.text();
  const match = text.match(/var ytInitialData = (\{.*?\});<\/script>/);
  if (match) {
    const data = JSON.parse(match[1]);
    const tabs = data.contents.twoColumnBrowseResultsRenderer.tabs;
    const videosTab = tabs.find(t => t.tabRenderer.title === 'Videos');
    if (videosTab) {
      const items = videosTab.tabRenderer.content.richGridRenderer.contents;
      const videos = items.map(i => i.richItemRenderer?.content?.videoRenderer).filter(Boolean);
      videos.slice(0, 5).forEach(v => {
        console.log({
          title: v.title.runs[0].text,
          id: v.videoId,
          thumbnail: v.thumbnail.thumbnails[v.thumbnail.thumbnails.length - 1].url,
          length: v.lengthText?.simpleText
        });
      });
    }
  }
}
run();
