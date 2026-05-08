window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.loggedIn) {
            document.getElementById('usernameDisplay').textContent = data.username;
        } else {
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        window.location.href = '/';
    }
});

const profileSection = document.getElementById('profileSection');
const profileDropdown = document.getElementById('profileDropdown');

profileSection.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
});

document.addEventListener('click', () => {
    profileDropdown.classList.remove('show');
});

document.getElementById('logoutBtn').addEventListener('click', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/logout', {
            method: 'POST'
        });
        
        if (response.ok) {
            window.alert('Logged out successfully!');
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error logging out:', error);
        window.alert('Error logging out. Please try again.');
    }
});

document.getElementById('viewProfile').addEventListener('click', (e) => {
    e.preventDefault();
    window.alert('Profile page coming soon!');
});

document.getElementById('settings').addEventListener('click', (e) => {
    e.preventDefault();
    window.alert('Settings page coming soon!');
});