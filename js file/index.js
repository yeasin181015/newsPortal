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
  <div class="card d-flex flex-column justify-content-center align-items-center pt-3 flex-lg-row"> 
  <img class="img-fluid w-25" src="${info.image_url}" alt="Card image cap" />
    <div class="card-body">
      <h5 class="card-title">${info.title}</h5>
      <p class="card-text">
        ${info.details.slice(0, 300)}...
      </p>
      <div class="d-flex flex-row justify-content-between">
        <div>
        <div>
        <img src=${info.author.img} class="rounded-circle" width=50 height=50/>
        </div>
        <div></div>
        </div>
        <div>asd</div>
        <div>asd</div>
      </div>
    </div>
  </div>`;
    newsContainer.appendChild(newNewsContainer);
  });
}
