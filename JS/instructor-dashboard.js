/* ==============================================
   INSTRUCTOR — instructor-dashboard.js
   Dashboard : Add Course
   ============================================== */

function ouvrirModale() {
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('modale').classList.add('visible');
}

function fermerModale() {
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('modale').classList.remove('visible');
}

function ajouterCours() {
  const code     = document.getElementById('m-code').value.trim();
  const nom      = document.getElementById('m-nom').value.trim();
  const semestre = document.getElementById('m-semestre').value.trim();

  if (!code || !nom) {
    alert('Please fill in the Course Code and Name.');
    return;
  }

  const grille = document.getElementById('grille-cours');
  const carte  = document.createElement('a');
  carte.href        = 'instructor-course.html';
  carte.className   = 'carte-cours';

  carte.innerHTML = `
    <div class="carte-corps">
      <div class="carte-code">${code}</div>
      <div class="carte-nom">${nom}</div>
      <hr class="carte-sep">
      <div class="carte-ligne"><span>Semester</span><strong>${semestre || '—'}</strong></div>
      <div class="carte-ligne"><span>Students</span><strong>0</strong></div>
    </div>
  `;

  grille.appendChild(carte);

  document.getElementById('m-code').value     = '';
  document.getElementById('m-nom').value      = '';
  document.getElementById('m-semestre').value = '';
  fermerModale();
}
