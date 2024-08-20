# 📚 Introduction to Express.js

## O que é o Express.js?

**Express.js** é um framework web minimalista e flexível para **Node.js** que fornece um conjunto robusto de 
recursos para construir aplicativos web e APIs. 
Ele é amplamente utilizado para criar **servidores web** e **APIs RESTful** devido à sua simplicidade e capacidade de extensão.

### 🛠️ **Principais características do Express.js:**
- **Leve e rápido:** Express é uma camada mínima sobre o Node.js, o que significa que ele adiciona funcionalidades úteis sem sacrificar o desempenho.
- **Flexível:** Permite que você configure sua aplicação da maneira que desejar, utilizando middleware e módulos conforme necessário.
- **Roteamento poderoso:** Com Express, você pode definir como as aplicações respondem a diferentes rotas e métodos HTTP.
- **Suporte a middlewares:** Permite a adição de funcionalidades ao aplicativo (como autenticação, logging, etc.) através do uso de middlewares.

---

## ⚙️ Configurando um servidor básico com Express.js

Vamos começar criando um servidor básico usando Express.js. Isso permitirá que você entenda como ele funciona na prática.

### 1. **Instalando o Express.js**
   Primeiro, você precisa ter o Node.js e o npm instalados. Em seguida, crie um novo diretório para o seu projeto e inicialize um projeto Node.js:

   ```bash
   mkdir meu-projeto-express
   cd meu-projeto-express
   npm init -y
   ```

   Agora, instale o Express.js:

   ```bash
   npm install express
   ```

### 2. **Criando o servidor**
   Crie um arquivo chamado `server.js` na raiz do seu projeto e adicione o seguinte código:

   ```javascript
   const express = require('express');
   const app = express();

   // Definindo a rota raiz
   app.get('/', (req, res) => {
       res.send('Olá, mundo! 🌍');
   });

   // Servidor escutando na porta 3000
   app.listen(3000, () => {
       console.log('Servidor rodando na porta 3000 🚀');
   });
   ```

### 3. **Executando o servidor**
   Para iniciar o servidor, execute o seguinte comando no terminal:

   ```bash
   node server.js
   ```

   Agora, abra seu navegador e vá para `http://localhost:3000`. Você verá a mensagem "Olá, mundo! 🌍".

---

## 🛣️ Roteamento básico com Express

O roteamento no Express.js é uma forma de definir como o seu servidor responde às diferentes requisições HTTP (como `GET`, `POST`, etc.) para diferentes endpoints (caminhos de URL).

### **Exemplo de roteamento básico:**

Adicione as seguintes rotas ao seu arquivo `server.js`:

```javascript
// Rota raiz (home)
app.get('/', (req, res) => {
    res.send('Página Inicial');
});

// Rota sobre (about)
app.get('/about', (req, res) => {
    res.send('Sobre nós');
});

// Rota de contato
app.get('/contact', (req, res) => {
    res.send('Contato');
});
```

### **Explicação:**
- **`app.get()`**: Define uma rota que responde a requisições GET. Você também pode usar `app.post()`, `app.put()`, `app.delete()`, etc., para outras requisições HTTP.
- **`req` (request)**: Representa a solicitação feita pelo cliente. Contém informações como parâmetros, corpo da solicitação, cabeçalhos, etc.
- **`res` (response)**: Representa a resposta que será enviada ao cliente. Você pode usar métodos como `res.send()` para enviar uma resposta de texto simples.

---

## 🧩 Middlewares: o que são e como usá-los?

**Middlewares** são funções que têm acesso ao objeto de requisição (`req`), ao objeto de resposta (`res`) e à próxima função middleware no ciclo de solicitação-resposta de uma aplicação Express. Eles podem executar código, modificar a requisição e a resposta, encerrar o ciclo de requisição-resposta ou chamar a próxima função middleware.

### **Para que servem os middlewares?**
- **Processamento de solicitações:** Analise e manipule os dados das solicitações antes de enviá-los para a rota.
- **Autenticação:** Verifique se o usuário está autenticado antes de acessar determinadas rotas.
- **Logging:** Registre as requisições e respostas para monitoramento e depuração.
- **Servir arquivos estáticos:** Como imagens, CSS, JavaScript, etc.

### **Exemplo básico de middleware:**

```javascript
// Middleware que registra o método e a URL de cada requisição
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next(); // Passa o controle para o próximo middleware ou rota
});

// Rota de exemplo
app.get('/', (req, res) => {
    res.send('Olá, Mundo!');
});
```

### **Explicação:**
- **`app.use()`**: Aplica o middleware a todas as rotas.
- **`next()`**: Chama a próxima função middleware na pilha. Se você não chamar `next()`, a solicitação será suspensa e a resposta não será enviada.

---

Com isso, você aprendeu o básico sobre o Express.js, como configurar um servidor simples, realizar roteamento básico e usar middlewares para adicionar funcionalidades à sua aplicação. No próximo arquivo, vamos explorar ainda mais recursos poderosos do Express.js. 🚀


