function TarjetaPersona({ persona }) {
  return (
    <div style={{
      border: '1px solid #ccc',
      borderRadius: '8px',
      padding: '16px',
      width: '220px',
      boxShadow: '2px 2px 8px #eee'
    }}>
      <h2>{persona.nombre} {persona.apellido}</h2>
      <p>Edad: {persona.edad}</p>
      <p>Email: {persona.email}</p>
    </div>
  )
}

export default TarjetaPersona