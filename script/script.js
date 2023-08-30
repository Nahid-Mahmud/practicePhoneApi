"use strict";
// api link : https://openapi.programming-hero.com/api/phones?search=iphone
//  phone-card-contaner
// iphone
// samsung
// oppo

// gettig value from input field by click handler

const searchItem = (showAll) => {
  loaderFunction(true);
  const phoneBrandText = document.getElementById("search-value").value;
  const phoneBrand = phoneBrandText.toLowerCase();

  // passing this value in fetch api function
  loadPhoneDataFromApi(phoneBrand, showAll);

  // reseting input field
  // document.getElementById("search-value").value = "";
};

// Fetch api

const loadPhoneDataFromApi = async (phoneBrandName, showAll) => {
  const phoneCardContainer = document.getElementById("phone-card-contaner");
  phoneCardContainer.innerHTML = "";

  // waiting to finish fetch
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneBrandName}`
  );
  // converting to json also waiting to finish
  const json = await response.json();

  //   sending data to another function for proces
  displayPhones(json.data, showAll);
};

// get the parent Container for displaying data
const phoneCardContainer = document.getElementById("phone-card-contaner");

// for each method for data array

function displayPhones(data, showAll) {
  // console.log(data.length);
  const showMoreContainer = document.getElementById("show-more-btn-container");
  // Problem understanding
  // console.log(showAll);
  if (data.length > 10 && !showAll) {
    // console.log("if in");
    showMoreContainer.classList.remove("hidden");
  } else {
    // console.log("else in");
    showMoreContainer.classList.add("hidden");
  }
  // console.log(showAll, "is show all");
  // display 10 phones
  if (!showAll) {
    data = data.slice(0, 10);
  } else if (showAll) {
    data = data.slice(0, data.length);
  }

  // console.log(data, "Array");
  // passing every object to a call back function
  data.forEach(phones);
  loaderFunction(false);
}

// procesessing every object for displaying output  (Function)

const phones = (phone) => {
  // console.log(phone?.slug);
  const div = document.createElement("div");
  //   console.log(div);
  div.innerHTML = `

  <div>
  <div class="card w-80 md:w-auto lg:w-80 bg-base-100 shadow-2xl">
    <figure class="bg-slate-300 m-5 p-5">
      <img src='${phone?.image}' alt="Phone Image"/>
    </figure>
    <div
      class="card-body flex justify-center items-center text-center"
    >
      <h2 class="card-title text-2xl font-bold">${phone?.phone_name}</h2>
      <p class="max-w-[18rem] font-normal text-lg">
        If a dog chews shoes whose shoes does he choose?
      </p>
      <div
        class="card-actions justify-center flex flex-col items-center"
      >
        <h3 class="text-3xl font-bold">999</h3>
        <button  onclick ="handleShowDetailButton('${phone?.slug}')"
          class="bg-[#0D6EFD] w-40 h-12 font-semibold text-xl text-white rounded-xl hover:bg-green-600 "
        >
          Show Details
        </button>
      </div>
    </div>
  </div>
</div>
  `;
  phoneCardContainer.appendChild(div);
  // document.getElementById("search-value").value = "";
};

const loader = document.getElementById("loader");

const loaderFunction = (state) => {
  if (state) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};

// show more
const showMore = () => {
  searchItem(true);
};

//show details functionality

const showDetailApi = async (id) => {
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phone/${id}`
  );
  const data = await response.json();
  // console.log(data.data.mainFeatures);
  showDetailInBrowser(data.data);
};

const handleShowDetailButton = (id) => {
  // console.log(`phone id  from handleShowDetailButton : ${id}`);
  showDetailApi(id);
};

const showDetailInBrowser = (data) => {
  // console.log("main data", data);
  const modalContainer = document.getElementById("modal-container");
  // console.log(modalContainer);
  modalContainer.innerHTML = `
  <dialog
  id="show_details_modal"
  class="modal modal-bottom sm:modal-middle"
>
  <form method="dialog" class="modal-box text-left">
    <div class="flex justify-center">
      <img id="modal-image" src= ${data?.image} alt="" />
    </div>
    <h3 id="modal-product-name" class="font-bold text-lg">Name : ${data?.name}</h3>
    <p id="display-size" class="p-1">Display size : ${data?.mainFeatures?.displaySize}</p>
    <p id="chipset" class="p-1">Chipset : ${data?.mainFeatures.chipSet}</p>
    <p id="memory" class="p-1">Memory : ${data?.mainFeatures?.memory} </p>
    <p id="release-data" class="p-1">Release Date : ${data?.releaseDate} </p>
    <p id="brand" class="p-1">Brand : ${data?.brand}</p>
    <div class="modal-action">
      <!-- if there is a button in form, it will close the modal -->
      <button class="btn">Close</button>
    </div>
  </form>
</dialog>
  
  
  `;
  // console.log("SEP data", data.brand);
  show_details_modal.showModal();
};

// showDetail();
