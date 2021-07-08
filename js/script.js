"use strict";
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(".main__button"),
    overviewBtn = document.querySelector('[data-name="overview"]'),
    planets = document.querySelectorAll(".header__link"),
    hActiveLink = document.querySelector(".header__link_active"),
    mTitle = document.querySelector(".main__title"),
    mText = document.querySelector(".main__text"),
    mLink = document.querySelector(".main__link"),
    mImage = document.querySelector(".main__image"),
    mImagePointer = document.querySelector(".main__image-pointer"),
    cards = document.querySelector(".cards");

  let index = 0;

  hActiveLink.style.borderColor = "#419EBB"; //active link color set

  window.addEventListener("resize", () => {
    let winSize = document.documentElement.clientWidth;
    if (901 > winSize > 501) {
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          mImage.style.width = json[index].images.sizeTablet;
          mImage.style.height = json[index].images.sizeTablet;
        });
    } else if (winSize <= 500) {
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          mImage.style.width = json[index].images.sizeMobile;
          mImage.style.height = json[index].images.sizeMobile;
        });
    }
  });

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

  // -----------header interaction--------------
  planets.forEach((planet) => {
    planet.addEventListener("mouseup", () => {
      //---------setting default active/hover state----
      btnStatusChange();
      overviewBtn.classList.add("main__button_active");
      overviewBtn.classList.toggle("main__button_hover");
      headerLinksStatusChange();
      planet.classList.add("header__link_active");
      mImagePointer.classList.remove("main__image-pointer_active");

      index = planet.dataset.id;
      fetch("data.json")
        .then((Response) => Response.json())
        .then((json) => {
          //------header color-scheme switch-----
          planet.style.borderColor = json[index].color;
          //--fist button color-scheme switch---
          overviewBtn.style.backgroundColor = json[index].color;
          //------------main title block --------
          mTitle.textContent = json[index].name;
          //------------main text block ---------
          mText.textContent = json[index].overview.content;
          //------------main link block ---------
          mLink.href = json[index].overview.source;
          //------------main image block --------
          mImage.alt = json[index].name;
          mImage.src = json[index].images.planet;
          mImage.style.width = json[index].images.size;
          // -----------cards block--------------
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
      console.log(document.documentElement.clientWidth);
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
          //--main buttons color-scheme switch---
          button.style.backgroundColor = json[index].color;
          //------------main text block --------
          mText.textContent = json[index][option].content;
          //------------main link block --------
          mLink.href = json[index][option].source;
          //------------main image block --------
          mImage.src = json[index].images[picture];
          mImagePointer.src = json[index].images.geology;
          mImagePointer.alt = json[index].name;
          mImagePointer.classList.remove("main__image-pointer_active");
          switch (button.dataset.name) {
            case "geology":
              mImagePointer.classList.add("main__image-pointer_active");
              break;
          }
        });
    });
  });
});
