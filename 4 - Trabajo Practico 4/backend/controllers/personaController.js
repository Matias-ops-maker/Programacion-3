import { getPersonas } from '../models/personaModel.js'

export function obtenerPersonas(req, res) {
  res.json(getPersonas())
}