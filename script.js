const menu = document.querySelector(".menu-icon");
const sidebar = document.getElementById("categorySidebar");
const close = document.querySelector(".close-icon");
const list = document.getElementById("categoryList");

async function getCategories() {
  list.innerHTML = "";
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();
    if (data.categories) {
      data.categories.forEach((c) => {
        const li = document.createElement("li");
        li.textContent = c.strCategory;
        list.appendChild(li);
      });
    }
  } catch (err) {
    console.error("Error fetching categories:", err);
  }
}

menu.addEventListener("click", () => {
  sidebar.classList.add("show");
  getCategories();
});

close.addEventListener("click", () => {
  sidebar.classList.remove("show");
});

document.addEventListener("click", (e) => {
  if (!sidebar.contains(e.target) && !menu.contains(e.target)) {
    sidebar.classList.remove("show");
  }
});

// *********************************************************************

const grid = document.getElementById("categories-grid");

async function showCategories() {
  try {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/categories.php"
    );
    const data = await res.json();

    data.categories.forEach((c) => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.innerHTML = `
                <img src="${c.strCategoryThumb}">
                <div class="category-title">${c.strCategory}</div>
            `;
      grid.appendChild(card);
    });
  } catch (err) {
    console.error(err);
  }
}

document.addEventListener("DOMContentLoaded", showCategories);

// *********************************************************************
