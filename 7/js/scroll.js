window.addEventListener('scroll', () => {
    const element = document.querySelector('.header__nav');
    if (window.scrollY >= 50) {
        element.classList.add('shadow');
    } else {
        element.classList.remove('shadow');
    }
});
