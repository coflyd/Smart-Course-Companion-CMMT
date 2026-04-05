/*  ======================================
SMART COURSE COMPANION — student-dashboard.js
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

    await loadCourses();

    const form = document.querySelector('#add-course-popup form');
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const course_code = document.getElementById('class').value.trim();
            const title = document.getElementById('title').value.trim();
            const instructor_name = document.getElementById('prof').value.trim();
            const term = document.getElementById('term').value.trim();

            if (!course_code || !title || !instructor_name || !term) {
                alert('Please fill in all fields');
                return;
            }

            try {
                const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/courses/enroll', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                    body: JSON.stringify({ course_code, title, instructor_name, term })
                });
                const data = await response.json();
                if (data.message) {
                    alert('Course added successfully!');
                    form.reset();
                    await loadCourses();
                } else {
                    alert(data.error || 'Error adding course');
                }
            } catch (err) {
                console.error('Error enrolling in course:', err);
            }
        });
    }
});

async function loadCourses() {
    const token = localStorage.getItem('token');
    try {
        const response = await fetch('https://smart-course-companion-cmmt-production.up.railway.app/api/courses', {
            headers: { 'Authorization': `Bearer ${token}` }
        });
        const courses = await response.json();

        const coursesDiv = document.getElementById('courses');
        coursesDiv.innerHTML = '';

        courses.forEach(course => {
            coursesDiv.innerHTML += `
                <a href="class1-page.html?code=${course.course_code}&name=${encodeURIComponent(course.title)}" class="link">
                <section class="course-item">
                    <img src="../data/SCC Logo.PNG">
                    <h4>${course.course_code}</h4>
                    <p>${course.title}</p>
                    <div class="info1">
                        <p>Instructor :</p>
                        <p class="instructor">${course.instructor_name}</p>
                    </div>
                    <div class="info2">
                        <p>Term :</p>
                        <p class="wterm">${course.term}</p>
                    </div>
                </section>
                </a>
            `;
        });
    } catch (err) {
        console.error('Error loading courses:', err);
    }
}
