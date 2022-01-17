
const cardsPersonajes = document.getElementById("cards-personajes")
// const inputSelectPersonajes = document.getElementById("input-characters")
// const inputSelectCapitulos = document.getElementById("input-episodes")
// const inputSelectUbicaciones = document.getElementById("input-locations")

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

const filtroBusqueda = document.getElementById("search-sort")
 

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

//                  FUNCIONALIDAD INPUT TEXTO

const inputTexto = document.getElementById("input-search")
const searchButton = document.getElementById("search-button")

searchButton.onclick = () => {

    console.log(inputTexto.value)

    



}














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