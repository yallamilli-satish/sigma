// Interactive functions
function logoClick() {
    const logo = document.querySelector('.logo-circle');
    logo.style.transform = 'scale(1.1) rotate(360deg)';
    setTimeout(() => {
        logo.style.transform = 'scale(1) rotate(0deg)';
    }, 500);
}

function hamburgerClick() {
    const hamburger = document.querySelector('.hamburger-menu');
    // Bootstrap's JS handles the 'show' class, we only need to manage the 'active' class for the icon animation.
    hamburger.classList.toggle('active');
    
    if (hamburger.classList.contains('active')) {
        hamburger.style.borderColor = 'rgba(59, 130, 246, 0.8)';
    } else {
        hamburger.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    }
}

function navItemClick(section) {
    event.preventDefault();
    
    // Close the Bootstrap menu via JS
    const navMenuElement = document.getElementById('navMenu');
    const collapse = bootstrap.Collapse.getInstance(navMenuElement);
    if (collapse) {
        collapse.hide();
    }

    // Reset hamburger icon state manually
    const hamburger = document.querySelector('.hamburger-menu');
    hamburger.classList.remove('active');
    hamburger.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    
    // Show alert for the selected section
    alert(`Navigating to ${section.charAt(0).toUpperCase() + section.slice(1)} section`);
}

function titleClick() {
    const title = document.querySelector('.main-title');
    title.style.transform = 'scale(1.05)';
    title.style.filter = 'drop-shadow(0 0 60px rgba(255, 255, 255, 0.4))';
    setTimeout(() => {
        title.style.transform = 'scale(1)';
        title.style.filter = '';
    }, 500);
}

function dateClick() {
    alert('Project Timeline: December 2030');
}

function websiteClick() {
    const confirmation = confirm('Visit reallygreatsite.com?');
    if (confirmation) {
        window.open('https://reallygreatsite.com', '_blank', 'noopener,noreferrer');
    }
}

// Add subtle mouse movement parallax effect
document.addEventListener('mousemove', (e) => {
    const mouseX = e.clientX / window.innerWidth;
    const mouseY = e.clientY / window.innerHeight;
    
    const gradient = document.querySelector('.gradient-bg');
    const particles = document.querySelectorAll('.particle');
    
    // Using a lighter parallax shift for a smoother feel
    gradient.style.transform = `translate(${mouseX * 10 - 5}px, ${mouseY * 10 - 5}px)`;
    
    particles.forEach((particle, index) => {
        const speed = (index + 1) * 0.5;
        particle.style.transform = `translate(${mouseX * speed}px, ${mouseY * speed}px)`;
    });
});

// Add loading animation
window.addEventListener('load', () => {
    const elements = document.querySelectorAll('.interactive-element');
    elements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            element.style.transition = 'all 0.8s ease';
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 200);
    });
});

// Close menu when clicking outside (and handle Bootstrap collapse manually)
document.addEventListener('click', (e) => {
    const hamburger = document.querySelector('.hamburger-menu');
    const navMenuElement = document.getElementById('navMenu');
    
    if (!hamburger.contains(e.target) && !navMenuElement.contains(e.target)) {
        // If the menu is open, manually hide it
        if (navMenuElement.classList.contains('show')) {
            const collapse = bootstrap.Collapse.getInstance(navMenuElement);
            if (collapse) {
                 collapse.hide();
            }
        }
        
        // Reset hamburger icon state manually
        hamburger.classList.remove('active');
        hamburger.style.borderColor = 'rgba(255, 255, 255, 0.4)';
    }
});

// Keyboard interactions
document.addEventListener('keydown', (e) => {
    switch(e.key) {
        case ' ':
            e.preventDefault();
            titleClick();
            break;
        case 'Enter':
            // Toggle menu on Enter key
            const navMenuElement = document.getElementById('navMenu');
            const collapse = bootstrap.Collapse.getInstance(navMenuElement) || new bootstrap.Collapse(navMenuElement, {toggle: false});
            collapse.toggle();
            hamburgerClick(); // Toggle the icon animation
            break;
        case 'Escape':
            // Close menu on Escape key
            const navMenuEl = document.getElementById('navMenu');
            if (navMenuEl.classList.contains('show')) {
                const collapseEscape = bootstrap.Collapse.getInstance(navMenuEl);
                if (collapseEscape) {
                    collapseEscape.hide();
                }
            }
            const hamburger = document.querySelector('.hamburger-menu');
            hamburger.classList.remove('active');
            hamburger.style.borderColor = 'rgba(255, 255, 255, 0.4)';
            break;
        case 'l':
        case 'L':
            logoClick();
            break;
    }
});