const mysql = require('mysql2');

const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'xhatoxhilol', // Reemplaza esto con tu contraseña real
    database: 'dimonet' // Nombre de la base de datos actualizado
});

connection.connect((err) => {
    if (err) {
        console.error('Error conectando a MySQL: ', err);
        return;
    }
    console.log('Conexión a MySQL exitosa');
});

module.exports = connection;
