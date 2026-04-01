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


function handleSubmit() {
    const activeToggle = document.querySelector('.toggle.active');
    const role = activeToggle ? activeToggle.textContent.trim() : 'Student';
    if (role === 'Instructor') {
        window.location.href = '../HTML/InstructorDashboard.html';
    } else {
        window.location.href = '../HTML/student-ui.html';
    }
}

