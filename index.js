import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { CreateButton } from "./components/nav-button/nav-button.js";
import { CreatePagination } from "./components/nav-pagination/nav-pagination.js";

import { fetchCharacters } from "./helpers/fetchAll.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

const navigation = document.querySelector('[data-js="navigation"]');
const input = document.querySelector(".search-bar__input");
// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

searchBarContainer.append(createSearchBar(searchChar));

const prevButton = CreateButton("previous");
const nextButton = CreateButton("next");
const backToResults = CreateButton("backToResults");

const pagination = CreatePagination();
navigation.append(prevButton, pagination, nextButton);

async function searchChar(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;

  cardContainer.innerHTML = "";

  page = 1;

  await fetchCharacters();
  event.target.elements.query.value = "";
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

backToResults.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  // page = 1;
  fetchCharacters();
  backToResults.hidden = true;
  prevButton.hidden = false;
  nextButton.hidden = false;
});
