const { connection } = require('../connect/connect.js');

async function actualizacionSaldo(saldoAnterior, saldoNuevo, email, operacion) {
    try {
        // Primero insertar en la tabla de movimientos
        const query1 = 'INSERT INTO movimientos(email, saldoAnterior, saldoNuevo, operacion) VALUES (?, ?, ?, ?)';
        await new Promise((resolve, reject) => {
            connection.query(query1, [email, saldoAnterior, saldoNuevo, operacion], (err, results) => {
                if (err) {
                    console.error('Error al insertar los datos:', err.stack);
                    reject(err);
                    return;
                }
                console.log('Datos insertados con éxito:', results);
                resolve(results);
            });
        });

        // Luego actualizar el saldo en la tabla de clientes
        const query2 = 'UPDATE clientes SET saldo = ? WHERE email = ?';
        await new Promise((resolve, reject) => {
            connection.query(query2, [saldoNuevo, email], (err, results) => {
                if (err) {
                    console.error('Error al actualizar los datos:', err.stack);
                    reject(err);
                    return;
                }
                console.log('Datos actualizados con éxito:', results);
                resolve(results);
            });
        });

    } catch (err) {
        console.error('Error en la actualización de saldo:', err);
    }
}

module.exports = { actualizacionSaldo };
