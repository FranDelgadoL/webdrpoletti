// @ts-nocheck
console.log("scriptfp.js cargado correctamente");

document.addEventListener("DOMContentLoaded", function () {

    // === 1. MENÚ MÓVIL (Tu código con cambio de icono) ===
    var boton = document.getElementById('hamburguesa');
    var menu = document.getElementById('menu-lista');

    if (boton && menu) {
        boton.addEventListener('click', function (e) {
            e.preventDefault();
            menu.classList.toggle('abierto');
            var icono = boton.querySelector('i');
            if (menu.classList.contains('abierto')) {
                icono.classList.remove('fa-bars');
                icono.classList.add('fa-times');
            } else {
                icono.classList.remove('fa-times');
                icono.classList.add('fa-bars');
            }
        });
    }

    // === 2. DROPDOWN INFORMACIÓN PACIENTE ===
    const paciente = document.querySelector('.nav-item.parent[data-key="patient-info"]');
    const pacienteDropdown = paciente ? paciente.nextElementSibling : null;

    if (paciente && pacienteDropdown) {
        paciente.addEventListener('click', function (e) {
            e.preventDefault();
            pacienteDropdown.style.display = (pacienteDropdown.style.display === 'block') ? 'none' : 'block';
        });
    }

    // === 3. SLIDESHOW ===
    const slides = document.querySelectorAll('.slide');
    const prevButton = document.querySelector('.prev');
    const nextButton = document.querySelector('.next');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            slide.style.display = (i === index) ? 'block' : 'none';
        });
    }

    if (slides.length > 0) {
        showSlide(currentSlide);
        setInterval(() => {
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        }, 5000);
    }

    if (prevButton && nextButton) {
        prevButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = (currentSlide - 1 + slides.length) % slides.length;
            showSlide(currentSlide);
        });
        nextButton.addEventListener('click', (e) => {
            e.preventDefault();
            currentSlide = (currentSlide + 1) % slides.length;
            showSlide(currentSlide);
        });
    }

    // === 4. IDIOMAS (Solo translations.json) ===
    const linksByLanguage = {
        es: {
            about: "pages/sobre-poletti.html",
            firstvisit: "pages/primeravisita.html",
            curriculum: "pages/curriculum.html", // Agregado para consistencia
            sportsMedicine: "casos_clinicos/medicina-deportiva.html",
            kneeArthroscopy: "casos_clinicos/artroscopia-de-rodilla.html",
            kneeLigamentReconstruction: "casos_clinicos/reconstruccion-ligamentos-rodilla.html",
            totalKneeReplacement: "casos_clinicos/reemplazo-total-rodilla.html",
            unicompartmentalKnee: "casos_clinicos/reemplazo-rodilla-unicompartimental.html",
            patellaMaltracking: "casos_clinicos/desviacion-rotula.html",
            kneeOsteotomy: "casos_clinicos/osteotomia-rodilla.html",
            hipReplacement: "casos_clinicos/protesis-cadera.html"
        },
        en: {
            about: "en/pages/about-poletti.html",
            firstvisit: "en/pages/firstvisit.html",
            curriculum: "en/pages/curriculum.html",
            sportsMedicine: "en/clinical_cases/sports-medicine.html",
            kneeArthroscopy: "en/clinical_cases/knee-arthroscopy.html",
            kneeLigamentReconstruction: "en/clinical_cases/knee-ligament-reconstruction.html",
            totalKneeReplacement: "en/clinical_cases/total-knee-replacement.html",
            unicompartmentalKnee: "en/clinical_cases/unicompartmental-replacement.html",
            patellaMaltracking: "en/clinical_cases/patella-maltracking.html",
            kneeOsteotomy: "en/clinical_cases/knee-osteotomy.html",
            hipReplacement: "en/clinical_cases/hip-replacement.html"
        },
        ru: {
            about: "ru/pages/o-poletti.html",
            firstvisit: "ru/pages/pervyyvzglyad.html",
            curriculum: "ru/pages/curriculum.html",
            sportsMedicine: "ru/klinicheskiye_sluchai/sports-medicine.html",
            kneeArthroscopy: "ru/klinicheskiye_sluchai/knee-arthroscopy.html",
            kneeLigamentReconstruction: "ru/klinicheskiye_sluchai/knee-ligament-reconstruction.html",
            totalKneeReplacement: "ru/klinicheskiye_sluchai/total-knee-replacement.html",
            unicompartmentalKnee: "ru/klinicheskiye_sluchai/unicompartmental-replacement.html",
            patellaMaltracking: "ru/klinicheskiye_sluchai/patella-maltracking.html",
            kneeOsteotomy: "ru/klinicheskiye_sluchai/knee-osteotomy.html",
            hipReplacement: "ru/klinicheskiye_sluchai/hip-replacement.html"
        },
        it: {
            about: "it/pages/su-poletti.html",
            firstvisit: "it/pages/primavista.html",
            curriculum: "it/pages/curriculum.html",
            sportsMedicine: "it/casi_clinici/sports-medicine.html",
            kneeArthroscopy: "it/casi_clinici/knee-arthroscopy.html",
            kneeLigamentReconstruction: "it/casi_clinici/knee-ligament-reconstruction.html",
            totalKneeReplacement: "it/casi_clinici/total-knee-replacement.html",
            unicompartmentalKnee: "it/casi_clinici/unicompartmental-replacement.html",
            patellaMaltracking: "it/casi_clinici/patella-maltracking.html",
            kneeOsteotomy: "it/casi_clinici/knee-osteotomy.html",
            hipReplacement: "it/casi_clinici/hip-replacement.html"
        }
    };

    function loadTranslations(language) {
        fetch('translations.json')
            .then(response => {
                if (!response.ok) throw new Error("No se encontró translations.json");
                return response.json();
            })
            .then(translations => {
                document.querySelectorAll('[data-key]').forEach(element => {
                    const key = element.getAttribute('data-key');
                    if (translations[language] && translations[language][key]) {
                        // Si es una imagen (bandera), no cambiamos el texto
                        if (element.tagName !== 'IMG') {
                            element.textContent = translations[language][key];
                        }
                    }
                });
                console.log("Idioma cambiado a: " + language);
            })
            .catch(error => console.error("Error:", error));
    }

    function updateNavigationLinks(language) {
        document.querySelectorAll('a[data-page]').forEach(link => {
            const pageKey = link.getAttribute('data-page');
            if (pageKey && linksByLanguage[language] && linksByLanguage[language][pageKey]) {
                link.setAttribute('href', linksByLanguage[language][pageKey]);
            }
        });
    }

    document.querySelectorAll('.lang').forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            const selectedLang = this.getAttribute('data-lang');
            localStorage.setItem('selectedLanguage', selectedLang);
            loadTranslations(selectedLang);
            updateNavigationLinks(selectedLang);
        });
    });

    // Carga inicial
    const initialLang = localStorage.getItem('selectedLanguage') || 'es';
    loadTranslations(initialLang);
    updateNavigationLinks(initialLang);

    // === 5. SCROLL SUAVE ===
    const scrollLink = document.querySelector('a[href="#casos-y-procedimientos"]');
    if (scrollLink) {
        scrollLink.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector('#casos-y-procedimientos');
            if (target) target.scrollIntoView({ behavior: 'smooth' });
        });
    }
});