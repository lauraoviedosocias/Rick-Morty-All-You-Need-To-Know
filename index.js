
const cardsPersonajes = document.getElementById("cards-personajes")
const filtroBusqueda = document.getElementById("search-sort")
const inputTexto = document.getElementById("input-search")
const form = document.getElementById("form-search")
const botonPaginaPrevia = document.getElementById("prev")
const botonPaginaSiguiente = document.getElementById("next")


// fetch("https://rickandmortyapi.com/api")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data)
// })

let paginaActual = 1



// prev.onclick = () => {

  

//     // if (paginaActual === 1) {
//     //     prev.disabled = true
//     // } else if (paginaActual > 1) {
//     //     prev.disabled = false
//     // }
//     paginaActual = paginaActual - 1
//     // mostrarInformacionPersonajes()
//     // mostrarInformacionEpisodios()
//     // mostrarInformacionUbicaciones()
    
// }

// next.onclick = () => {
//     paginaActual = paginaActual + 1
//     // mostrarInformacionPersonajes()
//     // mostrarInformacionEpisodios()
//     // mostrarInformacionUbicaciones()
// }

//                           PERSONAJES

const mostrarInformacionPersonajes = () => {
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            crearTarjetasPersonajes(data.results)
        })
}

mostrarInformacionPersonajes()

const crearTarjetasPersonajes = (data) => {

    
    const tarjetasPersonajes = data.reduce((acc, curr) => {
        return acc + `
        <article class="cards">
            <img src="${curr.image}">
            <h2>${curr.name}</h2>
            <ul>
                <li>Status: ${curr.status}</li>
                <li>Gender: ${curr.gender}</li>
                <li>Origin: ${curr.origin.name}</li>
                <li>Location: ${curr.location.name}</li>
            </ul>
        </article>   
        `
    }, "")

    cardsPersonajes.innerHTML = tarjetasPersonajes
}

//                           EPISODIOS

const mostrarInformacionEpisodios = () => {
    fetch(`https://rickandmortyapi.com/api/episode?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            crearTarjetasEpisodios(data.results)
        })
}


const crearTarjetasEpisodios = (data) => {

    const tarjetasEpisodios = data.reduce((acc, curr) => {
        return acc + `
        <article class="cards">
            <img src="img/episodes.jpg">
            <h2>${curr.name}</h2>
            <ul>
                <li>Air date: ${curr.air_date}</li>
                <li>Episode ${curr.episode}</li>
            </ul>
        </article>   
        `
    }, "")

    cardsPersonajes.innerHTML = tarjetasEpisodios
}

//                        LOCATIONS


const mostrarInformacionUbicaciones = () => {
    fetch(`https://rickandmortyapi.com/api/location?page=${paginaActual}`)
        .then((res) => res.json())
        .then((data) => {
            crearTarjetasUbicaciones(data.results)
        })
}


const crearTarjetasUbicaciones = (data) => {

    const tarjetasUbicaciones = data.reduce((acc, curr) => {
        return acc + `
        <article class="cards">
            <img src="img/locations.jpg">
            <h2>${curr.name}</h2>
            <ul>
                <li>Type: ${curr.type}</li>
                <li>Dimension ${curr.dimension}</li>
            </ul>
        </article>   
        `
    }, "")

    cardsPersonajes.innerHTML = tarjetasUbicaciones
}


//                  FUNCIONALIDAD DE FILTRO


 

filtroBusqueda.onchange = () => {
    
    if (filtroBusqueda.value === "episodes") {
        mostrarInformacionEpisodios()
    }

    else if (filtroBusqueda.value === "characters") {
        mostrarInformacionPersonajes()
    }
    else if (filtroBusqueda.value === "locations") {
        mostrarInformacionUbicaciones()
    }

}

//                  FUNCIONALIDAD BUSQUEDA POR INPUT TEXT POR CADA CATEGORIA


const buscar = (nombre) => {

    if (filtroBusqueda.value === "characters") {

        fetch(`https://rickandmortyapi.com/api/character/?name=${nombre}`)
        .then((res) => res.json())
        .then((data) => {
            crearTarjetasPersonajes(data.results)
        })
    }

    else if (filtroBusqueda.value === "episodes") {

        fetch(`https://rickandmortyapi.com/api/episode/?name=${nombre}`)
            .then((res) => res.json())
            .then((data) => {
                crearTarjetasEpisodios(data.results)
            })
    }

    else if (filtroBusqueda.value === "locations") {
        fetch(`https://rickandmortyapi.com/api/location/?name=${nombre}`)
            .then((res) => res.json())
            .then((data) => {
                crearTarjetasUbicaciones(data.results)
            })
    }

}

form.oninput = (e) => {
    e.preventDefault();
    buscar(inputTexto.value)
}

//            FUNCIONALIDAD PAGINACION

botonPaginaPrevia.onclick = () => {

    if (filtroBusqueda.value === "characters" && paginaActual > 1) {
        paginaActual = paginaActual - 1
        mostrarInformacionPersonajes()
    }

    else if (filtroBusqueda.value === "episodes" && paginaActual > 1) {
        paginaActual = paginaActual - 1
        mostrarInformacionEpisodios()
    }

    else if (filtroBusqueda.value === "locations" && paginaActual > 1) {
        paginaActual = paginaActual - 1
        mostrarInformacionUbicaciones()
    }
}

botonPaginaSiguiente.onclick = () => {

    if (filtroBusqueda.value === "characters" && paginaActual < 42) {
        paginaActual = paginaActual + 1
        mostrarInformacionPersonajes()
    }

    else if (filtroBusqueda.value === "episodes" && paginaActual < 3) {
        paginaActual = paginaActual + 1
        mostrarInformacionEpisodios()
    }

    else if (filtroBusqueda.value === "locations" && paginaActual < 7) {
        paginaActual = paginaActual + 1
        mostrarInformacionUbicaciones()
    }
}

