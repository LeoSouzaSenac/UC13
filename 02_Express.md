# 📚 Introduction to Express.js

## O que é o Express.js?

**Express.js** é um framework para **Node.js** que ajuda a criar servidores web e APIs de maneira simples e eficiente. Com Express, você pode definir rotas, lidar com requisições e respostas HTTP, e adicionar funcionalidades adicionais com o uso de middlewares.

### 🛠️ **Principais características do Express.js:**
- **Leve e rápido:** Adiciona funcionalidades ao Node.js sem sacrificar o desempenho.
- **Flexível:** Permite configurar sua aplicação de acordo com suas necessidades, utilizando middlewares e módulos.
- **Roteamento poderoso:** Define como as aplicações respondem a diferentes rotas e métodos HTTP.
- **Suporte a middlewares:** Adiciona funcionalidades como autenticação, logging, e mais através de middlewares.

---

## ⚙️ Configurando um servidor básico com Express.js

Vamos começar criando um servidor básico usando Express.js para entender como ele funciona na prática.

### 1. **Instalando o Express.js**
   Primeiro, você precisa ter o Node.js e o npm instalados. Crie um novo diretório para o seu projeto e inicialize um projeto Node.js:

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
   // Importa o módulo Express
   const express = require('express');
   
   // Cria uma aplicação Express
   const app = express();

   // Define uma rota para o caminho raiz ('/')
   app.get('/', (req, res) => {
       res.send('Olá, mundo! 🌍');
   });

   // Faz o servidor ouvir na porta 3000
   app.listen(3000, () => {
       console.log('Servidor rodando na porta 3000 🚀');
   });
   ```

### **Anatomia do código:**
Vamos entender cada parte do código acima:

1. **`const express = require('express');`**
   - **O que faz:** Esta linha importa o módulo Express para o seu projeto. O Express fornece funcionalidades que facilitam a criação de servidores web.
   - **Por que usar:** Sem essa linha, você não poderia usar nenhuma das funcionalidades do Express no seu código.

2. **`const app = express();`**
   - **O que faz:** Cria uma instância da aplicação Express, que será usada para definir rotas, configurar middlewares e iniciar o servidor.
   - **Por que usar:** Esta instância (`app`) é onde você configura como seu servidor vai responder às requisições HTTP.

3. **`app.get('/', (req, res) => { ... });`**
   - **O que faz:** Define uma rota que responde a uma requisição HTTP do tipo `GET` para o caminho raiz `'/'`. Quando alguém acessa `http://localhost:3000/`, essa rota envia a resposta "Olá, mundo! 🌍".
   - **Parâmetros:**
     - **`'/'`**: Este é o caminho da URL. `'/'` indica a página inicial do site.
     - **`(req, res)`**: Função callback que é executada quando a rota é acessada. `req` representa a requisição do cliente, e `res` é a resposta que o servidor envia de volta.
     - **`res.send('Olá, mundo! 🌍');`**: Envia a mensagem "Olá, mundo!" como resposta.

4. **`app.listen(3000, () => { ... });`**
   - **O que faz:** Faz o servidor começar a "ouvir" requisições na porta 3000. Quando o servidor está ativo, ele pode processar requisições e enviar respostas.
   - **Por que usar:** Sem essa linha, o servidor não estaria disponível para responder às requisições.

   - **`3000`**: É o número da porta onde o servidor estará rodando. Isso significa que você acessa seu servidor através de `http://localhost:3000`.
   - **Função callback:** O código dentro de `() => { console.log('Servidor rodando na porta 3000 🚀'); }` é executado quando o servidor começa a rodar, exibindo uma mensagem no console.

### 3. **Executando o servidor**
   Para iniciar o servidor, execute o seguinte comando no terminal:

   ```bash
   node server.js
   ```

   Agora, abra seu navegador e vá para `http://localhost:3000`. Você verá a mensagem "Olá, mundo! 🌍".

---

## 🛣️ Roteamento básico com Express

### **O que são rotas?**
No contexto do Express.js, uma **rota** é uma forma de definir como sua aplicação vai responder a uma requisição HTTP feita para um determinado caminho (URL). Cada rota pode estar associada a diferentes métodos HTTP, como `GET`, `POST`, `PUT`, `DELETE`, entre outros.

### **Exemplo de roteamento básico:**

Vamos adicionar algumas rotas adicionais ao nosso servidor. Edite o `server.js` para incluir o seguinte código:

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

### **Entendendo o código:**
- **`app.get('/about', (req, res) => { ... });`**: Aqui, estamos definindo uma nova rota para o caminho `/about`. Quando um usuário acessa `http://localhost:3000/about`, a resposta enviada é "Sobre nós".
- **`req` (request)**: O objeto `req` contém informações sobre a solicitação feita pelo cliente, como parâmetros da URL, dados enviados no corpo da requisição, cabeçalhos, etc.
- **`res` (response)**: O objeto `res` é usado para enviar uma resposta ao cliente. Por exemplo, `res.send()` envia uma resposta de texto simples.

### **Resumindo rotas:**
- Uma **rota** é composta por um caminho (URL) e um método HTTP.
- Você pode definir diferentes rotas para diferentes caminhos e métodos HTTP, permitindo que sua aplicação responda de maneira específica a cada requisição.

---

## 🧩 Middlewares: o que são e como usá-los?

### **O que são Middlewares?**
Middlewares são funções que ficam no "meio" do processamento de uma requisição e a resposta final. Eles podem ser usados para manipular os dados da requisição, verificar permissões, fazer logs, entre outras tarefas, antes de passar a execução para a próxima etapa (ou rota).

### **Para que servem os middlewares?**
- **Processar dados da requisição:** Como por exemplo, analisar dados JSON ou realizar validações antes que a rota final seja alcançada.
- **Autenticação:** Verificar se o usuário tem permissão para acessar uma rota específica.
- **Logging:** Registrar informações sobre as requisições, como quem acessou e quando, para fins de monitoramento.
- **Servir arquivos estáticos:** Como imagens, arquivos CSS, e scripts JavaScript que estão disponíveis diretamente para o cliente.

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

### **Entendendo o código:**
- **`app.use()`**: Este método aplica o middleware a todas as rotas e métodos HTTP. No exemplo, ele registra o método HTTP e a URL de cada requisição feita ao servidor.
- **`next()`**: Chama a próxima função middleware na sequência de execução. Se você não chamar `next()`, a requisição não prosseguirá, e a resposta não será enviada.
- **O que faz:** Cada vez que uma requisição chega ao servidor, esse middleware é executado primeiro, registrando no console o método (`GET`, `POST`, etc.) e o caminho (`/`, `/about`, etc.) acessado.

### **Resumindo middlewares:**
- **Middlewares** ajudam a manipular as requisições antes que cheguem às rotas definidas.
- Eles podem ser usados para autenticação, logs, processar dados e muito mais.
- O uso do `next()` é essencial para que a requisição prossiga e seja tratada por outros middlewares ou chegue à rota correta.

---

Com essas explicações, você agora entende o que é o Express.js, como configurar um servidor básico, como definir rotas e como usar middlewares para adicionar funcionalidades ao seu aplicativo. No próximo arquivo, exploraremos mais funcionalidades avançadas do Express.js. 🚀
