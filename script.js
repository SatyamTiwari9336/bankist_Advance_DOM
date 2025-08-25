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
/*
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

message.style.height =
  Number.parseFloat(getComputedStyle(message).height) + 30 + 'px';

//to change the custom properties used in css
// document.documentElement.style.setProperty('--color-primary', 'orangered');

//attributes
const logo = document.querySelector('.nav__logo');
console.log(logo.alt);
console.log(logo.className);
logo.alt = 'beatiful minimlist logo';

//non standard
console.log(logo.designer);
console.log(logo.getAttribute('designer'));

console.log(logo.src);
console.log(logo.getAttribute('src'));
console.log(logo.dataset.versionNumber);

//classes
logo.classList.add('c', 'j');
logo.classList.remove('c', 'j');
logo.classList.toggle('c');
logo.classList.contains('c');
// logo.className="jonas"
*/

const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');

btnscrollto.addEventListener('click', function (e) {
  const s1coords = section1.getBoundingClientRect();
  console.log(s1coords);
  console.log(e.target.getBoundingClientRect());
  console.log('scroll x - y', scrollX, scrollY);
  console.log(
    'heioght-width',
    document.documentElement.clientHeight,
    document.documentElement.clientWidth
  );

  window.scrollTo({
    left: s1coords.left + window.scrollX,
    top: s1coords.top + window.scrollY,
    behavior: 'smooth',
  });
  // section1.scrollIntoView({ behavior: 'smooth' }); //any of these can be used
});

const alerth1 = function () {
  alert('you are reading the heading');
  h1.removeEventListener('mouseenter', alerth1); //just after 1 operation it removes that operation so that it does not repeat always
};
const h1 = document.querySelector('h1');

h1.addEventListener('mouseenter', alerth1);

//event propogation
const randomint = (min, max) => {
  return Math.trunc(Math.random() * (max - min)) + min;
  // console.log(rand);
};

const randcolor = () =>
  `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(0, 255)})`;
document.querySelector('.nav__link').addEventListener('click', function (e) {
  this.style.backgroundColor = randcolor();
});
document.querySelector('.nav__links').addEventListener('click', function (e) {
  this.style.backgroundColor = randcolor();
});
document.querySelector('.nav').addEventListener('click', function (e) {
  this.style.backgroundColor = randcolor();
});
