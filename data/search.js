import convertToRupiah from "../data/data-source.js";

const search = document.querySelector("#search-input");
const cardContainer = document.querySelector(".card-searchMenu");

// Search breakfast.json and filter it
const searchMenu = async (searchText) => {
  try {
    const res = await fetch("/data/data-breakfast.json");
    const menus = await res.json();

    // Get matches to current text input
    let matches = menus.filter((menu) => {
      const regex = new RegExp(`^${searchText}`, `gi`);
      return menu.nama.match(regex);
    });

    if (searchText.lenght === 0) {
      matches = [];
    }
    outputHTML(matches);
  } catch (error) {
    console.error(error);
  }
};

const outputHTML = (matches) => {
  let html = "";
  matches.map((match) => {
    html += `<div class="card card-searchMenu-item">
            <img src="${
              match.gambar
            }" class="card-img-top img-fluid searchMenu-img mx-auto d-block"
                alt="Big Mac">
            <div class="card-body">
                <h4 class="card-title-searchMenu">${match.nama}</h4>
                <p class="card-text-searchMenu">${match.desc}</p>
                <h4 class="card-title-searchMenu">${convertToRupiah(
                  match.harga
                )}</h4>
            </div>
        </div>`;
  });
  cardContainer.innerHTML = html;
};

search.addEventListener("input", () => searchMenu(search.value));
