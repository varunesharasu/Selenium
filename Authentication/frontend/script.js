const apiUrl = 'http://localhost:3001';

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
  } catch (err) {
    msg.textContent = 'Error connecting to server';
    msg.style.color = 'red';
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
  } catch (err) {
    msg.textContent = 'Error connecting to server';
    msg.style.color = 'red';
  }
});
