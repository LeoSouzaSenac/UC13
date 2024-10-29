// Adiciona um listener de evento ao formulário com o ID 'loginForm' para escutar o evento de submissão
document.getElementById('loginForm').addEventListener('submit', async (e) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página ao enviar
    e.preventDefault();

    // Obtém os valores dos campos de entrada de email e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Envia uma solicitação HTTP para o servidor na rota '/login' usando o método POST
    const response = await fetch('http://localhost:3000/login', {
        method: 'POST', // Define o método HTTP como POST, geralmente usado para enviar dados ao servidor
        headers: {
            'Content-Type': 'application/json' // Define o tipo de conteúdo como JSON para o servidor entender o formato dos dados
        },
        // Converte o email e a senha em uma string JSON para enviar no corpo da solicitação
        body: JSON.stringify({ email, password })
    });

    // Seleciona o elemento que exibirá a mensagem de sucesso ou erro, identificado pelo ID 'message'
    const messageElement = document.getElementById('message');

    // Verifica se a resposta do servidor foi bem-sucedida (status HTTP 200)
    if (response.ok) {
        // Converte a resposta em JSON para extrair dados, como o token
        const data = await response.json();
        // Armazena o token de autenticação no armazenamento local do navegador (localStorage) para uso futuro
        localStorage.setItem('token', data.token); 
        // Redireciona o usuário para a página 'user.html' após o login bem-sucedido
        window.location.href = 'user.html'; 
    } else {
        // Caso a resposta não seja bem-sucedida, extrai a mensagem de erro do corpo da resposta
        const errorMessage = await response.text();
        // Define o texto do elemento de mensagem para mostrar o erro na interface do usuário
        messageElement.textContent = errorMessage; 
    }
});
