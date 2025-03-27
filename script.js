document.addEventListener("DOMContentLoaded", () => {
    // ====== Typing Animation ======
    const typingHeading = document.getElementById("typing-heading");
    const textToType = "Encounter Jesus; Embrace the Mission";
    let index = 0;
  
    function typeText() {
      if (index < textToType.length) {
        typingHeading.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, 80); // typing speed
      }
    }
  
    typeText();
  
    // ====== Accordion Fetch & Render ======
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
  
        // Accordion Toggle Logic
        const titles = document.querySelectorAll(".accordion-title");
        titles.forEach(title => {
          title.addEventListener("click", () => {
            const content = title.nextElementSibling;
  
            // Toggle visibility
            const isVisible = content.style.display === "block";
            content.style.display = isVisible ? "none" : "block";
  
            // Optionally toggle a class (for animation/CSS control)
            title.parentElement.classList.toggle("active");
          });
        });
      })
      .catch(err => console.error("Failed to load accordion content:", err));
  
    // ====== Theme Toggle ======
    document.getElementById("theme-toggle").addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
    });
  
    // ====== Scroll Progress Bar ======
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollY / docHeight) * 100;
      document.getElementById("progress-bar").style.width = `${scrolled}%`;
    });
  });
  