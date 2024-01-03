const toggle=document.querySelector(".header__toggle");
const nav=document.querySelector(".header__nav");

toggle.addEventListener("click",()=>{
    nav.classList.toggle("header__nav--active");
    toggle.classList.toggle("header__toggle--active");
});
