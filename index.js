import { createCharacterCard } from "./components/card/card.js";

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);
const searchBar = document.querySelector('[data-js="search-bar"]');
const navigation = document.querySelector('[data-js="navigation"]');
const prevButton = document.querySelector('[data-js="button-prev"]');
const nextButton = document.querySelector('[data-js="button-next"]');
const pagination = document.querySelector('[data-js="pagination"]');

// States
let maxPage = 1;
const page = 23;
const searchQuery = "";

prevButton.addEventListener("click", () => {
  // maxPage
  console.log("prevButton is clicked");
  page--;
  fetchCharacters();
});

async function fetchCharacters() {
  try {
    const response = await fetch(

      `https://rickandmortyapi.com/api/character/?page=${page}`
    );

    if (response.ok) {
      const data = await response.json();
      console.log(data)

      maxPage = data.info.count;
      console.log("max page ", maxPage);

      data.forEach((element) => {
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

fetchCharacters();

