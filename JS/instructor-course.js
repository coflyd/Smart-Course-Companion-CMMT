/* ==============================================
   INSTRUCTOR — instructor-course.js
   Logique des 4 onglets
   ============================================== */

/* ── Onglets principaux ── */
function switchOnglet(nom, bouton) {
  document.querySelectorAll('.tab').forEach(t => t.classList.remove('actif'));
  document.querySelectorAll('.pill').forEach(b => b.classList.remove('actif'));
  document.getElementById('tab-' + nom).classList.add('actif');
  bouton.classList.add('actif');
}

/* ── Sous-onglets Assignments ── */
function switchSousAssign(nom, bouton) {
  document.querySelectorAll('#tab-assignments .sous-tab').forEach(t => t.classList.remove('actif'));
  document.querySelectorAll('#tab-assignments .sous-pill').forEach(b => b.classList.remove('actif'));
  document.getElementById('sous-' + nom).classList.add('actif');
  bouton.classList.add('actif');
}

/* ── Sous-onglets Course Settings ── */
function switchSousSettings(nom, bouton) {
  document.querySelectorAll('#tab-settings .sous-tab').forEach(t => t.classList.remove('actif'));
  document.querySelectorAll('#tab-settings .sous-pill').forEach(b => b.classList.remove('actif'));
  document.getElementById('sous-' + nom).classList.add('actif');
  bouton.classList.add('actif');
}

/* ── Modale Add Assignment ── */
function ouvrirModaleAssign() {
  document.getElementById('overlay-assign').classList.add('visible');
  document.getElementById('modale-assign').classList.add('visible');
}

function fermerModaleAssign() {
  document.getElementById('overlay-assign').classList.remove('visible');
  document.getElementById('modale-assign').classList.remove('visible');
}

function ajouterAssignment() {
  const titre  = document.getElementById('a-titre').value.trim();
  const date   = document.getElementById('a-date').value;
  const poids  = document.getElementById('a-poids').value || '0';
  const points = document.getElementById('a-points').value || '100';

  if (!titre) { alert('Please enter an assignment title.'); return; }

  const tbody = document.getElementById('tbody-assign');
  const num   = tbody.querySelectorAll('tr').length + 1;
  const tr    = document.createElement('tr');

  tr.innerHTML = `
    <td class="drag-handle">⠿</td>
    <td><strong>${titre}</strong></td>
    <td>${date || '—'}</td>
    <td>${poids}% <button class="btn-edit-inline" onclick="editerPoids(this)">✎</button></td>
    <td>${points}</td>
    <td class="submissions orange">0 / 13</td>
    <td><button class="btn-del-icone" onclick="supprimerLigne(this)">🗑</button></td>
  `;

  tbody.appendChild(tr);

  document.getElementById('a-titre').value  = '';
  document.getElementById('a-date').value   = '';
  document.getElementById('a-poids').value  = '0';
  document.getElementById('a-points').value = '100';
  fermerModaleAssign();
}

/* ── Supprimer une ligne ── */
function supprimerLigne(bouton) {
  bouton.closest('tr').remove();
}

/* ── Éditer le poids inline ── */
function editerPoids(bouton) {
  /* Plus tard : ouvrir une modale d'édition connectée à la DB */
  const nouveau = prompt('Enter new weight (%):', '');
  if (nouveau !== null && nouveau !== '') {
    const td = bouton.parentElement;
    td.innerHTML = nouveau + '% <button class="btn-edit-inline" onclick="editerPoids(this)">✎</button>';
  }
}

/* ── Toggle visibilité ── */
function toggleVisibilite(checkbox) {
  const label  = document.getElementById('vis-label');
  const alerte = document.getElementById('vis-alerte');
  const icone  = document.getElementById('vis-icone');

  if (checkbox.checked) {
    label.textContent  = 'Course is currently visible to all enrolled students';
    icone.textContent  = '👁';
    alerte.style.display = 'none';
  } else {
    label.textContent  = 'Course is hidden from students';
    icone.textContent  = '🚫';
    alerte.style.display = 'block';
  }
}

/* ── CSV sélectionné ── */
function csvSelectionne(input) {
  if (input.files && input.files[0]) {
    document.getElementById('csv-nom').textContent = input.files[0].name;
  }
}

/* ── Toast ── */
let toastTimer;
function afficherToast(msg) {
  const toast = document.getElementById('toast');
  toast.textContent = '✓ ' + msg;
  toast.classList.add('visible');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2500);
}
