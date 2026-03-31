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
  const semestre = document.getElementById('m-semestre').value;

  if (!code || !nom) {
    alert('Please fill in the Course Code and Name.');
    return;
  }

  /* Ajoute une ligne dans le tableau */
  const tbody = document.getElementById('tableau-cours');
  const tr    = document.createElement('tr');
  tr.className = 'ligne-cliquable';

  tr.innerHTML = `
    <td><span class="badge-cours">${code}</span></td>
    <td>${nom}</td>
    <td>${semestre || '—'}</td>
    <td>0</td>
    <td><button class="btn-voir" onclick="window.location.href='instructor-course.html'">View →</button></td>
  `;

  tbody.appendChild(tr);

  /* Vider les champs et fermer */
  document.getElementById('m-code').value     = '';
  document.getElementById('m-nom').value      = '';
  document.getElementById('m-semestre').value = '';
  fermerModale();
}
