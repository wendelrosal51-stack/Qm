// Check if user is logged in when page loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.loggedIn) {
            // Update username display
            document.getElementById('usernameDisplay').textContent = data.username;
        } else {
            // Redirect to login if not logged in
            window.location.href = '/';
        }
    } catch (error) {
        console.error('Error checking login status:', error);
        window.location.href = '/';
    }
});

// Toggle dropdown menu
const profileSection = document.getElementById('profileSection');
const profileDropdown = document.getElementById('profileDropdown');

profileSection.addEventListener('click', (e) => {
    e.stopPropagation();
    profileDropdown.classList.toggle('show');
});

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    profileDropdown.classList.remove('show');
});

// Logout functionality
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

// View Profile (placeholder)
document.getElementById('viewProfile').addEventListener('click', (e) => {
    e.preventDefault();
    window.alert('Profile page coming soon!');
});

// Settings (placeholder)
document.getElementById('settings').addEventListener('click', (e) => {
    e.preventDefault();
    window.alert('Settings page coming soon!');
});