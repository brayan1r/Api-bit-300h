import express from 'express';
/*Aqui habia un espacio*/
import { usuarios } from '../data/users.js';

const router = express.Router();

/*falto el / en :nombre*/
router.get('/:nombre', (req, res) => { 
    const nombreBuscado = req.params.nombre.toLowerCase();

    const usuario = usuarios.find(u => u.nombre.toLowerCase() === nombreBuscado);

    if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    res.json(usuario);
    
});

router.post('/', (req, res) => {
    const nuevoUsuario = req.body;

    if(!nuevoUsuario.nombre || !nuevoUsuario.edad){
        return res.status(400).json({ mensaje: "Faltan datos: nombre y edad son requeridos"})
    }

    const existe = usuarios.some(u => u.nombre.toLowerCase() === nuevoUsuario.nombre.toLowerCase());

    if(existe){
        return res.status(409).json({mensaje:'El usuario extiste'})
    }
    
    nuevoUsuario.id = usuarios.length + 1;
    usuarios.push(nuevoUsuario);

    res.status(201).json(nuevoUsuario);

});

router.put('/:nombre', (req, res) => {
  const actual = req.params.nombre.toLowerCase();
  const idx = usuarios.findIndex(u => u.nombre.toLowerCase() === actual);

  if (idx === -1) {
    return res.status(404).json({ mensaje: 'Usuario no encontrado' });
  }

  const { nombre, edad } = req.body;

  // Validaciones simples
  if (edad !== undefined && (typeof edad !== 'number' || edad <= 0)) {
    return res.status(400).json({ mensaje: 'Edad inválida: debe ser número > 0' });
  }

  // Si quieren cambiar el nombre, validar duplicado
  if (nombre && nombre.toLowerCase() !== actual) {
    const duplicado = usuarios.some(u => u.nombre.toLowerCase() === nombre.toLowerCase());
    if (duplicado) {
      return res.status(409).json({ mensaje: 'Ya existe un usuario con ese nombre' });
    }
    usuarios[idx].nombre = nombre;
  }

  if (edad !== undefined) {
    usuarios[idx].edad = edad;
  }

  return res.json(usuarios[idx]);
});
 
router.delete('/:nombre', (req, res) => {
    const nombre = req.params.nombre.toLowerCase();
    const idx = usuarios.findIndex(u => u.nombre.toLowerCase() === nombre)

    if(idx === -1){
        return res.status(404).json({ mensaje:"Usuario no existe" })
    }

    const eliminado = usuarios.splice(idx, 1)[0];

    return res.json({mensaje: "usuario eliminado", usuario: eliminado});


});


export default router;