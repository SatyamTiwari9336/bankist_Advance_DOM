'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(element => {
  element.addEventListener('click', openModal);
});

btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});
///////////////////////////////////////////
//lecture
//when we click a button with href # it jumps directly to the top to remove this we use e.preventdefault()
const header = document.querySelector('header');
console.log(document.body);

const allsections = document.querySelectorAll('.section');
console.log(allsections);

document.getElementById('section--1');
//if using query selector and want id name use # with it
const allbutton = document.getElementsByTagName('button');
console.log(allbutton);
//creating and inserting elements
//.insertAdjacentHTML
//adding cookie functionality

const message = document.createElement('div');
message.classList.add('cookie-message');
// message.textContent = 'we use cookie for better performance';
message.innerHTML = `we use cookie for better performance.<button class="btn btn--close-cookie">got it</button>`;
// header.prepend(message); //to add at start of header
header.append(message); //to add last of header

//same methods are haeder.before(message) and header.after(message)
document
  .querySelector('.btn--close-cookie')
  .addEventListener('click', function () {
    // message.remove();
    message.parentElement.removeChild(message);
  });
////////////////////////////////////////////
//styles
message.style.backgroundColor = '#37383d';
message.style.width = '104%';
console.log(getComputedStyle(message).color);
console.log(getComputedStyle(message).height);
