const cartItems = [];

const scrollToAbout = () => {
  document.querySelector(`#About`).scrollIntoView({ behavior: "smooth" });
};

const scrollToGallery = () => {
  document.querySelector(`#Gallery`).scrollIntoView({ behavior: "smooth" });
};

const scrollToImpact = () => {
  document.querySelector(`#Impact`).scrollIntoView({ behavior: "smooth" });
};

const scrollToPlantTree = () => {
  document.querySelector(`#PlantTree`).scrollIntoView({ behavior: "smooth" });
};

document.querySelector(`#Cart_Button`).addEventListener(`click`, () => {
  document.querySelector(`#Cart_Drawer`).click();
});

const loadCategories = async () => {
  let res = await fetch(`https://openapi.programming-hero.com/api/categories`);
  let data = await res.json();
  displayCategories(data.categories);
};

const displayCategories = (data) => {
  let container = document.querySelector(`#Categories_Container`);
  container.innerHTML += `
    <li onclick="loadAllPlants()">
      <a 
        id="All_Tree"
        class="category-btn block px-5 py-2 rounded-3xl transition-all cursor-pointer hover:bg-[#15803d] active:bg-[#15803d] hover:text-white"
        >All Trees</a
      >
    </li>
  `;
  let menuContainer = document.querySelector(`#Categories_Container_Menu`);
  menuContainer.innerHTML += `
    <li onclick="loadAllPlants()">
      <a
        class="category-btn block px-3 py-1.5 rounded-3xl transition-all cursor-pointer bg-[#15803d] text-white active:bg-[#15803d] active:text-white"
        ><i class="fa-solid fa-arrow-right rotate-315"></i> All
        Trees</a
      >
    </li>
  `;
  data.forEach((element) => {
    container.innerHTML += `
      <li onclick="loadPlants(${element.id})">
        <a
          class="category-btn block px-5 py-2 rounded-3xl transition-all cursor-pointer hover:bg-[#15803d] active:bg-[#15803d] hover:text-white"
          >${element.category_name}</a
        >
      </li>
    `;
    menuContainer.innerHTML += `
      <li onclick="loadPlants(${element.id})">
        <a
          class="category-btn block px-3 py-1.5 rounded-3xl transition-all cursor-pointer active:bg-[#15803d] active:text-white"
          ><i class="fa-solid fa-arrow-right rotate-315"></i> ${element.category_name}</a
        >
      </li>
    `;
  });
  document.querySelector(`#All_Tree`).click();
};

loadCategories();

const loadAllPlants = async () => {
  let container = document.querySelector(`#Card_Container`);
  container.innerHTML = `
    <div
      class="h-[300px] sm:h-[500px] flex justify-center items-center col-span-3"
    >
      <span class="loading loading-dots loading-xl"></span>
    </div>
  `;
  let res = await fetch(`https://openapi.programming-hero.com/api/plants`);
  let data = await res.json();
  displayPlants(data.plants);
};

const loadPlants = async (id) => {
  let container = document.querySelector(`#Card_Container`);
  container.innerHTML = `
    <div
      class="h-[300px] sm:h-[500px] flex justify-center items-center col-span-3"
    >
      <span class="loading loading-dots loading-xl"></span>
    </div>
  `;
  let res = await fetch(
    `https://openapi.programming-hero.com/api/category/${id}`
  );
  let data = await res.json();
  displayPlants(data.plants);
};

const displayPlants = (data) => {
  let container = document.querySelector(`#Card_Container`);
  container.innerHTML = ``;
  data.forEach((element) => {
    container.innerHTML += `
      <div class="card bg-white rounded-3xl shadow-sm">
        <figure>
          <img
            class="h-[230px] w-full object-cover"
            src="${element.image}"
            alt=""
          />
        </figure>
        <div class="card-body">
          <h3
            onclick="displayModal(${element.id})"
            class="text-lg font-bold cursor-pointer"
          >${element.name}</h3>
          <p>${element.description.slice(0, 50)}...</p>
          <div class="my-1.5 flex justify-between items-center">
            <h5
              class="text-[#15803d] bg-[#dcfce7] px-3 py-1 text-[13px] rounded-2xl"
            >
              ${element.category}
            </h5>
            <h3 class="font-semibold text-lg">৳<span>${
              element.price
            }</span></h3>
          </div>
          <button
            class="add-to-cart-btn btn py-5 rounded-3xl bg-[#15803d] text-white hover:bg-[#1F9A4C] active:bg-[#116533]"
          >
            Add to Cart
          </button>
        </div>
      </div>
    `;
  });
};

