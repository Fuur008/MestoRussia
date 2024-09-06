"use strict";
const body = document.querySelector("body");
const profileEditButton = document.querySelector(".profile__edit-button");
const imageEditButton = document.querySelector(".profile__image-button");
const addCardButton = document.querySelector(".profile__add-button");
const popupEditProfileImage = document.querySelector(
  ".popup__edit-profile_image"
);
const popupEditProfileImageCloseButton = popupEditProfileImage.querySelector(
  ".popup__close-button"
);
const formEditProfileImage =
  popupEditProfileImage.querySelector(".popup__form");
const imageAddressInput = popupEditProfileImage.querySelector(
  ".popup__input-address"
);
const popupEditProfile = document.querySelector(".popup__edit-profile");
const profileName = document.querySelector(".profile__name");
const profileOccupancy = document.querySelector(".profile__occupancy");
const popupEditProfileCloseButton = popupEditProfile.querySelector(
  ".popup__close-button"
);
const formEditProfile = popupEditProfile.querySelector(".popup__form");
const userNameInput = popupEditProfile.querySelector(".popup__input_name");
const userOccupancyInput = popupEditProfile.querySelector(
  ".popup__input_occupancy"
);
const cards = document.querySelector(".elements");
const popupImage = document.querySelector(".popup__full-image");
const popupCloseImageButton = popupImage.querySelector(".popup__close-button");
const popupAddCard = document.querySelector(".popup__add-card");
const popupAddCardCloseButton = popupAddCard.querySelector(
  ".popup__close-button"
);
const formAddCard = popupAddCard.querySelector(".popup__form_add-card");
const inputAddressFormAddCard = formAddCard.querySelector(
  ".popup__input-address"
);
const inputHeadingFormAddCard = formAddCard.querySelector(
  ".popup__input-heading"
);
const popupClose = document.querySelector(".popup");
const cardsArr = [];

function openPopup(edidPopup) {
  edidPopup.classList.add("popup_opened");
}

function closePopup(edidPopup) {
  edidPopup.classList.remove("popup_opened");
}

imageEditButton.addEventListener("click", function () {
  openPopup(popupEditProfileImage);
});
profileEditButton.addEventListener("click", function () {
  openPopup(popupEditProfile);
});
addCardButton.addEventListener("click", function () {
  openPopup(popupAddCard);
});

popupEditProfileCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfile);
});

popupEditProfileImageCloseButton.addEventListener("click", function () {
  closePopup(popupEditProfileImage);
});
popupAddCardCloseButton.addEventListener("click", function () {
  closePopup(popupAddCard);
});

userNameInput.value = profileName.textContent;
userOccupancyInput.value = profileOccupancy.textContent;

function formEditProfileSubmitHandler(evt) {
  evt.preventDefault();

  const valueUserName = userNameInput.value;
  const valueUserOccupancy = userOccupancyInput.value;
  profileName.textContent = valueUserName;
  profileOccupancy.textContent = valueUserOccupancy;
  closePopup(popupEditProfile);
  userNameInput.value = "";
  userOccupancyInput.value = "";
}

formEditProfile.addEventListener("submit", formEditProfileSubmitHandler);
const imageAddProfileButton =
  popupEditProfileImage.querySelector(".popup__input-file");
imageAddProfileButton.addEventListener("change", () => {
  let file = imageAddProfileButton.files[0];
  imageAddressInput.value = file.name;
});
function formEditProfileImageSubmitHandler(evt) {
  evt.preventDefault();
  const imageValue =
    popupEditProfileImage.querySelector(".popup__input-file").files[0];
  const profileImage = imageAddressInput.value;
  const reader = new FileReader();

  if (profileImage.includes("http")) {
    imageEditButton.style.backgroundImage = `url(${profileImage})`;
  } else {
    reader.addEventListener(
      "load",
      () => {
        imageEditButton.style.backgroundImage = `url(${reader.result})`;
      },
      false
    );

    if (imageValue) {
      reader.readAsDataURL(imageValue);
    }
  }
  closePopup(popupEditProfileImage);
  imageAddressInput.value = "";
}

formEditProfileImage.addEventListener(
  "submit",
  formEditProfileImageSubmitHandler
);

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

