import { useEffect, useState } from 'react'
import ListaTarjetas from './ListaTarjetas.jsx'

function TraerPersonas() {
  const [personas, setPersonas] = useState([])

  useEffect(() => {
    fetch('http://localhost:3001/personas')
      .then(res => res.json())
      .then(data => setPersonas(data))
  }, [])

  return <ListaTarjetas personas={personas} />
}

export default TraerPersonas