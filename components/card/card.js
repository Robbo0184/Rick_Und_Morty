export function createCharacterCard() {
  const listItem = document.createElement("li");
  listItem.classList.add("card");
  listItem.innerHTML += `
<div class="card__image-container">
  <img
    class="card__image"
    src=${imgSrc}
    alt=${imgAlt}
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title">${name}</h2>
  <dl class="card__info">
    <dt class="card__info-title">${status}</dt>
    <dd class="card__info-description">Alive</dd>
    <dt class="card__info-title">${type}</dt>
    <dd class="card__info-description"></dd>
    <dt class="card__info-title">${occurrences}</dt>
    <dd class="card__info-description">51</dd>
  </dl>
</div>
    `;
  return listItem;
}
