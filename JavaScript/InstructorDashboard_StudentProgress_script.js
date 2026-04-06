const token = localStorage.getItem('token');
if (!token) window.location.href = '../HTML/registerLogin.html';

const payload = JSON.parse(atob(token.split('.')[1]));

const userNameEl = document.querySelector('.userinfo-text strong');
if (userNameEl) userNameEl.textContent = payload.name;

const circleEl = document.querySelector('.userinfo-circle');
if (circleEl) circleEl.textContent = payload.name.split(' ').map(w => w[0]).join('').toUpperCase().slice(0,2);

const popUp = document.getElementById('add-pop-up');
const addCourseForm = document.getElementById('addCourseForm');

function openPopUp() {
    if (popUp) popUp.style.display = 'flex';
}

function closePopUp() {
    if (popUp) popUp.style.display = 'none';
}

async function loadCourses() {
    const courseGrid = document.querySelector('.course-grid');
    if (!courseGrid) return;
    try {
        const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/courses', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const courses = await response.json();
        courseGrid.innerHTML = '';
        courses.forEach(course => {
            courseGrid.innerHTML += `
                <div class="course-card" onclick="location.href='../HTML/CourseOverview-templateA.html?code=${course.course_code}&name=${encodeURIComponent(course.title)}'">
                    <div class="card-header">
                        <span class="course-code">${course.course_code}</span>
                    </div>
                    <h3 class="course-name">${course.title}</h3>
                    <hr class="card-divider">
                    <div class="course-details">
                        <p>Semester: <span>${course.term}</span></p>
                    </div>
                </div>
            `;
        });
    } catch (err) {
        console.error('Error loading courses:', err);
    }
}

async function loadAssignments(course_code) {
    if (!course_code) return;
    try {
        const response = await fetch(`https://smart-course-companion-cmmt-production.up.railway.app/api/assignments/${course_code}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const assignments = await response.json();
        const tbody = document.getElementById('assignmentTable');
        if (!tbody) return;
        tbody.innerHTML = '';
        assignments.forEach(a => {
            tbody.innerHTML += `
                <tr>
                    <td>${a.assessment_title}</td>
                    <td>${new Date(a.due_date).toLocaleDateString()}</td>
                    <td>${a.weight}%</td>
                    <td>${a.total_points}</td>
                    <td>-</td>
                    <td><button class="delete-btn" onclick="this.closest('tr').remove()">Delete</button></td>
                </tr>
            `;
        });
    } catch (err) {
        console.error('Error loading assignments:', err);
    }
}

async function loadCourseStats(course_code) {
    if (!course_code) return;
    try {
        const response = await fetch(`https://smart-course-companion-cmmt-production.up.railway.app/api/grades/course-stats/${course_code}`, {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const stats = await response.json();

        // Update Overview stats
        const enrolledEl = document.querySelector('.stats-card strong');
        if (enrolledEl) enrolledEl.textContent = stats.enrolled;

        const avgEl = document.querySelectorAll('.stats-card strong')[1];
        if (avgEl) avgEl.textContent = stats.class_average + '%';

        // Update completion breakdown
        const breakdownCard = document.querySelector('.breakdown-card');
        if (breakdownCard && stats.assessments.length > 0) {
            const totalStudents = stats.enrolled;
            let breakdownHTML = '<h3>Completion Breakdown by Assignment</h3>';
            stats.assessments.forEach(a => {
                const pct = totalStudents > 0 ? Math.round((a.completed_count / totalStudents) * 100) : 0;
                const color = pct === 100 ? '#10b981' : '#4a6fa5';
                breakdownHTML += `
                    <div class="assessment-item">
                        <div class="assessment-label">
                            <span>${a.assessment_title}</span>
                            <span class="count">${a.completed_count} / ${totalStudents} students (${pct}%)</span>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width:${pct}%; background-color:${color};"></div>
                        </div>
                    </div>
                `;
            });
            breakdownCard.innerHTML = breakdownHTML;
        }

        // Update Student Progress section
        const progressSection = document.getElementById('section-progress');
        if (progressSection && stats.assessments.length > 0) {
            const totalStudents = stats.enrolled;
            let progressHTML = '<h3 style="margin-bottom:16px;">Completion by Assessment</h3>';
            stats.assessments.forEach(a => {
                const pct = totalStudents > 0 ? Math.round((a.completed_count / totalStudents) * 100) : 0;
                const notCompleted = totalStudents - a.completed_count;
                progressHTML += `
                    <div class="assessment-card">
                        <strong>${a.assessment_title}</strong>
                        <div class="card-stats-grid">
                            <div class="stat-item">
                                <small>COMPLETED</small>
                                <div><strong>${a.completed_count}</strong>/${totalStudents}</div>
                                <small>${pct}% of class</small>
                            </div>
                            <div class="stat-item">
                                <small>NOT SUBMITTED</small>
                                <div><strong>${notCompleted}</strong>/${totalStudents}</div>
                                <small>${100 - pct}% of class</small>
                            </div>
                        </div>
                        <div class="progress-track">
                            <div class="progress-fill" style="width:${pct}%;"></div>
                        </div>
                    </div>
                `;
            });
            progressSection.innerHTML = progressHTML;
        }

    } catch (err) {
        console.error('Error loading course stats:', err);
    }
}

if (addCourseForm) {
    addCourseForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const formData = new FormData(addCourseForm);
        try {
            const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/courses', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({
                    course_code: formData.get('course_code'),
                    title: formData.get('course_name'),
                    term: formData.get('semester'),
                    instructor_name: payload.name
                })
            });
            const data = await response.json();
            if (data.message) {
                closePopUp();
                addCourseForm.reset();
                loadCourses();
            } else {
                alert(data.error || 'Error adding course');
            }
        } catch (err) {
            console.error('Error adding course:', err);
        }
    });
}

