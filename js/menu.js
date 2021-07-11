"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const
    menuIcon = document.querySelector(".menu__icon"),
    menu = document.querySelector(".menu"),
    menuItem = menu.querySelectorAll(".menu__item"),
    buttons = document.querySelectorAll(".mobile__button"),
    firstBtn = document.querySelector('[data-option="overview"]'),
    imagePointer = document.querySelector(".mobile__image-pointer"),
    title = document.querySelector(".mobile__title"),
    text = document.querySelector(".mobile__text"),
    url = document.querySelector(".mobile__link"),
    image = document.querySelector(".mobile__image"),
    cards = document.querySelector(".cards");
  let index = 0;

  // --------------menu show/hide-----------------
  menuIcon.addEventListener("touchend", () => {
    menu.classList.toggle("menu_show");
    if (menu.classList.contains("menu_show")) {
      menuIcon.style.opacity = "0.5";
    } else {
      menuIcon.style.opacity = "1";
    }
    for (let button of buttons) {
      button.classList.remove("mobile__button_active");
    }
  });

  // --------------menu item select-----------------
  menuItem.forEach((item) => {
    item.addEventListener("touchend", () => {
      index = item.childNodes[3].dataset.id;
      title.dataset.id = index;
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          title.textContent = json[index].name;
          text.textContent = json[index].overview.content;
          url.href = json[index].overview.source;
          image.style.width = json[index].images.sizeMobile;
          image.style.backgroundImage = `url(${json[index].images.planet})`;
          image.title = json[index].name;
          cards.childNodes[1].childNodes[3].textContent = json[index].rotation;
          cards.childNodes[3].childNodes[3].textContent = json[index].revolution;
          cards.childNodes[5].childNodes[3].textContent = json[index].radius;
          cards.childNodes[7].childNodes[3].textContent = json[index].temperature;
          firstBtn.style.borderBottomColor = json[index].color;
        });
      firstBtn.classList.add("mobile__button_active");
      imagePointer.classList.remove("mobile__image-pointer_active");
      menu.classList.remove("menu_show");
      menuIcon.style.opacity = "1";
    });
  });
});
