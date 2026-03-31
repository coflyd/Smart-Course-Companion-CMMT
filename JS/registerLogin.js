/* ==============================================
   SMART COURSE COMPANION — registerLogin.js
   Logique de la page de connexion / inscription
   Auteur : Constance Fleury
   ============================================== */

/* Onglet actif : 'login' ou 'register' */
let ongletActif = 'register';

/* Rôle sélectionné : 'student' ou 'instructor' */
let roleActif = 'student';

/* ── Basculer entre Login et Register ── */
function switchOnglet(onglet) {
  ongletActif = onglet;

  /* Met à jour l'apparence des boutons */
  const boutons = document.querySelectorAll('.onglet');
  boutons.forEach(function(btn) {
    btn.classList.remove('actif');
  });

  if (onglet === 'login') {
    boutons[0].classList.add('actif');
  } else {
    boutons[1].classList.add('actif');
  }

  /* Affiche ou cache les champs Register seulement */
  const champNom          = document.getElementById('champ-nom');
  const champConfirmation = document.getElementById('champ-confirmation');
  const btnSubmit         = document.getElementById('btn-submit');

  if (onglet === 'login') {
    champNom.style.display          = 'none';
    champConfirmation.style.display = 'none';
    btnSubmit.textContent           = 'Sign In';
  } else {
    champNom.style.display          = 'flex';
    champConfirmation.style.display = 'flex';
    btnSubmit.textContent           = 'Create Account';
  }
}

/* ── Basculer entre Student et Instructor ── */
function switchRole(role) {
  roleActif = role;

  const boutons = document.querySelectorAll('.toggle');
  boutons.forEach(function(btn) {
    btn.classList.remove('actif');
  });

  if (role === 'student') {
    boutons[0].classList.add('actif');
  } else {
    boutons[1].classList.add('actif');
  }
}

/* ── Soumettre le formulaire ── */
function handleSubmit() {
  /* Redirection selon le rôle choisi */
  if (roleActif === 'student') {
    window.location.href = '../HTML/student-dashboard.html';
  } else {
    window.location.href = '../HTML/instructor-dashboard.html';
  }
}

/* ── Initialisation au chargement ── */
/* On démarre en mode Register, donc on cache les champs Register
   et on les affiche selon l'état initial */
window.addEventListener('load', function() {
  /* L'état par défaut est Register (bouton "Register" actif dès le départ) */
  /* Les champs nom et confirmation sont déjà visibles (display: flex par défaut) */
});
