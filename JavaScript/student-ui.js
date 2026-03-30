/* ============================================================
   SMART COURSE COMPANION — student-ui.js
   Charge et affiche les cours de l'étudiant connecté.

   Quand le backend sera prêt, remplacer la section "MOCK"
   par un vrai fetch('/api/student/courses').
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    const user = JSON.parse(sessionStorage.getItem('user') || '{}');
    const grid = document.getElementById('courses-grid');

    /* ──────────────────────────────────────────────────────────
       TODO : remplacer ce mock par l'appel API réel
       fetch(`/api/student/${user.id}/courses`)
         .then(r => r.json())
         .then(courses => renderCourses(courses));
    ────────────────────────────────────────────────────────── */
    const MOCK_COURSES = [
        { id: 1, code: 'COMP 249', title: 'Object-Oriented Programming', instructor: 'Dr Houari',   term: 'Winter 2026', logo: '../data/249-logo.png' },
        { id: 2, code: 'COMP 233', title: 'Probability & Statistics',    instructor: 'Prof Fevens', term: 'Winter 2026', logo: '../data/233-logo.png' },
        { id: 3, code: 'SOEN 228', title: 'System Hardware',             instructor: 'Dr Eavis',    term: 'Winter 2026', logo: '../data/228-logo.png' },
        { id: 4, code: 'SOEN 287', title: 'Web Programming',             instructor: 'Dr Robert',   term: 'Winter 2026', logo: '../data/287-logo.png' },
    ];

    renderCourses(MOCK_COURSES);

    /* ── Bouton Add Course (popover) ── */
    const addBtn = document.getElementById('add-course-btn');
    const popup  = document.getElementById('add-course-popup');
    if (addBtn && popup) {
        addBtn.setAttribute('popovertarget', 'add-course-popup');
    }

    /* ── Formulaire Add Course ── */
    const form = document.getElementById('add-course-form');
    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();
            const newCourse = {
                id:         Date.now(),
                code:       document.getElementById('class-code').value,
                title:      document.getElementById('class-title').value,
                instructor: document.getElementById('professor').value,
                term:       document.getElementById('term').value,
                logo:       '../data/image_1.png',
            };

            /* TODO : POST /api/student/courses */
            MOCK_COURSES.push(newCourse);
            renderCourses(MOCK_COURSES);
            form.reset();
            if (popup && popup.hidePopover) popup.hidePopover();
        });
    }
});

/* ── Construire et injecter les cartes de cours ── */
function renderCourses(courses) {
    const grid = document.getElementById('courses-grid');
    if (!grid) return;

    if (!courses || courses.length === 0) {
        grid.innerHTML = '<p>No courses found. Add your first course!</p>';
        return;
    }

    grid.innerHTML = courses.map(function (c) {
        /* Le lien vers la page de cours utilise l'id pour que
           class-page.html puisse charger les bonnes données */
        return `
        <a href="../HTML/class-page.html?id=${c.id}" class="link">
            <section class="course-item">
                <img src="${c.logo}" alt="${c.code} logo" onerror="this.src='../data/image_1.png'">
                <h4>${c.code}</h4>
                <p>${c.title}</p>
                <div class="info">
                    <p>Instructor: <span class="instructor">${c.instructor}</span></p>
                    <p>Term: <span class="wterm">${c.term}</span></p>
                </div>
            </section>
        </a>`;
    }).join('');
}
