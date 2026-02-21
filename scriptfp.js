/* CÓDIGO PARA EL MENÚ MÓVIL */
document.addEventListener('DOMContentLoaded', function () {
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
});