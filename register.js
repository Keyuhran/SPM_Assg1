document.getElementById('signUpButton').addEventListener('click', function(event) {
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

    // Add additional signup logic here if needed

    // Redirect to login page after signup
    window.location.href = 'loginpage.html';
});