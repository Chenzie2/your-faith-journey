document.addEventListener("DOMContentLoaded", () => {
    //  Typing Animation 
    const typingHeading = document.getElementById("typing-heading");
    const textToType = "From Darkness to Light";
    let index = 0;
  
    function typeText() {
      if (index < textToType.length) {
        typingHeading.textContent += textToType.charAt(index);
        index++;
        setTimeout(typeText, 80); // typing speed
      }
    }
  
    typeText();
  
    // Theme Preference
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-theme");
    }
  
    // Accordion
    fetch("http://localhost:3000/whatsNext")
      .then(res => res.json())
      .then(data => {
        const container = document.getElementById("accordion-container");
  
        data.forEach(item => {
          const accordionItem = document.createElement("div");
          accordionItem.className = "accordion-item";
  
          accordionItem.innerHTML = `
            <h3 class="accordion-title" role="button" tabindex="0" aria-expanded="false">
              ${item.title}
            </h3>
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
          const content = title.nextElementSibling;
  
          title.addEventListener("click", () => toggleAccordion(title, content));
          title.addEventListener("keydown", (e) => {
            if (e.key === "Enter" || e.key === " ") {
              e.preventDefault();
              toggleAccordion(title, content);
            }
          });
        });
  
        function toggleAccordion(title, content) {
          const expanded = title.getAttribute("aria-expanded") === "true";
  
          title.setAttribute("aria-expanded", !expanded);
          title.parentElement.classList.toggle("active", !expanded);
  
          content.style.maxHeight = !expanded ? content.scrollHeight + "px" : null;
        }
      })
      .catch(err => {
        console.error("Failed to load accordion content:", err);
        const container = document.getElementById("accordion-container");
        container.innerHTML = `
          <p style="color: var(--accent-pink);">Oops! Couldn't load content. Try refreshing.</p>
        `;
      });
  
    //Theme Toggle
    document.getElementById("theme-toggle").addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  
    // Scroll Progress Bar 
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollY / docHeight) * 100;
      document.getElementById("progress-bar").style.width = `${scrolled}%`;
    });
  });

//Gospel Cards
  const cards = document.querySelectorAll('.card');

const reveal = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('reveal');
    }
  });
});

cards.forEach(card => reveal.observe(card));
