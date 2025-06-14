import { Router } from 'express'
import { obtenerPersonas } from '../controllers/personaController.js'

const router = Router()
router.get('/', obtenerPersonas)
export default router