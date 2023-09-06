import { createCharacterCard } from "./components/card/card.js";
import { CreateButton } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
// const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const prevButton = CreateButton("previous");
const nextButton = CreateButton("next");
navigation.append(prevButton);
navigation.append(nextButton);

searchBar.addEventListener("submit", (e) => {
  e.preventDefault();
  searchQuery = e.target.elements.query.value;
  cardContainer.innerHTML = "";
  fetchCharacters();
});

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log("DATA ", data);

      maxPage = data.info.pages;
      if (page === maxPage) {
        nextButton.disabled = true;
      } else {
        nextButton.disabled = false;
      }

      if (page === 1) {
        prevButton.disabled = true;
      } else {
        prevButton.disabled = false;
      }

      pagination.innerHTML = page + "/" + maxPage;

      data.results.forEach((element) => {
        const card = createCharacterCard(element);
        cardContainer.append(card);
      });

      return data;
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error Occurred", error);
  }
}

await fetchCharacters();

prevButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  page--;
  fetchCharacters();
});

nextButton.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  page++;

  fetchCharacters();
});
