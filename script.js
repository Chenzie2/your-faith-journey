document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");
  const navLinks = document.querySelector(".nav-links");
  const menuToggle = document.querySelector(".menu-toggle");

  // Typing animation
  const heading = document.querySelector("#home h1");
  const text = "From Darkness to Light";
  let i = 0;
  heading.textContent = "";
  function type() {
    if (i < text.length) {
      heading.textContent += text.charAt(i);
      i++;
      setTimeout(type, 80);
    }
  }
  type();

  // Theme handling
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });

  // Menu toggle for mobile
  menuToggle.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  // Scroll progress bar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
  });

  // Reveal animation for gospel cards
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  });
  cards.forEach(card => observer.observe(card));

  // Fetch data for "What's Next" cards
  fetch("http://localhost:3000/whatsNext")
    .then(res => res.json())
    .then(data => {
      const cards = document.querySelectorAll(".next-step-card");
      cards.forEach((card, i) => {
        const item = data[i];
        const overlay = card.querySelector(".overlay");
        overlay.innerHTML = `<h3>${item.title}</h3>`;
        card.addEventListener("click", () => {
          const slug = item.title
            .replace(/[^\w\s]/gi, "")
            .trim()
            .toLowerCase()
            .replace(/\s+/g, "-");
          window.location.href = `/next-steps#${slug}`;
        });
        card.setAttribute("tabindex", "0");
        card.setAttribute("role", "link");
      });
    })
    .catch(() => {
      document.getElementById("whats-next-cards").innerHTML = `
        <p style="color: var(--accent-pink);">Oops! Couldn't load content. Try refreshing or check your connection.</p>
      `;
    });
});
