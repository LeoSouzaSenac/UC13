# Guia Passo a Passo: Criando um Servidor em PHP com CRUD para MySQL

Este guia mostrará como criar um arquivo PHP que se conecta ao banco de dados MySQL para realizar operações CRUD (Create, Read, Update, Delete). Explicaremos cada linha do código para que fique fácil de entender, especialmente se você já tem alguma experiência com JavaScript.

## Pré-requisitos

Antes de começar, você precisa ter:
1. Um servidor que suporte PHP (por exemplo, XAMPP ou um servidor na nuvem).
2. Acesso a um banco de dados MySQL.
3. Um editor de código, como o Visual Studio Code (VSCode).

Agora, vamos ao código!

---

## Código Completo do Servidor PHP

### 1. Estrutura Básica do Arquivo PHP

Começamos criando um arquivo PHP chamado `server.php`. 

```php
<?php
// Configurações do banco de dados
$servername = "localhost";
$username = "seu_usuario";
$password = "sua_senha";
$dbname = "seu_banco_de_dados";
?>
```

**Explicação:**
- `<?php` inicia o código PHP.
- `$servername`, `$username`, `$password`, e `$dbname` são as informações de acesso ao banco de dados. 
  - Substitua `"localhost"`, `"seu_usuario"`, `"sua_senha"`, e `"seu_banco_de_dados"` pelas credenciais reais.

### 2. Criando a Conexão com o Banco de Dados

```php
// Cria conexão com o banco de dados
$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error); // Para o código se a conexão falhar.
}
```

**Explicação:**
- `$conn = new mysqli(...)` cria a conexão com o MySQL.
- `if ($conn->connect_error)` verifica se há um erro na conexão.
- `die("Connection failed: ...")` interrompe o script se não for possível conectar.

### 3. Definindo o Cabeçalho para JSON

Vamos garantir que a resposta seja enviada como JSON.

```php
header('Content-Type: application/json'); // Configura o cabeçalho para JSON.
```

**Explicação:**
- `header('Content-Type: application/json')` define o formato de resposta como JSON. Isso é útil para APIs, como em JavaScript com `fetch()`.

### 4. Recebendo e Limpando os Dados da Solicitação

Agora, vamos receber e limpar os dados.

```php
$input = json_decode(file_get_contents('php://input'), true); // Lê os dados enviados em JSON.

function clean_input($data) {
    global $conn;
    return mysqli_real_escape_string($conn, htmlspecialchars($data)); // Limpa os dados para evitar ataques.
}
```

**Explicação:**
- `file_get_contents('php://input')` pega os dados recebidos no corpo da requisição.
- `json_decode(..., true)` converte o JSON em um array associativo.
- `clean_input($data)` é uma função para limpar dados antes de salvar no banco. `htmlspecialchars` evita ataques de XSS e `mysqli_real_escape_string` ajuda a prevenir SQL injection.

### 5. Verificando a Ação (CRUD)

Usamos um parâmetro `action` na URL para definir a ação a ser realizada.

```php
if (isset($_GET['action'])) {
    $action = $_GET['action'];
```

**Explicação:**
- `$_GET['action']` acessa o parâmetro `action` da URL, como em `?action=register`.

### 6. Ação "register": Registrando um Usuário

Vamos adicionar um novo usuário.

```php
    if ($action == 'register') {
        $username = clean_input($input['username']);
        $password = password_hash(clean_input($input['password']), PASSWORD_DEFAULT);
        $email = clean_input($input['email']);
        
        $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            echo json_encode(['success' => false, 'message' => 'Username already exists']);
        } else {
            $stmt = $conn->prepare("INSERT INTO users (username, password, email) VALUES (?, ?, ?)");
            $stmt->bind_param("sss", $username, $password, $email);
            if ($stmt->execute()) {
                echo json_encode(['success' => true, 'message' => 'Registration successful']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
            }
        }
        $stmt->close();
    }
```

**Explicação:**
- `password_hash(...)` criptografa a senha.
- `prepare(...)` prepara a consulta SQL.
- `bind_param("sss", ...)` liga os valores (`s` significa string).
- `num_rows > 0` verifica se o usuário já existe.

### 7. Ação "login": Autenticando o Usuário

Verifica as credenciais e autentica o usuário.

```php
    } elseif ($action == 'login') {
        $username = clean_input($input['username']);
        $password = clean_input($input['password']);
        
        $stmt = $conn->prepare("SELECT * FROM users WHERE username=?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows > 0) {
            $user = $result->fetch_assoc();
            if (password_verify($password, $user['password'])) {
                echo json_encode(['success' => true, 'message' => 'Login successful', 'email' => $user['email']]);
            } else {
                echo json_encode(['success' => false, 'message' => 'Incorrect password']);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Username not found']);
        }
        $stmt->close();
    }
```

**Explicação:**
- `password_verify(...)` compara a senha fornecida com a criptografada.

### 8. Ação "update": Atualizando os Dados do Usuário

Atualiza a senha e o e-mail do usuário.

```php
    } elseif ($action == 'update') {
        $username = clean_input($input['username']);
        $password = password_hash(clean_input($input['password']), PASSWORD_DEFAULT);
        $email = clean_input($input['email']);

        $stmt = $conn->prepare("UPDATE users SET password=?, email=? WHERE username=?");
        $stmt->bind_param("sss", $password, $email, $username);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'Update successful']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        }
        $stmt->close();
    }
```

**Explicação:**
- `UPDATE` permite modificar os dados no banco.

### 9. Ação "delete": Excluindo um Usuário

Remove um usuário específico.

```php
    } elseif ($action == 'delete') {
        $username = clean_input($input['username']);
        
        $stmt = $conn->prepare("DELETE FROM users WHERE username=?");
        $stmt->bind_param("s", $username);
        if ($stmt->execute()) {
            echo json_encode(['success' => true, 'message' => 'User deleted successfully']);
        } else {
            echo json_encode(['success' => false, 'message' => 'Error: ' . $stmt->error]);
        }
        $stmt->close();
    }
```

**Explicação:**
- `DELETE` remove o usuário do banco.

### 10. Fechando a Conexão

Por fim, fechamos a conexão com o banco.

```php
$conn->close();
```
