/* ==============================================
   STUDENT — student-class.js
   Modales Edit et Delete sur la page détail cours
   ============================================== */

/* ── Edit Course ── */
function ouvrirEdit() {
  document.getElementById('overlay-edit').classList.add('visible');
  document.getElementById('modale-edit').classList.add('visible');
}

function fermerEdit() {
  document.getElementById('overlay-edit').classList.remove('visible');
  document.getElementById('modale-edit').classList.remove('visible');
}

/* ── Delete Course ── */
function ouvrirDelete() {
  document.getElementById('overlay-delete').classList.add('visible');
  document.getElementById('modale-delete').classList.add('visible');
}

function fermerDelete() {
  document.getElementById('overlay-delete').classList.remove('visible');
  document.getElementById('modale-delete').classList.remove('visible');
}

/* Confirmer la suppression : retour au dashboard */
function confirmerDelete() {
  window.location.href = 'student-dashboard.html';
}
