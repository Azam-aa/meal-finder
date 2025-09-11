const menu = document.querySelector(".menu-icon");
const sidebar = document.getElementById("categorySidebar");
const close = document.querySelector(".close-icon");
const list = document.getElementById("categoryList");
// *********************************************************************

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
// Show Meals by Category

const catSec = document.querySelector(".categories-section");
const mealsSec = document.getElementById("meals-by-category");
const mealsGrid = document.getElementById("meals-grid");

async function showCategories() {
  try {
    const res = await fetch("https://www.themealdb.com/api/json/v1/1/categories.php");
    const data = await res.json();

    data.categories.forEach((c) => {
      const card = document.createElement("div");
      card.className = "category-card";
      card.dataset.category = c.strCategory; 
      card.innerHTML = `
        <img src="${c.strCategoryThumb}">
        <div class="category-title">${c.strCategory}</div>
      `;
      grid.appendChild(card);

      card.addEventListener("click", () => {
        catSec.classList.add("hidden");
        mealsSec.classList.remove("hidden");
        getMealsByCategory(c.strCategory);
      });
    });
  } catch (err) {
    console.error(err);
  }
}

async function getMealsByCategory(category) {
  mealsGrid.innerHTML = "";
  try {
    const res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`);
    const data = await res.json();
    if (data.meals) {
      data.meals.forEach((meal) => {
        const card = document.createElement("div");
        card.className = "meal-card";
        card.dataset.id = meal.idMeal;
        card.innerHTML = `
          <img src="${meal.strMealThumb}">
          <div class="meal-title">${meal.strMeal}</div>
        `;
        mealsGrid.appendChild(card);
      });
    } else {
      mealsGrid.innerHTML = "<h2>No meals found for this category.</h2>";
    }
  } catch (err) {
    console.error(err);
  }
}

// *********************************************************************


// *********************************************************************
