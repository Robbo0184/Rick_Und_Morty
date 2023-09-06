import { createCharacterCard } from "./components/card/card.js";

import { createSearchBar } from "./components/search-bar/search-bar.js";
import { CreateButton } from "./components/nav-button/nav-button.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
// const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
// const prevButton = document.querySelector('[data-js="button-prev"]');
// const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

searchBarContainer.append(createSearchBar(searchChar));

const prevButton = CreateButton("previous");
const nextButton = CreateButton("next");
navigation.append(prevButton);
navigation.append(nextButton);

function searchChar(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  console.log(searchQuery);

  cardContainer.innerHTML = "";
  fetchCharacters();
}

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();

      maxPage = data.info.pages;

      page === maxPage
        ? (nextButton.disabled = true)
        : (nextButton.disabled = false);

      page === 1 ? (prevButton.disabled = true) : (prevButton.disabled = false);

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
