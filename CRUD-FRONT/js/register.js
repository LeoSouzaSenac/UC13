// Adiciona um listener de evento ao formulário com o ID 'registerForm' para escutar o evento de submissão
document.getElementById('registerForm').addEventListener('submit', async (e) => {
    // Previne o comportamento padrão do formulário, que é recarregar a página ao enviar
    e.preventDefault();

    // Obtém os valores dos campos de entrada de email e senha
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    // Envia uma solicitação HTTP para o servidor na rota '/register' usando o método POST
    const response = await fetch('http://localhost:3000/register', {
        method: 'POST', // Define o método HTTP como POST, ideal para enviar dados ao servidor
        headers: { 'Content-Type': 'application/json' }, // Define o cabeçalho para indicar que os dados estão em JSON
        // Converte os valores de email e senha para uma string JSON para enviar no corpo da solicitação
        body: JSON.stringify({ email, password })
    });

    // Seleciona o elemento que exibirá a mensagem de sucesso ou erro, identificado pelo ID 'message'
    const messageElement = document.getElementById('message');

    // Verifica se a resposta do servidor foi bem-sucedida (status HTTP 200)
    if (response.ok) {
        // Se o registro for bem-sucedido, exibe uma mensagem de confirmação
        messageElement.textContent = 'Usuário registrado com sucesso!';
        
        // Usa `setTimeout` para redirecionar o usuário para a página de login após 2 segundos
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 2000); // Espera 2000 milissegundos (2 segundos) antes de redirecionar
    } else {
        // Caso a resposta não seja bem-sucedida, extrai a mensagem de erro do corpo da resposta
        const errorMessage = await response.text();
        // Define o texto do elemento de mensagem para mostrar o erro na interface do usuário
        messageElement.textContent = errorMessage;
    }
});