function createCard(card) {
  const newCard = document
    .querySelector(".template__card")
    .content.cloneNode(true);
  const cardTitle = newCard.querySelector(".element__place-name");
  cardTitle.textContent = card.name;
  const cardImage = newCard.querySelector(".element__image");
  cardImage.setAttribute("src", card.link);
  cardImage.setAttribute("alt", `${card.name}`);

  function addId(i) {
    for (i; i < cardsArr.length; i++) {}
    return i;
  }
  cardImage.setAttribute("id", addId(0));
  const cardLikeButton = newCard.querySelector(".element__like-button");
  const likesCounter = newCard.querySelector(".element__likes");
  let counter = 0;
  cardLikeButton.addEventListener("click", (event) => {
    if (event.target.classList.contains("element__like-button_active")) {
      event.target.classList.remove("element__like-button_active");
      render(--counter, likesCounter);
    } else {
      event.target.classList.add("element__like-button_active");
      render(++counter, likesCounter);
    }
    if (counter === 0) {
      likesCounter.classList.add("element__likes_zero");
    } else {
      likesCounter.classList.remove("element__likes_zero");
    }
  });
  const render = (counter, likesCounter) => (likesCounter.innerText = counter);
  const removeCardButton = newCard.querySelector(".element__delete-button");
  removeCardButton.addEventListener("click", (event) => {
    const button = event.target;
    const card = button.closest(".element");
    const cardImages = card.querySelector(".element__image");
    const id = cardImages.getAttribute("id");
    card.remove();
    cardsArr.splice(id, 1);
    const allImages = document.querySelectorAll(".element__image");
    let i = 0;
    allImages.forEach((item) => {
      i++;
      item.setAttribute("id", i - 1);
    });
  });
  const image = popupImage.querySelector(".popup__image");
  const heading = popupImage.querySelector(".popup__heading");
  cardImage.addEventListener("click", (event) => {
    image.setAttribute("src", event.target.getAttribute("src"));
    heading.textContent = cardImage.getAttribute("alt");
    openPopup(popupImage);
    let currentSlide = event.target.getAttribute("id");
    const slideCount = cardsArr.length;
    const nextImageButton = document.querySelector(".popup__slide-image_right");
    function updateSlider() {
      if (currentSlide == slideCount - 1) {
        nextImageButton.classList.add("popup__slide-image_right-dis");
      } else {
        nextImageButton.classList.remove("popup__slide-image_right-dis");
      }
      if (currentSlide == 0) {
        prevImageButton.classList.add("popup__slide-image_left-dis");
      } else {
        prevImageButton.classList.remove("popup__slide-image_left-dis");
      }
    }
    nextImageButton.addEventListener("click", () => {
      if (currentSlide < slideCount - 1) {
        currentSlide++;
        updateSlider();
      }
      image.setAttribute("src", cardsArr[currentSlide].link);
      heading.textContent = cardsArr[currentSlide].name;
    });
    const prevImageButton = document.querySelector(".popup__slide-image_left");
    prevImageButton.addEventListener("click", () => {
      if (currentSlide > 0) {
        currentSlide--;
        updateSlider();
      }
      image.setAttribute("src", cardsArr[currentSlide].link);
      heading.textContent = cardsArr[currentSlide].name;
    });
    body.addEventListener("keydown", function (evt) {
      if (evt.key === "ArrowLeft" && currentSlide > 0) {
        currentSlide--;
        updateSlider();
      } else if (evt.key === "ArrowRight" && currentSlide < slideCount - 1) {
        currentSlide++;
        updateSlider();
      }
      image.setAttribute("src", cardsArr[currentSlide].link);
      heading.textContent = cardsArr[currentSlide].name;
    });

    let touchstartX = 0;
    let touchendX = 0;
    function checkDirection() {
      let left = touchendX < touchstartX;
      let right = touchendX > touchstartX;
      if (left && currentSlide < slideCount - 1) {
        currentSlide++;
      } else if (right && currentSlide > 0) {
        currentSlide--;
      }
      image.setAttribute("src", cardsArr[currentSlide].link);
      heading.textContent = cardsArr[currentSlide].name;
    }

    popupImage.addEventListener("touchstart", (e) => {
      touchstartX = e.changedTouches[0].screenX;
    });

    popupImage.addEventListener("touchend", (e) => {
      touchendX = e.changedTouches[0].screenX;
      checkDirection();
    });
    updateSlider();
  });
  popupCloseImageButton.addEventListener("click", () => {
    closePopup(popupImage);
  });
  popupImage.onclick = function (e) {
    const target = e.target.classList.contains("popup");
    if (target === true) {
      closePopup(popupImage);
    }
  };
  cards.append(newCard);
  cardsArr.push(card);
}

initialCards.forEach(createCard);

formAddCard.addEventListener("submit", handleSubmitFormAddCard);

const imageValue = formAddCard.querySelector(".popup__input-file");
imageValue.addEventListener("change", () => {
  let file = imageValue.files[0];
  inputAddressFormAddCard.value = file.name;
});
function handleSubmitFormAddCard(event) {
  event.preventDefault();
  const image = inputAddressFormAddCard.value;
  const headind = inputHeadingFormAddCard.value;
  const card = {
    link: image,
    name: headind,
  };
  const reader = new FileReader();
  if (image.includes("http")) {
    createCard(card);
  }
  if (image.includes("http") === false) {
    reader.addEventListener(
      "load",
      () => {
        const image = reader.result;
        const card = {
          link: image,
          name: `${headind}`,
        };
        createCard(card);
      },
      false
    );
    if (imageValue.files[0]) {
      reader.readAsDataURL(imageValue.files[0]);
    }
  }
  closePopup(popupAddCard);
  inputAddressFormAddCard.value = "";
  inputHeadingFormAddCard.value = "";
  imageValue.value = "";
}