const displayModal = async (id) => {
  let res = await fetch(`https://openapi.programming-hero.com/api/plant/${id}`);
  let data = await res.json();
  let modalContainer = document.querySelector(`#Modal_Content`);
  modalContainer.innerHTML = `
    <h1 class="text-xl font-bold">${data.plants.name}</h1>
    <img
      class="h-[230px] w-full object-cover rounded-xl sm:h-[350px]"
      src="${data.plants.image}"
      alt=""
    />
    <h5>
      <span class="font-semibold">Category :</span>
      <span>${data.plants.category}</span>
    </h5>
    <h3>
      <span class="font-semibold">Price :</span> ৳<span>${data.plants.price}</span>
    </h3>
    <p class="text-justify">
      <span class="font-semibold">Description :</span>
      <span
        >${data.plants.description}</span
      >
    </p>
  `;
  Tree_Info_Modal.showModal();
};

document
  .querySelector(`#Categories_Container`)
  .addEventListener(`click`, (event) => {
    const btnList = document.querySelectorAll(
      `#Categories_Container .category-btn`
    );
    btnList.forEach((element) => {
      element.classList.remove(`bg-[#15803d]`, `text-white`);
    });
    if (event.target.classList.contains(`category-btn`)) {
      event.target.classList.add(`bg-[#15803d]`, `text-white`);
    }
  });

document
  .querySelector(`#Categories_Container_Menu`)
  .addEventListener(`click`, (event) => {
    const btnList = document.querySelectorAll(
      `#Categories_Container_Menu .category-btn`
    );
    btnList.forEach((element) => {
      element.classList.remove(`bg-[#15803d]`, `text-white`);
    });
    if (event.target.classList.contains(`category-btn`)) {
      event.target.classList.add(`bg-[#15803d]`, `text-white`);
    }
  });

document.querySelector(`#Card_Container`).addEventListener(`click`, (event) => {
  if (event.target.classList.contains(`add-to-cart-btn`)) {
    let name = event.target.parentElement.querySelector(`h3`).textContent;
    let price = event.target.parentElement
      .querySelector(`div`)
      .querySelector(`h3`)
      .querySelector(`span`).textContent;
    let quantity = 1;
    let item = { name, price, quantity };
    let index = cartItems.findIndex((item) => item.name === name);
    if (index !== -1) {
      cartItems[index].quantity++;
    } else {
      cartItems.push(item);
    }
    displayCartItem(`#Cart_Container`);
    displayCartItem(`#Cart_Container_Menu`);
  }
});

const displayCartItem = (parent) => {
  let container = document.querySelector(parent);
  container.innerHTML = ``;
  if (cartItems.length === 0) {
    container.innerHTML = `
      <p class="text-center my-10 text-[15px]">
        No items in your cart yet.
      </p>
    `;
    document.querySelector(`#Item_Count`).textContent = 0;
    return;
  }
  let totalprice = 0;
  cartItems.forEach((element) => {
    container.innerHTML += `
      <div
        class="bg-[#f0fdf4] mb-3 p-3 rounded-xl flex justify-between items-center"
      >
        <div>
          <h5 class="font-medium">${element.name}</h5>
          <p class="text-[#8C8C8C]">
            <span>${element.price}</span> X <span>${element.quantity}</span>
          </p>
        </div>
        <i class="delete-cart fa-solid fa-xmark text-red-500 cursor-pointer"></i>
      </div>
    `;
    totalprice += element.price * element.quantity;
  });
  container.innerHTML += `
    <div
      class="flex justify-between pt-1.5 border-t-1 border-[#8C8C8C]"
    >
      <p>Total :</p>
      <p>৳${totalprice}</p>
    </div>
  `;
  document.querySelector(`#Item_Count`).textContent = cartItems.length;
};

document
  .querySelector(`#Cart_Container_Menu`)
  .addEventListener(`click`, (event) => {
    if (event.target.classList.contains(`delete-cart`)) {
      const name = event.target.parentElement
        .querySelector(`div`)
        .querySelector(`h5`).textContent;
      const index = cartItems.findIndex((item) => item.name === name);
      cartItems.splice(index, 1);
      displayCartItem(`#Cart_Container_Menu`);
      displayCartItem(`#Cart_Container`);
    }
  });

document.querySelector(`#Cart_Container`).addEventListener(`click`, (event) => {
  if (event.target.classList.contains(`delete-cart`)) {
    const name = event.target.parentElement
      .querySelector(`div`)
      .querySelector(`h5`).textContent;
    const index = cartItems.findIndex((item) => item.name === name);
    cartItems.splice(index, 1);
    displayCartItem(`#Cart_Container_Menu`);
    displayCartItem(`#Cart_Container`);
  }
});