window.addEventListener('load', () => {
    loadCourses();

    const params = new URLSearchParams(window.location.search);
    const code = params.get('code');
    const name = params.get('name');

    const codeTitle = document.getElementById('course-code-title');
    const nameTitle = document.getElementById('course-name-title');
    if (codeTitle && code) codeTitle.textContent = code.replace(/([A-Za-z]+)(\d+)/, '$1 $2');
    if (nameTitle && name) nameTitle.textContent = decodeURIComponent(name);

    if (code) {
        loadAssignments(code);
        loadCourseStats(code);
    }

    const courseTabs = document.querySelectorAll('.course-tab');
    courseTabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabText = tab.innerText.trim();
            if (tabText === 'Course Settings') {
                window.location.href = `../HTML/courseSettings.html?code=${code}&name=${name}`;
                return;
            }
            courseTabs.forEach(t => t.classList.remove('course-tab-active'));
            tab.classList.add('course-tab-active');
            const sections = ['overview', 'assignments', 'progress'];
            sections.forEach(s => {
                const el = document.getElementById('section-' + s);
                if (el) el.style.display = 'none';
            });
            const map = {
                'Overview': 'overview',
                'Assignments': 'assignments',
                'Student Progress': 'progress'
            };
            const target = document.getElementById('section-' + map[tabText]);
            if (target) target.style.display = 'block';
        });
    });

    const addAssignmentBtn = document.getElementById('addAssignmentBtn');
    if (addAssignmentBtn) {
        addAssignmentBtn.addEventListener('click', async () => {
            const course_code = new URLSearchParams(window.location.search).get('code');
            const title = document.getElementById('title').value;
            const dueDate = document.getElementById('dueDate').value;
            const weight = document.getElementById('weight').value;
            const points = document.getElementById('points').value;

            if (!title || !dueDate || !weight || !points) {
                alert("Please fill out all fields.");
                return;
            }

            try {
                const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/assignments', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        course_code,
                        assessment_title: title,
                        category: 'assignment',
                        due_date: dueDate,
                        weight: parseFloat(weight),
                        total_points: parseFloat(points)
                    })
                });
                const data = await response.json();
                if (data.message) {
                    alert('Assignment added!');
                    document.getElementById('title').value = '';
                    document.getElementById('dueDate').value = '';
                    document.getElementById('weight').value = '';
                    document.getElementById('points').value = '';
                    loadAssignments(course_code);
                    loadCourseStats(course_code);
                }
            } catch (err) {
                console.error('Error adding assignment:', err);
            }
        });
    }
});
