// Define elements and constants
const siteTitle = document.title;
const logoUrl = "https://dishlive24.vercel.app/images/dishlive24.png";
const logoContainer = document.querySelector(".logo-container");

// Set logo or fallback
logoContainer.innerHTML = logoUrl
  ? `<a href="#" id="logo-link"><img src="${logoUrl}" alt="Logo" height="40"></a>`
  : `<a href="#" id="logo-link" class="site-title"><i class="fas fa-tv"></i> ${siteTitle}</a>`;

const menuContainer = document.getElementById("menu-container");
const indexPagePath = "/";

// Go to top button logic
const goTopBtn = document.getElementById("goTopBtn");
document.addEventListener("DOMContentLoaded", () => {
  const logoLink = document.getElementById("logo-link");
  logoLink.addEventListener("click", (e) => {
    e.preventDefault();
    logoLink.classList.add("logo-clicked");
    setTimeout(() => {
      window.location.replace(indexPagePath);
    }, 400);
  });
});

// Category icons
const categoryIcons = {
  Sports: "fa-football-ball",
  News: "fa-newspaper",
  Movies: "fa-film",
  Music: "fa-music",
  Kids: "fa-child",
  Religion: "fa-praying-hands",
  Drama: "fa-theater-masks",
  Others: "fa-tv",
};

// Toggle menu visibility
const menuToggle = document.getElementById("menu-toggle");
menuToggle.addEventListener("click", () => {
  menuContainer.classList.toggle("active");
});

// Search input handler
const searchInput = document.getElementById("channel-search");
let allChannelData = [];

// Fetch channel data
fetch("/channels.json")
  .then((res) => res.json())
  .then((data) => {
    allChannelData = data;
    renderChannels(data);
    const categories = [...new Set(data.map((item) => item.category))];
    categories.forEach((category) => {
      const icon = categoryIcons[category] || "fa-tv";
      const link = document.createElement("a");
      link.href = indexPagePath + "#category-" + category.replace(/\s+/g, "-");
      link.className = "menu-link";
      link.innerHTML = `<i class="fas ${icon}"></i> ${category}`;
      menuContainer.appendChild(link);
    });
  });

function renderChannels(data) {
  const container = document.getElementById("channel-container");
  container.innerHTML = "";

  const grouped = {};
  data.forEach((item) => {
    if (!grouped[item.category]) grouped[item.category] = [];
    grouped[item.category].push(item);
  });

  for (let category in grouped) {
    const section = document.createElement("div");
    section.className = "category-section";
    section.id = "category-" + category.replace(/\s+/g, "-");

    const title = document.createElement("h2");
    title.className = "category-title";
    title.innerText = category;
    section.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "channel-grid";
    section.appendChild(grid);

    const items = grouped[category];
    let limit = 8;
    const step = 6;

    function loadChannels() {
      grid.innerHTML = "";
      items.slice(0, limit).forEach((item) => {
        const card = document.createElement("div");
        card.className = "channel-card";
        card.onclick = () => {
          window.location.href = "/play.php/?id=" + item.id;
        };
        card.innerHTML = `
          <img src="${item.logo}" alt="${item.name}" />
          <div class="channel-overlay">
            <p class="channel-name">${item.name}</p>
            <div class="play-button"><i class="fas fa-play"></i></div>
          </div>`;
        grid.appendChild(card);
      });
    }

    loadChannels();

    if (items.length > limit) {
      const button = document.createElement("button");
      button.className = "see-more-btn";
      button.innerText = "See More";
      button.onclick = () => {
        button.disabled = true;
        button.innerHTML = "Loading <span class=\"spinner\"></span>";
        setTimeout(() => {
          limit += step;
          loadChannels();
          button.disabled = false;
          button.innerText = "See More";
          if (limit >= items.length) button.remove();
        }, 600);
      };
      section.appendChild(button);
    }

    container.appendChild(section);
  }
  scrollToHashIfPresent();
}

searchInput.addEventListener("input", function () {
  const keyword = this.value.trim().toLowerCase();
  if (!keyword) return renderChannels(allChannelData);
  const filtered = allChannelData.filter((item) =>
    item.name.toLowerCase().includes(keyword)
  );
  renderChannels(filtered);
});

window.onscroll = function () {
  const btn = document.getElementById("goTopBtn");
  const scrolled = document.body.scrollTop > 100 || document.documentElement.scrollTop > 100;
  btn.classList[scrolled ? "add" : "remove"]("show");
};

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

menuContainer.addEventListener("click", function (e) {
  if (
    e.target.tagName === "A" &&
    e.target.hash &&
    window.location.pathname.includes("index.html")
  ) {
    const target = document.querySelector(e.target.hash);
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: "smooth" });
    }
  }
});

function scrollToHashIfPresent() {
  const hash = window.location.hash;
  if (hash && document.querySelector(hash)) {
    setTimeout(() => {
      document.querySelector(hash).scrollIntoView({ behavior: "smooth" });
    }, 300);
  }
}
