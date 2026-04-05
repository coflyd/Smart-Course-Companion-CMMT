document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../HTML/registerLogin.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userNameEl = document.querySelector('.userinfo-text strong');
    if (userNameEl) userNameEl.textContent = payload.name;

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const name = params.get('name');

    if (code) document.querySelector('#course-title-row h2').textContent = code;
    if (name) document.querySelector('#course-title-row p').textContent = decodeURIComponent(name);

    if (!code) return;

    try {
        const [gradesRes, assignmentsRes] = await Promise.all([
            fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/grades/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`https://smart-course-companion-cmmt-production.up.railway.app/api/assignments/${code}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        const allGrades = await gradesRes.json();
        const assignments = await assignmentsRes.json();

        const courseGrades = allGrades.filter(g => g.course_code === code);
        const completed = courseGrades.filter(g => g.status === 'completed');
        const total = assignments.length;
        const completionPct = total > 0 ? Math.round((completed.length / total) * 100) : 0;

        let weightedSum = 0;
        let weightSum = 0;
        completed.forEach(g => {
            const pct = parseFloat(g.earned_marks) / parseFloat(g.total_marks) * 100;
            weightedSum += pct * parseFloat(g.weight);
            weightSum += parseFloat(g.weight);
        });
        const currentGrade = weightSum > 0 ? Math.round(weightedSum / weightSum) : 0;
        const weightCovered = weightSum;

        document.querySelector('.grade').textContent = currentGrade + '%';
        document.querySelectorAll('.grade')[1].textContent = completionPct + '%';
        document.querySelector('p').textContent = `Based on ${weightCovered}% of the grade weight`;

    } catch (err) {
        console.error('Error loading course data:', err);
    }
});
