/* ============================================================
   SMART COURSE COMPANION — header.js
   Gère le header commun sur toutes les pages :
   - Affiche le nom et le rôle de l'utilisateur connecté
   - Met en surbrillance le lien actif dans la nav
   - Gère le bouton Sign Out

   Données de session stockées dans sessionStorage :
     sessionStorage.setItem('user', JSON.stringify({
       id: 1,
       name: 'Masila Baduza',
       role: 'student'          // 'student' ou 'instructor'
     }));
   ============================================================ */

(function () {
    /* ── 1. Lire la session ── */
    const raw = sessionStorage.getItem('user');
    const user = raw ? JSON.parse(raw) : null;

    /* Si pas de session → retour au login (sauf sur la page login elle-même) */
    const isLoginPage = window.location.pathname.includes('registerLogin');
    if (!user && !isLoginPage) {
        window.location.href = '../HTML/registerLogin.html';
        return;
    }

    /* ── 2. Remplir le nom et le rôle dans le header ── */
    const nameEl = document.getElementById('user-name');
    const roleEl = document.getElementById('user-role');

    if (nameEl && user) nameEl.textContent = user.name;
    if (roleEl && user) roleEl.textContent = user.role === 'instructor' ? 'Instructor' : 'Student';

    /* ── 3. Bouton Sign Out ── */
    const signOutBtn = document.getElementById('sign-out-btn');
    if (signOutBtn) {
        signOutBtn.addEventListener('click', function () {
            sessionStorage.removeItem('user');
            window.location.href = '../HTML/registerLogin.html';
        });
    }

    /* ── 4. Mettre en surbrillance le lien actif ── */
    const currentPage = window.location.pathname.split('/').pop();

    /* Nav student */
    const navLinks = document.querySelectorAll('#main-nav ul li a');
    navLinks.forEach(function (link) {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });

    /* Nav instructor */
    const instLinks = document.querySelectorAll('.inst-nav-link');
    instLinks.forEach(function (link) {
        const linkPage = link.getAttribute('href').split('/').pop();
        if (linkPage === currentPage) {
            link.classList.add('active-link');
        }
    });

})();
