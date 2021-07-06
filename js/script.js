'use strict';
document.addEventListener('DOMContentLoaded', () => {
  const buttons = document.querySelectorAll('.main__button'),
    planets = document.querySelectorAll('.header__link'),
    cards = document.querySelector('.cards');
  let index = 0;

  // -----------header planets block--------------
  planets.forEach((item) => {
    item.addEventListener('click', () => {
      index = item.dataset.id;
      console.log(++index);
    });
  });

  // -----------main nav buttons block--------------

  buttons.forEach((item) => {
    item.addEventListener('mousedown', () => {
      for (let button of buttons) {
        if (button.classList.contains('main__button_active')) {
          button.classList.remove('main__button_active');
          button.classList.add('main__button_hover');
        }
      }
      item.classList.toggle('main__button_hover');
      item.classList.toggle('main__button_active');
    });
  });

  // -----------cards block--------------

  fetch('data.json')
    .then((Response) => Response.json())
    .then((json) => {
      cards.childNodes[1].childNodes[3].textContent = json[index].rotation;
      cards.childNodes[3].childNodes[3].textContent = json[0].revolution;
      cards.childNodes[5].childNodes[3].textContent = json[0].radius;
      cards.childNodes[7].childNodes[3].textContent = json[0].temperature;
    });
});
