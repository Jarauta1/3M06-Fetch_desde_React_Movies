import './App.css';
import {useState, useEffect} from "react"
import {BrowserRouter,Route,Link} from "react-router-dom"
import Pelicula from "./pelicula"

function App() {
  let [numPag,setNumPag] = useState(1)
  let [totalPag,setTotalPag] = useState(0)
  let [data,setData] = useState([])
 
  useEffect(function(){
    
    fetch("https://api.themoviedb.org/3/movie/popular?api_key=670095a48bfcd1a43ef073e54c4dc56f&language=en-US&page="+numPag).then(respuesta=>respuesta.json()).then(datos=>{
     setData(datos.results)
     setTotalPag(data.total_pages)
    })
  },[numPag])

  let mostrarPeliculas = data.map(pelicula=>{
    return(<div>
      <Link to="/">Cerrar</Link>
      <Link to={`/pelicula/${pelicula.id}`}><h2>{pelicula.title}</h2></Link>
      <img src={`https://image.tmdb.org/t/p/w500/${pelicula.poster_path}`} width="200"/>
    </div>)
  })

  function anterior() {
    if (numPag !== 1) {
      setNumPag(numPag - 1)
    }
  }

  function siguiente() {
    if (numPag !== totalPag) {
      setNumPag(numPag + 1)
    }
  }

  return (<BrowserRouter>
  <Route exact path="/"></Route>
  <Route exact path="/pelicula/:id">
  <Pelicula/>
  </Route>
  <button onClick={anterior}>Anterior</button>
  <button onClick={siguiente}>Siguiente</button>
  {mostrarPeliculas}
  </BrowserRouter>)
}

export default App;
