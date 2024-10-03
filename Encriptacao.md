# Encriptador de Senha com bcrypt

## Introdução

Neste documento, vamos explorar o uso da biblioteca **bcrypt** para encriptação de senhas em aplicações web. A encriptação de senhas é fundamental para proteger as credenciais dos usuários, garantindo que mesmo que os dados sejam expostos, as senhas não possam ser facilmente acessadas.

## O que é bcrypt?

**bcrypt** é uma biblioteca que permite a encriptação de senhas utilizando um algoritmo seguro. Ao contrário de algoritmos simples, como MD5 ou SHA-1, o bcrypt é projetado especificamente para armazenar senhas de forma segura.

### Por que usar bcrypt?

- **Segurança**: bcrypt aplica um processo de "salting" e "hashing", o que significa que mesmo senhas idênticas gerarão hashes diferentes. Isso dificulta a quebra de senhas.
- **Custo de processamento**: O bcrypt permite ajustar o custo da operação, tornando a encriptação mais lenta e, portanto, mais resistente a ataques de força bruta.
- **Proteção contra ataques de rainbow table**: O uso de sal (salt) evita que ataques baseados em tabelas pré-computadas sejam eficazes.

## Instalação do bcrypt

Para usar o bcrypt em seu projeto, você precisa instalá-lo. Execute o seguinte comando:

```bash
npm install bcrypt
```

### O que isso faz?

Esse comando instala a biblioteca bcrypt no seu projeto, permitindo que você a utilize para encriptação e verificação de senhas.

---

## Métodos Utilizados

Abaixo, descreveremos os principais métodos utilizados do bcrypt em seu código.

### 1. **bcrypt.hash()**

Esse método é usado para encriptar (ou "hash") a senha fornecida. Ele aceita dois parâmetros principais:

- **senha**: A senha que você deseja encriptar.
- **saltOrRounds**: O número de rounds de salting a serem usados (quanto maior, mais seguro, mas também mais lento).

#### Exemplo de Uso

```javascript
const bcrypt = require('bcrypt');

const password = 'sua_senha_aqui';
const saltRounds = 10; // Número de rounds para salting

bcrypt.hash(password, saltRounds, (err, hash) => {
    if (err) throw err;
    console.log(`Senha encriptada: ${hash}`);
});
```

### O que acontece aqui?

- A senha é encriptada usando 10 rounds de salting, gerando um hash que pode ser armazenado no banco de dados.
- O hash gerado é único e não pode ser revertido para obter a senha original.

---

### 2. **bcrypt.compare()**

Esse método é usado para verificar se a senha fornecida pelo usuário corresponde ao hash armazenado no banco de dados. Ele aceita dois parâmetros:

- **senha**: A senha que o usuário forneceu durante o login.
- **hash**: O hash armazenado no banco de dados.

#### Exemplo de Uso

```javascript
const storedHash = 'hash_armazenado_no_banco_de_dados';

bcrypt.compare(password, storedHash, (err, result) => {
    if (err) throw err;
    if (result) {
        console.log('Senha válida!');
    } else {
        console.log('Senha inválida!');
    }
});
```

### O que acontece aqui?

- O método `compare()` verifica a senha fornecida em relação ao hash armazenado.
- Se as senhas coincidirem, o resultado será `true`, indicando que a senha é válida. Caso contrário, será `false`.

---

## Implementação no Código

### Alterações no Arquivo `user.js`

Na sua lógica de registro e login, você usará esses métodos. Aqui está um exemplo de como você poderia modificar seu código:

#### Registro de Usuário

```javascript
app.post('/register', (req, res) => {
    const { email, password } = req.body;

    // Hash da senha
    bcrypt.hash(password, saltRounds, (err, hash) => {
        if (err) throw err;

        db.query('INSERT INTO users (email, password) VALUES (?, ?)', [email, hash], (err) => {
            if (err) throw err;
            res.send('Usuário registrado com sucesso!');
        });
    });
});
```

### O que foi adicionado?

- Ao registrar um novo usuário, a senha é encriptada antes de ser armazenada no banco de dados.

#### Login de Usuário

```javascript
app.post('/login', (req, res) => {
    const { email, password } = req.body;

    db.query('SELECT * FROM users WHERE email = ?', [email], (err, result) => {
        if (err) throw err;

        if (result.length === 0) {
            return res.status(400).send('Email ou senha inválidos');
        }

        const storedHash = result[0].password; // Hash armazenado no banco

        // Verificação da senha
        bcrypt.compare(password, storedHash, (err, isMatch) => {
            if (err) throw err;

            if (isMatch) {
                // Gera e retorna o token JWT
                const token = jwt.sign({ id: result[0].id, email: result[0].email }, JWT_SECRET, { expiresIn: '1h' });
                res.json({ token });
            } else {
                res.status(400).send('Email ou senha inválidos');
            }
        });
    });
});
```

### O que foi adicionado?

- Ao fazer login, a senha fornecida é verificada contra o hash armazenado no banco de dados.
- Se as senhas coincidirem, um token JWT é gerado e retornado ao usuário.

---

## Conclusão

O uso do bcrypt para encriptação de senhas é uma prática recomendada para manter suas aplicações seguras. Através dos métodos `hash()` e `compare()`, você pode armazenar senhas de forma segura e verificar as credenciais dos usuários durante o login. Ao implementar o bcrypt, você melhora a segurança do seu sistema e protege as informações sensíveis dos usuários.
