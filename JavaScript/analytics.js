/*  ======================================
SMART COURSE COMPANION — analytics.js
Auteur : Constance Fleury
========================================  */

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');

    if (!token) {
        window.location.href = '../HTML/registerLogin.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userNameEl = document.querySelector('.userinfo-text strong');
    if (userNameEl) userNameEl.textContent = payload.name;

    try {
        const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/grades/me', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const grades = await response.json();

        const courseGrades = {};
        grades.forEach(g => {
            if (!courseGrades[g.course_code]) {
                courseGrades[g.course_code] = { earned: 0, total: 0 };
            }
            if (g.status === 'completed') {
                courseGrades[g.course_code].earned += parseFloat(g.earned_marks);
                courseGrades[g.course_code].total += parseFloat(g.total_marks);
            }
        });

        const courseCodes = Object.keys(courseGrades);
        const barsContainer = document.querySelector('.bars');
        const xLabels = document.querySelector('.x-labels');

        if (courseCodes.length === 0) return;

        barsContainer.innerHTML = '';
        xLabels.innerHTML = '';

        courseCodes.forEach(code => {
            const g = courseGrades[code];
            const pct = g.total > 0 ? Math.round((g.earned / g.total) * 100) : 0;

            barsContainer.innerHTML += `
                <div class="bar-group">
                    <div class="bar-pair">
                        <div style="height: ${pct}%;" role="img" aria-label="${code} student: ${pct}"></div>
                    </div>
                </div>
            `;

            xLabels.innerHTML += `<div class="x-label">${code}</div>`;
        });

    } catch (err) {
        console.error('Error loading grades:', err);
    }
});
