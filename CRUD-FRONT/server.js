const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 

const app = express();
const SECRET_KEY = 'seu_segredo_aqui'; // Troque para um segredo seguro

app.use(cors());
app.use(bodyParser.json());

// Configurando conexão com o MySQL
const db = mysql.createConnection({
  host: 'localhost',
  user: 'root', // Ajuste o nome de usuário se necessário
  password: '', // Insira a senha se houver
  database: 'login_system'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Conectado ao banco de dados MySQL!');
});

// Registro de usuários
app.post('/register', async (req, res) => {
  const { email, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10); // Criptografa a senha

  db.query('SELECT email FROM users WHERE email = ?', [email], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      return res.status(400).send('Usuário já existe');
    }

    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hashedPassword], (err, result) => {
      if (err) throw err;
      res.send('Usuário registrado com sucesso');
    });
  });
});

// Login de usuários
app.post('/login', async (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ?', [email], async (err, result) => {
    if (err) throw err;

    
    if (result.length === 0 || !(await bcrypt.compare(password, result[0].password))) {
      return res.status(400).send('Email ou senha inválidos');
    }

    //os parametros são os dados que serão inseridos no token, o segredo que você criou e a definição de quando o token vai expirar
    const token = jwt.sign({ email }, SECRET_KEY, { expiresIn: '1h' }); // Gera o token
    res.json({ token }); // Retorna o token ao cliente/navegador
  });
});

// Middleware para verificar o token JWT
const authenticateToken = (req, res, next) => {
  const token = req.headers['authorization'] && req.headers['authorization'].split(' ')[1]; // Extrai o token do cabeçalho 'Authorization'. O cabeçalho Authorization é uma parte do protocolo HTTP que permite que um cliente envie credenciais de autenticação para o servidor.

  if (!token) return res.sendStatus(401); // Se não houver token, retorna 401 (não autorizado)

  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token for inválido ou expirado, retorna 403 (proibido)
    req.user = user; // Se o token for válido, armazena os dados do usuário no 'req'
    next(); // Continua para a próxima função
  });
};

// Rota para obter dados do usuário logado
/*Rota /user: Esta rota só pode ser acessada se o token JWT for válido.
O middleware authenticateToken é executado antes da rota. Se o token for válido, a função da rota continua e retorna os dados do usuário.
*/
app.get('/user', authenticateToken, (req, res) => {
  db.query('SELECT email FROM users WHERE email = ?', [req.user.email], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.json(result[0]); // Retorna os dados do usuário
  });
});






// Rota para atualizar informações do usuário
app.put('/user', authenticateToken, async (req, res) => {
  const { newEmail, newPassword } = req.body;  // Extrai o novo e-mail e a nova senha do corpo da requisição
  const hashedPassword = await bcrypt.hash(newPassword, 10); // Criptografa a nova senha

  db.query('UPDATE users SET email = ?, password = ? WHERE email = ?', [newEmail, hashedPassword, req.user.email], (err, result) => {
    if (err) throw err;

    // Verifica se nenhuma linha foi afetada pela consulta (ou seja, usuário não encontrado)
    if (result.affectedRows === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.send('Usuário atualizado com sucesso');
  });
});






// Rota para deletar o usuário
app.delete('/user', authenticateToken, (req, res) => {
  db.query('DELETE FROM users WHERE email = ?', [req.user.email], (err, result) => {
    if (err) throw err;

    if (result.affectedRows === 0) {
      return res.status(404).send('Usuário não encontrado');
    }

    res.send('Usuário deletado com sucesso');
  });
});





app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
