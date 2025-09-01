'use strict';

const btnscrollto = document.querySelector('.btn--scroll-to');
const section1 = document.getElementById('section--1');
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');
const nav = document.querySelector('.nav');
///////////////////////////////////////
// Modal window

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

btnscrollto.addEventListener('click', function (e) {
  // const s1coords = section1.getBoundingClientRect();
  // console.log(s1coords);
  // console.log(e.target.getBoundingClientRect());
  // console.log('scroll x - y', scrollX, scrollY);
  // console.log(
  //   'height-width',
  //   document.documentElement.clientHeight,
  //   document.documentElement.clientWidth
  // );

  // window.scrollTo({
  //   left: s1coords.left + window.scrollX,
  //   top: s1coords.top + window.scrollY,
  //   behavior: 'smooth',
  // });
  section1.scrollIntoView({ behavior: 'smooth' }); //any of these can be used
});

//page navigation
// document.querySelectorAll('.nav__link').forEach(function (el) {
//   el.addEventListener('click', function (e) {
//     e.preventDefault();
//     const id = this.getAttribute('href');
//     document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
//   });
// });
//event delegation ⬇️⬇️
document.querySelector('.nav__links').addEventListener('click', function (e) {
  e.preventDefault();
  if (e.target.classList.contains('nav__link')) {
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//tabbed content
const tabs = document.querySelectorAll('.operations__tab');
const tabsContainer = document.querySelector('.operations__tab-container');
const tabsContent = document.querySelectorAll('.operations__content');
tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab');
  console.log(clicked);

  if (!clicked) return;
  //active tab
  tabs.forEach(el => el.classList.remove('operations__tab--active'));
  tabsContent.forEach(c => c.classList.remove('operations__content--active'));

  clicked.classList.add('operations__tab--active');

  //show content of active tab
  // console.log(clicked.dataset.tab);

  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add('operations__content--active');
});

//Menu fade animation
const handleHover = function (e) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const sibling = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');
    sibling.forEach(el => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener('mouseover', handleHover.bind(0.5));
nav.addEventListener('mouseout', handleHover.bind(1));

//sticky navigation intersection Observer api

// const obsCallback = function (entries, observer) {
//   entries.forEach(entry => {
//     console.log(entry);
//   });
// };
// const obsOption = {
//   root: null,
//   threshold: [0, 0.2],
// };
// const observer = new IntersectionObserver(obsCallback, obsOption);
// observer.observe(section1);

const header = document.querySelector('.header');
const NavHeight = nav.getBoundingClientRect().height;
console.log(NavHeight);

const stickyNav = function (entries) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};

const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `${NavHeight}px`,
});
headObserver.observe(header);

//Reveal Sections
const allsections = document.querySelectorAll('.section');
const revealSecions = function (entries, observer) {
  const [entry] = entries;
  console.log(entry);

  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};
const sectionObserver = new IntersectionObserver(revealSecions, {
  root: null,
  threshold: 0.15,
});
allsections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add('section--hidden');
});

//lazy loading of images (good for performance )
const imageTargets = document.querySelectorAll('img[data-src]');
const loadimg = function (entries, imageObserver) {
  const [entry] = entries;
  console.log(entry);
  if (!entry.isIntersecting) return;
  //replcing src with dta src
  entry.target.src = entry.target.dataset.src;

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img');
  });
  imageObserver.unobserve(entry.target);
};

const imageObserver = new IntersectionObserver(loadimg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imageTargets.forEach(img => imageObserver.observe(img));

//sliding component on bottom
const slides = document.querySelectorAll('.slide');
const btnleft = document.querySelector('.slider__btn--left');
const btnRight = document.querySelector('.slider__btn--right');

let curslide = 0;
let maxSlide = slides.length;
const slider = document.querySelector('.slider');
// slider.style.transform = 'scale(0.4) translateX(-800px)';
// slider.style.overflow = 'visible';
// slides.forEach((s, i) => (s.style.transform = `translateX(${100 * i})%`));

const gotoslide = function (slide) {
  slides.forEach(
    (el, i) => (el.style.transform = `translateX(${100 * (i - curslide)}%)`)
  );
};
gotoslide(0);
const nextslide = function () {
  if (curslide === maxSlide - 1) {
    curslide = 0;
  } else {
    curslide++;
  }
  gotoslide(curslide);
};
const prevslide = function () {
  if (curslide === 0) {
    curslide = maxSlide;
  }
  curslide--;
  gotoslide(curslide);
};
btnRight.addEventListener('click', nextslide);
btnleft.addEventListener('click', prevslide);
/*
//new
///////////////////////////////////////////
///////////////////////////////////////////
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

// const alerth1 = function () {
//   alert('you are reading the heading');
//   h1.removeEventListener('mouseenter', alerth1); //just after 1 operation it removes that operation so that it does not repeat always
// };
// const h1 = document.querySelector('h1');

// h1.addEventListener('mouseenter', alerth1);

// //event propogation
// const randomint = (min, max) => {
//   return Math.trunc(Math.random() * (max - min)) + min;
//   // console.log(rand);
// };

// const randcolor = () =>
//   `rgb(${randomint(0, 255)},${randomint(0, 255)},${randomint(0, 255)})`;
// document.querySelector('.nav__link').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
// });
// document.querySelector('.nav__links').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
//   // e.stopPropagation();
// });
// document.querySelector('.nav').addEventListener('click', function (e) {
//   this.style.backgroundColor = randcolor();
// });
//to stop effecting parent elements use e.stopPropogation
//new add
////////////////////////////////////////////////////////
//DOM traversing
//going downwards
let h1 = document.querySelector('h1');
console.log(h1.querySelector('.highlight'));
console.log(h1.childNodes);
h1.firstElementChild.style.color = 'white';
h1.lastElementChild.style.color = 'orangered';

//going upwards
console.log(h1.parentNode);
console.log(h1.parentElement);
h1.closest('.header').style.background = 'var(--gradient-primary)';
h1.closest('h1').style.background = 'var(--gradient-secondary)';

//going sideways
console.log(h1.previousElementSibling);
console.log(h1.nextElementSibling);
console.log(h1.nextSibling);
console.log(h1.previousSibling);

console.log(h1.parentElement.children);
[...h1.parentElement.children].forEach(function (el) {
  if (el != h1) {
    el.style.transform = 'scale(.5)';
  }
});
*/
