"use strict";
let profileEditButton = document.querySelector(".profile__edit-button");
let popupCloseButton = document.querySelector(".popup__close-button");
let popup = document.querySelector(".popup");
let formElement = document.querySelector(".popup__form");
let profileName = document.querySelector(".profile__name");
let profileOccupancy = document.querySelector(".profile__occupancy");
let userNameInput = document.querySelector("#user_name");
let userOccupancyInput = document.querySelector("#user_occupancy");

profileEditButton.addEventListener("click", function () {
  openPopup(popup);
});
popupCloseButton.addEventListener("click", function () {
  closePopup(popup);
});

function openPopup(edidPopup) {
  edidPopup.classList.add("popup_opened");
}

function closePopup(edidPopup) {
  edidPopup.classList.remove("popup_opened");
}

userNameInput.value = profileName.textContent;
userOccupancyInput.value = profileOccupancy.textContent;

function formSubmitHandler(evt) {
  evt.preventDefault();

  let valueUserName = userNameInput.value;
  let valueUserOccupancy = userOccupancyInput.value;
  profileName.textContent = valueUserName;
  profileOccupancy.textContent = valueUserOccupancy;
  closePopup(popup);
}
formElement.addEventListener("submit", formSubmitHandler);
