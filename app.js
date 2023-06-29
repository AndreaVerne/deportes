// Inputs para el contenedor de noticias y el buscador.
const listado_noticias = document.getElementById('contenedor-noticias'),
    buscador_noticias = document.getElementById('buscador-noticias');

// Al levantar la tecla en el input de buscador, se filtra el listado de titulo
buscador_noticias.addEventListener('keyup', () => {
    // Convertir el texto dentro del input a minúsculas.
    const filtro = buscador_noticias.value.toLowerCase();
    // Obtener un array de las noticias en el contenedor.
    const noticias_sin_filtro = Array.from(listado_noticias.children);

    // Por cada noticia en el filtro.
    noticias_sin_filtro.forEach(noticias => {
        // Convertir el nombre a minúsculas.
        const titulo = noticias.textContent.toLowerCase();
        /* Si existe coincidencia entre el titulo y el texto actual 
        del input, se muestra la noticia y se corta la ejecución. */
        if (titulo.includes(filtro)) {
            noticias.style.display = 'block';
            return;
        }
        // Si no hay coincidencia, se oculta la noticia
        noticias.style.display = 'none';
    });
});

// Solicitud GET a un archivo JSON para obtener el listado de noticias.
fetch('./noticias.json')
    // Se obtiene la respuesta y se transforma a JSON.
    .then((response) => response.json())
    // Se puede trabajar con la respuesta.
    .then(noticias => {
        // Recorrer el listado de noticias e ir agregándolo en el contenedor.
        noticias.forEach(element => {
            const li = document.createElement('li');
            li.innerHTML = element.name;
            listado_noticias.appendChild(li);
        });
    }).catch(function () {
        // Acciones en caso de posible error.
    }).finally(function (){
        // Se ejecuta en caso de éxito o de error, puede servir por ej. para esconder un loader.
    });

