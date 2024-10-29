// Adiciona um listener que aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener('DOMContentLoaded', async () => {
    // Obtém o token de autenticação armazenado no localStorage
    const token = localStorage.getItem('token');

    // Verifica se o token não está presente; caso esteja ausente, redireciona o usuário para a página de login
    if (!token) {
        window.location.href = 'login.html'; // Redireciona o usuário para a página de login
        return; // Interrompe a execução do código restante nesta função
    }

    // Realiza uma solicitação para a API para obter dados do usuário autenticado
    const response = await fetch('http://localhost:3000/user', {
        method: 'GET', // Método HTTP GET para recuperar dados
        headers: {
            'Authorization': `Bearer ${token}` // Adiciona o token ao cabeçalho de autorização para autenticar a solicitação
        }
    });

    // Seleciona os elementos onde as informações do usuário serão exibidas
    const userEmailElement = document.getElementById('userEmail');
    const messageElement = document.getElementById('message');

    // Verifica se a resposta da API foi bem-sucedida (status HTTP 200)
    if (response.ok) {
        // Converte a resposta em JSON para acessar os dados do usuário
        const userData = await response.json();
        
        // Exibe o email do usuário no elemento designado da página
        userEmailElement.textContent = userData.email; 

        // Preenche o campo de entrada 'newEmail' com o email atual do usuário
        document.getElementById('newEmail').value = userData.email; 
    } else {
        // Caso haja erro na resposta da API, exibe uma mensagem de erro no elemento 'message'
        messageElement.textContent = 'Erro ao obter dados do usuário.';
    }
});
