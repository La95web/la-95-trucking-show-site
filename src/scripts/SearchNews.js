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
  const itemsPerClick = 4;
  let itemsToShow = itemsPerClick;

  const loadMoreWrapper = document.querySelector('.section-center');
  const contentItems = document.querySelectorAll('.article-wrapper');

  function updateItems() {
    contentItems.forEach((item, index) => {
      item.style.display = index < itemsToShow ? 'flex' : 'none';
    });

    // Mostrar botón solo si hay más contenido
    if (contentItems.length > itemsPerClick && itemsToShow < contentItems.length) {
      loadMoreWrapper.style.display = 'inline-block';
    } else {
      loadMoreWrapper.style.display = 'none';
    }
  }

  loadMoreWrapper.addEventListener('click', () => {
    itemsToShow += itemsPerClick;

    if (itemsToShow >= contentItems.length) {
      loadMoreWrapper.style.display = 'none';
    }

    updateItems();
  });

  updateItems();
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