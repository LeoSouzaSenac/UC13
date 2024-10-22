document.getElementById('loginForm').addEventListener('submit', async (e) => {
    e.preventDefault();

    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    });

    const messageElement = document.getElementById('message');

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('token', data.token); // Armazena o token
        window.location.href = 'user.html'; 
    } else {
        const errorMessage = await response.text();
        messageElement.textContent = errorMessage; // Exibe mensagem de erro
    }
});
