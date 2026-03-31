/* ==============================================
   INSTRUCTOR — instructor-course.js
   Logique des 4 onglets de la page cours
   ============================================== */

/* ── Changer d'onglet principal ── */
function switchOnglet(nom, boutonClique) {
  /* Cache toutes les sections */
  document.querySelectorAll('.tab-contenu').forEach(function(section) {
    section.classList.remove('actif');
  });
  /* Désactive tous les boutons */
  document.querySelectorAll('.onglet-btn').forEach(function(btn) {
    btn.classList.remove('actif');
  });
  /* Active la bonne section et le bon bouton */
  document.getElementById('tab-' + nom).classList.add('actif');
  boutonClique.classList.add('actif');
}

/* ── Sous-onglets Assignments (Assignments | Upload Grades) ── */
function switchSousOnglet(nom, boutonClique) {
  document.querySelectorAll('#tab-assignments .sous-tab').forEach(function(p) {
    p.classList.remove('actif');
  });
  document.querySelectorAll('#tab-assignments .sous-onglet-btn').forEach(function(btn) {
    btn.classList.remove('actif');
  });
  document.getElementById('sous-' + nom).classList.add('actif');
  boutonClique.classList.add('actif');
}

/* ── Sous-onglets Course Settings (Visibility | Templates | Details) ── */
function switchSousSettings(nom, boutonClique) {
  document.querySelectorAll('#tab-settings .sous-tab').forEach(function(p) {
    p.classList.remove('actif');
  });
  document.querySelectorAll('#tab-settings .sous-onglet-btn').forEach(function(btn) {
    btn.classList.remove('actif');
  });
  document.getElementById('settings-' + nom).classList.add('actif');
  boutonClique.classList.add('actif');
}

/* ── Modale Add Assignment ── */
function ouvrirModaleAssignment() {
  document.getElementById('overlay-assign').classList.add('visible');
  document.getElementById('modale-assign').classList.add('visible');
}

function fermerModaleAssignment() {
  document.getElementById('overlay-assign').classList.remove('visible');
  document.getElementById('modale-assign').classList.remove('visible');
}

function ajouterAssignment() {
  const titre  = document.getElementById('a-titre').value.trim();
  const date   = document.getElementById('a-date').value;
  const poids  = document.getElementById('a-poids').value;
  const points = document.getElementById('a-points').value;

  if (!titre) {
    alert('Please enter an assignment title.');
    return;
  }

  const tbody = document.getElementById('tableau-assignments');
  const numLignes = tbody.querySelectorAll('tr').length + 1;
  const tr = document.createElement('tr');

  tr.innerHTML = `
    <td>${numLignes}</td>
    <td>${titre}</td>
    <td>${date || '—'}</td>
    <td>${poids ? poids + '%' : '—'}</td>
    <td>${points || '—'}</td>
    <td>0/13</td>
    <td class="actions-cell">
      <button class="btn-icone-edit" title="Edit" onclick="editerAssignment(this)">✏</button>
      <button class="btn-icone-del" title="Delete" onclick="supprimerLigne(this)">🗑</button>
    </td>
  `;

  tbody.appendChild(tr);

  /* Vider et fermer */
  document.getElementById('a-titre').value  = '';
  document.getElementById('a-date').value   = '';
  document.getElementById('a-poids').value  = '';
  document.getElementById('a-points').value = '';
  fermerModaleAssignment();
}

/* ── Supprimer une ligne du tableau ── */
function supprimerLigne(bouton) {
  bouton.closest('tr').remove();
}

/* ── Éditer un assignment (placeholder) ── */
function editerAssignment(bouton) {
  /* Plus tard : ouvrir une modale pré-remplie avec les données de la ligne */
  alert('Edit functionality will be connected to the database.');
}

/* ── Templates ── */
function selectionnerTemplate(carte) {
  document.querySelectorAll('.template-carte').forEach(function(c) {
    c.classList.remove('actif');
  });
  carte.classList.add('actif');
}

/* ── Visibility toggle ── */
function majVisibilite(checkbox) {
  const label = document.getElementById('vis-label');
  label.textContent = checkbox.checked
    ? 'Course is currently visible to all enrolled students'
    : 'Course is currently hidden from students';
}

/* ── Fichier CSV sélectionné ── */
function fichierSelectionne(input) {
  const nom = document.getElementById('upload-nom');
  if (input.files && input.files[0]) {
    nom.textContent = '✓ ' + input.files[0].name;
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
