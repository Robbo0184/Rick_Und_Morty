import { createCharacterCard } from "./components/card/card.js";
import { createSearchBar } from "./components/search-bar/search-bar.js";
import { CreateButton } from "./components/nav-button/nav-button.js";
import { CreatePagination } from "./components/nav-pagination/nav-pagination.js";

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

function searchChar(event) {
  event.preventDefault();
  searchQuery = event.target.elements.query.value;

  cardContainer.innerHTML = "";

  page = 1;
  fetchCharacters();
  event.target.elements.query.value = "";
}

async function fetchCharacters() {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/?page=${page}&name=${searchQuery}`
    );

    if (response.ok) {
      const data = await response.json();
      // console.log("DATA ", data);

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
        let characterId = element.id;

        card.onclick = () => fetchSingleCharacter(characterId);
      });
      return data;
    } else if (!response.ok) {
      Toastify({
        text: "No matches",
        // className: "info",
        className: "error",
        style: {
          // background: "linear-gradient(to right, #00b09b, #96c93d)",
          backgroundColor: "red",
        },
      }).showToast();
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error Occurred", error);
  }
}

async function fetchSingleCharacter(characterId) {
  try {
    const response = await fetch(
      `https://rickandmortyapi.com/api/character/${characterId}`
    );

    if (response.ok) {
      const data = await response.json();

      cardContainer.innerHTML = "";
      const singleCardEl = createCharacterCard(data);
      cardContainer.append(singleCardEl);

      prevButton.hidden = true;
      nextButton.hidden = true;
      pagination.innerHTML = "";

      navigation.append(backToResults);
      backToResults.hidden = false;

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

backToResults.addEventListener("click", () => {
  cardContainer.innerHTML = "";
  // page = 1;
  fetchCharacters();
  backToResults.hidden = true;
  prevButton.hidden = false;
  nextButton.hidden = false;
});
