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
  // fetch data
  const url = `https://openapi.programming-hero.com/api/phones?search=${inputText}`;

  const response = await fetch(url);
  const result = await response.json();
  // conditional checking
  if (result.status === false || inputText === "") {
    toggle("loading-spinner", "none");
    toggle("error-msg", "block");
  } else {
    displayData(result.data);
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
const detailsBtn = async (phoneId) => {
  const url = `https://openapi.programming-hero.com/api/phone/${phoneId}`;
  const response = await fetch(url);
  const result = await response.json();
  showResult(result.data);
};
// show result pop up
const showResult = (data) => {
  const {
    image,
    name,
    releaseDate,
    mainFeatures: { chipSet, displaySize, memory, storage },
    others: { Bluetooth, GPS, NFC, Radio, USB, WLAN } = {},
  } = data;
  const [
    fingerprint,
    ultrasonic,
    accelerometer,
    gyro,
    proximity,
    compass,
    barometer,
  ] = data.mainFeatures.sensors;
  // show the details pop up on the ui
  const modalContainer = document.getElementById("modal-container");
  modalContainer.innerHTML = `
     <!-- show the details -->
      <img src="${image}" alt="" class="d-block mx-auto">
      <h2 class="text-center my-4">${name} Full Specifications</h2>
      <!-- tables data -->
      <table class="table table-bordered mt-4">

  <tbody>
    <tr>
      <td>Release Date</td>
      <td>${releaseDate ? releaseDate : "No Release Date Found"}</td>
    </tr>
    <tr>
      <th>Main Feature</th>
    </tr>
    <tr>
      <td>Chipset</td>
      <td>${chipSet}</td>
    </tr>
    <tr>
      <td>Memory</td>
      <td>${memory}</td>
    </tr>
    <tr>
      <td>Storage</td>
      <td>${storage}</td>
    </tr>
     <tr>
      <td>Display</td>
      <td>${displaySize}</td>
    </tr>
    <tr>
      <td>Sensor</td>
       <td>
      ${fingerprint},${ultrasonic},${accelerometer},${gyro},${proximity},${compass},${
    barometer ? barometer : ""
  }
         
       </td>
    </tr>
     <tr>
      <th>Others</th>
    </tr>
     <tr>
      <td>Bluetooth</td>
      <td>${Bluetooth ? Bluetooth : ""}</td>
    </tr>
     <tr>
      <td>GPS</td>
      <td>${GPS ? GPS : ""}</td>
    </tr>
     <tr>
      <td>NFC</td>
      <td>${NFC ? NFC : ""}</td>
    </tr>
     <tr>
      <td>Radio</td>
      <td>${Radio ? Radio : ""}</td>
    </tr>
     <tr>
      <td>USB</td>
      <td>${USB ? USB : ""}</td>
    </tr>
     <tr>
      <td>WLAN</td>
      <td>${WLAN ? WLAN : ""}</td>
    </tr>
  </tbody>
</table>  
  `;
};
