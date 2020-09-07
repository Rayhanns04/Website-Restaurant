const convertToRupiah = (angka) => {
  var rupiah = "";
  var angkarev = angka.toString().split("").reverse().join("");
  for (var i = 0; i < angkarev.length; i++)
    if (i % 3 == 0) rupiah += angkarev.substr(i, 3) + ".";
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
};

const promosition = () => {
  fetch("/data/data-promosition.json")
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      let cardPromo = "";
      data.map((menu) => {
        cardPromo += `<div class="card card-promo">
                <div class="animate-img">
                    <img src="${menu.gambar}" class="card-img-top img-fluid" alt="poster1">
                </div>
                <div class="card-body">
                    <h5 class="card-title">${menu.judul}</h5>
                    <p class="card-text">${menu.desc}</p>
                    <p class="card-text"><small class="text-muted"><i class="fas fa-calendar-alt"></i>${menu.date}</small></p>
                </div>
            </div>`;
      });

      const promo = document.querySelector(".card-promo-container");
      promo.innerHTML = cardPromo;
    })
    .catch((err) => {
      console.log(`Sepertinya ada yang salah dengan ${err}`);
    });
};
promosition();

const favorite = () => {
  fetch("/data/data-favorite.json")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then((data) => {
      let cardFavorite = "";
      data.map((menu) => {
        cardFavorite += `<div class="card card-favorite-item">
                <img src="${
                  menu.gambar
                }" class="card-img-top img-fluid favorite-img mx-auto d-block"
                    alt="Big Mac">
                <div class="card-body">
                    <h4 class="card-title">${menu.nama}</h4>
                    <p class="card-text">${menu.desc}</p>
                    <h4 class="card-title">${convertToRupiah(menu.harga)}</h4>
                </div>
            </div>`;
      });
      const favoriteMenu = document.querySelector(".card-favorite");
      favoriteMenu.innerHTML = cardFavorite;
    })
    .catch((error) => {
      console.error(error);
    });
};
favorite();

const breakfastMenu = () => {
  fetch("/data/data-breakfast.json")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then((data) => {
      let breakfastMenu = "";
      data.map((menu) => {
        breakfastMenu += `<div class="card card-breakfast-item">
                <img src="${
                  menu.gambar
                }" class="card-img-top img-fluid breakfast-img mx-auto d-block"
                    alt="Big Mac">
                <div class="card-body">
                    <h4 class="card-title-breakfast">${menu.nama}</h4>
                    <p class="card-text-breakfast">${menu.desc}</p>
                    <h4 class="card-title-breakfast">${convertToRupiah(
                      menu.harga
                    )}</h4>
                </div>
            </div>`;
        const semuaMenu = document.querySelector(".card-breakfast");
        semuaMenu.innerHTML = breakfastMenu;
      });
    })
    .catch((error) => {
      console.error(error);
    });
};
breakfastMenu();

// -------------------------------------- Sorting Menu --------------------------------------
const sortMenu = () => {
  const sortMenuAbjad = () => {
    fetch("/data/data-breakfast.json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        let sortByName = data.sort(compare);
        let result = "";

        // Sorting
        function compare(a, b) {
          const namaA = a.nama.toUpperCase();
          const namaB = b.nama.toUpperCase();

          let comparison = 0;
          if (namaA > namaB) {
            comparison = 1;
          } else if (namaA < namaB) {
            comparison = -1;
          }
          return comparison;
        }

        // input
        sortByName.map((menu) => {
          result += `<div class="card card-breakfast-item">
                <img src="${
                  menu.gambar
                }" class="card-img-top img-fluid breakfast-img mx-auto d-block"
                    alt="Big Mac">
                <div class="card-body">
                    <h4 class="card-title-breakfast">${menu.nama}</h4>
                    <p class="card-text-breakfast">${menu.desc}</p>
                    <h4 class="card-title-breakfast">${convertToRupiah(
                      menu.harga
                    )}</h4>
                </div>
            </div>`;

          // Render
          const btnSort = document.querySelector(".byName");
          btnSort.addEventListener("click", () => {
            const semuaSortMenu = document.querySelector(".card-breakfast");
            semuaSortMenu.innerHTML = result;
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  sortMenuAbjad();

  const sortMenuHigher = () => {
    fetch("/data/data-breakfast.json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        let sortByHigher = data.sort(compareH);
        let resultH = "";

        function compareH(a, b) {
          const hargaA = a.harga;
          const hargaB = b.harga;

          let comparison = 0;
          if (hargaA < hargaB) {
            comparison = 1;
          } else if (hargaA > hargaB) {
            comparison = -1;
          }
          return comparison;
        }

        sortByHigher.map((menu) => {
          resultH += `<div class="card card-breakfast-item">
                <img src="${
                  menu.gambar
                }" class="card-img-top img-fluid breakfast-img mx-auto d-block"
                    alt="Big Mac">
                <div class="card-body">
                    <h4 class="card-title-breakfast">${menu.nama}</h4>
                    <p class="card-text-breakfast">${menu.desc}</p>
                    <h4 class="card-title-breakfast">${convertToRupiah(
                      menu.harga
                    )}</h4>
                </div>
            </div>`;

          // Render
          const btnSortHigher = document.querySelector(".byHigher");
          btnSortHigher.addEventListener("click", () => {
            const semuaSortMenuHigher = document.querySelector(
              ".card-breakfast"
            );
            semuaSortMenuHigher.innerHTML = resultH;
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  sortMenuHigher();

  const sortMenuLower = () => {
    fetch("/data/data-breakfast.json")
      .then((response) => {
        if (response.status === 200) {
          return response.json();
        } else {
          throw new Error("Something went wrong on api server!");
        }
      })
      .then((data) => {
        let sortByLower = data.sort(compareL);
        let resultL = "";
        // console.log(data.sort(compareL));

        // Sorting
        function compareL(a, b) {
          const hargaA = a.harga;
          const hargaB = b.harga;

          let comparison = 0;
          if (hargaA > hargaB) {
            comparison = 1;
          } else if (hargaA < hargaB) {
            comparison = -1;
          }
          return comparison;
        }

        // input
        sortByLower.map((menu) => {
          resultL += `<div class="card card-breakfast-item">
                <img src="${
                  menu.gambar
                }" class="card-img-top img-fluid breakfast-img mx-auto d-block"
                    alt="Big Mac">
                <div class="card-body">
                    <h4 class="card-title-breakfast">${menu.nama}</h4>
                    <p class="card-text-breakfast">${menu.desc}</p>
                    <h4 class="card-title-breakfast">${convertToRupiah(
                      menu.harga
                    )}</h4>
                </div>
            </div>`;

          // Render
          const btnSortLower = document.querySelector(".byLower");
          btnSortLower.addEventListener("click", () => {
            const semuaSortMenuLower = document.querySelector(
              ".card-breakfast"
            );
            semuaSortMenuLower.innerHTML = resultL;
          });
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };
  sortMenuLower();
};
sortMenu();

// -------------------------------------- Akumulasi Harga -------------------------------------- //

export default convertToRupiah;
