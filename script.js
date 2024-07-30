const API_KEY = "057f9b288fec43d5ab271002ecebe212";
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener("load", () => fetchNews("Tech"));

function reload() {
    window.location.reload();
}

async function fetchNews(query) {
    const res = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await res.json();
    bindData(data.articles);
}

function bindData(articles) {
    const gridContainer = document.getElementById("news-grid");
    const newsItemTemplate = document.getElementById("template-news-item");

    gridContainer.innerHTML = "";

    articles.forEach((article) => {
        if (!article.urlToImage) return;
        const itemClone = newsItemTemplate.content.cloneNode(true);
        fillDataInItem(itemClone, article);
        gridContainer.appendChild(itemClone);
    });
}

function fillDataInItem(itemClone, article) {
    const newsImg = itemClone.querySelector("#news-img");
    const newsTitle = itemClone.querySelector("#news-title");
    const newsSource = itemClone.querySelector("#news-source");
    const newsDesc = itemClone.querySelector("#news-desc");

    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;
    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta",
    });

    newsSource.innerHTML = `${article.source.name} · ${date}`;

    itemClone.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "_blank");
    });
}

function onNavItemClick(category) {
    const categoryMap = {
        entertainment: "entertainment",
        sports: "sports",
        tech: "technology",
        politics: "politics"
    };
    fetchNews(categoryMap[category]);
}

const searchButton = document.getElementById("search-button");
const searchInput = document.getElementById("search-input");

searchButton.addEventListener("click", () => {
    const query = searchInput.value;
    if (!query) return;
    fetchNews(query);
});
