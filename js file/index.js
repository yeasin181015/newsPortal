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
  const clickedCategoryNameURL = `https://openapi.programming-hero.com/api/news/category/${categoryString}`;
  findCategoryInfo(clickedCategoryNameURL);
}
function findCategoryInfo(categoryInfoURL) {
  fetch(categoryInfoURL)
    .then((res) => res.json())
    .then((data) => getData(data));
}
function getData(data) {
  //console.log(data.data[0].author.name);
  //   data.data.forEach((c) => {
  //     console.log(c.author.name);
  //   });

  const newsContainer = document.getElementById("card-group");
  newsContainer.innerText = "";
  data.data.forEach((info) => {
    console.log(info);
    const newNewsContainer = document.createElement("div");
    newNewsContainer.innerHTML = `
  <div class="card"> 
  <img class="" src="${info.image_url}" alt="Card image cap" style="height:25%; width:25%" />
    <div class="card-body">
      <h5 class="card-title">${info.author.name}</h5>
      <p class="card-text">
        This is a wider card with supporting text below as a natural
        lead-in to additional content. This content is a little bit
        longer.
      </p>
      <p class="card-text">
        <small class="text-muted">Last updated 3 mins ago</small>
      </p>
    </div>
  </div>`;
    newsContainer.appendChild(newNewsContainer);
  });
}
