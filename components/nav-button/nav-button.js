export function CreateButton(buttonText) {
  const button = document.createElement("button");

  button.classList.add(`button`);
  button.classList.add(`button--${buttonText}`);
  //   button.setAttribute("data-js", `button-${buttonText}`);
  button.textContent = `${buttonText}`;

  return button;
}
