
// Adiciona um listener que aguarda o carregamento completo do DOM
document.addEventListener('DOMContentLoaded', async () => {
    // Obtém o token do localStorage
    const token = localStorage.getItem('token');

    // Verifica se não há token; se não houver, redireciona para a página de login
    if (!token) {
        window.location.href = 'login.html'; // Redireciona para o login se não houver token
        return; // Interrompe a execução do código
    }

    // Obtém dados do usuário da API
    const response = await fetch('http://localhost:3000/user', {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}` // Adiciona o token no cabeçalho de autorização
        }
    });

    // Seleciona os elementos onde as informações serão exibidas
    const userEmailElement = document.getElementById('userEmail');
    const messageElement = document.getElementById('message');

    // Verifica se a resposta da API foi bem-sucedida
    if (response.ok) {
        // Converte a resposta em JSON
        const userData = await response.json();
        userEmailElement.textContent = userData.email; // Exibe o email do usuário na página

        // Preenche os campos de entrada com os dados do usuário
        document.getElementById('newEmail').value = userData.email; // Preenche o novo email com o email atual
    } else {
        // Se houver erro ao obter dados do usuário, exibe uma mensagem
        messageElement.textContent = 'Erro ao obter dados do usuário.';
    }
 
});

