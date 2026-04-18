const express = require('express');
const cors = require('cors');
const { PrismaClient } = require('@prisma/client');

const app = express();
const prisma = new PrismaClient();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ========================
// RUTAS - USUARIOS
// ========================

app.get('/api/usuarios', async (req, res) => {
  try {
    const usuarios = await prisma.usuario.findMany();
    res.json({ success: true, data: usuarios });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.get('/api/usuarios/:id', async (req, res) => {
  try {
    const usuario = await prisma.usuario.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!usuario) return res.status(404).json({ success: false, message: 'Usuario no encontrado' });
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.post('/api/usuarios', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    if (!nombre || !email) return res.status(400).json({ success: false, message: 'Nombre y email son requeridos' });
    const usuario = await prisma.usuario.create({ data: { nombre, email } });
    res.status(201).json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.put('/api/usuarios/:id', async (req, res) => {
  try {
    const { nombre, email } = req.body;
    const usuario = await prisma.usuario.update({ where: { id: parseInt(req.params.id) }, data: { nombre, email } });
    res.json({ success: true, data: usuario });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

app.delete('/api/usuarios/:id', async (req, res) => {
  try {
    await prisma.usuario.delete({ where: { id: parseInt(req.params.id) } });
    res.json({ success: true, message: 'Usuario eliminado correctamente' });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// ========================
// RUTAS - RESULTADOS TEST
// ========================

// Guardar resultado del test
app.post('/api/resultados', async (req, res) => {
  try {
    const { nombre, verbal, logicoMat, visualEsp, kinestesica, musical, intrapersonal, interpersonal } = req.body;
    if (!nombre) return res.status(400).json({ success: false, message: 'El nombre es requerido' });

    const resultado = await prisma.resultado.create({
      data: { nombre, verbal, logicoMat, visualEsp, kinestesica, musical, intrapersonal, interpersonal }
    });
    res.status(201).json({ success: true, data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ver todos los resultados
app.get('/api/resultados', async (req, res) => {
  try {
    const resultados = await prisma.resultado.findMany({ orderBy: { creadoEn: 'desc' } });
    res.json({ success: true, data: resultados });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ver resultado por ID
app.get('/api/resultados/:id', async (req, res) => {
  try {
    const resultado = await prisma.resultado.findUnique({ where: { id: parseInt(req.params.id) } });
    if (!resultado) return res.status(404).json({ success: false, message: 'Resultado no encontrado' });
    res.json({ success: true, data: resultado });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
});

// Ruta de prueba
app.get('/', (req, res) => {
  res.json({ message: '¡API RESTful funcionando! 🚀' });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
