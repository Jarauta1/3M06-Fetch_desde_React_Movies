import {useParams} from "react-router-dom"
import {useState,useEffect} from "react"

function Pelicula() {

  let {id} =useParams()
  let [actores, setActores] = useState([])
  let [equipo, setEquipo] = useState([])
  let [info, setInfo] = useState({})
  let [genero, setGenero] = useState([])

  useEffect(function(){
    fetch(`https://api.themoviedb.org/3/movie/${id}/credits?api_key=670095a48bfcd1a43ef073e54c4dc56f&language=en-US`).then(respuesta=>respuesta.json()).then(datos=>{
    setActores(datos.cast)
    setEquipo(datos.crew)
    })

    fetch(`https://api.themoviedb.org/3/movie/${id}?api_key=670095a48bfcd1a43ef073e54c4dc56f&language=en-US`).then(respuesta=>respuesta.json()).then(datos=>{
    setInfo(datos)
    setGenero(datos.genres)
    })
    
  },[id])

  let mostrarCast = actores.map(cast=>{
    return(<>
    <p>{cast.character} ----  {cast.name}</p>
    </>)
  })

  let mostrarCrew = equipo.map(crew=>{
    return(<>
    <p>{crew.job} ----  {crew.name}</p>
    </>)
  })

  let mostrarGeneros = genero.map(nombre=>{
  return <p>{nombre.name}</p>
  })

  return(<>
  <h3>{info.title}</h3>
  <img src={`https://image.tmdb.org/t/p/w500/${info.backdrop_path}`} width="200"/>
  <h4>Generos: </h4>
  {mostrarGeneros}
  <h4>Votación media: {info.vote_average}</h4>
  <h4>Total votos: {info.vote_count}</h4>
  <h3>Reparto</h3>
  {mostrarCast}
  <br/>
  <h3>Equipo</h3>
  {mostrarCrew}
  </>)
}

export default Pelicula;