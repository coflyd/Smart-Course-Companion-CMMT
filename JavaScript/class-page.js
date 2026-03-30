/* ============================================================
   SMART COURSE COMPANION — class-page.js
   Charge les données d'un cours depuis l'API selon ?id= dans l'URL.

   Quand le backend sera prêt, remplacer la section MOCK par :
   fetch(`/api/courses/${courseId}`)
     .then(r => r.json())
     .then(data => renderCourse(data));
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

    /* ── Lire l'id du cours dans l'URL ── */
    const params   = new URLSearchParams(window.location.search);
    const courseId = params.get('id');

    if (!courseId) {
        document.getElementById('course-code-title').textContent = 'Course not found';
        return;
    }

    /* ──────────────────────────────────────────────────────────
       TODO : remplacer par fetch('/api/courses/' + courseId)
    ────────────────────────────────────────────────────────── */
    const MOCK_COURSES = {
        '1': {
            id: 1, code: 'COMP 249', title: 'Object-Oriented Programming II',
            instructor: 'Dr Houari', term: 'Winter 2026',
            logo: '../data/249-logo.png',
            grade: '88%', gradeBasis: 'Based on 60% of grade weight',
            completion: '58%',
            progress: [
                { label: 'Labs',        done: 6,  total: 12 },
                { label: 'Assignments', done: 3,  total: 5  },
                { label: 'Exams',       done: 1,  total: 2  },
            ]
        },
        '2': {
            id: 2, code: 'COMP 233', title: 'Probability & Statistics',
            instructor: 'Prof Fevens', term: 'Winter 2026',
            logo: '../data/233-logo.png',
            grade: '88%', gradeBasis: 'Based on 60% of grade weight',
            completion: '58%',
            progress: [
                { label: 'Pop Quizzes', done: 7, total: 9 },
                { label: 'Assignments', done: 3, total: 4 },
                { label: 'Exams',       done: 1, total: 2 },
            ]
        },
        '3': {
            id: 3, code: 'SOEN 228', title: 'System Hardware',
            instructor: 'Dr Eavis', term: 'Winter 2026',
            logo: '../data/228-logo.png',
            grade: '88%', gradeBasis: 'Based on 60% of grade weight',
            completion: '58%',
            progress: [
                { label: 'Labs',        done: 6, total: 12 },
                { label: 'Assignments', done: 3, total: 5  },
                { label: 'Exams',       done: 1, total: 2  },
            ]
        },
        '4': {
            id: 4, code: 'SOEN 287', title: 'Web Programming',
            instructor: 'Dr Robert', term: 'Winter 2026',
            logo: '../data/287-logo.png',
            grade: '88%', gradeBasis: 'Based on 60% of grade weight',
            completion: '58%',
            progress: [
                { label: 'Quizzes',     done: 2, total: 5 },
                { label: 'Assignments', done: 3, total: 5 },
                { label: 'Exams',       done: 1, total: 2 },
            ]
        },
    };

    const course = MOCK_COURSES[courseId];
    if (!course) {
        document.getElementById('course-code-title').textContent = 'Course not found';
        return;
    }

    renderCourse(course);
    setupEditForm(course);
    setupDeleteBtn(course);
});

/* ── Remplir la page avec les données du cours ── */
function renderCourse(course) {
    /* Titre de l'onglet */
    document.title = course.code + ' — Smart Course Companion';

    /* Sous-header */
    const logoEl = document.getElementById('course-logo');
    if (logoEl) { logoEl.src = course.logo; logoEl.alt = course.code + ' logo'; }
    setText('course-code-title',      course.code);
    setText('course-name-sub',        course.title);
    setText('course-instructor-sub',  'Instructor: ' + course.instructor);

    /* Cartes */
    setText('current-grade', course.grade);
    setText('grade-basis',   course.gradeBasis);
    setText('completion-pct', course.completion);

    /* Barres de progression */
    const container = document.getElementById('progress-bars');
    if (container && course.progress) {
        container.innerHTML = course.progress.map(function (p) {
            const pct = Math.round((p.done / p.total) * 100);
            return `
            <div class="progress-row">
                <p>${p.label}</p>
                <span class="completion">${p.done}/${p.total}</span>
            </div>
            <progress value="${pct}" max="100"></progress>`;
        }).join('');
    }
}

/* ── Pré-remplir le formulaire d'édition ── */
function setupEditForm(course) {
    const form = document.getElementById('edit-form');
    if (!form) return;

    document.getElementById('edit-code').value  = course.code;
    document.getElementById('edit-title').value = course.title;
    document.getElementById('edit-prof').value  = course.instructor;
    document.getElementById('edit-term').value  = course.term;

    form.addEventListener('submit', function (e) {
        e.preventDefault();
        /* TODO : PUT /api/courses/:id */
        alert('Changes saved! (backend not connected yet)');
        const popup = document.getElementById('edit-popup');
        if (popup && popup.hidePopover) popup.hidePopover();
    });
}

/* ── Bouton de suppression ── */
function setupDeleteBtn(course) {
    const btn = document.getElementById('confirm-delete-btn');
    if (!btn) return;
    btn.addEventListener('click', function () {
        /* TODO : DELETE /api/student/courses/:id */
        alert('Course deleted! (backend not connected yet)');
        window.location.href = '../HTML/student-ui.html';
    });
}

/* ── Utilitaire ── */
function setText(id, text) {
    const el = document.getElementById(id);
    if (el) el.textContent = text;
}
