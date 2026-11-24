const filters = document.querySelectorAll("[data-filter]");
const articles = document.querySelectorAll("[data-category]");
for (const filter of filters) {
  filter.addEventListener("click", () => {
    for (const item of filters) item.setAttribute("aria-pressed", String(item === filter));
    for (const article of articles) {
      article.hidden = filter.dataset.filter !== "all" && article.dataset.category !== filter.dataset.filter;
    }
  });
}

const search = document.querySelector("#catalog-search");
const products = document.querySelectorAll(".products article");
const status = document.querySelector("#catalog-status");
const normalize = value => value.toLocaleLowerCase("vi").normalize("NFD").replace(/\p{Diacritic}/gu, "").replaceAll("đ", "d");
search.addEventListener("input", () => {
  const query = normalize(search.value.trim());
  let matches = 0;
  for (const product of products) {
    product.hidden = !normalize(product.textContent).includes(query);
    if (!product.hidden) matches++;
  }
  status.textContent = matches ? "" : "Không tìm thấy tài nguyên phù hợp.";
});
search.form.addEventListener("submit", event => {
  event.preventDefault();
  document.querySelector("#san-pham").scrollIntoView();
});
