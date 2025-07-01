document.addEventListener("DOMContentLoaded", () => {
  const themeToggle = document.getElementById("theme-toggle");

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

  // Theme toggle
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-theme");
  }
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("light-theme");
    const theme = document.body.classList.contains("light-theme") ? "light" : "dark";
    localStorage.setItem("theme", theme);
  });

  // Scroll progress bar
  window.addEventListener("scroll", () => {
    const scrollTop = window.scrollY;
    const height = document.body.scrollHeight - window.innerHeight;
    const progress = (scrollTop / height) * 100;
    document.getElementById("progress-bar").style.width = `${progress}%`;
  });

  // Reveal cards
  const cards = document.querySelectorAll(".card");
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
      }
    });
  });
  cards.forEach(card => observer.observe(card));

  // Hide navbar on scroll down, show on scroll up
  let lastScrollY = window.scrollY;
  const navbar = document.querySelector(".navbar");

  window.addEventListener("scroll", () => {
    if (window.scrollY > lastScrollY) {
      navbar.classList.add("hide");
    } else {
      navbar.classList.remove("hide");
    }
    lastScrollY = window.scrollY;
  });

  // ✅ What’s Next cards - Now using embedded JSON instead of fetch()
  const whatsNextData = [
    { title: "PRAYER", image: "./images/prayer.jpg" },
    { title: "WATER BAPTISM", image: "./images/waterbaptsim.jpg" },
    { title: "HOLY GHOST BAPTISM", image: "./images/HolyGhostbaptism.jpg" },
    { title: "THE WORD", image: "./images/bible.jpg" },
    { title: "COMMUNITY", image: "./images/community.jpg" },
    { title: "LOVING GOD", image: "./images/lovingYou.jpg" },
    { title: "A REVELATION", image: "./images/leadingMe.jpg" }
  ];

  const container = document.getElementById("whats-next-cards");
  container.innerHTML = ""; // Clear any pre-existing cards

  whatsNextData.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("next-step-card");
    card.style.backgroundImage = `url('${item.image}')`;

    const overlay = document.createElement("div");
    overlay.classList.add("overlay");
    overlay.innerHTML = `<h3>${item.title}</h3>`;

    card.appendChild(overlay);

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

    container.appendChild(card);
  });

  // Form Validation (Still using JSON server for messages unless you want to remove that too)
  const contactForm = document.getElementById("contactForm");
  const formStatus = document.getElementById("formStatus");

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = contactForm.name.value.trim();
    const email = contactForm.email.value.trim();
    const message = contactForm.message.value.trim();

    if (!name || !email || !message) {
      formStatus.textContent = "Please fill in all required fields.";
      formStatus.style.color = "crimson";
      return;
    }

    const emailPattern = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;
    if (!emailPattern.test(email)) {
      formStatus.textContent = "Please enter a valid email address.";
      formStatus.style.color = "red";
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, message, date: new Date().toISOString() })
      });

      if (response.ok) {
        formStatus.textContent = "Message sent successfully! We'll be in touch soon.";
        formStatus.style.color = "green";
        contactForm.reset();
      } else {
        throw new Error("Network error");
      }
    } catch (err) {
      formStatus.textContent = "Oops! Something went wrong. Please try again later.";
      formStatus.style.color = "red";
    }
  });
});
