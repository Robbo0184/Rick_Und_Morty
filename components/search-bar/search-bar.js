export function createSearchBar() {

    
    const searchBarContainer = document.querySelector(
        '[data-js="search-bar-container"]'
      );

    const form = document.createElement('form');
    form.classList.add('search-bar');
    searchBarContainer.append(form)

    const input = document.createElement('input');
    input.type = 'text';
    input.classList.add('search-bar__input');
    input.name = "query";
    input.placeholder = "search characters";
    input.ariaLabel = "character name";

    const searchBarButton = document.createElement('button');
    searchBarButton.classList.add('search-bar__button');
    searchBarButton.ariaLabel = 'search for character';

    const image = document.createElement('img')
    image.classList.add('search-bar__icon')
    image.src = 'assets/magnifying-glass.png'

    searchBarButton.append(image)
    form.append(input)
    form.append(searchBarButton)

    return form

}