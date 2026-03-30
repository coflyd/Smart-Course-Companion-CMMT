/* ============================================================
   SMART COURSE COMPANION — scriptRegisterLogin.js
   Auteur : Constance Fleury — mis à jour pour session
   ============================================================ */

function switchTab(tab) {
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(function (btn) { btn.classList.remove('active'); });

    const fieldName    = document.getElementById('field-name');
    const fieldConfirm = document.getElementById('field-confirm');
    const submitBtn    = document.getElementById('submit-btn');

    if (tab === 'login') {
        tabs[0].classList.add('active');
        fieldName.style.display    = 'none';
        fieldConfirm.style.display = 'none';
        submitBtn.textContent = 'Sign In';
    } else {
        tabs[1].classList.add('active');
        fieldName.style.display    = 'flex';
        fieldConfirm.style.display = 'flex';
        submitBtn.textContent = 'Create Account';
    }
}

function switchToggle(role) {
    const toggles = document.querySelectorAll('.toggle');
    toggles.forEach(function (btn) { btn.classList.remove('active'); });
    if (role === 'Student') {
        toggles[0].classList.add('active');
    } else {
        toggles[1].classList.add('active');
    }
}

function handleSubmit() {
    const activeToggle = document.querySelector('.toggle.active');
    const role = activeToggle ? activeToggle.textContent.trim().toLowerCase() : 'student';

    const nameField = document.getElementById('field-name');
    const nameInput = nameField ? nameField.querySelector('input') : null;
    const name = nameInput && nameInput.value.trim() !== ''
        ? nameInput.value.trim()
        : 'Utilisateur';

    /*
     * TODO : remplacer par un vrai appel API quand le backend sera prêt
     * fetch('/api/auth/login', { method: 'POST',
     *   headers: { 'Content-Type': 'application/json' },
     *   body: JSON.stringify({ email, password })
     * })
     * .then(res => res.json())
     * .then(data => {
     *     sessionStorage.setItem('user', JSON.stringify(data.user));
     *     redirect(data.user.role);
     * });
     */

    /* Simulation de session en attendant le backend */
    const user = { id: 1, name: name, role: role };
    sessionStorage.setItem('user', JSON.stringify(user));

    if (role === 'instructor') {
        window.location.href = '../HTML/InstructorDashboard.html';
    } else {
        window.location.href = '../HTML/student-ui.html';
    }
}
