const bcrypt = require('bcrypt');

const password = 'password123';
const saltRounds = 10; 

// Gerar o hash da senha
bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log(`Senha encriptada: ${hash}`);
    
    // Comparar a senha após o hash ser gerado
    bcrypt.compare("password123", hash, (err, result) => {
        if (err) throw err;
        if (result) {
            console.log('Senha válida!');
        } else {
            console.log('Senha inválida!');
        }
    });
});
