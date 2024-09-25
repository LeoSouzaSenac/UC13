# Tutorial Completo: Integração Frontend com Backend usando Express, MySQL, e XAMPP

Neste tutorial, vamos criar um projeto completo que inclui:

- Uma página de **Login**.
- Uma página de **Registro**.
- Uma **Página Protegida** que só é acessada após o login bem-sucedido.
- Conexão com um **Backend** (Node.js com Express e MySQL) para realizar o **CRUD** (criação, leitura, atualização, exclusão).

### Estrutura do Projeto

Primeiro, vamos criar a estrutura de diretórios do nosso projeto. Usaremos as pastas abaixo:

```bash
/htdocs/nome-do-seu-projeto/
|-- index.html       # Página de Login
|-- register.html    # Página de Registro
|-- protected.html   # Página Protegida
|-- /css/            # Pasta para arquivos CSS
|   |-- style.css    # Arquivo CSS
|-- /js/             # Pasta para arquivos JavaScript
|   |-- login.js     # Lógica de Login
|   |-- register.js  # Lógica de Registro
|   |-- protected.js # Lógica da Página Protegida
```

Agora que você tem a estrutura do projeto, vamos construir cada parte separadamente e explicá-las.

## Passo 1: Configurando a Página de Login (`index.html`)

### Código HTML

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>Login</h2>
        <form id="loginForm">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Login</button>
            <p>Não tem uma conta? <a href="register.html">Registrar-se</a></p>
        </form>
        <div id="message"></div>
    </div>

    <script src="js/login.js"></script>
</body>
</html>
```

### Explicação:

- O código acima cria um formulário simples de **Login**.
- Os campos de entrada (`input`) são do tipo **email** e **password**, para que o usuário possa inserir suas credenciais.
- O formulário tem um `id="loginForm"`, que será usado no arquivo JavaScript (`login.js`) para capturar os dados e enviá-los ao backend.
- O campo `<div id="message">` será usado para mostrar mensagens de erro ou sucesso ao usuário.

---

## Passo 2: Adicionando Estilo à Página de Login (`style.css`)

Agora vamos adicionar estilos ao nosso formulário para que ele fique mais apresentável. No arquivo **`style.css`**, adicione o seguinte:

```css
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: Arial, sans-serif;
    background-color: #f4f4f4;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
}

.container {
    background-color: white;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    max-width: 400px;
    width: 100%;
}

h2 {
    text-align: center;
    margin-bottom: 20px;
}

form {
    display: flex;
    flex-direction: column;
}

label {
    margin-bottom: 5px;
    font-weight: bold;
}

input {
    margin-bottom: 15px;
    padding: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    font-size: 16px;
}

button {
    padding: 10px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: 16px;
    cursor: pointer;
}

button:hover {
    background-color: #0056b3;
}

p {
    text-align: center;
    margin-top: 10px;
}

a {
    color: #007bff;
    text-decoration: none;
}

a:hover {
    text-decoration: underline;
}

#message {
    margin-top: 15px;
    color: red;
    text-align: center;
}
```

### Explicação:

- **Body e Container**: O corpo da página é centralizado, e o formulário está dentro de uma caixa (`container`) com bordas arredondadas e sombras suaves.
- **Formulário**: Os elementos do formulário são organizados verticalmente e espaçados adequadamente.
- **Botão**: O botão tem um estilo moderno e muda de cor ao passar o mouse sobre ele.

---

## Passo 3: Criando o Script de Login (`login.js`)

Agora vamos adicionar a lógica para capturar os dados do formulário e enviá-los ao backend. O arquivo `login.js` ficará na pasta `js/`.

```js
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Fetch envia os dados ao servidor (backend)
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const messageElement = document.getElementById('message');
    if (response.ok) {
        window.location.href = 'protected.html';
    } else {
        const errorMessage = await response.text();
        messageElement.textContent = errorMessage;
    }
});
```

### Explicação:

- **addEventListener**: Captura o evento de envio do formulário. Quando o usuário clica em "Login", o evento `submit` é acionado, e chamamos a função JavaScript para evitar o comportamento padrão do formulário (`e.preventDefault()`), que seria recarregar a página.
- **fetch**: O comando **`fetch()`** é usado para fazer uma requisição HTTP. Aqui estamos enviando uma requisição **POST** para o servidor (no backend) com os dados do usuário (email e senha).
- **await**: A palavra-chave **`await`** é usada porque **`fetch`** retorna uma **Promise**. Ou seja, precisamos esperar que o servidor responda antes de continuar o código. A função é assíncrona por isso usamos `async`.
- **response.ok**: Se a resposta do servidor for positiva (login bem-sucedido), o usuário é redirecionado para a página protegida (`protected.html`). Caso contrário, uma mensagem de erro será exibida.

---

## Passo 4: Criando a Página de Registro (`register.html` e `register.js`)

### Código HTML (Registro)

```html
<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Registro</title>
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
    <div class="container">
        <h2>Registrar-se</h2>
        <form id="registerForm">
            <label for="email">Email:</label>
            <input type="email" id="email" name="email" required>
            <label for="password">Senha:</label>
            <input type="password" id="password" name="password" required>
            <button type="submit">Registrar</button>
            <p>Já tem uma conta? <a href="index.html">Fazer login</a></p>
        </form>
        <div id="message"></div>
    </div>

    <script src="js/register.js"></script>
</body>
</html>
```

### Código JavaScript (Registro)

```js
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const messageElement = document.getElementById('message');
    if (response.ok) {
        messageElement.textContent = 'Usuário registrado com sucesso!';
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000);
    } else {
        const errorMessage = await response.text();
        messageElement.textContent = errorMessage;
    }
});
```

---

## Backend com Node.js e Express

Agora que configuramos o frontend, precisaremos do **backend** para manipular as requisições de login e registro.

- Instale as dependências com `npm install express mysql body-parser`.
- Crie o servidor e configure as rotas de login e registro.

No arquivo **`server.js`**:

```js
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
app.use(bodyParser.json());

// Conexão com o banco de dados
const db = mysql.createConnection({
    host: 'localhost',
    user: 'seu-usuario',
    password: 'sua-senha',
    database: 'nome-do-banco'
});

app.post('/login', (req, res) => {
    const { email, password } = req.body;
    db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, results) => {
        if (err) throw err;
        if (results.length > 0) {
            res.sendStatus(200); // Login bem-sucedido
        } else {
            res.status(401).send('Credenciais inválidas');
        }
    });
});

app.post('/register', (req, res) => {
    const { email, password } = req.body;
    db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, password], (err, result) => {
        if (err) throw err;
        res.sendStatus(201); // Usuário registrado com sucesso
    });
});

app.listen(3000, () => {
    console.log('Servidor rodando na porta 3000');
});
```

### Explicação:

- **Express**: O **Express** é o framework que usamos para criar o servidor web. Ele lida com as requisições HTTP do frontend.
- **bodyParser**: O **body-parser** é usado para processar os dados JSON enviados pelo frontend.
- **MySQL**: O módulo **mysql2** é utilizado para conectar ao banco de dados.

---

## Conclusão

Com este tutorial, você aprendeu a criar uma aplicação completa de login e registro usando **HTML**, **CSS**, **JavaScript** e **Node.js** com **Express** e **MySQL**. Agora, o próximo passo seria expandir esta aplicação para incluir mais funcionalidades, como **resetar senha**, **logout**, e **manter o usuário logado** com tokens JWT.

