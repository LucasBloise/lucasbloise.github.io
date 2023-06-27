let slides = document.getElementsByClassName('slide');
let currentSlide = 0;

setInterval(function () {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + 1) % slides.length;
    slides[currentSlide].classList.add('active');
}, 3000); // Cambia la imagen cada 3 segundos (ajusta el valor según tus necesidades)


function changeSlide(n) {
    slides[currentSlide].classList.remove('active');
    currentSlide = (currentSlide + n + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
}

document.addEventListener('DOMContentLoaded', function () {
    let prevButton = document.querySelector('.prev');
    let nextButton = document.querySelector('.next');

    prevButton.addEventListener('click', function () {
        changeSlide(-1);
    });

    nextButton.addEventListener('click', function () {
        changeSlide(1);
    });
})