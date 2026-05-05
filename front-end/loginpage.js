document.getElementById("log").onclick = async function(event) {
    event.preventDefault();

    const username = document.getElementById("login-username").value;
    const password = document.getElementById("login-password").value;

    if (username.length === 0 && password.length === 0) {
        window.alert(`Please fill in both fields!`);
        return;
    } 
    else if (username.length === 0) {
        window.alert(`Please fill in Username / E-mail!`);
        return;
    } 
    else if (password.length === 0) {
        window.alert(`Please fill in Password!`);
        return;
    } 
    else {
        try {
            const response = await fetch('/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                window.alert(`You have Logged In! Welcome ${data.username}`);
                window.location.href = '/home.html';
            } else {
                window.alert(data.error);
            }
        } catch (error) {
            window.alert('Error logging in. Please try again.');
            console.error(error);
        }
    }
}