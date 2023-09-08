export async function fetchSingleCharacter(characterId) {
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
