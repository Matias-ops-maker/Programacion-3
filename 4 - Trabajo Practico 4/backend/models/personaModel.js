const personas = [
  { id: 1, nombre: 'Juan', apellido: 'Pérez', edad: 25, email: 'juanperez@mail.com' },
  { id: 2, nombre: 'Ana', apellido: 'García', edad: 30, email: 'anagarcia@mail.com' },
  { id: 3, nombre: 'Luis', apellido: 'Martínez', edad: 22, email: 'luismartinez@mail.com' },
  { id: 4, nombre: 'María', apellido: 'López', edad: 28, email: 'marialopez@mail.com' },
  { id: 5, nombre: 'Pedro', apellido: 'Sánchez', edad: 35, email: 'pedrosanchez@mail.com' }
]

export function getPersonas() {
  return personas
}