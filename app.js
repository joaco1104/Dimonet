const express = require('express');
const { crearCuenta, iniciarSesion } = require('./auth');
const app = express();
const port = 3000;

app.use(express.json());

// Ruta para crear una cuenta
app.post('/crear-cuenta', async (req, res) => {
    const { nombre, contrasena } = req.body;
    try {
        await crearCuenta(nombre, contrasena);
        res.status(201).send('Cuenta creada exitosamente');
    } catch (err) {
        console.error('Error al crear la cuenta:', err); // Agrega este log
        res.status(500).send({ error: 'Error al crear la cuenta', details: err.message });
    }
});

// Ruta para iniciar sesión
app.post('/iniciar-sesion', async (req, res) => {
    const { nombre, contrasena } = req.body;
    try {
        await iniciarSesion(nombre, contrasena);
        res.status(200).send('Inicio de sesión exitoso');
    } catch (err) {
        console.error('Error al iniciar sesión:', err); // Agrega este log
        res.status(401).send({ error: 'Error al iniciar sesión', details: err.message });
    }
});

app.listen(port, () => {
    console.log(`Servidor escuchando en el puerto ${port}`);
});
