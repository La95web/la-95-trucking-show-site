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

document.addEventListener('DOMContentLoaded', () => {
  const paragraphs = document.querySelectorAll('p'); 

  function truncateText(paragraph, wordCount) {
    const text = paragraph.textContent;
    const words = text.split(' ');

    if (words.length > wordCount) {
      const truncatedText = words.slice(0, wordCount).join(' ') + '...';
      paragraph.textContent = truncatedText;
    }
  }

  function adjustTruncation() {
    const wordCount = window.innerWidth >= 1024 ? 30 : 8;
    paragraphs.forEach(paragraph => truncateText(paragraph, wordCount));
  }

  adjustTruncation();
  window.addEventListener('resize', adjustTruncation);
});

// button load more

document.addEventListener('DOMContentLoaded', () => {
  let itemsToShow = 2;
  const loadMoreButton = document.getElementById('load-more');
  const contentItems = document.querySelectorAll('.section-content-tips');

  function showItems(count) {
    let visibleItems = 0;
    contentItems.forEach((item, index) => {
      if (index < count) {
        item.style.display = 'flex';
        visibleItems++;
      } else {
        item.style.display = 'none';
      }
    });
    if (visibleItems >= contentItems.length) {
      loadMoreButton.innerText = 'No more';
      loadMoreButton.disable = true; 
    }
  }

  loadMoreButton.addEventListener('click', () => {
    itemsToShow += 2;
    showItems(itemsToShow);
  });

  showItems(itemsToShow);
});
