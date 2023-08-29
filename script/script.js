"use strict";
// api link : https://openapi.programming-hero.com/api/phones?search=iphone
//  phone-card-contaner
// iphone
// samsung
// oppo

// gettig value from input field by click handler

const searchItem = () => {
  loaderFunction(true);
  const phoneBrandText = document.getElementById("search-value").value;
  const phoneBrand = phoneBrandText.toLowerCase();

  // passing this value in fetch api function
  loadPhoneDataFromApi(phoneBrand);

  // reseting input field
  document.getElementById("search-value").value = "";
};

// Fetch api

const loadPhoneDataFromApi = async (phoneBrandName) => {
  const phoneCardContainer = document.getElementById("phone-card-contaner");
  phoneCardContainer.innerHTML = "";

  // waiting to finish fetch
  const response = await fetch(
    `https://openapi.programming-hero.com/api/phones?search=${phoneBrandName}`
  );
  // converting to json also waiting to finish
  const json = await response.json();

  //   sending data to another function for proces
  displayPhones(json.data);
};

// get the parent Container for displaying data
const phoneCardContainer = document.getElementById("phone-card-contaner");

// for each method for data array

function displayPhones(data) {
  console.log(data.length);
  const showMoreContainer = document.getElementById("show-more-btn-container");
  if (data.length > 10) {
    showMoreContainer.classList.remove("hidden");
  } else {
    showMoreContainer.classList.add("hidden");
  }
  data = data.slice(0, 10);
  console.log(data);
  // passing every object to a call back function
  data.forEach(phones);
  loaderFunction(false);
}

// procesessing every object for displaying output  (Function)

const phones = (phone) => {
  const div = document.createElement("div");
  //   console.log(div);
  div.innerHTML = `

  <div>
  <div class="card w-80 md:w-auto lg:w-80 bg-base-100 shadow-2xl">
    <figure class="bg-slate-300 m-5 p-5">
      <img src='${phone.image}' alt="Phone Image"/>
    </figure>
    <div
      class="card-body flex justify-center items-center text-center"
    >
      <h2 class="card-title text-2xl font-bold">${phone.phone_name}</h2>
      <p class="max-w-[18rem] font-normal text-lg">
        If a dog chews shoes whose shoes does he choose?
      </p>
      <div
        class="card-actions justify-center flex flex-col items-center"
      >
        <h3 class="text-3xl font-bold">999</h3>
        <button
          class="bg-[#0D6EFD] w-40 h-12 font-semibold text-xl text-white rounded-xl hover:bg-green-600 "
        >
          Buy Now
        </button>
      </div>
    </div>
  </div>
</div>
  `;
  phoneCardContainer.appendChild(div);
};

const loader = document.getElementById("loader");

const loaderFunction = (state) => {
  if (state) {
    loader.classList.remove("hidden");
  } else {
    loader.classList.add("hidden");
  }
};
