/* ==============================================
   INSTRUCTOR — instructor-course.js
   Logique des onglets, assignments, settings
   ============================================== */

/* ── Changer d'onglet principal ── */
function switchOnglet(nom, boutonClique) {
  /* Cache toutes les sections */
  document.querySelectorAll('.tab-contenu').forEach(function(section) {
    section.classList.remove('actif');
  });

  /* Désactive tous les boutons d'onglet */
  document.querySelectorAll('.onglet-btn').forEach(function(btn) {
    btn.classList.remove('actif');
  });

  /* Affiche la section choisie et active le bouton */
  document.getElementById('tab-' + nom).classList.add('actif');
  boutonClique.classList.add('actif');
}

/* ── Changer de sous-onglet (Course Settings) ── */
function switchSousOnglet(nom, boutonClique) {
  /* Cache tous les sous-panels */
  document.querySelectorAll('.sous-tab').forEach(function(panel) {
    panel.classList.remove('actif');
  });

  /* Désactive tous les sous-boutons */
  document.querySelectorAll('.sous-onglet-btn').forEach(function(btn) {
    btn.classList.remove('actif');
  });

  /* Affiche le bon panel */
  document.getElementById('sous-' + nom).classList.add('actif');
  boutonClique.classList.add('actif');
}

/* ── Ajouter un assignment dans le tableau ── */
function ajouterAssignment() {
  const titre  = document.getElementById('a-titre').value.trim();
  const date   = document.getElementById('a-date').value;
  const poids  = document.getElementById('a-poids').value;
  const points = document.getElementById('a-points').value;

  if (!titre) {
    alert('Please enter an assignment title.');
    return;
  }

  /* Formater la date */
  let dateAffiche = '—';
  if (date) {
    const d = new Date(date + 'T00:00:00');
    dateAffiche = d.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  }

  const tbody = document.getElementById('tableau-assignments');
  const tr    = document.createElement('tr');

  tr.innerHTML = `
    <td>${titre}</td>
    <td>${dateAffiche}</td>
    <td>${poids ? poids + '%' : '—'}</td>
    <td>${points || '—'}</td>
    <td>0 / 13</td>
    <td><button class="btn-danger btn-sm" onclick="supprimerLigne(this)">Delete</button></td>
  `;

  tbody.appendChild(tr);

  /* Vider les champs */
  document.getElementById('a-titre').value  = '';
  document.getElementById('a-date').value   = '';
  document.getElementById('a-poids').value  = '';
  document.getElementById('a-points').value = '';
}

/* ── Supprimer une ligne du tableau ── */
function supprimerLigne(bouton) {
  bouton.closest('tr').remove();
}

/* ── Sélectionner un template ── */
function selectionnerTemplate(carte) {
  document.querySelectorAll('.template-carte').forEach(function(c) {
    c.classList.remove('actif');
  });
  carte.classList.add('actif');
}

/* ── Mettre à jour le label de visibilité ── */
function majVisibilite(checkbox) {
  const label = document.getElementById('vis-label');
  if (checkbox.checked) {
    label.textContent = 'Course is currently visible to all enrolled students';
  } else {
    label.textContent = 'Course is currently hidden from students';
  }
}

/* ── Toast notification ── */
let toastTimer;
function afficherToast(message) {
  const toast = document.getElementById('toast');
  toast.textContent = '✓ ' + message;
  toast.classList.add('visible');

  clearTimeout(toastTimer);
  toastTimer = setTimeout(function() {
    toast.classList.remove('visible');
  }, 2500);
}
