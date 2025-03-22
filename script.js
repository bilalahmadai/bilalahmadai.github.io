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
        const body = document.body;
        body.classList.add('dark-mode');
        
        // Update all h2 elements
        document.querySelectorAll('h2').forEach(heading => {
            heading.classList.add('dark-mode');
        });
        
        sections.forEach(section => section.classList.add('dark-mode'));
        socialLinks.forEach(link => link.classList.add('dark-mode'));
        techGridDivs.forEach(div => div.classList.add('dark-mode'));
        experienceListDivs.forEach(div => div.classList.add('dark-mode'));
        sectionTitles.forEach(title => title.classList.add('dark-mode'));
        darkModeToggle.classList.add('dark-mode');
        navBar.classList.add('dark-mode');
        navButtons.forEach(button => button.classList.add('dark-mode'));
        localStorage.setItem('darkMode', 'enabled');
    }

    function disableDarkMode(){
        const body = document.body;
        body.classList.remove('dark-mode');
        
        // Update all h2 elements
        document.querySelectorAll('h2').forEach(heading => {
            heading.classList.remove('dark-mode');
        });
        
        sections.forEach(section => section.classList.remove('dark-mode'));
        socialLinks.forEach(link => link.classList.remove('dark-mode'));
        techGridDivs.forEach(div => div.classList.remove('dark-mode'));
        experienceListDivs.forEach(div => div.classList.remove('dark-mode'));
        sectionTitles.forEach(title => title.classList.remove('dark-mode'));
        darkModeToggle.classList.remove('dark-mode');
        navBar.classList.remove('dark-mode');
        navButtons.forEach(button => button.classList.remove('dark-mode'));
        localStorage.setItem('darkMode', null);
    }

    //check for saved preference
    if (localStorage.getItem('darkMode') === 'enabled') {
        enableDarkMode();
    }
    //detect system preference
    else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            enableDarkMode();
    }
    else{
        disableDarkMode();
    }


    function toggleDarkMode() {
        try {
            if (body.classList.contains('dark-mode')) {
                disableDarkMode();
            } else {
                enableDarkMode();
            }
        } catch (error) {
            console.error('Error toggling dark mode:', error);
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
            // icon.classList.add('material-icons');  // Removed this line
        }
    });

    // Add icons to the  buttons
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

    //Style profile buttons.
    if (linkedinButton) {
        linkedinButton.classList.add('linkedin-button');
    }
    if (githubButton) {
        githubButton.classList.add('github-button');
    }
    if (resumeButton){
        resumeButton.classList.add('resume-button')
    }

    // Remove loading state
    document.body.classList.remove('loading');
});
