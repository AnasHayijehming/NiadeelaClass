const filterButtons = document.querySelectorAll(".filter-button");
const filterDropdown = document.querySelector("#project-filter");
const projectCards = document.querySelectorAll(".project-card");

function applyFilter(filter) {
  filterButtons.forEach((button) => {
    button.classList.toggle("is-active", button.dataset.filter === filter);
  });

  if (filterDropdown) {
    filterDropdown.value = filter;
  }

  projectCards.forEach((card) => {
    const levels = card.dataset.levels.split(" ");
    const visible = filter === "all" || levels.includes(filter);
    card.classList.toggle("is-hidden", !visible);
  });
}

filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    applyFilter(button.dataset.filter);
  });
});

filterDropdown?.addEventListener("change", (event) => {
  applyFilter(event.target.value);
});
