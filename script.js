const filterButtons = document.querySelectorAll(".filter-button");
const filterDropdown = document.querySelector("#project-filter");
const projectGrid = document.querySelector("#project-gallery");
const expandButton = document.querySelector("#expand-projects");
const galleryStatus = document.querySelector("#gallery-status");
const pageSize = 4;
let activeFilter = "all";
let visibleLimit = pageSize;

const projectCards = Array.from(document.querySelectorAll(".project-card"));

projectCards
  .sort((firstCard, secondCard) => {
    return new Date(secondCard.dataset.added) - new Date(firstCard.dataset.added);
  })
  .forEach((card) => projectGrid?.append(card));

function updateGallery() {
  const matchingCards = projectCards.filter((card) => {
    const levels = card.dataset.levels.split(" ");
    return activeFilter === "all" || levels.includes(activeFilter);
  });
  const visibleCards = new Set(matchingCards.slice(0, visibleLimit));

  projectCards.forEach((card) => {
    card.hidden = !visibleCards.has(card);
  });

  const visibleCount = Math.min(visibleLimit, matchingCards.length);
  const hasMoreProjects = visibleCount < matchingCards.length;

  if (galleryStatus) {
    galleryStatus.textContent = `กำลังแสดง ${visibleCount} จาก ${matchingCards.length} เกม`;
  }

  if (expandButton) {
    expandButton.hidden = !hasMoreProjects;
  }
}

function applyFilter(filter) {
  activeFilter = filter;
  visibleLimit = pageSize;

  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  if (filterDropdown) {
    filterDropdown.value = filter;
  }

  updateGallery();
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });
});

filterDropdown?.addEventListener("change", (event) => {
  applyFilter(event.target.value);
});

expandButton?.addEventListener("click", () => {
  visibleLimit += pageSize;
  updateGallery();
});

updateGallery();
