// Zeeshan Mustafa Portfolio - JavaScript Functionality

document.addEventListener('DOMContentLoaded', function () {
    // Initialize AOS (Animate On Scroll)
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false,
        offset: 100
    });

    // Initialize all functionality
    initThemeToggle();
    initMobileMenu();
    initTypingAnimation();
    initSmoothScrolling();
    initScrollSpy();
    initSkillsBars();
    initContactForm();
    initBackToTop();
    initPDFDownload();
    initNavbarScrollEffect();
});

// Theme Toggle Functionality
function initThemeToggle() {
    const themeToggle = document.getElementById('theme-toggle');
    const html = document.documentElement;

    // Check for saved theme or default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    html.classList.toggle('dark', savedTheme === 'dark');

    themeToggle.addEventListener('click', function () {
        html.classList.toggle('dark');
        const isDark = html.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');

        // Add a little animation effect
        this.style.transform = 'scale(0.9)';
        setTimeout(() => {
            this.style.transform = 'scale(1)';
        }, 150);
    });
}

// Mobile Menu Functionality
function initMobileMenu() {
    const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');

    mobileMenuToggle.addEventListener('click', function () {
        mobileMenu.classList.toggle('hidden');

        // Animate hamburger to X
        const icon = this.querySelector('i');
        if (mobileMenu.classList.contains('hidden')) {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        } else {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        }
    });

    // Close mobile menu when clicking on links
    const mobileLinks = mobileMenu.querySelectorAll('a');
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            mobileMenu.classList.add('hidden');
            const icon = mobileMenuToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });
}

