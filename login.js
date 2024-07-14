document.getElementById('loginButton').addEventListener('click', function(event) {
    const emailInput = document.querySelector('input[type="email"]');
    const passwordInput = document.querySelector('input[type="password"]');

    if (!emailInput.value) {
        alert('Please enter your email.');
        emailInput.focus();
        event.preventDefault();
        return;
    }

    if (!passwordInput.value) {
        alert('Please enter your password.');
        passwordInput.focus();
        event.preventDefault();
        return;
    }

    // Redirect to index.html page
    window.location.href = 'index.html';
});