var categoryName = [];
function loadCategories() {
  const categoryUrl =
    "https://openapi.programming-hero.com/api/news/categories";
  fetch(categoryUrl)
    .then((res) => res.json())
    .then((data) => storeCategories(data.data.news_category));
}
loadCategories();
function storeCategories(categories) {
  for (category of categories) {
    categoryName.push(category.category_name);
  }
}
var newsOptions = document.getElementsByClassName("category-options");
for (var i = 0; i < newsOptions.length; i++) {
  document.getElementById(newsOptions[i].id).onclick = selectClicked;
}
function selectClicked(event) {
  var clickedNews = event.target.id;
  showCategory(document.getElementById(clickedNews).innerText);
}
function showCategory(clickedCategoryName) {
  var categoryString =
    "0" + (categoryName.indexOf(clickedCategoryName) + 1).toString();
  console.log(categoryString);
  const clickedCategoryNameURL = `https://openapi.programming-hero.com/api/news/category/${categoryString}`;
}
