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
  var indexString = data.data[0].category_id.slice(1, 2);
  var indexNumber = parseInt(indexString);
  document.getElementById("numberOfItems").innerText = `${
    data.data.length
  } items found for category ${categoryName[indexNumber - 1]}`;
  const newsContainer = document.getElementById("card-group");
  newsContainer.innerText = "";
  data.data.forEach((info) => {
    //console.log(info._id);
    const newNewsContainer = document.createElement("div");
    newNewsContainer.innerHTML = `
  <div class="card d-flex flex-column justify-content-center align-items-center pt-3 flex-lg-row"> 
  <img class="img-fluid w-25" src="${info.image_url}" alt="Card image cap"  />
    <div class="card-body">
      <h5 class="card-title">${info.title}</h5>
      <p class="card-text">
        ${info.details.slice(0, 300)}...
      </p>
      <div class="d-flex flex-row justify-content-between">
        <div class="d-flex flex-row">
          <div>
            <img src=${
              info.author.img
            } class="rounded-circle" width=50 height=50/>
          </div>
        <div>
          <span>${info.author.name}</span> <br>
          <span> <small>${info.author.published_date}</small></span>
        </div>
        </div>
        <div> <i class="fa-solid fa-eye"></i> ${info.total_view} </div>
        <div>
       <button type="button" onclick="getNewsDetails('${
         info._id
       }')" class="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
       <i  class="fa-solid fa-arrow-right"></i>
       </button>
       </div>       
      </div>
    </div>
  </div>`;
    newsContainer.appendChild(newNewsContainer);
  });
}

function getNewsDetails(id) {
  const newsURL = "https://openapi.programming-hero.com/api/news/" + id;
  console.log(newsURL);
  fetch(newsURL)
    .then((res) => res.json())
    .then((data) => getModalBody(data));
}
function getModalBody(data) {
  document.getElementById("newsModalBody").innerText = data.data[0].details;
}
