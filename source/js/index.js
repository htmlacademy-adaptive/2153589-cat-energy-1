const toggle = document.querySelector(".header__toggle");
const nav = document.querySelector(".header__nav");
const header = document.querySelector(".header");

toggle.classList.remove("header__toggle--nojs");
nav.classList.remove("header__nav--nojs");

toggle.addEventListener("click", () => {
  header.classList.toggle("header--sticky");
  nav.classList.toggle("header__nav--active");
  toggle.classList.toggle("header__toggle--active");
});
