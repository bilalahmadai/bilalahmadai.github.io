document.addEventListener('DOMContentLoaded', function() {
    // Cache DOM elements for better performance
    const body = document.body;
    const darkModeToggle = document.querySelector('.dark-mode-toggle');
    const navButtons = {
        resume: document.getElementById('resume-button'),
        linkedin: document.getElementById('linkedin-button'),
        github: document.getElementById('github-button')
    };
    const profileCloseBtn = document.querySelector('.close-button');
    const profileSection = document.getElementById('profile-section'); // Reference to the profile section
    const profileNavButton = document.getElementById('profile-button');
    
    // URLs for navigation
    const urls = {
        resume: 'https://drive.google.com/file/d/1ggbrQq4bTnESB2rXUVr11pXVpTfO-OfY/view?usp=sharing',
        linkedin: 'https://linkedin.com/in/bilalahmadai',
        github: 'https://github.com/bilalahmadai'
    };

    // Dark mode functions - consolidated for better maintainability
    function setDarkMode(isDark) {
        if (isDark) {
            body.classList.add('dark-mode');
        } else {
            body.classList.remove('dark-mode');
        }
        localStorage.setItem('darkMode', isDark ? 'enabled' : 'disabled');
    }

    // Initialize dark mode based on preferences
    function initDarkMode() {
        const savedDarkMode = localStorage.getItem('darkMode');
        if (savedDarkMode === 'enabled') {
            setDarkMode(true);
        } else if (savedDarkMode === 'disabled') {
            setDarkMode(false);
        } else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
            setDarkMode(true);
        } else {
            setDarkMode(false);
        }
    }

    // Toggle dark mode
    function toggleDarkMode() {
        const isDarkMode = body.classList.contains('dark-mode');
        setDarkMode(!isDarkMode);
        
        // Change button text based on the current mode
        const darkModeText = document.querySelector('.dark-mode-text');
        const lightModeText = document.querySelector('.light-mode-text');
        
        if (isDarkMode) {
            // Switch to light mode
            darkModeText.style.display = 'inline';
            lightModeText.style.display = 'none';
        } else {
            // Switch to dark mode
            darkModeText.style.display = 'none';
            lightModeText.style.display = 'inline';
        }
    }

    // Toggle profile section visibility
    function toggleProfileSection() {
        if (profileSection.style.display === 'block') {
            closeProfileSection();
        } else {
            openProfileSection();
        }
    }

    // Initialize profile section visibility based on user preference
    function initProfileSection() {
        const hasClosedProfile = localStorage.getItem('profileClosed');
        if (!hasClosedProfile) {
            openProfileSection(); // Show profile section on first visit
        } else {
            closeProfileSection(); // Ensure it's closed on subsequent visits
        }
    }

    // Close profile section and set preference in localStorage
    function closeProfileSection() {
        profileSection.classList.remove('show'); // Remove the show class to trigger fade-out
        setTimeout(() => {
            profileSection.style.display = 'none'; // Hide the profile section after the animation
            localStorage.setItem('profileClosed', 'true'); // Set preference to indicate it was closed
        }, 500); // Match this duration with the CSS transition duration
    }

    function openProfileSection() {
        profileSection.style.display = 'block'; // Show the profile section first
        setTimeout(() => {
            profileSection.classList.add('show'); // Add the show class to trigger animation
        }, 10); // Small timeout to ensure display is set before adding class
    }

    // Initialize navigation buttons
    function initNavButtons() {
        Object.keys(navButtons).forEach(key => {
            if (navButtons[key]) {
                navButtons[key].addEventListener('click', () => {
                    window.open(urls[key], '_blank');
                });
            }
        });
        
        // Add event listener to the close button
        profileCloseBtn.addEventListener('click', closeProfileSection);
        profileNavButton.addEventListener('click', toggleProfileSection); // Change to toggle function
    }

    // Event listeners
    function setupEventListeners() {
        darkModeToggle.addEventListener('click', toggleDarkMode);
        
        // Listen for system dark mode changes
        if (window.matchMedia) {
            const colorSchemeQuery = window.matchMedia('(prefers-color-scheme: dark)');
            colorSchemeQuery.addEventListener('change', e => {
                if (!localStorage.getItem('darkMode')) {
                    setDarkMode(e.matches);
                }
            });
        }
    }

    // Initialize the page
    function init() {
        initDarkMode();
        initProfileSection(); // Initialize profile section visibility
        initNavButtons();
        setupEventListeners();
        
        // Remove loading state after a small delay
        setTimeout(() => {
            body.classList.remove('loading');
        }, 300);
    }

    // Start everything
    init();
});