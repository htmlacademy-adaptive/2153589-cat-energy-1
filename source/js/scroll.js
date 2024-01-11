window.addEventListener('scroll', () => {
    const element = document.querySelector('.header');
    if (window.scrollY >= 50) {
        element.classList.add('shadow');
    } else {
        element.classList.remove('shadow');
    }
});
