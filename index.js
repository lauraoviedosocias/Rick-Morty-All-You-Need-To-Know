
const cardsPersonajes = document.getElementById("cards-personajes")
const filtroBusqueda = document.getElementById("search-sort")
const inputTexto = document.getElementById("input-search")
const form = document.getElementById("form-search")
const botonPaginaPrevia = document.getElementById("prev")
const botonPaginaSiguiente = document.getElementById("next")
const seccionResultados = document.getElementById("results-section")


// fetch("https://rickandmortyapi.com/api")
// .then((res) => res.json())
// .then((data) => {
//     console.log(data)
// })

let paginaActual = 1



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


//            FUNCIONALIDAD ORDENAR PERSONAJES A/Z - Z/A

const selectOrden = document.getElementById("select-sort")


const mostrarPersonajesOrdenados = () => {
    
    fetch(`https://rickandmortyapi.com/api/character?page=${paginaActual}`)
    .then((res) => res.json())
    .then((data) => {
        ordenarPersonajes(data.results)
        crearTarjetasPersonajes(data.results)


    })
}

const ordenarPersonajes = (data) => {

    let ordenFiltro = selectOrden.value

    const personajesOrdenados = data.sort( (a, b) => {

        if (ordenFiltro === "a-z" && a.name < b.name) {
            return -1
        }

        else if (ordenFiltro === "z-a" && a.name > b.name) {
            return -1
        }

        else if (ordenFiltro === "default") {
            return 0

        }

        
    })

    return personajesOrdenados
}    


selectOrden.onchange = () => {
    mostrarPersonajesOrdenados()
    
}

//            FUNCIONALIDAD ORDENAR EPISODIOS A/Z - Z/A


//                 FUNCIONALIDAD MAS DETALLES


cardsPersonajes.onclick = () => {

    seccionResultados.style.display = "none"
    
    



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







// const arrayObjetos = [
//     {
//         name: "r"
//     },

//     {
//         name: "f"
//     },

//     {
//         name: "j"
//     }
// ]

// const ordenar = () => {
    
//     const arrayOrdenado = arrayObjetos.sort((a, b) => {

//         if (a.name < b.name) {
//             return -1;
//         }
//         if (a.name > b.name) {
//             return 1;
//         }
//         return 0;
//     } )

//   return arrayOrdenado
// }

// console.log(ordenar())