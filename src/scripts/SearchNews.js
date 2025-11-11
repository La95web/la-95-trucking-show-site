document.addEventListener('DOMContentLoaded', () => {
  const searchInput = document.getElementById('site-search');
  const newsItems = document.getElementsByClassName('search');
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
      noData.style.display = found ? 'none' : 'flex'
    }
  });
});

// button load more

document.addEventListener('DOMContentLoaded', () => {
  let itemsToShow = 9;
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
    itemsToShow += 9;
    showItems(itemsToShow);
  });

  showItems(itemsToShow);
});
// see more functionality
    (function () {
      const el = document.getElementById('lead-paragraph');
      if (!el) return;
      const full = el.textContent.trim();
      const MAX = 174;
      const mq = window.matchMedia('(max-width: 1023px)');
      let expanded = false;

      function escapeHtml(str) {
        return str
          .replace(/&/g, '&amp;')
          .replace(/</g, '&lt;')
          .replace(/>/g, '&gt;');
      }

      function renderTruncated() {
        if (full.length <= MAX || !mq.matches) {
          el.textContent = full;
          return;
        }
        const part = full.slice(0, MAX).trim();
        el.innerHTML = `${escapeHtml(part)}&hellip; <button class="read-toggle" aria-expanded="false">ver más</button>`;
        attachHandler();
      }

      function renderFull() {
        el.innerHTML = `${escapeHtml(full)} <button class="read-toggle" aria-expanded="true">ver menos</button>`;
        attachHandler();
      }

      function attachHandler() {
        const btn = el.querySelector('.read-toggle');
        if (!btn) return;
        btn.addEventListener('click', () => {
          expanded = !expanded;
          if (expanded) renderFull();
          else renderTruncated();
        }, { once: false });
      }

      // Inicializa y reactiva en resize
      renderTruncated();
      window.addEventListener('resize', () => {
        // si se cambia de escritorio a móvil/deshacer
        expanded = false;
        renderTruncated();
      });
    })();