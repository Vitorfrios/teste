const { spawn } = require('child_process');

// Inicia o primeiro servidor
const server1 = spawn('json-server', ['--watch', 'codigo/db/db.json'], {
    stdio: 'inherit',
    shell: true
});

// Inicia o segundo servidor
const server2 = spawn('json-server', ['--watch', 'codigo/db/DB2.json'], {
    stdio: 'inherit',
    shell: true
});

// Encerra ambos os servidores ao finalizar o processo
process.on('SIGINT', () => {
    server1.kill();
    server2.kill();
    process.exit();
});
