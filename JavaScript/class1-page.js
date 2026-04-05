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
    const instructor = params.get('instructor');
    if (instructor) document.querySelector('#course-title-row p:last-child').textContent = 'Instructor : ' + decodeURIComponent(instructor);
    
    if (!code) return;

    await loadCourseData(token, code);

    // DELETE
    const deleteBtn = document.querySelector('.btn-delete');
    if (deleteBtn) {
        deleteBtn.addEventListener('click', async () => {
            try {
                const response = await fetch(`https://smart-course-companion-cmmt-production.up.railway.app/api/courses/enroll/${code}`, {
                    method: 'DELETE',
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                const data = await response.json();
                if (data.message) {
                    alert('Course removed!');
                    window.location.href = '../HTML/student-ui.html';
                } else {
                    alert(data.error || 'Error removing course');
                }
            } catch (err) {
                console.error('Error deleting course:', err);
            }
        });
    }

    // EDIT
    const editForm = document.querySelector('#edit-popup form');
    if (editForm) {
        editForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            const title = document.getElementById('title').value.trim();
            const instructor_name = document.getElementById('prof').value.trim();
            const term = document.getElementById('term').value.trim();

            try {
                const response = await fetch(`https://smart-course-companion-cmmt-production.up.railway.app/api/courses/${code}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ title, instructor_name, term })
                });
                const data = await response.json();
                if (data.message) {
                    alert('Course updated!');
                    window.location.href = `../HTML/class1-page.html?code=${code}&name=${encodeURIComponent(title)}`;
                } else {
                    alert(data.error || 'Error updating course');
                }
            } catch (err) {
                console.error('Error editing course:', err);
            }
        });
    }
});

async function loadCourseData(token, code) {
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

        document.querySelector('.grade').textContent = currentGrade + '%';
        document.querySelectorAll('.grade')[1].textContent = completionPct + '%';
        document.querySelector('.card p').textContent = `Based on ${weightSum}% of the grade weight`;

    } catch (err) {
        console.error('Error loading course data:', err);
    }
}
