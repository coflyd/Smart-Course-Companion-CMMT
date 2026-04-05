/*  ======================================
SMART COURSE COMPANION — upcoming-assignment.js
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
        const [assignmentsRes, gradesRes] = await Promise.all([
            fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/assignments/upcoming', {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/grades/me', {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        const assignments = await assignmentsRes.json();
        const grades = await gradesRes.json();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        assignments.forEach(a => {
            const dueDate = a.due_date ? new Date(a.due_date).toLocaleDateString() : 'N/A';
            const existingGrade = grades.find(g => g.assessments_id === a.id);
            const currentStatus = existingGrade ? existingGrade.status : 'pending';
            const currentGrade = existingGrade ? existingGrade.earned_marks : 0;

            const statusMap = {
                'pending': '1',
                'ongoing': '2',
                'completed': '3'
            };

            const row = document.createElement('tr');
            row.innerHTML = `
                <td data-cell="class"><span class="badge">${a.course_code}</span></td>
                <td data-cell="title">${a.assessment_title}</td>
                <td data-cell="due date">${dueDate}</td>
                <td data-cell="status">
                    <select data-id="${a.id}" data-total="${a.total_points}" class="status-select">
                        <option value="pending" ${currentStatus === 'pending' ? 'selected' : ''}>NOT STARTED</option>
                        <option value="ongoing" ${currentStatus === 'ongoing' ? 'selected' : ''}>ON GOING</option>
                        <option value="completed" ${currentStatus === 'completed' ? 'selected' : ''}>COMPLETED!</option>
                    </select>
                </td>
                <td data-cell="grade"><input type="number" value="${currentGrade}" data-id="${a.id}" data-total="${a.total_points}" class="grade-input" min="0" max="${a.total_points}"></td>
                <td data-cell="weight">${a.weight}%</td>
            `;
            tbody.appendChild(row);
        });

        // Save on status change
        document.querySelectorAll('.status-select').forEach(select => {
            select.addEventListener('change', async () => {
                const id = select.dataset.id;
                const total = select.dataset.total;
                const gradeInput = document.querySelector(`.grade-input[data-id="${id}"]`);
                const earned = gradeInput ? gradeInput.value : 0;
                await saveGrade(token, id, select.value, earned, total);
            });
        });

        // Save on grade input
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('change', async () => {
                const id = input.dataset.id;
                const total = input.dataset.total;
                const statusSelect = document.querySelector(`.status-select[data-id="${id}"]`);
                const status = statusSelect ? statusSelect.value : 'pending';
                await saveGrade(token, id, status, input.value, total);
            });
        });

    } catch (err) {
        console.error('Error loading assignments:', err);
    }
});

async function saveGrade(token, assessments_id, status, earned_marks, total_marks) {
    try {
        await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/grades', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`
            },
            body: JSON.stringify({
                assessments_id: parseInt(assessments_id),
                status,
                earned_marks: parseFloat(earned_marks),
                total_marks: parseFloat(total_marks)
            })
        });
    } catch (err) {
        console.error('Error saving grade:', err);
    }
}

