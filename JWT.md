# O que é JWT (JSON Web Token)?

**JWT (JSON Web Token)** é um padrão para transmitir informações de forma segura entre um cliente (como seu navegador) e um servidor. Essas informações são codificadas em um formato compacto e podem ser verificadas para garantir que não foram alteradas durante a transmissão.

### Por que usamos JWT?

Usamos o JWT para **autenticação** e **autorização**. Ele permite que o servidor saiba quem é o usuário após ele ter feito login e permite que o cliente (navegador) se comunique de forma segura sem precisar enviar a senha a cada requisição.

### Como funciona o JWT?

- Quando o usuário faz login com sucesso, o servidor gera um **token JWT** e o envia para o cliente.
- O cliente armazena esse token (geralmente no localStorage ou cookies) e o envia de volta ao servidor em cada requisição que exige autenticação.
- O servidor verifica o token para garantir que ele é válido e, se for, permite o acesso às rotas ou dados protegidos.

---

## Implementação do JWT no seu Código

Agora, vamos passar para como você pode implementar o JWT no seu projeto.

### 1. **Instalar o pacote JWT**

Você precisa instalar a biblioteca que irá gerar e verificar o token JWT. Use o seguinte comando no terminal:

```bash
npm install jsonwebtoken
```

### 2. **Gerar o token após login**

Quando o usuário fizer login corretamente, você vai gerar o token JWT usando a função `jwt.sign()`.

No seu código de login, adicione a parte que gera o token:

```javascript
const jwt = require('jsonwebtoken'); // Importa o pacote JWT
const JWT_SECRET = 'seu_segredo_aqui'; // Crie um segredo para assinar o token

app.post('/login', (req, res) => {
  const { email, password } = req.body;

  db.query('SELECT * FROM users WHERE email = ? AND password = ?', [email, password], (err, result) => {
    if (err) throw err;

    if (result.length === 0) {
      return res.status(400).send('Email ou senha inválidos');
    }

    // Gerar token JWT
    const token = jwt.sign(
      { id: result[0].id, email: result[0].email },  // Dados que serão incluídos no token
      JWT_SECRET,  // Segredo usado para assinar o token
      { expiresIn: '1h' }  // Define que o token expira em 1 hora
    );

    // Retorna o token ao cliente
    res.json({ token });
  });
});
```

### O que esse código faz?

- **`jwt.sign()`**: Função usada para criar o token. Ela recebe três parâmetros principais:
  - Os dados do usuário que você quer incluir no token (neste caso, `id` e `email`).
  - O segredo (`JWT_SECRET`) que será usado para garantir que o token não seja alterado.
  - As opções, onde definimos que o token expira em 1 hora com `{ expiresIn: '1h' }`.

Quando o login for bem-sucedido, o token gerado será enviado para o cliente, que deve armazená-lo para usar nas próximas requisições.

---

### 3. **Proteger rotas com o JWT**

Agora, para proteger rotas (ou seja, permitir o acesso apenas a usuários autenticados), você precisa verificar o token que foi enviado pelo cliente.

Você pode fazer isso criando um middleware de autenticação:

```javascript
function authenticateToken(req, res, next) {
  const token = req.headers['authorization']?.split(' ')[1]; // Extrai o token do cabeçalho 'Authorization'

  if (!token) return res.sendStatus(401); // Se não houver token, retorna 401 (não autorizado)

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403); // Se o token for inválido ou expirado, retorna 403 (proibido)
    req.user = user; // Se o token for válido, armazena os dados do usuário no 'req'
    next(); // Continua para a próxima função
  });
}
```

### O que esse código faz?

- **`req.headers['authorization']`**: É onde esperamos que o token JWT seja enviado pelo cliente (no cabeçalho HTTP). Aqui, extraímos o token do campo `Authorization`.
- **`jwt.verify()`**: Verifica se o token é válido e não foi alterado. Se for, ele retorna os dados do usuário, que são armazenados no `req.user`.
- **`next()`**: Se o token for válido, a execução continua e a rota protegida pode ser acessada.

---

### 4. **Usar o middleware nas rotas protegidas**

Para proteger qualquer rota, adicione o middleware `authenticateToken`:

```javascript
app.get('/user', authenticateToken, (req, res) => {
  const userId = req.user.id; // Obtém o ID do usuário do token

  db.query('SELECT email FROM users WHERE id = ?', [userId], (err, result) => {
    if (err) throw err;
    if (result.length > 0) {
      res.json(result[0]); // Retorna os dados do usuário
    } else {
      res.status(404).send('Usuário não encontrado');
    }
  });
});
```

### O que esse código faz?

- **Rota `/user`**: Esta rota só pode ser acessada se o token JWT for válido.
- O middleware `authenticateToken` é executado antes da rota. Se o token for válido, a função da rota continua e retorna os dados do usuário.

---

## Conclusão

Usamos JWT para garantir que o usuário está autenticado sem precisar enviar informações confidenciais (como a senha) em todas as requisições. Ele é seguro e eficiente para proteger rotas e dados no backend.

Passos resumidos:
1. **Gerar o token** após login com sucesso.
2. **Verificar o token** em todas as rotas protegidas usando o middleware `authenticateToken`.

Agora você tem um sistema seguro de login usando JWT!
