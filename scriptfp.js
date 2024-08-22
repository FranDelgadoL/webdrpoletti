document.addEventListener("DOMContentLoaded", function() {
    // Menú Dropdown
    const procedimientos = document.querySelector('.nav-item.parent[href="#casos-y-procedimientos"]');
    const paciente = document.querySelector('.nav-item.parent[href="#"]');
    const contacto = document.querySelector('.nav-item.parent-contact');

    const procedimientosDropdown = procedimientos ? procedimientos.nextElementSibling : null;
    const pacienteDropdown = paciente ? paciente.nextElementSibling : null;
    const contactoDropdown = contacto ? contacto.nextElementSibling : null;

    if (procedimientosDropdown) procedimientosDropdown.style.display = 'none';
    if (pacienteDropdown) pacienteDropdown.style.display = 'none';
    if (contactoDropdown) contactoDropdown.style.display = 'none';

    function toggleDropdown(dropdown) {
        if (dropdown) {
            dropdown.style.display = dropdown.style.display === 'none' ? 'block' : 'none';
        }
    }

    function hideDropdowns(event) {
        const target = event.target;
        if (procedimientosDropdown && !procedimientosDropdown.contains(target) && !procedimientos.contains(target)) {
            procedimientosDropdown.style.display = 'none';
        }
        if (pacienteDropdown && !pacienteDropdown.contains(target) && !paciente.contains(target)) {
            pacienteDropdown.style.display = 'none';
        }
        if (contactoDropdown && !contactoDropdown.contains(target) && !contacto.contains(target)) {
            contactoDropdown.style.display = 'none';
        }
    }

    if (paciente) {
        paciente.addEventListener('click', function(event) {
            event.preventDefault();
            toggleDropdown(pacienteDropdown);
        });
    }

    if (contacto) {
        contacto.addEventListener('click', function(event) {
            event.preventDefault();
            toggleDropdown(contactoDropdown);
        });
    }

    document.addEventListener('click', hideDropdowns);

    // Slider
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

    // Logo Slider
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

    // Scroll suave
    const procedimientosLink = document.querySelector('a[href="#casos-y-procedimientos"]');

    if (procedimientosLink) {
        procedimientosLink.addEventListener('click', function(event) {
            event.preventDefault();
            const targetElement = document.querySelector('#casos-y-procedimientos');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth',  // Scroll suave
                    block: 'start'       // Posición del elemento en la pantalla después del scroll (inicio de la vista)
                });
            }
        });
    }
});

document.querySelectorAll('.lang').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Previene que el enlace recargue la página
        const selectedLanguage = this.getAttribute('data-lang');
        
        fetch('translations.json')
            .then(response => response.json())
            .then(translations => {
                document.querySelectorAll('[data-key]').forEach(element => {
                    const key = element.getAttribute('data-key');
                    if (translations[selectedLanguage] && translations[selectedLanguage][key]) {
                        element.textContent = translations[selectedLanguage][key];
                    }
                });
            })
            .catch(error => console.error('Error loading translations:', error));
    });
});











