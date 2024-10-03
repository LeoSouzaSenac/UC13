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

Quando você usa o bcrypt para comparar uma senha com um hash (uma senha criptografada), o que acontece nos bastidores é o seguinte:

Hashing da senha: Quando você armazena uma senha usando bcrypt, ele não armazena a senha diretamente. Em vez disso, ele cria um hash a partir da senha original. Esse hash é uma representação criptografada da senha, que inclui um "salt" (um valor aleatório adicionado para fortalecer o hash).

Verificação da senha: Quando você quer verificar se uma senha corresponde ao hash armazenado, você usa a função bcrypt.compare(senha, hash).

Comparação: O bcrypt não "descriptografa" o hash porque ele não funciona assim. O que ele faz é pegar a senha que você está fornecendo, adicionar o mesmo "salt" usado no hash original (o salt está incluído no hash), e gerar um novo hash usando essa senha.

Comparação de hashes: Em vez de comparar as senhas diretamente, o bcrypt compara o novo hash gerado a partir da senha fornecida com o hash original que está armazenado no banco de dados. Se os hashes forem iguais, significa que a senha fornecida é a mesma da que foi usada para gerar o hash originalmente.

Em resumo, ao usar compare, o bcrypt gera um novo hash a partir da senha que você está testando e compara esse novo hash com o que está armazenado. Se coincidem, a senha está correta; se não, a senha é inválida.


Se dois usuários usarem a mesma senha, o bcrypt ainda gera hashes diferentes para cada um. Isso acontece por causa do salt. Vamos entender como isso funciona:

Salt: O bcrypt, ao criar o hash de uma senha, gera um valor aleatório chamado salt. Esse salt é único para cada hash e é adicionado à senha antes de aplicar o algoritmo de hashing. Isso significa que, mesmo que duas pessoas usem a mesma senha, o salt gerado será diferente para cada uma.

Hash diferente: O salt é incorporado ao hash gerado, de modo que, mesmo que duas pessoas escolham a mesma senha, os hashes resultantes serão diferentes porque os salts são diferentes.

Exemplo simplificado:

Usuário A escolhe a senha "123456".
O bcrypt gera um salt aleatório, por exemplo, salt1, e aplica o algoritmo de hashing para criar o hash da senha de A: hash1.
Usuário B também escolhe a senha "123456".
O bcrypt gera outro salt aleatório, por exemplo, salt2, e cria o hash da senha de B: hash2.
Mesmo que a senha seja a mesma, os hashes serão diferentes porque cada um foi gerado com um salt diferente.

O resultado:
Usuário A: senha "123456", hash armazenado: hash1
Usuário B: senha "123456", hash armazenado: hash2
Esses hashes são completamente diferentes por causa dos diferentes salts, tornando impossível saber que os dois usuários usaram a mesma senha apenas olhando os hashes.

Isso torna o bcrypt seguro, pois mesmo senhas iguais não produzem o mesmo hash.

## Conclusão

O uso do bcrypt para encriptação de senhas é uma prática recomendada para manter suas aplicações seguras. Através dos métodos `hash()` e `compare()`, você pode armazenar senhas de forma segura e verificar as credenciais dos usuários durante o login. Ao implementar o bcrypt, você melhora a segurança do seu sistema e protege as informações sensíveis dos usuários.
