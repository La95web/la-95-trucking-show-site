document.getElementsByClassName('traffic-light')[0].addEventListener('click', () => {
    document.getElementsByClassName('navlinks')[0].classList.toggle('expanded');
    document.getElementById('close-menu').classList.toggle('show');
    document.getElementsByClassName('blur-background')[0].classList.toggle('active');
    console.log('Menu toggled');
});

document.getElementById('close-menu').addEventListener('click', () => {
    document.getElementsByClassName('navlinks')[0].classList.remove('expanded');
    document.getElementById('close-menu').classList.remove('show');
    document.getElementsByClassName('blur-background')[0].classList.remove('active');
    console.log('Menu closed');
});

// search

document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('site-search');
  const newsItems = document.getElementsByClassName('news-item');
  
  searchInput.addEventListener('input', function() {
    const query = this.value.toLowerCase();
    
    for (let newsItem of newsItems) {
      const containsQuery = newsItem.textContent.toLowerCase().includes(query);
      newsItem.style.display = containsQuery ? 'flex' : 'none';
    }

    if (query === '') {
      for (let newsItem of newsItems) {
        newsItem.style.display = 'flex';
      }
    }
  });
});

