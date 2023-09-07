export function createCharacterCard(props) {
  const { image, name, status, type, episode } = props;

  const listItem = document.createElement("li");
  listItem.classList.add("card");
  listItem.innerHTML += `
<div class="card__image-container">
  <img
    class="card__image"
    src=${image}
    alt="alt text"
  />
  <div class="card__image-gradient"></div>
</div>
<div class="card__content">
  <h2 class="card__title">${name}</h2>
  <dl class="card__info">
    <dt class="card__info-status">${status}</dt>
    <dt class="card__info-type">${type}</dt>
    <dt class="card__info-episode">${episode.length}</dt>
  </dl>
</div>
    `;
  return listItem;
}
