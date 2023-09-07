

export function notFound() {
  const notFoundDisplayText = document.createElement('main')
  const errorImage = "https://as2.ftcdn.net/v2/jpg/03/38/66/77/1000_F_338667730_zjFA72PFPu7dDvj5uf3mCADlgiOic0FR.jpg"
  notFoundDisplayText.innerHTML =
    `   
   <img
   
   src=${errorImage}
   alt="alt text"
 />
      <nav class="navigation" data-js="navigation">
        <span class="navigation__pagination" data-js="pagination"></span>
      </nav>
   `
  return notFoundDisplayText
}