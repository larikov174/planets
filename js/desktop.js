"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const
    buttons = document.querySelectorAll(".main__button"),
    firstBtn = document.querySelector('[data-name="overview"]'),
    planets = document.querySelectorAll(".header__link"),
    activeLink = document.querySelector(".header__link_active"),
    title = document.querySelector(".main__title"),
    text = document.querySelector(".main__text"),
    url = document.querySelector(".main__link"),
    image = document.querySelector(".main__image"),
    imagePointer = document.querySelector(".main__image-pointer"),
    cards = document.querySelector(".cards");

  let index = 0;

  activeLink.style.borderColor = "#419EBB"; //active link color set

  function btnStatusChange() {
    for (let button of buttons) {
      button.classList.remove("main__button_active");
      button.classList.add("main__button_hover");
      button.style.backgroundColor = ""; //inline styles remove
    }
  }

  function headerLinksStatusChange() {
    for (let planet of planets) {
      planet.classList.remove("header__link_active");
    }
  }

  function imageSize() {
    let index = title.dataset.id;
    fetch("data.json")
      .then((Response) => Response.json())
      .then((json) => {
        if (document.documentElement.clientWidth <= 900) {
          image.style.width = json[index].images.sizeTablet;
          image.style.height = json[index].images.sizeTablet;
        } else {
          image.style.width = json[index].images.sizeDesktop;
          image.style.height = json[index].images.sizeDesktop;
        }
      });
  }
  imageSize();

  // -----------header interaction--------------
  planets.forEach((planet) => {
    planet.addEventListener("mouseup", () => {
      //---------setting default active/hover state----
      btnStatusChange();
      firstBtn.classList.add("main__button_active");
      firstBtn.classList.toggle("main__button_hover");
      headerLinksStatusChange();
      planet.classList.add("header__link_active");
      imagePointer.classList.remove("main__image-pointer_active");
      index = planet.dataset.id;
      fetch("data.json")
      .then((Response) => Response.json())
      .then((json) => {
        planet.style.borderColor = json[index].color;
          firstBtn.style.backgroundColor = json[index].color;
          title.textContent = json[index].name;
          text.textContent = json[index].overview.content;
          url.href = json[index].overview.source;
          image.title = json[index].name;
          image.style.backgroundImage = `url(${json[index].images.planet})`;
          if (document.documentElement.clientWidth <= 900) {
            image.style.width = json[index].images.sizeTablet;
            image.style.height = json[index].images.sizeTablet;
          } else {
            image.style.width = json[index].images.sizeDesktop;
            image.style.height = json[index].images.sizeDesktop;
          }
          cards.childNodes[1].childNodes[3].textContent = json[index].rotation;
          cards.childNodes[3].childNodes[3].textContent = json[index].revolution;
          cards.childNodes[5].childNodes[3].textContent = json[index].radius;
          cards.childNodes[7].childNodes[3].textContent = json[index].temperature;
        });
    });
  });

  // -----------main nav buttons block--------------
  buttons.forEach((button) => {
    button.addEventListener("mousedown", () => {
      //-------hover/active toggle-------
      btnStatusChange();
      button.classList.toggle("main__button_hover");
      button.classList.toggle("main__button_active");
      //-------------info change----------
      let option = button.dataset.name;
      let picture = button.dataset.image;
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          button.style.backgroundColor = json[index].color;
          text.textContent = json[index][option].content;
          url.href = json[index][option].source;
          image.style.backgroundImage = `url(${json[index].images[picture]})`;
          imagePointer.style.backgroundImage = `url(${json[index].images.geology})`;
          imagePointer.title = json[index].name;
          imagePointer.classList.remove("main__image-pointer_active");
          switch (button.dataset.name) {
            case "geology":
              imagePointer.classList.add("main__image-pointer_active");
              break;
          }
        });
    });
  });
});
