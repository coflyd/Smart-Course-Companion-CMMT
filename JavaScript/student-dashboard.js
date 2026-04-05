document.addEventListener('DOMContentLoaded', async () => {
    const token = localStorage.getItem('token');
    
    if (!token) {
        window.location.href = '../HTML/registerLogin.html';
        return;
    }

    const payload = JSON.parse(atob(token.split('.')[1]));
    const userName = payload.name;
    
    const userNameEl = document.querySelector('.userinfo-text strong');
    if (userNameEl) userNameEl.textContent = userName;

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
});
