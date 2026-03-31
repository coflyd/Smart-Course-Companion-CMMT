/* ==============================================
   STUDENT — student-dashboard.js
   Logique du dashboard étudiant (Add Course)
   ============================================== */

/* ── Ouvrir la modale Add Course ── */
function ouvrirModale() {
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('modale').classList.add('visible');
}

/* ── Fermer la modale ── */
function fermerModale() {
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('modale').classList.remove('visible');
}

/* ── Ajouter un cours dans la grille ──
   Pour l'instant : ajoute une carte statique dans la grille.
   Plus tard : enverra les données à la base de données. */
function ajouterCours() {
  /* Lecture des champs */
  const code  = document.getElementById('m-code').value.trim();
  const nom   = document.getElementById('m-nom').value.trim();
  const prof  = document.getElementById('m-prof').value.trim();
  const term  = document.getElementById('m-term').value.trim();

  /* Vérification : tous les champs obligatoires */
  if (!code || !nom) {
    alert('Please fill in at least the Course Code and Title.');
    return;
  }

  /* Couleurs disponibles pour les nouvelles cartes */
  const couleurs = ['#6092ff', '#94b5fd', '#a78bfa', '#34d399', '#f59e0b', '#f87171'];
  const couleur  = couleurs[Math.floor(Math.random() * couleurs.length)];

  /* Création de la carte */
  const grille = document.getElementById('grille-cours');

  const carte = document.createElement('a');
  carte.href  = 'student-class.html';
  carte.className = 'carte-cours';

  carte.innerHTML = `
    <div class="carte-couleur" style="background-color: ${couleur};"></div>
    <div class="carte-corps">
      <span class="carte-code">${code}</span>
      <h3 class="carte-nom">${nom}</h3>
      <hr class="carte-separateur">
      <div class="carte-info">
        <span>Instructor: <strong>${prof || '—'}</strong></span>
        <span>Term: <strong>${term || '—'}</strong></span>
      </div>
    </div>
  `;

  grille.appendChild(carte);

  /* Réinitialise les champs et ferme la modale */
  document.getElementById('m-code').value = '';
  document.getElementById('m-nom').value  = '';
  document.getElementById('m-prof').value = '';
  document.getElementById('m-term').value = '';

  fermerModale();
}
