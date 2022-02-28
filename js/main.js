// selects elements
// common function
// get element
const getElement = (elmId) => {
  return document.getElementById(elmId);
};
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
const searchBtn = () => {
  const inputText = getInputValue("search-input");
  console.log(inputText);
};
