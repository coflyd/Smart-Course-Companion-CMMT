/*
  SMART COURSE COMPANION — registerLogin.js
  Login / Register page logic
  Auteur : Constance Fleury
*/

/* current tab and role */
let ongletActif = 'register';
let roleActif   = 'student';

/* ── Switch Login / Register ── */
function switchOnglet(onglet) {
  ongletActif = onglet;

  const boutons = document.querySelectorAll('.onglet');
  boutons.forEach(function(btn) { btn.classList.remove('actif'); });

  if (onglet === 'login') {
    boutons[0].classList.add('actif');
  } else {
    boutons[1].classList.add('actif');
  }

  const champNom   = document.getElementById('champ-nom');
  const champConf  = document.getElementById('champ-confirmation');
  const btnSubmit  = document.getElementById('btn-submit');

  if (onglet === 'login') {
    champNom.style.display  = 'none';
    champConf.style.display = 'none';
    btnSubmit.textContent   = 'Sign In';
  } else {
    champNom.style.display  = 'flex';
    champConf.style.display = 'flex';
    btnSubmit.textContent   = 'Create Account';
  }
}

/* ── Switch Student / Instructor ── */
function switchRole(role) {
  roleActif = role;
  const boutons = document.querySelectorAll('.toggle');
  boutons.forEach(function(btn) { btn.classList.remove('actif'); });
  if (role === 'student') {
    boutons[0].classList.add('actif');
  } else {
    boutons[1].classList.add('actif');
  }
}

/* ── Submit ── */
function handleSubmit() {

  const email = document.getElementById('email').value.trim();
  const mdp   = document.getElementById('mdp').value;

  /* Basic validation */
  if (!email || !mdp) {
    afficherErreur('Please fill in all required fields.');
    return;
  }

  if (ongletActif === 'register') {
    /* --- REGISTER --- */
    const nom  = document.getElementById('nom').value.trim();
    const mdp2 = document.getElementById('mdp2').value;

    if (!nom) {
      afficherErreur('Please enter your full name.');
      return;
    }

    if (mdp !== mdp2) {
      afficherErreur('Passwords do not match. Please try again.');
      return;
    }

    /* Simulate : email already exists check
       When backend is connected, replace this block with a real API call */
    const emailsExistants = ['test@test.com', 'admin@concordia.ca'];
    if (emailsExistants.includes(email.toLowerCase())) {
      afficherErreur('An account already exists with this email. Please sign in.');
      return;
    }

    /* Success : show confirmation popup */
    afficherPopupSucces();

  } else {
    /* --- LOGIN --- */
    /* When backend is connected, replace with real auth check */
    redirect();
  }
}

/* ── Redirect after login ── */
function redirect() {
  if (roleActif === 'student') {
    window.location.href = 'student-dashboard.html';
  } else {
    window.location.href = 'instructor-dashboard.html';
  }
}

/* ── Show inline error message ── */
function afficherErreur(message) {
  let errEl = document.getElementById('msg-erreur');
  if (!errEl) {
    errEl = document.createElement('p');
    errEl.id = 'msg-erreur';
    errEl.className = 'msg-erreur';
    const form = document.querySelector('form');
    form.insertBefore(errEl, form.firstChild);
  }
  errEl.textContent = message;
  errEl.style.display = 'block';
}

/* ── Show success popup (register) ── */
function afficherPopupSucces() {
  document.getElementById('popup-succes').style.display = 'flex';
}

function fermerPopup() {
  document.getElementById('popup-succes').style.display = 'none';
  /* Switch to login tab after closing */
  switchOnglet('login');
}
