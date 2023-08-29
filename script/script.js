"use strict";
// api link : https://openapi.programming-hero.com/api/phones?search=iphone
//  phone-card-contaner

const loadPhoneDataFromApi = async (data) => {
  const response = await fetch(
    "https://openapi.programming-hero.com/api/phones?search=iphone"
  );
  const json = await response.json();

  //   console.log(json.data);
  displayPhones(json.data);
};
const phoneCardContainer = document.getElementById("phone-card-contaner");
function displayPhones(data) {
  data.forEach(phones);
}

const phones = (phone) => {
  const div = document.createElement("div");
  //   console.log(div);
  div.innerHTML = `

  <div>
  <div class="card w-80 bg-base-100 shadow-2xl">
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

loadPhoneDataFromApi();
