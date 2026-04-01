/* --- DASHBOARD POP-UP --- */
const addBtn = document.getElementById('add-course-btn');
const popUp = document.getElementById('add-pop-up');
const addCourseForm = document.getElementById('addCourseForm');

if (addBtn) {
    addBtn.addEventListener('click', () => {
        popUp.style.display = 'flex';
    });
}

function openPopUp() {
    if (popUp) popUp.style.display = 'flex';
}

function closePopUp() {
    if (popUp) popUp.style.display = 'none';
}

if (addCourseForm) {
    addCourseForm.addEventListener('submit', (e) => {
        e.preventDefault();
        closePopUp();
        alert("Course successfully added to your dashboard!");
        addCourseForm.reset();
    });
}

/* --- COURSE OVERVIEW PAGE --- */
window.addEventListener('load', () => {

    // 1. Handle URL Parameters (Code and Name)
    const codeTitle = document.getElementById('course-code-title');
    const nameTitle = document.getElementById('course-name-title');
    if (codeTitle) {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const name = params.get('name');
        if (code) codeTitle.textContent = code.replace(/([A-Za-z]+)(\d+)/, '$1 $2');
        if (name) nameTitle.textContent = decodeURIComponent(name);
    }

    // 2. Tab switching for course tabs
    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabText = tab.innerText.trim();

            // Course Settings navigates to separate page
            if (tabText === 'Course Settings') {
                window.location.href = '../HTML/courseSettings.html';
                return;
            }

            // Update active tab style
            courseTabs.forEach(t => t.classList.remove('course-tab-active'));
            tab.classList.add('course-tab-active');

            // Hide all sections
            const sections = ['overview', 'assignments', 'progress'];
            sections.forEach(s => {
                const el = document.getElementById('section-' + s);
                if (el) el.style.display = 'none';
            });

            // Show matching section
            const map = {
                'Overview': 'overview',
                'Assignments': 'assignments',
                'Student Progress': 'progress'
            };
            const target = document.getElementById('section-' + map[tabText]);
            if (target) target.style.display = 'block';
        });
    });

    // 3. Assignment add button
    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    if (addAssignmentBtn) {
        addAssignmentBtn.addEventListener('click', () => {
            const title = document.getElementById('title').value;
            const dueDate = document.getElementById('dueDate').value;
            const weight = document.getElementById('weight').value;
            const points = document.getElementById('points').value;

            if (!title || !dueDate || !weight || !points) {
                alert("Please fill out all fields.");
                return;
            }

            const tableBody = document.getElementById('assignmentTable');
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${title}</td>
                <td>${dueDate}</td>
                <td>${weight}%</td>
                <td>${points}</td>
                <td>0/100</td>
                <td><button class="delete-btn" onclick="this.closest('tr').remove()">Delete</button></td>
            `;
            tableBody.appendChild(row);

            document.getElementById('title').value = '';
            document.getElementById('dueDate').value = '';
            document.getElementById('weight').value = '';
            document.getElementById('points').value = '';
        });
    }
});
