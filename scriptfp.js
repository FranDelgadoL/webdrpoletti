document.addEventListener("DOMContentLoaded", function() {
    const procedimientos = document.querySelector('.nav-item.parent[href="procedures.html"]');
    const paciente = document.querySelector('.nav-item.parent[href="patient-info.html"]');

    const procedimientosDropdown = procedimientos ? procedimientos.nextElementSibling : null;
    const pacienteDropdown = paciente ? paciente.nextElementSibling : null;

    if (procedimientosDropdown) procedimientosDropdown.style.display = 'none';
    if (pacienteDropdown) pacienteDropdown.style.display = 'none';

    function toggleDropdown(dropdown) {
        if (dropdown) dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
    }

    function hideDropdowns(event) {
        const target = event.target;
        if (procedimientosDropdown && !procedimientosDropdown.contains(target) && !procedimientos.contains(target)) {
            procedimientosDropdown.style.display = 'none';
        }
        if (pacienteDropdown && !pacienteDropdown.contains(target) && !paciente.contains(target)) {
            pacienteDropdown.style.display = 'none';
        }
    }

    if (procedimientos) {
        procedimientos.addEventListener('click', function(event) {
            event.preventDefault();
            toggleDropdown(procedimientosDropdown);
        });
    }

    if (paciente) {
        paciente.addEventListener('click', function(event) {
            event.preventDefault();
            toggleDropdown(pacienteDropdown);
        });
    }

    document.addEventListener('click', hideDropdowns);

    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;
    const slideInterval = 5000;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = i === index ? 'block' : 'none';
        });
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slides.length) % slides.length;
        showSlide(currentSlide);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', function(event) {
            event.preventDefault();
            prevSlide();
        });

        nextButton.addEventListener('click', function(event) {
            event.preventDefault();
            nextSlide();
        });
    }

    function startSlideShow() {
        setInterval(nextSlide, slideInterval);
    }

    showSlide(currentSlide);
    startSlideShow();

    const logoSlider = document.querySelector('.logo-slider');
    const logoTrack = document.querySelector('.logo-track');

    if (logoSlider && logoTrack) {
        logoSlider.addEventListener('mouseover', function() {
            logoTrack.style.animationPlayState = 'paused';
        });

        logoSlider.addEventListener('mouseout', function() {
            logoTrack.style.animationPlayState = 'running';
        });
    }
});





