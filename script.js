document.addEventListener("DOMContentLoaded", () => {
    fetch("http://localhost:3000/whatsNext")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("accordion-container");
  
        data.forEach(item => {
          const accordionItem = document.createElement("div");
          accordionItem.className = "accordion-item";
  
          accordionItem.innerHTML = `
            <h3 class="accordion-title">${item.title}</h3>
            <div class="accordion-content">
              <p>${item.content}</p>
              <blockquote>${item.verse} <br><small>${item.reference}</small></blockquote>
            </div>
          `;
  
          container.appendChild(accordionItem);
        });
  
        // Accordion logic
        const items = document.querySelectorAll(".accordion-item");
        items.forEach(item => {
          const title = item.querySelector(".accordion-title");
          title.addEventListener("click", () => {
            item.classList.toggle("active");
          });
        });
      });
  });
  
   // Add toggle functionality
        const titles = document.querySelectorAll(".accordion-title");
        titles.forEach(title => {
          title.addEventListener("click", () => {
            const content = title.nextElementSibling;
            content.style.display = content.style.display === "block" ? "none" : "block";
          });
        });
