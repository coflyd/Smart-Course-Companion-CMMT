/* ==============================================
   SMART COURSE COMPANION — shared.js
   Fonctions communes aux deux branches
   ============================================== */

/* ── Sign Out ──
   Redirige vers la page de login quand on clique Sign Out */
function signOut() {
  window.location.href = '../HTML/registerLogin.html';
}

/* ── Lien actif dans la navigation ──
   Met la classe "actif" sur le lien qui correspond à la page courante */
function marquerLienActif() {
  /* Récupère le nom du fichier de la page courante (ex: "student-dashboard.html") */
  const pageCourante = window.location.pathname.split('/').pop();

  /* Sélectionne tous les liens de navigation */
  const liens = document.querySelectorAll('.header-nav a');

  liens.forEach(function(lien) {
    const hrefFichier = lien.getAttribute('href').split('/').pop();
    if (hrefFichier === pageCourante) {
      lien.classList.add('actif');
    }
  });
}

/* Lance marquerLienActif dès que la page est chargée */
window.addEventListener('load', marquerLienActif);

/* NOTE : la modale Add Course ne s'ouvre PAS automatiquement.
   Elle s'ouvrira au clic sur le bouton "+ Add Course".
   Quand la BD sera connectée, on pourra vérifier si des cours
   existent déjà avant de proposer l'ajout. */
