'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const
    buttons = document.querySelectorAll('.main__button'),
    overviewBtn = document.querySelector('[data-name="overview"]'),
    planets = document.querySelectorAll('.header__link'),
    mTitle = document.querySelector('.main__title'),
    mText = document.querySelector('.main__text'),
    mLink = document.querySelector('.main__link'),
    mImage = document.querySelector('.main__image'),
    cards = document.querySelector('.cards');

  let
    index = 0;

  function btnStatusChange() {
    for (let button of buttons) {
      button.classList.remove('main__button_active');
      button.classList.add('main__button_hover');
    }
  }

  function headerLinksStatusChange() {
    for (let planet of planets) {
      planet.classList.remove('header__link_active');
    }
  }

  // -----------header planets block--------------
  planets.forEach((planet) => {
    planet.addEventListener('click', () => {
      //---------setting overview as default active button----
      btnStatusChange();
      overviewBtn.classList.add('main__button_active');
      overviewBtn.classList.toggle('main__button_hover');
      headerLinksStatusChange();
      planet.classList.add('header__link_active');

      index = planet.dataset.id;
      fetch('data.json')
        .then((Response) => Response.json())
        .then((json) => {
          // -----------cards block--------------
          cards.childNodes[1].childNodes[3].textContent = json[index].rotation;
          cards.childNodes[3].childNodes[3].textContent = json[index].revolution;
          cards.childNodes[5].childNodes[3].textContent = json[index].radius;
          cards.childNodes[7].childNodes[3].textContent = json[index].temperature;
          //------------main title block --------
          mTitle.textContent = json[index].name;
          //------------main text block --------
          mText.textContent = json[index].overview.content;
          //------------main link block --------
          mLink.href = json[index].overview.source;
          //------------main image block --------
          mImage.alt = json[index].name;
          mImage.src = json[index].images.planet;
        });
    });
  });

  // -----------main nav buttons block--------------
  buttons.forEach((button) => {
    button.addEventListener('mousedown', () => {
      //-------hover/active toggle-------
      btnStatusChange();
      button.classList.toggle('main__button_hover');
      button.classList.toggle('main__button_active');
      //-------------info change----------
      let option = button.dataset.name;
      let picture = button.dataset.image;
      fetch('data.json')
        .then((Response) => Response.json())
        .then((json) => {
          //------------main text block --------
          mText.textContent = json[index][option].content;
          //------------main link block --------
          mLink.href = json[index][option].source;
          //------------main image block --------
          mImage.src = json[index].images[picture];
        });
    });
  });

});
