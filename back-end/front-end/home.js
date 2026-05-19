// Check if user is logged in when page loads
window.addEventListener('DOMContentLoaded', async () => {
    try {
        const response = await fetch('/api/user');
        const data = await response.json();
        
        if (data.loggedIn) {
            const usernameDisplay = document.getElementById('usernameDisplay');
            const adminLink = document.getElementById('adminLink');

            if (usernameDisplay) {
                usernameDisplay.textContent = data.username;
            }

            if (adminLink && data.role === 'admin') {
                adminLink.style.display = 'inline-block';
            }
        } else {
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

if (profileSection && profileDropdown) {
    profileSection.addEventListener('click', (e) => {
        e.stopPropagation();
        profileDropdown.classList.toggle('show');
    });
}

// Close dropdown when clicking outside
document.addEventListener('click', () => {
    if (profileDropdown) {
        profileDropdown.classList.remove('show');
    }
});

// Logout functionality
const logoutBtn = document.getElementById('logoutBtn');

if (logoutBtn) {
logoutBtn.addEventListener('click', async (e) => {
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
}

const viewProfile = document.getElementById('viewProfile');

if (viewProfile) {
viewProfile.addEventListener('click', (e) => {
    e.preventDefault();
    window.location.href = '/profile.html';
});
}

// Settings (placeholder)
const settingsLink = document.getElementById('settings');

if (settingsLink) {
settingsLink.addEventListener('click', (e) => {
    e.preventDefault();
    window.alert('Settings page coming soon!');
});
}
