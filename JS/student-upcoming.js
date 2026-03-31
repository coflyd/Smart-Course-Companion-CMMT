/* ==============================================
   STUDENT — student-upcoming.js
   Upcoming Assignments : ajout et suppression de lignes
   ============================================== */

/* ── Ouvrir / fermer la modale ── */
function ouvrirModale() {
  document.getElementById('overlay').classList.add('visible');
  document.getElementById('modale').classList.add('visible');
}

function fermerModale() {
  document.getElementById('overlay').classList.remove('visible');
  document.getElementById('modale').classList.remove('visible');
}

/* ── Ajouter un assignment dans le tableau ── */
function ajouterAssignment() {
  const classe = document.getElementById('a-class').value.trim();
  const titre  = document.getElementById('a-titre').value.trim();
  const date   = document.getElementById('a-date').value;
  const status = document.getElementById('a-status').value;

  /* Vérification des champs obligatoires */
  if (!classe || !titre) {
    alert('Please fill in at least the Class and Title.');
    return;
  }

  /* Formater la date pour l'affichage */
  let dateAffiche = '—';
  if (date) {
    const d = new Date(date + 'T00:00:00');
    dateAffiche = d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  }

  /* Créer la nouvelle ligne du tableau */
  const tbody = document.getElementById('tableau-body');
  const tr    = document.createElement('tr');

  tr.innerHTML = `
    <td><span class="badge">${classe}</span></td>
    <td>${titre}</td>
    <td>${dateAffiche}</td>
    <td>
      <select class="select-status">
        <option ${status === 'Not Started' ? 'selected' : ''}>Not Started</option>
        <option ${status === 'On Going'    ? 'selected' : ''}>On Going</option>
        <option ${status === 'Completed'   ? 'selected' : ''}>Completed</option>
      </select>
    </td>
    <td>
      <button class="btn-danger btn-sm" onclick="supprimerLigne(this)">Delete</button>
    </td>
  `;

  tbody.appendChild(tr);

  /* Réinitialiser les champs et fermer */
  document.getElementById('a-class').value  = '';
  document.getElementById('a-titre').value  = '';
  document.getElementById('a-date').value   = '';
  document.getElementById('a-status').value = 'Not Started';

  fermerModale();
}

/* ── Supprimer une ligne du tableau ──
   'bouton' est le bouton Delete cliqué */
function supprimerLigne(bouton) {
  /* Remonte jusqu'à la ligne <tr> parente */
  const ligne = bouton.closest('tr');
  ligne.remove();
}
