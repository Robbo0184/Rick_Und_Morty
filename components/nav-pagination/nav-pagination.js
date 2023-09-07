export function CreatePagination() {
  const span = document.createElement("span");
  span.classList.add(`navigation__pagination`);
  span.setAttribute("data-js", `pagination`);
  return span;
}
