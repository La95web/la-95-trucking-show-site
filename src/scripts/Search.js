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


//links

// document.addEventListener('DOMContentLoaded', () => {
//   const noticiasLink = document.getElementById('link-noticias');
//   const tipsLink = document.getElementById('link-tips');
//   const dynamicContent = document.getElementById('dynamic-content');

//   noticiasLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     loadContent('/noticias/');
//   });

//   tipsLink.addEventListener('click', (e) => {
//     e.preventDefault();
//     loadContent('/tips/');
//   });

//   function loadContent(url) {
//     fetch(url)
//       .then(response => response.text())
//       .then(data => {
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(data, 'text/html');
//         const newContent = doc.querySelector('#dynamic-content').innerHTML;
//         dynamicContent.innerHTML = newContent;
//       })
//       .catch(error => console.error('Error al cargar el contenido:', error));
//   }
// });
