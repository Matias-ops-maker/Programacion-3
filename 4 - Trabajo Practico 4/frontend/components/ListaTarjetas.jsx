import TarjetaPersona from './TarjetaPersona.jsx'

function ListaTarjetas({ personas }) {
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
      {personas.map(persona => (
        <TarjetaPersona key={persona.id} persona={persona} />
      ))}
    </div>
  )
}

export default ListaTarjetas