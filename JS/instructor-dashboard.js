/* ==============================================
   INSTRUCTOR — instructor-dashboard.js
   Dashboard instructeur : Add Course
   ============================================== */

function ouvrirModale() {
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('modale').classList.add('visible');
}

function fermerModale() {
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('modale').classList.remove('visible');
}

/* ── Ajouter un cours dans la grille ── */
function ajouterCours() {
  const code     = document.getElementById('m-code').value.trim();
  const nom      = document.getElementById('m-nom').value.trim();
  const semestre = document.getElementById('m-semestre').value;

  if (!code || !nom) {
    alert('Please fill in at least the Course Code and Name.');
    return;
  }

  const couleurs = ['#7b6cf6', '#a78bfa', '#c4b5fd', '#818cf8', '#6366f1'];
  const couleur  = couleurs[Math.floor(Math.random() * couleurs.length)];

  const grille = document.getElementById('grille-cours');
  const carte  = document.createElement('a');
  carte.href       = 'instructor-course.html';
  carte.className  = 'carte-cours';

  carte.innerHTML = `
    <div class="carte-couleur" style="background-color: ${couleur};"></div>
    <div class="carte-corps">
      <span class="carte-code">${code}</span>
      <h3 class="carte-nom">${nom}</h3>
      <hr class="carte-separateur">
      <div class="carte-info">
        <span>Semester: <strong>${semestre || '—'}</strong></span>
        <span>Students: <strong>0</strong></span>
      </div>
    </div>
  `;

  grille.appendChild(carte);

  document.getElementById('m-code').value     = '';
  document.getElementById('m-nom').value      = '';
  document.getElementById('m-semestre').value = '';
  fermerModale();
}
