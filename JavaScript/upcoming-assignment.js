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
        const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/assignments/upcoming', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const assignments = await response.json();

        const tbody = document.querySelector('tbody');
        tbody.innerHTML = '';

        assignments.forEach(a => {
            const dueDate = a.due_date ? new Date(a.due_date).toLocaleDateString() : 'N/A';
            tbody.innerHTML += `
                <tr>
                    <td data-cell="class"><span class="badge">${a.course_code}</span></td>
                    <td data-cell="title">${a.assessment_title}</td>
                    <td data-cell="due date">${dueDate}</td>
                    <td data-cell="status">
                        <select>
                            <option value="1">NOT STARTED</option>
                            <option value="2">ON GOING</option>
                            <option value="3">COMPLETED!</option>
                        </select>
                    </td>
                    <td data-cell="grade"><input type="number" value="0"></td>
                    <td data-cell="weight">${a.weight}%</td>
                </tr>
            `;
        });
    } catch (err) {
        console.error('Error loading assignments:', err);
    }
});
