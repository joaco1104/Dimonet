const bcrypt = require('bcrypt');
const mysql = require('mysql2');

// Conexión a la base de datos
const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xhatoxhilol',
    database: 'dimonet'
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL: ', err);
        return;
    }
    console.log('Conexión a MySQL exitosa');
});

const crearCuenta = async (nombre, contrasena) => {
    const hashedPassword = await bcrypt.hash(contrasena, 10);
    return new Promise((resolve, reject) => {
        const query = 'INSERT INTO usuarios (nombre, contrasena) VALUES (?, ?)';
        connection.query(query, [nombre, hashedPassword], (err, results) => {
            if (err) {
                return reject(err);
            }
            resolve(results);
        });
    });
};

const iniciarSesion = async (nombre, contrasena) => {
    return new Promise((resolve, reject) => {
        const query = 'SELECT contrasena FROM usuarios WHERE nombre = ?';
        connection.query(query, [nombre], async (err, results) => {
            if (err) {
                return reject(err);
            }
            if (results.length === 0) {
                return reject(new Error('Usuario no encontrado'));
            }
            const hashedPassword = results[0].contrasena;
            const match = await bcrypt.compare(contrasena, hashedPassword);
            if (match) {
                resolve();
            } else {
                reject(new Error('Contraseña incorrecta'));
            }
        });
    });
};

module.exports = { crearCuenta, iniciarSesion };
