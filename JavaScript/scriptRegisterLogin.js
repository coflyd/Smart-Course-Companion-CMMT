/*  ======================================
SMART COURSE COMPANION — scriptRegisterLogin.js
Auteur : Constance Fleury
Description: Register Login Page HTML
========================================  */

function switchTab(tab) {

  const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function(btn) {
      btn.classList.remove('active');
    });

  // fields Sign Up
  const fieldName    = document.getElementById('field-name');
  const fieldConfirm = document.getElementById('field-confirm');
  const submitBtn    = document.getElementById('submit-btn');

  if (tab === 'login') {
    // Activate the Login tab button
    tabs[0].classList.add('active');

    fieldName.style.display    = 'none';
    fieldConfirm.style.display = 'none';

    //submit button label
    submitBtn.textContent = 'Sign In';

  } else {
    // Activate the Sign Up tab button
    tabs[1].classList.add('active');

    fieldName.style.display    = 'flex';
    fieldConfirm.style.display = 'flex';

    //submit button label
    submitBtn.textContent = 'Create Account';
  }

}

function switchToggle(role) {
    const toggles = document.querySelectorAll('.toggle');
  
    toggles.forEach(function(btn) {
      btn.classList.remove('active');
    });
  
    // Add active to the clicked one
    if (role === 'Student') {
      toggles[0].classList.add('active');
    } else {
      toggles[1].classList.add('active');
    }
  }

async function handleSubmit() {
    const activeTab = document.querySelector('.tab.active');
    const isLogin = activeTab.textContent.trim() === 'Login';
    const activeToggle = document.querySelector('.toggle.active');
    const role = activeToggle ? activeToggle.textContent.trim().toLowerCase() : 'student';
    const email = document.getElementById('input-email').value;
    const password = document.getElementById('input-password').value;
    const name = document.getElementById('input-name').value;

    if (!email || !password) {
        alert('Please fill in all fields');
        return;
    }

    if (isLogin) {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password })
        });
        const data = await response.json();
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('role', data.role);
            if (data.role === 'instructor') {
                window.location.href = '../HTML/InstructorDashboard.html';
            } else {
                window.location.href = '../HTML/student-dashboard.html';
            }
        } else {
            alert(data.error);
        }
    } else {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password, role })
        });
        const data = await response.json();
        if (data.message) {
            alert('Account created! Please login.');
            switchTab('login');
        } else {
            alert(data.error);
        }
    }
}
