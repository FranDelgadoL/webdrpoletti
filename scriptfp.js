// @ts-nocheck

console.log("scriptfp.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {
    // Menú Dropdown
    const procedimientos = document.querySelector('.nav-item.parent[href="#casos-y-procedimientos"]');
    const paciente = document.querySelector('.nav-item.parent[href="#"]');
    const blog = document.querySelector('.nav-item.parent-blog');  // Ya tienes una clase blog

    const procedimientosDropdown = procedimientos ? procedimientos.nextElementSibling : null;
    const pacienteDropdown = paciente ? paciente.nextElementSibling : null;
    const blogDropdown = blog ? blog.nextElementSibling : null; // Aquí cambiamos 'contactoDropdown' por 'blogDropdown'

    if (procedimientosDropdown) procedimientosDropdown.style.display = 'none';
    if (pacienteDropdown) pacienteDropdown.style.display = 'none';
    if (blogDropdown) blogDropdown.style.display = 'none';  // Cambiado a 'blogDropdown'

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
        if (blogDropdown && !blogDropdown.contains(target) && !blog.contains(target)) {  // Cambiado a 'blogDropdown' y 'blog'
            blogDropdown.style.display = 'none';
        }
    }

    if (paciente) {
        paciente.addEventListener('click', function (event) {
            event.preventDefault();
            toggleDropdown(pacienteDropdown);
        });
    }

    if (blog) {  // Ahora se usa 'blog' en lugar de 'contacto'
        
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
        prevButton.addEventListener('click', function (event) {
            event.preventDefault();
            prevSlide();
        });

        nextButton.addEventListener('click', function (event) {
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
        logoSlider.addEventListener('mouseover', function () {
            logoTrack.style.animationPlayState = 'paused';
        });

        logoSlider.addEventListener('mouseout', function () {
            logoTrack.style.animationPlayState = 'running';
        });
    }

    // Scroll suave
    const procedimientosLink = document.querySelector('a[href="#casos-y-procedimientos"]');

    if (procedimientosLink) {
        procedimientosLink.addEventListener('click', function (event) {
            event.preventDefault();
            const targetElement = document.querySelector('#casos-y-procedimientos');
            if (targetElement) {
                targetElement.scrollIntoView({
                    behavior: 'smooth', // Scroll suave
                    block: 'start' // Posición del elemento en la pantalla después del scroll (inicio de la vista)
                });
            }
        });
    }

// Idioma y traducciones
document.querySelectorAll('.lang').forEach(item => {
    item.addEventListener('click', function(event) {
        event.preventDefault(); // Previene que el enlace recargue la página
        const selectedLanguage = this.getAttribute('data-lang');

        // Guardar el idioma seleccionado en el localStorage
        localStorage.setItem('selectedLanguage', selectedLanguage);

        // Cargar las traducciones según el idioma seleccionado
        loadTranslations(selectedLanguage);
        loadCasosTranslations(selectedLanguage);
        updateNavigationLinks(selectedLanguage);
    });
});

// Cargar las traducciones desde translations.json
function loadTranslations(language) {
    fetch('translations.json')
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-key]').forEach(element => {
                const key = element.getAttribute('data-key');
                if (translations[language] && translations[language][key]) {
                    element.textContent = translations[language][key];
                }
            });

            // Asegurarse de que el icono de mapa se mantenga visible
            const mapIcon = document.querySelector('.maps i');
            if (mapIcon) {
                mapIcon.style.visibility = 'visible'; // Reforzar que el icono esté visible
                mapIcon.style.display = 'inline-block'; // Asegura que el ícono se muestre correctamente
            }
        })
        .catch(error => console.error('Error loading translations:', error));
}


document.addEventListener("DOMContentLoaded", function() {
    // Asegurarse de que el icono de mapa se mantenga visible después del cambio de idioma
    const mapIcon = document.querySelector('.maps i');
    if (mapIcon) {
        mapIcon.style.visibility = 'visible';
    }
});


function loadCasosTranslations(language) {
    fetch('translationscasos.json')
        .then(response => response.json())
        .then(translations => {
            document.querySelectorAll('[data-key-casos]').forEach(element => {
                const key = element.getAttribute('data-key-casos');
                if (translations[language] && translations[language][key]) {
                    element.textContent = translations[language][key];
                }
            });
        })
        .catch(error => console.error('Error loading casos translations:', error));
}



// Verificar el idioma guardado en el localStorage al cargar la página
document.addEventListener("DOMContentLoaded", function() {
    const selectedLanguage = localStorage.getItem('selectedLanguage') || 'es'; // Por defecto 'es'
    loadTranslations(selectedLanguage); // Cargar las traducciones correspondientes
    loadCasosTranslations(selectedLanguage); // Cargar las traducciones de casos
    updateNavigationLinks(selectedLanguage); // Asegurarse de que los enlaces estén actualizados
});

// Enlaces de navegación por idioma
const linksByLanguage = {
    es: { about: "pages/sobre-poletti.html", 
          firstvisit: "pages/primeravisita.html",
          kneeArthroscopy: "pages/casos_clinicos/artroscopia-de-rodilla.html",
          kneeLigamentReconstruction: "pages/casos_clinicos/reconstruccion-de-ligamentos-de-rodilla.html",
          totalKneeReplacement: "pages/casos_clinicos/reemplazo-total-rodilla.html"

        },
    en: { about: "pages/about-poletti.html",
          firstvisit: "pages/firstvisit.html",
          kneeArthroscopy: "pages/casos_clinicos/knee-arthroscopy.html",
          kneeLigamentReconstruction: "pages/casos_clinicos/knee-ligament-reconstruction.html",
          totalKneeReplacement: "pages/casos_clinicos/total-knee-replacement.html"
        },
    ru: { about: "pages/o-poletti.html",
          firstvisit: "pages/pervyyvzglyad.html",
          kneeArthroscopy: "pages/casos_clinicos/knee-arthroscopy.html",
          kneeLigamentReconstruction: "pages/casos_clinicos/knee-ligament-reconstruction.html",
          totalKneeReplacement: "pages/casos_clinicos/total-knee-replacement.html"
        },
    it: { about: "pages/su-poletti.html",
          firstvisit: "pages/primavista.html",
          kneeArthroscopy: "pages/casos_clinicos/knee-arthroscopy.html",
          kneeLigamentReconstruction: "pages/casos_clinicos/knee-ligament-reconstruction.html",
          totalKneeReplacement: "pages/casos_clinicos/total-knee-replacement.html"
     }
};

// Modificar los enlaces de navegación según el idioma seleccionado
function updateNavigationLinks(language) {
    document.querySelectorAll('a[data-page]').forEach(link => {
        const pageKey = link.getAttribute('data-page'); // Asegúrate de que tus enlaces tengan el atributo data-page
        if (pageKey && linksByLanguage[language] && linksByLanguage[language][pageKey]) {
            // Actualizar la URL de los enlaces según el idioma
            link.setAttribute('href', linksByLanguage[language][pageKey]);
        }
    });
}
});

