document.addEventListener("DOMContentLoaded", () => {
  const MAX_LENGTH = 697;

  document.querySelectorAll(".article-wrapper").forEach((wrapper) => {
    const paragraph = wrapper.querySelector(".lead-paragraph");
    const extraContainer = wrapper.querySelector(".extra-content");

    const fullHTML = paragraph.dataset.fullContent || "";

    // Crear un div temporal para medir longitud
    const tempDiv = document.createElement("div");
    tempDiv.innerHTML = fullHTML;
    const fullText = tempDiv.textContent || "";

    if (fullText.length > MAX_LENGTH) {
    
      const firstText = fullText.substring(0, MAX_LENGTH);

      let displayedHTML = "";
      let count = 0;
      for (let node of tempDiv.childNodes) {
        if (count >= MAX_LENGTH) break;
        if (node.nodeType === 3) { // texto
          if (count + node.textContent.length > MAX_LENGTH) {
            displayedHTML += node.textContent.substring(0, MAX_LENGTH - count);
            count = MAX_LENGTH;
          } else {
            displayedHTML += node.textContent;
            count += node.textContent.length;
          }
        } else { // elemento
          displayedHTML += node.outerHTML;
          count += node.textContent.length;
        }
      }

      paragraph.innerHTML = displayedHTML + '... <button class="inline-toggle">Seguir leyendo</button>';

      const inlineButton = paragraph.querySelector(".inline-toggle");

      let expanded = false;
      inlineButton.addEventListener("click", () => {
        if (!expanded) {
          extraContainer.innerHTML = fullHTML.substring(MAX_LENGTH); // resto del HTML
          extraContainer.style.display = "block";
          extraContainer.classList.add("active");
          inlineButton.style.display = "none";
        } else {
          extraContainer.style.display = "none";
          extraContainer.classList.remove("active");
          extraContainer.innerHTML = "";
          inlineButton.style.display = "inline-block";
        }
        expanded = !expanded;
      });

    } else {
      paragraph.innerHTML = fullHTML;
    }
  });
});