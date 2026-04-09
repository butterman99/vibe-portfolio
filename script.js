// Mobile Navigation Toggle
const mobileMenu = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

mobileMenu.addEventListener('click', () => {
    mobileMenu.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        mobileMenu.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// Scroll animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

// Add fade-in class to elements
document.addEventListener('DOMContentLoaded', () => {
    const elementsToAnimate = document.querySelectorAll('section, .skill-card, .project-card, .about-content');
    elementsToAnimate.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
});

// Navbar background based on section
const navbarObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        const navbar = document.querySelector('.navbar');
        if (entry.isIntersecting) {
            if (entry.target.id === 'home') {
                navbar.classList.remove('dark');
            } else {
                navbar.classList.add('dark');
            }
        }
    });
}, { threshold: 0.5 });

document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('#home, #about, #skills, #projects, #contact');
    sections.forEach(section => navbarObserver.observe(section));
});

// Form submission
const contactForm = document.querySelector('.contact-form');
if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(contactForm);
        const name = formData.get('name');
        const email = formData.get('email');
        const message = formData.get('message');
        
        // Simple validation
        if (!name || !email || !message) {
            showNotification('모든 필드를 채워주세요.', 'error');
            return;
        }
        
        if (!isValidEmail(email)) {
            showNotification('유효한 이메일 주소를 입력하세요.', 'error');
            return;
        }
        
        // Simulate form submission
        showNotification('메시지가 성공적으로 전송되었습니다!', 'success');
        contactForm.reset();
    });
}

// Email validation
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Notification system
function showNotification(message, type = 'info') {
    // Remove existing notifications
    const existingNotification = document.querySelector('.notification');
    if (existingNotification) {
        existingNotification.remove();
    }
    
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 100px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        color: white;
        font-weight: 500;
        z-index: 10000;
        transform: translateX(100%);
        transition: transform 0.3s ease;
        max-width: 300px;
    `;
    
    // Set background color based on type
    switch (type) {
        case 'success':
            notification.style.background = '#10b981';
            break;
        case 'error':
            notification.style.background = '#ef4444';
            break;
        default:
            notification.style.background = '#3b82f6';
    }
    
    // Add to document
    document.body.appendChild(notification);
    
    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            if (notification.parentNode) {
                notification.remove();
            }
        }, 300);
    }, 3000);
}


// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');
    
    let current = '';
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (pageYOffset >= sectionTop - 100) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.classList.add('active');
        }
    });
});

// Add active link styles
const style = document.createElement('style');
style.textContent = `
    .nav-link.active {
        color: #fff !important;
    }
    .nav-link.active::after {
        width: 100% !important;
    }
`;
document.head.appendChild(style);

// Project card hover effect
document.querySelectorAll('.project-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Skill card animation on hover
document.querySelectorAll('.skill-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'rotate(360deg) scale(1.1)';
            icon.style.transition = 'transform 0.5s ease';
        }
    });
    
    card.addEventListener('mouseleave', function() {
        const icon = this.querySelector('.skill-icon');
        if (icon) {
            icon.style.transform = 'rotate(0) scale(1)';
        }
    });
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Copy email function
function copyEmail(email) {
    navigator.clipboard.writeText(email).then(() => {
        showNotification('이메일 주소가 복사되었습니다!', 'success');
    }).catch(() => {
        showNotification('이메일 복사에 실패했습니다.', 'error');
    });
}

// Add click event to email elements
document.querySelectorAll('.contact-item').forEach(item => {
    if (item.textContent.includes('@')) {
        item.style.cursor = 'pointer';
        item.addEventListener('click', function() {
            const email = this.querySelector('span').textContent;
            copyEmail(email);
        });
    }
});

// Stars Generation
(function() {
    const hero = document.querySelector('.hero');
    if (!hero) return;

    const starCount = 50;

    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = size + 'px';
        star.style.height = size + 'px';
        
        star.style.left = Math.random() * 100 + '%';
        star.style.top = Math.random() * 100 + '%';
        
        star.style.animationDelay = Math.random() * 3 + 's';
        star.style.animationDuration = (Math.random() * 2 + 1.5) + 's';
        
        hero.appendChild(star);
    }
})();

// 3D Cube Mouse Drag Functionality
(function() {
    const cube = document.querySelector('.cube');
    if (!cube) return;

    let isDragging = false;
    let startX, startY;
    let currentX = 0, currentY = 0;
    let rotationX = 0, rotationY = 0;

    cube.addEventListener('mousedown', (e) => {
        isDragging = true;
        startX = e.clientX;
        startY = e.clientY;
        cube.classList.add('dragging');
        e.preventDefault();
    });

    document.addEventListener('mousemove', (e) => {
        if (!isDragging) return;

        const deltaX = e.clientX - startX;
        const deltaY = e.clientY - startY;

        rotationY = currentX + deltaX * 0.5;
        rotationX = currentY - deltaY * 0.5;

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    document.addEventListener('mouseup', () => {
        if (isDragging) {
            isDragging = false;
            currentX = rotationY;
            currentY = rotationX;
            cube.classList.remove('dragging');
        }
    });

    // Touch events for mobile
    cube.addEventListener('touchstart', (e) => {
        isDragging = true;
        startX = e.touches[0].clientX;
        startY = e.touches[0].clientY;
        cube.classList.add('dragging');
    });

    document.addEventListener('touchmove', (e) => {
        if (!isDragging) return;

        const deltaX = e.touches[0].clientX - startX;
        const deltaY = e.touches[0].clientY - startY;

        rotationY = currentX + deltaX * 0.5;
        rotationX = currentY - deltaY * 0.5;

        cube.style.transform = `rotateX(${rotationX}deg) rotateY(${rotationY}deg)`;
    });

    document.addEventListener('touchend', () => {
        if (isDragging) {
            isDragging = false;
            currentX = rotationY;
            currentY = rotationX;
            cube.classList.remove('dragging');
        }
    });
})();

// Console welcome message
console.log('%c🎨 개인 포트폴리오에 오신 것을 환영합니다!', 'font-size: 20px; color: #4f46e5; font-weight: bold;');
console.log('%c이 포트폴리오는 HTML, CSS, JavaScript로 제작되었습니다.', 'font-size: 14px; color: #64748b;');
