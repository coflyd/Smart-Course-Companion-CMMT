/* --- DASHBOARD POP-UP --- */
// (Keep your existing Pop-up code here as it is)
const addBtn = document.getElementById('add-course-btn');
const popUp = document.getElementById('add-pop-up');
const addCourseForm = document.getElementById('addCourseForm');

if (addBtn) {
    addBtn.addEventListener('click', () => {
        popUp.style.display = 'flex';
    });
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

/* --- COURSE OVERVIEW PAGE (REPLACED SECTION) --- */
window.addEventListener('load', () => {
    // 1. Handle URL Parameters (Code and Name)
    const titleSection = document.querySelector('.course-title-selection');
    if (titleSection) {
        const params = new URLSearchParams(window.location.search);
        const code = params.get('code');
        const name = params.get('name');
        if (code) titleSection.querySelector('h1').innerText = code;
        if (name) titleSection.querySelector('.course-name').innerText = decodeURIComponent(name);
    }

    // 2. Identify the Tabs and Sections
    const tabs = document.querySelectorAll('.tab-container button');
    
    // Map the button text EXACTLY to the Section IDs in your HTML
    const sections = {
        'Overview': document.getElementById('overview-section'),
        'Student Progress': document.getElementById('student-progress-section'),
        'Assignments': document.getElementById('assignments-section'),
        'Course Settings': document.getElementById('course-settings-section')
    };

    // Set "Overview" as active by default on load
    if (tabs.length > 0) tabs[0].classList.add('active');

    // 3. Tab Click Logic
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            const tabText = tab.innerText.trim();

            // Toggle Visual "Pill" Style
            tabs.forEach(t => t.classList.remove('active'));
            tab.classList.add('active');
            
            // Hide all sections first
            Object.values(sections).forEach(section => {
                if (section) section.style.display = 'none';
            });

            // Show the section that matches the tab text
            if (sections[tabText]) {
                sections[tabText].style.display = 'block';
            }
        });
    });
});