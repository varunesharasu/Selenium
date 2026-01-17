const apiUrl = 'http://localhost:3001';

// Tab switching functionality
const tabBtns = document.querySelectorAll('.tab-btn');
const registerSection = document.getElementById('register-section');
const loginSection = document.getElementById('login-section');

tabBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const tab = btn.getAttribute('data-tab');
    
    // Update active tab button
    tabBtns.forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    
    // Switch form sections
    if (tab === 'register') {
      registerSection.classList.add('active');
      loginSection.classList.remove('active');
    } else {
      loginSection.classList.add('active');
      registerSection.classList.remove('active');
    }
  });
});

document.getElementById('registerForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('regUsername').value;
  const password = document.getElementById('regPassword').value;
  const msg = document.getElementById('registerMsg');
  msg.textContent = '';
  try {
    const res = await fetch(apiUrl + '/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    msg.textContent = data.message;
    msg.style.color = res.ok ? 'green' : 'red';
    msg.style.background = res.ok ? '#d4edda' : '#f8d7da';
    msg.style.border = res.ok ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
    
    if (res.ok) {
      e.target.reset();
      // Switch to login tab after successful registration
      setTimeout(() => {
        document.querySelector('[data-tab="login"]').click();
      }, 1500);
    }
  } catch (err) {
    msg.textContent = 'Error connecting to server';
    msg.style.color = 'red';
    msg.style.background = '#f8d7da';
    msg.style.border = '1px solid #f5c6cb';
  }
});

document.getElementById('loginForm').addEventListener('submit', async (e) => {
  e.preventDefault();
  const username = document.getElementById('loginUsername').value;
  const password = document.getElementById('loginPassword').value;
  const msg = document.getElementById('loginMsg');
  msg.textContent = '';
  try {
    const res = await fetch(apiUrl + '/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password })
    });
    const data = await res.json();
    msg.textContent = data.message;
    msg.style.color = res.ok ? 'green' : 'red';
    msg.style.background = res.ok ? '#d4edda' : '#f8d7da';
    msg.style.border = res.ok ? '1px solid #c3e6cb' : '1px solid #f5c6cb';
    
    if (res.ok) {
      e.target.reset();
    }
  } catch (err) {
    msg.textContent = 'Error connecting to server';
    msg.style.color = 'red';
    msg.style.background = '#f8d7da';
    msg.style.border = '1px solid #f5c6cb';
  }
});
