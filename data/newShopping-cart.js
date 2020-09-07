const shoppingCart = () => {
  fetch("/data/shopping-cart.json")
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error("Something went wrong on api server!");
      }
    })
    .then((data) => {
      let menu = "";

      data.forEach((order) => {
        menu += `
              <div class="shopping-cart">
              <div class="cart">
                <img src="/img/Shopping cart/Big Mac.svg" alt="Big Mac" />
                <h3>${order.nama}</h3>
                <!-- Input -->
                <div class="input-field">
                  <button class="minus">
                    <img
                      src="/img/Shopping cart/minus-square-white.svg"
                      alt="minus"
                    />
                  </button>
                  <input
                    id="jumlah"
                    name="jumlah"
                    type="number"
                    value="1"
                    min="0"
                  />
                  <button class="plus">
                    <img
                      src="/img/Shopping cart/plus-square-white.svg"
                      alt="plus"
                    />
                  </button>
                </div>
                <h3 class="harga-card">${order.harga}</h3>
              </div>
              <div class="delete-card">
                <button class="remove">
                  <img src="/img/delete-bin-line.svg" alt="delete" />
                </button>
              </div>
            </div>`;
        const section = document.querySelector(".card");
        section.innerHTML = menu;
      });

      let sum = data.reduce((accumulator, curentvalue) => {
        return accumulator + curentvalue.harga;
      }, 0);

      const totalHarga = document.querySelector(".total-harga");
      totalHarga.innerHTML = sum;
    })
    .catch((error) => {
      console.error(error);
    });
};
shoppingCart();
