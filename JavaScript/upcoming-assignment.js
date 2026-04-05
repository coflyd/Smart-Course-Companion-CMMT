/*  ======================================
SMART COURSE COMPANION — upcoming-assignment.js
Auteur : Constance Fleury
========================================  */

const API = 'https://smart-course-companion-cmmt-production.up.railway.app';
let allAssignments = [];

document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    if (!token) {
        window.location.href = '../HTML/registerLogin.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userNameEl = document.querySelector('.userinfo-text strong');
    if (userNameEl) userNameEl.textContent = payload.name;

    await loadAssignments(token);

    // Formulaire Add Grade & Status
    const gradeForm = document.getElementById('grade-form');
    if (gradeForm) {
        gradeForm.addEventListener('submit', async (e) => {
            e.preventDefault();

            const select = document.getElementById('assignment-select');
            const assessments_id = select.value;
            const total_marks = select.options[select.selectedIndex]?.dataset.total;
            const earned_marks = document.getElementById('earned').value;
            const status = document.getElementById('status').value;

            if (!assessments_id || !earned_marks) {
                alert('Please fill all fields');
                return;
            }

            await saveGrade(token, assessments_id, status, earned_marks, total_marks);
            alert('Grade saved!');
            gradeForm.reset();
            await loadAssignments(token);
        });
    }
});

async function loadAssignments(token) {
    try {
        const [assignmentsRes, gradesRes] = await Promise.all([
            fetch(`${API}/api/assignments/upcoming`, {
                headers: { 'Authorization': `Bearer ${token}` }
            }),
            fetch(`${API}/api/grades/me`, {
                headers: { 'Authorization': `Bearer ${token}` }
            })
        ]);

        allAssignments = await assignmentsRes.json();
        const grades = await gradesRes.json();

        // Remplir le dropdown du formulaire
        const select = document.getElementById('assignment-select');
        if (select) {
            select.innerHTML = '<option value="">Select an assignment...</option>';
            allAssignments.forEach(a => {
                select.innerHTML += `<option value="${a.id}" data-total="${a.total_points}">${a.course_code} — ${a.assessment_title}</option>`;
            });
        }

        // Remplir le tableau
        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        allAssignments.forEach(a => {
            const dueDate = a.due_date ? new Date(a.due_date).toLocaleDateString() : 'N/A';
            const existingGrade = grades.find(g => g.assessments_id === a.id);
            const currentStatus = existingGrade ? existingGrade.status : 'pending';
            const currentGrade = existingGrade ? existingGrade.earned_marks : 0;

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
                <td data-cell="grade">
                    <input type="number" value="${currentGrade}" data-id="${a.id}" data-total="${a.total_points}" class="grade-input" min="0" max="${a.total_points}">
                </td>
                <td data-cell="weight">${a.weight}%</td>
            `;
            tbody.appendChild(row);
        });

        // Sauvegarder quand status change
        document.querySelectorAll('.status-select').forEach(sel => {
            sel.addEventListener('change', async () => {
                const gradeInput = document.querySelector(`.grade-input[data-id="${sel.dataset.id}"]`);
                await saveGrade(token, sel.dataset.id, sel.value, gradeInput?.value || 0, sel.dataset.total);
            });
        });

        // Sauvegarder quand note change
        document.querySelectorAll('.grade-input').forEach(input => {
            input.addEventListener('change', async () => {
                const statusSel = document.querySelector(`.status-select[data-id="${input.dataset.id}"]`);
                await saveGrade(token, input.dataset.id, statusSel?.value || 'pending', input.value, input.dataset.total);
            });
        });

    } catch (err) {
        console.error('Error loading assignments:', err);
    }
}

async function saveGrade(token, assessments_id, status, earned_marks, total_marks) {
    try {
        await fetch(`${API}/api/grades`, {
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
