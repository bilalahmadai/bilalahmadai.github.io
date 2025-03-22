document.addEventListener('DOMContentLoaded', function() {
    // Add loading state
    document.body.classList.add('loading');
    
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const sections = document.querySelectorAll('section > div');
    const socialLinks = document.querySelectorAll('.social-links a');
    const techGridDivs = document.querySelectorAll('.tech-grid div');
    const experienceListDivs = document.querySelectorAll('.experience-list div');
    const sectionTitles = document.querySelectorAll('.section-title h2');
    const animatedName = document.querySelector('.animated-name');
    const navBar = document.querySelector('.nav-bar');
    const navButtons = document.querySelectorAll('.nav-buttons button');
    const linkedinButton = document.querySelector('.nav-buttons .linkedin-button');
    const githubButton = document.querySelector('.nav-buttons .github-button');
    const resumeButton = document.getElementById('resume-button');

    function enableDarkMode() {
        body.classList.add('dark-mode');
        updateElementsForDarkMode(true);
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode() {
        body.classList.remove('dark-mode');
        updateElementsForDarkMode(false);
        localStorage.setItem('darkMode', 'disabled');
    }

    function updateElementsForDarkMode(isDarkMode) {
        const action = isDarkMode ? 'add' : 'remove';
        document.querySelectorAll('h2').forEach(heading => heading.classList[action]('dark-mode'));
        sections.forEach(section => section.classList[action]('dark-mode'));
        socialLinks.forEach(link => link.classList[action]('dark-mode'));
        techGridDivs.forEach(div => div.classList[action]('dark-mode'));
        experienceListDivs.forEach(div => div.classList[action]('dark-mode'));
        sectionTitles.forEach(title => title.classList[action]('dark-mode'));
        darkModeToggle.classList[action]('dark-mode');
        navBar.classList[action]('dark-mode');
        navButtons.forEach(button => button.classList[action]('dark-mode'));
    }

    // Check for saved preference
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode === 'enabled') {
        enableDarkMode();
    } else if (savedDarkMode === 'disabled') {
        disableDarkMode();
    } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    function toggleDarkMode() {
        if (body.classList.contains('dark-mode')) {
            disableDarkMode();
        } else {
            enableDarkMode();
        }
    }

    darkModeToggle.addEventListener('click', toggleDarkMode);

    // Manually set the text for the icons.
    const linkLabels = {
        'LinkedIn': 'LinkedIn',
        'GitHub': 'GitHub',
        'Mail': 'Gmail'
    };

    socialLinks.forEach(link => {
        const icon = link.querySelector('i');
        const labelText = linkLabels[icon.className.split(' ').pop()];

        if (labelText) {
            icon.textContent = labelText;
        }
    });

    // Add icons to the buttons
    navButtons.forEach(button => {
        const buttonText = button.textContent.trim();
        let iconElement = button.querySelector('i');

        if (!iconElement) {
            iconElement = document.createElement('i');
            button.appendChild(iconElement);
        }

        if (buttonText === 'Resume') {
            iconElement.className = 'fas fa-file-alt';
        }
    });

    // Style profile buttons.
    if (linkedinButton) {
        linkedinButton.classList.add('linkedin-button');
    }
    if (githubButton) {
        githubButton.classList.add('github-button');
    }
    if (resumeButton) {
        resumeButton.classList.add('resume-button');
    }

    // Add click handlers for navigation buttons
    if (resumeButton) {
        resumeButton.addEventListener('click', function() {
            window.open('/', '_blank');
        });
    }

    if (linkedinButton) {
        linkedinButton.addEventListener('click', function() {
            window.open('https://linkedin.com/in/bilalahmadai', '_blank');
        });
    }

    if (githubButton) {
        githubButton.addEventListener('click', function() {
            window.open('https://github.com/bilalahmadai', '_blank');
        });
    }

    // Remove loading state
    document.body.classList.remove('loading');
});