// Typing Animation
function initTypingAnimation() {
    const typingText = document.getElementById('typing-text');
    const texts = [
        'QA Engineer | Automation | SQA Specialist',
        'Playwright & Selenium Expert',
        'API Testing Professional',
        'CI/CD Integration Specialist',
        'Quality Assurance Leader'
    ];

    let textIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function typeText() {
        const currentText = texts[textIndex];

        if (isDeleting) {
            typingText.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typingText.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typeSpeed = isDeleting ? 50 : 100;

        if (!isDeleting && charIndex === currentText.length) {
            typeSpeed = 2000; // Pause at end
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            textIndex = (textIndex + 1) % texts.length;
            typeSpeed = 500;
        }

        setTimeout(typeText, typeSpeed);
    }

    typeText();
}

// Smooth Scrolling
function initSmoothScrolling() {
    const navLinks = document.querySelectorAll('a[href^="#"]');

    navLinks.forEach(link => {
        link.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);

            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80; // Account for fixed navbar

                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Scroll Spy for Navigation
function initScrollSpy() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    function updateActiveLink() {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.offsetHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink(); // Run on load
}

// Animated Skills Bars
function initSkillsBars() {
    const skillsSection = document.getElementById('skills');
    const skillBars = document.querySelectorAll('.skill-progress');
    let animated = false;

    function animateSkills() {
        if (animated) return;

        const sectionTop = skillsSection.offsetTop - window.innerHeight + 200;

        if (window.scrollY >= sectionTop) {
            animated = true;

            skillBars.forEach((bar, index) => {
                setTimeout(() => {
                    const width = bar.getAttribute('data-width');
                    bar.style.width = width;
                    bar.classList.add('animate');
                }, index * 200);
            });
        }
    }

    window.addEventListener('scroll', animateSkills);
    animateSkills(); // Check on load
}

// Contact Form Handling
// Replace your existing initContactForm() implementation with this:
function initContactForm() {
    const contactForm = document.getElementById('contact-form');
    if (!contactForm) return;

    contactForm.addEventListener('submit', function (e) {
        e.preventDefault();

        const form = this;
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Simple honeypot anti-bot (optional): add <input name="hp" style="display:none">
        if (data.hp) return; // silently drop spam

        // UI: loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.innerHTML;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i>Sending...';
        submitBtn.disabled = true;

        // === CONFIGURE THESE with values from your EmailJS dashboard ===
        const SERVICE_ID = 'service_oevql5o';           // e.g. service_xxx
        const TEMPLATE_OWNER = 'template_24b01zr';  // e.g. template_owner
        const TEMPLATE_USER = 'template_qls9qou';    // e.g. template_user
        // =================================================================

        // params for template variables (match names used in your EmailJS templates)
        const params = {
            name: data.name,
            email: data.email,
            subject: data.subject,
            message: data.message
        };

        // 1) send to owner
        emailjs.send(SERVICE_ID, TEMPLATE_OWNER, params)
            .then(() => {
                // 2) send a copy to the user (sender)
                // if your user template expects different variable names, update the object
                const userParams = {
                    name: data.name,
                    email: data.email,
                    subject: data.subject,
                    message: data.message,
                    time: new Date().toLocaleString() // add this for {{time}}

                };
                return emailjs.send(SERVICE_ID, TEMPLATE_USER, userParams);
            })
            .then(() => {
                form.reset();
                showNotification('Message sent successfully — you and I will receive emails.', 'success');
            })
            .catch(err => {
                console.error('EmailJS error:', err);
                showNotification('Failed to send message. Please try again later.', 'error');
            })
            .finally(() => {
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            });
    });
}


// Notification System
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `fixed top-4 right-4 z-50 px-6 py-4 rounded-lg shadow-lg transform translate-x-full transition-transform duration-300 ${type === 'success'
        ? 'bg-green-500 text-white'
        : 'bg-red-500 text-white'
        }`;
    notification.innerHTML = `
        <div class="flex items-center">
            <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-exclamation-circle'} mr-2"></i>
            ${message}
        </div>
    `;

    document.body.appendChild(notification);

    // Animate in
    setTimeout(() => {
        notification.style.transform = 'translateX(0)';
    }, 100);

    // Auto remove
    setTimeout(() => {
        notification.style.transform = 'translateX(100%)';
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Back to Top Button
function initBackToTop() {
    const backToTopBtn = document.getElementById('back-to-top');

    function toggleBackToTop() {
        if (window.scrollY > 300) {
            backToTopBtn.classList.add('show');
        } else {
            backToTopBtn.classList.remove('show');
        }
    }

    backToTopBtn.addEventListener('click', function () {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    window.addEventListener('scroll', toggleBackToTop);
}

// PDF Resume Download
function initPDFDownload() {
    const downloadBtn = document.getElementById('download-resume');
    downloadBtn.addEventListener('click', function () {
        // Replace 'resume.pdf' with your actual PDF filename if different
        window.open('assets/Zeeshan_Resume.pdf', '_blank');
    });
}

// Generate Resume HTML Content
function generateResumeHTML() {
    return `
        <!DOCTYPE html>
        <html>
        <head>
            <title>Zeeshan Mustafa - Resume</title>
            <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 800px; margin: 0 auto; padding: 20px; }
                .header { text-align: center; margin-bottom: 30px; }
                .section { margin-bottom: 25px; }
                .section h2 { color: #2563eb; border-bottom: 2px solid #2563eb; padding-bottom: 5px; }
                .experience-item { margin-bottom: 20px; }
                .experience-item h3 { color: #1d4ed8; margin-bottom: 5px; }
                .experience-item h4 { color: #10b981; margin-bottom: 10px; }
                ul { margin: 10px 0; padding-left: 20px; }
                .skills-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 10px; }
                .contact-info { text-align: center; margin-bottom: 20px; }
            </style>
        </head>
        <body>
            <div class="header">
                <h1>Zeeshan Mustafa</h1>
                <p><strong>QA Engineer | Automation | SQA Specialist</strong></p>
            </div>
            
            <div class="contact-info">
                <p>Email: mustafazeeshan333@gmail.com | Phone: +92 342 262 5647</p>
                <p>LinkedIn: linkedin.com/in/ZeeshanJumabhoy | GitHub: github.com/ZeeshanJumabhoy</p>
            </div>
            
            <div class="section">
                <h2>Professional Summary</h2>
                <p>Graduated from FAST NUCES Karachi with BS Software Engineering (2025). 3+ years of combined experience in SQA Automation & Manual Testing. Skilled in Playwright, Selenium, Appium, JMeter, Postman, Java, JavaScript, and C#. Strong foundation in debugging, Agile/SCRUM, CI/CD, cross-browser testing, API testing, and automation frameworks.</p>
            </div>
            
            <div class="section">
                <h2>Work Experience</h2>
                
                <div class="experience-item">
                    <h3>SQA Automation Engineer – Associate</h3>
                    <h4>Vidizmo AI (2025 – Present)</h4>
                    <ul>
                        <li>Designed & automated E2E tests with Playwright (TypeScript)</li>
                        <li>Investigated CI/CD pipeline failures (Trace Viewer) maintaining 89% pass rate</li>
                        <li>Contributed to user story refinement and acceptance criteria</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>QA Engineer – Trainee</h3>
                    <h4>QBS CO. (2024 – 2025)</h4>
                    <ul>
                        <li>Implemented Performance, Regression, and Smoke testing for PSO BLUE LPG project</li>
                        <li>Built API automation framework (Java, Cucumber) reducing test time by 30%</li>
                        <li>Conducted API testing (Postman) and performance testing (JMeter)</li>
                        <li>Automated UI test cases using Playwright</li>
                    </ul>
                </div>
                
                <div class="experience-item">
                    <h3>Automation Test Engineer – Intern</h3>
                    <h4>The ModVentures (2024)</h4>
                    <ul>
                        <li>Automated regression & functional testing for Toucher Mobile App (Appium, Jest, Java, Maven)</li>
                        <li>Reduced manual effort by 75%</li>
                        <li>Integrated Allure reporting, JIRA, and ClickUp</li>
                    </ul>
                </div>
            </div>
            
            <div class="section">
                <h2>Technical Skills</h2>
                <div class="skills-grid">
                    <div><strong>Automation Testing:</strong> Playwright, Selenium, Appium</div>
                    <div><strong>Programming:</strong> Java, JavaScript, C#, TypeScript</div>
                    <div><strong>API Testing:</strong> Postman, REST APIs</div>
                    <div><strong>Performance Testing:</strong> JMeter</div>
                    <div><strong>CI/CD:</strong> Jenkins, Azure Pipelines</div>
                    <div><strong>Frameworks:</strong> Cucumber, NUnit, Jest, JUnit</div>
                </div>
            </div>
            
            <div class="section">
                <h2>Education</h2>
                <p><strong>BS Software Engineering</strong><br>FAST NUCES Karachi (2025)</p>
            </div>
            
            <div class="section">
                <h2>Certifications</h2>
                <ul>
                    <li>Software Testing Fundamentals (Alison, 2024)</li>
                    <li>JMeter Performance Testing (BlazeMeter, 2024)</li>
                    <li>API Testing with Postman (Postman Academy, 2023)</li>
                </ul>
            </div>
            
            <div class="section">
                <h2>Key Projects</h2>
                <ul>
                    <li><strong>Blood Safe Life:</strong> Real-time Blood Donation Management System (Final Year Project)</li>
                    <li><strong>Selenium E-Commerce Framework:</strong> Comprehensive automation framework with CI/CD integration</li>
                    <li><strong>JUnit 5 Testing Framework:</strong> Advanced testing implementation achieving 85% coverage</li>
                </ul>
            </div>
        </body>
        </html>
    `;
}

// Download HTML as PDF (simplified version)
function downloadHTMLAsPDF(htmlContent) {
    const blob = new Blob([htmlContent], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'Zeeshan_Mustafa_Resume.html';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// Navbar Scroll Effect
function initNavbarScrollEffect() {
    const navbar = document.querySelector('nav');

    function handleNavbarScroll() {
        if (window.scrollY > 50) {
            navbar.classList.add('backdrop-blur-xl', 'bg-white/90', 'dark:bg-dark-bg/90');
        } else {
            navbar.classList.remove('backdrop-blur-xl', 'bg-white/90', 'dark:bg-dark-bg/90');
        }
    }

    window.addEventListener('scroll', handleNavbarScroll);
    handleNavbarScroll(); // Run on load
}

// Intersection Observer for animations
function initIntersectionObserver() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-slide-up');
            }
        });
    }, observerOptions);

    // Observe all sections
    document.querySelectorAll('section').forEach(section => {
        observer.observe(section);
    });
}

// Initialize Intersection Observer
window.addEventListener('load', initIntersectionObserver);

// Parallax Effect (subtle)
function initParallax() {
    const parallaxElements = document.querySelectorAll('.parallax');

    function handleParallax() {
        const scrollY = window.scrollY;

        parallaxElements.forEach(element => {
            const speed = element.dataset.speed || 0.5;
            const yPos = -(scrollY * speed);
            element.style.transform = `translate3d(0, ${yPos}px, 0)`;
        });
    }

    window.addEventListener('scroll', handleParallax);
}

// Add floating animation to certain elements
function initFloatingAnimation() {
    const floatingElements = document.querySelectorAll('.animate-float');

    floatingElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.5}s`;
    });
}

// Initialize floating animations on load
window.addEventListener('load', initFloatingAnimation);

// Keyboard navigation support
function initKeyboardNavigation() {
    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape') {
            // Close mobile menu
            const mobileMenu = document.getElementById('mobile-menu');
            if (!mobileMenu.classList.contains('hidden')) {
                mobileMenu.classList.add('hidden');
                const icon = document.getElementById('mobile-menu-toggle').querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        }
    });
}

// Initialize keyboard navigation
initKeyboardNavigation();

// Performance optimization: Throttle scroll events
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}

// Apply throttling to scroll events for better performance
window.addEventListener('scroll', throttle(function () {
    // All scroll-based functions are already optimized
}, 16)); // 60fps

console.log('🚀 Zeeshan Mustafa Portfolio loaded successfully!');