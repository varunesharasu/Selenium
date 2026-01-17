// Get username from localStorage and show it
const username = localStorage.getItem('auth_username');
const usernameSpan = document.getElementById('dashboardUsername');
if (username) {
  usernameSpan.textContent = username;
} else {
  // If not logged in, redirect to login page
  window.location.href = 'index.html';
}

document.getElementById('logoutBtn').addEventListener('click', () => {
  localStorage.removeItem('auth_username');
  window.location.href = 'index.html';
});
