document.addEventListener("DOMContentLoaded", () => {
    fetch('gospelFlow.json')
      .then(response => response.json())
      .then(data => {
        const container = document.getElementById('gospelFlowContainer');
  
        data.forEach((item, index) => {
          // Create card
          const card = document.createElement('div');
          card.className = 'gospel-card';
          card.innerHTML = `
            <div class="gospel-icon">${item.icon}</div>
            <h3 class="flow-title">${item.title}</h3>
            <p class="verse">${item.verse}</p>
            <span class="verse-ref">— ${item.ref}</span>
          `;
          container.appendChild(card);
  
          // Add arrow if it's not the last one
          if (index < data.length - 1) {
            const arrow = document.createElement('div');
            arrow.className = 'arrow';
            arrow.textContent = '➡️';
            container.appendChild(arrow);
          }
        });
      })
      .catch(err => {
        console.error("Error loading gospel flow:", err);
      });
  });
  