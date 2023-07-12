const API_KEY = '493ab6a0358d4f2a9cd03b877a2aa26b';
const url = "https://newsapi.org/v2/everything?q=";

window.addEventListener('load', () => fetchNews("India"));

async function fetchNews(query) {
    const response = await fetch(`${url}${query}&apiKey=${API_KEY}`);
    const data = await response.json();
    window.scrollTo(0, 0);
    bindData(data.articles);
}

function goHome() {
    fetchNews("india");
    currSelectedItem?.classList.remove('active');
    currSelectedItem = null;
}

function bindData(articles) {
    const cardsContainers = document.getElementById("cards-contains");
    const newsCardTemplate = document.getElementById("template-news-card");

    cardsContainers.innerHTML = '';

    articles.forEach(article => {
        if (!article.urlToImage) {
            return;
        }

        const card = newsCardTemplate.content.cloneNode(true);
        setDataInCard(card, article);
        cardsContainers.appendChild(card);
    });
}

function setDataInCard(card, article) {
    const newsImg = card.querySelector('#news-img');
    const newsTitle = card.querySelector('#news-title');
    const newsSource = card.querySelector('#news-source');
    const newsDesc = card.querySelector('#news-desc');
    newsImg.src = article.urlToImage;
    newsTitle.innerHTML = article.title;

    newsDesc.innerHTML = article.description;

    const date = new Date(article.publishedAt).toLocaleString("en-US", {
        timeZone: "Asia/Jakarta"
    });

    newsSource.innerHTML = `${article.source.name} . ${date}`;

    card.firstElementChild.addEventListener("click", () => {
        window.open(article.url, "blank_");
    });
}
let currSelectedItem = null;
function onNavItemClick(query) {
    fetchNews(query);
    const navItem = document.getElementById(query);
    currSelectedItem?.classList.remove('active');
    currSelectedItem = navItem;
    currSelectedItem?.classList.add('active');
}

const searchButton = document.getElementById("search-button");
const searchText = document.querySelector('#search-text');
searchButton.addEventListener('click', () => {
    const query = searchText.value;
    if (!query) {
        return;
    }
    fetchNews(query);
    currSelectedItem = null;
})