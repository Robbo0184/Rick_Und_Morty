import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { CreateButton } from "./components/nav-button/nav-button.js";
import { CreatePagination } from "./components/nav-pagination/nav-pagination.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

const navigation = document.querySelector('[data-js="navigation"]');

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";
let characterId = 1;

searchBarContainer.append(createSearchBar(searchChar));

const prevButton = CreateButton("previous");
const nextButton = CreateButton("next");

const pagination = CreatePagination();
navigation.append(prevButton, pagination, nextButton);

// const cardElement = createCharacterCard(characterId);
// document.body.append(cardElement);

function searchChar(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;
  console.log(searchQuery);

  cardContainer.innerHTML = "";
  page = 1;
  fetchCharacters();
}

function searchSingleChar(event) {
  event.preventDefault();
  // characterId = event.target.elements.query.value;
  console.log("characterId before ", characterId);
  characterId = event.target.elements.query.value;
}

searchSingleChar(characterId);

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

async function fetchSingleCharacter() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log("DATA ", data);

      const card = createCharacterCard(data);
      cardContainer.append(card);

      card.addEventListener("click", () => {
        cardContainer.innerHTML = "";
        fetchSingleCharacter(characterId);
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
await fetchSingleCharacter();

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
