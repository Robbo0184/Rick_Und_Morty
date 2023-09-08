// import { createCharacterCard } from "./components/card/card.js";
// import { createSearchBar } from "./components/search-bar/search-bar.js";
// import { CreateButton } from "./components/nav-button/nav-button.js";
// import { CreatePagination } from "./components/nav-pagination/nav-pagination.js";

import { createCharacterCard } from "../components/card/card.js";
import { CreateButton } from "../components/nav-button/nav-button.js";
import { CreatePagination } from "../components/nav-pagination/nav-pagination.js";

const navigation = document.querySelector('[data-js="navigation"]');

const cardContainer = document.querySelector('[data-js="card-container"]');
const searchBarContainer = document.querySelector(
  '[data-js="search-bar-container"]'
);

// States
let maxPage = 1;
let page = 1;
let searchQuery = "";

const prevButton = CreateButton("previous");
const nextButton = CreateButton("next");
const backToResults = CreateButton("backToResults");

const pagination = CreatePagination();
navigation.append(prevButton, pagination, nextButton);

export async function fetchCharacters() {
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
      // navigation.innerHTML = ""
      // document.body.append(notFoundPage)
      cardContainer.textContent = "Request not found.....";

      Toastify({
        text: "No matching results found",
        className: "error",
        style: {
          background: "linear-gradient(to right, #ff5f6d, #ffc371)",
          height: "50px",
          width: "50%",
        },
      }).showToast();
    } else {
      console.error("Bad Response");
    }
  } catch (error) {
    console.error("An Error Occurred", error);
  }
}
