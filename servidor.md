// Importa o módulo 'express', que é um framework para criar servidores web em Node.js
const express = require('express');

// Importa o módulo 'mysql2', que permite conectar e executar comandos no banco de dados MySQL
const mysql = require('mysql2');

// Importa o módulo 'body-parser', que ajuda a interpretar o corpo de requisições HTTP, especialmente em JSON
const bodyParser = require('body-parser');

// Cria uma aplicação Express
const app = express();

// Configura o Express para usar o body-parser e permitir o processamento de requisições com JSON
app.use(bodyParser.json());

// Configuração da conexão com o banco de dados MySQL
const connection = mysql.createConnection({
  host: 'localhost', // Define o host do banco de dados (neste caso, localmente)
  user: 'root', // Define o usuário do banco de dados (geralmente 'root' em servidores locais)
  password: '', // Define a senha do banco de dados (vazia no XAMPP por padrão)
  database: 'meu_banco' // Define o nome do banco de dados que será utilizado
});

// Conecta ao banco de dados MySQL
connection.connect(error => {
  if (error) {
    // Exibe uma mensagem de erro caso a conexão falhe
    console.error('Erro ao conectar ao banco de dados: ' + error.stack);
    return;
  }
  // Exibe uma mensagem confirmando a conexão ao banco, mostrando o ID da conexão
  console.log('Conectado ao banco de dados com ID ' + connection.threadId);
});

// Define o endpoint para adicionar um novo usuário via requisição POST
app.post('/usuarios', (req, res) => {
  // Extrai os dados de 'nome', 'email' e 'senha' do corpo da requisição (req.body)
  const { nome, email, senha } = req.body;
  // Define a consulta SQL para inserir um novo usuário na tabela 'usuarios'
  const sql = 'INSERT INTO usuarios (nome, email, senha) VALUES (?, ?, ?)';
  // Executa a consulta SQL, utilizando os valores fornecidos
  connection.query(sql, [nome, email, senha], (error, results) => {
    if (error) {
      // Caso ocorra um erro ao inserir, envia uma resposta de erro com status 500
      res.status(500).send('Erro ao adicionar usuário.');
      return;
    }
    // Envia uma resposta de sucesso com status 201 indicando que o usuário foi adicionado
    res.status(201).send('Usuário adicionado com sucesso.');
  });
});

// Define o endpoint para obter todos os usuários via requisição GET
app.get('/usuarios', (req, res) => {
  // Executa uma consulta SQL para selecionar todos os registros da tabela 'usuarios'
  connection.query('SELECT * FROM usuarios', (error, results) => {
    if (error) {
      // Caso ocorra um erro ao obter os usuários, envia uma resposta de erro com status 500
      res.status(500).send('Erro ao obter usuários.');
      return;
    }
    // Envia a lista de usuários como uma resposta JSON
    res.json(results);
  });
});

// Define o endpoint para obter um usuário específico pelo seu ID via requisição GET
app.get('/usuarios/:id', (req, res) => {
  // Extrai o ID do usuário dos parâmetros da URL
  const { id } = req.params;
  // Executa uma consulta SQL para selecionar o usuário com o ID fornecido
  connection.query('SELECT * FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      // Caso ocorra um erro ao obter o usuário, envia uma resposta de erro com status 500
      res.status(500).send('Erro ao obter usuário.');
      return;
    }
    // Envia os dados do usuário específico como uma resposta JSON (primeiro resultado)
    res.json(results[0]);
  });
});

// Define o endpoint para atualizar os dados de um usuário via requisição PUT
app.put('/usuarios/:id', (req, res) => {
  // Extrai o ID do usuário dos parâmetros da URL
  const { id } = req.params;
  // Extrai os novos dados de 'nome', 'email' e 'senha' do corpo da requisição (req.body)
  const { nome, email, senha } = req.body;
  // Define a consulta SQL para atualizar o usuário com o ID fornecido
  const sql = 'UPDATE usuarios SET nome = ?, email = ?, senha = ? WHERE id = ?';
  // Executa a consulta SQL com os novos valores e o ID do usuário
  connection.query(sql, [nome, email, senha, id], (error, results) => {
    if (error) {
      // Caso ocorra um erro ao atualizar, envia uma resposta de erro com status 500
      res.status(500).send('Erro ao atualizar usuário.');
      return;
    }
    // Envia uma mensagem de sucesso indicando que o usuário foi atualizado
    res.send('Usuário atualizado com sucesso.');
  });
});

// Define o endpoint para deletar um usuário via requisição DELETE
app.delete('/usuarios/:id', (req, res) => {
  // Extrai o ID do usuário dos parâmetros da URL
  const { id } = req.params;
  // Executa uma consulta SQL para deletar o usuário com o ID fornecido
  connection.query('DELETE FROM usuarios WHERE id = ?', [id], (error, results) => {
    if (error) {
      // Caso ocorra um erro ao deletar, envia uma resposta de erro com status 500
      res.status(500).send('Erro ao deletar usuário.');
      return;
    }
    // Envia uma mensagem de sucesso indicando que o usuário foi deletado
    res.send('Usuário deletado com sucesso.');
  });
});

// Define a porta onde o servidor irá rodar
const PORT = 3000;

// Inicia o servidor e exibe uma mensagem no console com a porta em que o servidor está rodando
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
