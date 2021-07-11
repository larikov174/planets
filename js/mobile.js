"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const
    buttons = document.querySelectorAll(".mobile__button"),
    title = document.querySelector(".mobile__title"),
    text = document.querySelector(".mobile__text"),
    url = document.querySelector(".mobile__link"),
    image = document.querySelector(".mobile__image"),
    imagePointer = document.querySelector(".mobile__image-pointer");

  // --------------mobile content select-----------------
  buttons.forEach((button) => {
    button.addEventListener("touchend", () => {
      for (let item of buttons) {
        item.classList.remove("mobile__button_active");
      }
      button.classList.add("mobile__button_active");
      let index = title.dataset.id;
      let option = button.dataset.option;
      let picture = button.dataset.image;
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          button.style.borderBottomColor = json[index].color;
          text.textContent = json[index][option].content;
          url.href = json[index][option].source;
          image.style.width = json[index].images.sizeMobile;
          image.style.backgroundImage = `url(${json[index].images[picture]})`;
          imagePointer.style.backgroundImage = `url(${json[index].images.geology})`;
          imagePointer.title = json[index].name;
          imagePointer.classList.remove("mobile__image-pointer_active");
          if (button.dataset.option == "geology") {
            imagePointer.classList.add("mobile__image-pointer_active");
          }
        });
    });
  });
});
