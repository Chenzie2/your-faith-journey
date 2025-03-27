document.addEventListener("DOMContentLoaded", () => {
    // Typing animation
    const typingHeading = document.getElementById("typing-heading");
    if (typingHeading) {
      const textToType = "From Darkness to Light";
      let index = 0;
      function typeText() {
        if (index < textToType.length) {
          typingHeading.textContent += textToType.charAt(index);
          index++;
          setTimeout(typeText, 80);
        }
      }
      typeText();
    }
  
    // Theme toggle
    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-theme");
    }
  
    document.getElementById("theme-toggle")?.addEventListener("click", () => {
      document.body.classList.toggle("light-theme");
      const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
      localStorage.setItem("theme", theme);
    });
  
    // Scroll progress bar
    window.addEventListener("scroll", () => {
      const scrollY = window.scrollY;
      const docHeight = document.body.scrollHeight - window.innerHeight;
      const scrolled = (scrollY / docHeight) * 100;
      document.getElementById("progress-bar").style.width = `${scrolled}%`;
    });

    //whats next images
  
    fetch("http://localhost:3000/whatsNext")
    .then(res => res.json())
    .then(data => {
      const cards = document.querySelectorAll(".next-step-card");
      cards.forEach((card, i) => {
        const item = data[i];
        const overlay = card.querySelector(".overlay");
  
        // Inject HTML content
        overlay.innerHTML = `
          <h3>${item.title}</h3>
          <blockquote>${item.verse}</blockquote>
          <small>${item.reference}</small>
        `;
  
        // Optional: make entire card clickable
        card.addEventListener("click", () => {
          window.location.href = `/next-steps#${item.title.replace(/\s+/g, '-').toLowerCase()}`;
        });
  
        // Accessibility (optional)
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "link");
      });
    })
    .catch(err => {
      console.error("Failed to load content:", err);
      document.getElementById("whats-next-cards").innerHTML = `
        <p style="color: var(--accent-pink);">Oops! Couldn't load content. Try refreshing or check your connection.</p>
      `;
    });

    // Reveal animation (gospel cards)
    const cards = document.querySelectorAll('.card');
    const reveal = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('reveal');
        }
      });
    });
  
    cards.forEach(card => reveal.observe(card));
  });
  