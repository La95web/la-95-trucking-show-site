document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('site-search');
  const newsItems = document.getElementsByClassName('news-item');
  const noData = document.getElementById('result');

  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    let found = false; 
    
    for (let newsItem of newsItems) {
      const containsQuery = newsItem.textContent.toLowerCase().includes(query);
      newsItem.style.display = containsQuery ? 'flex' : 'none';
      if (containsQuery) {
        found = true;
      }
    }

    if (query === '') {
      for (let newsItem of newsItems) {
        newsItem.style.display = 'flex';
      }
      noData.style.display = 'none';
    } else {
      noData.style.display = found ? 'none' : 'block'
    }
  });
});