const URL_ = 'http://localhost:3000';

window.onload = function () {

    document.getElementById('login').addEventListener('submit', async function (event) {
        console.log('inside login');
        event.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        try {
            const response = await fetch(`${URL_}/login`, {
                method: 'POST',
                body: JSON.stringify({ username, password }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (response.ok) {
                const data = await response.json();
                const token = data.token;
                sessionStorage.setItem('authToken', JSON.stringify(data));
                window.location.href = 'display.html';
                
            } else {
                const errorMessage = document.getElementById('login-error');
                errorMessage.textContent = 'Invalid username or password';
                console.error('Failed to login:', response.status);
            }



        } catch (error) {
            console.error('Failed to login:', error);
        }
    })
}