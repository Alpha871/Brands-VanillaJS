const company = document.querySelector(".companies");
const productsContainer = document.querySelector(".products-container");
const searchInput = document.querySelector(".search-input");

let filtering = [...products];

const btns = ["all", ...new Set(products.map((product) => product.company))];
company.innerHTML = btns
  .map((btn) => {
    return `<button class="company-btn" data-id=${btn}>${btn}</button>`;
  })
  .join("");

const display = () => {
  if (filtering.length < 1) {
    productsContainer.innerHTML = `<h6>
        Sorry, no products matched your search
        </h6>`;
    return;
  }

  const companyItems = filtering
    .map(({ id, title, image, price }) => {
      return `
        <article class="product" data-id="${id}">
          <img
            src="${image}"
            class="product-img img"
            alt=""
          />
          <footer>
            <h5 class="product-name">${title}</h5>
            <span class="product-price">$${price}</span>
          </footer>
        </article>
    `;
    })
    .join("");

  productsContainer.innerHTML = companyItems;
};

display();

company.addEventListener("click", (e) => {
  const element = e.target;
  if (element.classList.contains("company-btn")) {
    if (element.textContent === "all") {
      filtering = [...products];
    } else {
      filtering = products.filter(
        ({ company }) => company === element.textContent
      );
    }
    searchInput.value = "";
    display();
  }
});

searchInput.addEventListener("keyup", (e) => {
  const inputValue = searchInput.value;
  filtering = products.filter(({ title }) => {
    return title.toLocaleLowerCase().includes(inputValue);
  });
  display();
});
