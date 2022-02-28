// selects elements
const mainContainer = document.getElementById("mobile-gallary");
// common function

// get input value
const getInputValue = (inputId) => {
  const input = document.getElementById(inputId);
  const inputText = input.value;
  input.value = "";
  return inputText;
};
// show element or hide toggle
const toggle = (elmId, display) => {
  document.getElementById(elmId).style.display = display;
};
// main functionalities here
// search button
const searchBtn = async () => {
  mainContainer.textContent = "";
  toggle("loading-spinner", "block");
  toggle("error-msg", "none");
  const inputText = getInputValue("search-input");
  // fetch api
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;

  const res = await fetch(url);
  const data = await res.json();
  // conditional checking
  if (data.status === false || inputText === "") {
    toggle("loading-spinner", "none");
    toggle("error-msg", "block");
  } else {
    displayData(data.data);
  }
};
// display Data
const displayData = (phones) => {
  const mainContainer = document.getElementById("mobile-gallary");
  mainContainer.textContent = "";
  const slicePhones = phones.slice(0, 20);
  slicePhones.forEach((phone) => {
    const { image, phone_name, brand, slug } = phone;
    const div = document.createElement("div");
    div.classList.add("col");
    div.innerHTML = `
        <div class="card h-100 py-3">
                <img src="${image}" class="d-block mx-auto pt-5 " alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Name : ${phone_name}</h5>
                  <p class="card-text">Brand : ${brand} </p>
                  <button class="btn btn-success" data-bs-toggle="modal"
                  data-bs-target="#exampleModal" onclick="detailsBtn('${slug}')">More Details</button>
                </div>
              </div>
        `;
    mainContainer.appendChild(div);
  });
  toggle("loading-spinner", "none");
};

// details btn
const detailsBtn = (phoneId) => {
  console.log(phoneId);
};
