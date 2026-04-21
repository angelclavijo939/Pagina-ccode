// ============================================
// TECHPRO - Interactive Scripts
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all modules
    initDynamicText();
    initNavigation();
    initScrollEffects();
    initFAQ();
    initNewsletter();
    initSmoothScroll();
    initFooterContactForm();
});

// ============================================
// DYNAMIC HERO TEXT
// ============================================

function initDynamicText() {
    const dynamicText = document.getElementById('dynamicText');
    if (!dynamicText) return;

    const words = [
        'PROYECTOS',
        'MARKETING DIGITAL',
        'INTELIGENCIA ARTIFICIAL',
        'DISEÑO WEB'
    ];

    let currentIndex = 0;
    let isAnimating = false;

    function updateText() {
        if (isAnimating) return;
        isAnimating = true;

        // Fade out
        dynamicText.style.opacity = '0';
        dynamicText.style.transform = 'translateY(-20px)';
        dynamicText.style.filter = 'blur(10px)';

        setTimeout(() => {
            // Update text
            currentIndex = (currentIndex + 1) % words.length;
            dynamicText.textContent = words[currentIndex];

            // Fade in
            dynamicText.style.opacity = '1';
            dynamicText.style.transform = 'translateY(0)';
            dynamicText.style.filter = 'blur(0)';

            setTimeout(() => {
                isAnimating = false;
            }, 500);
        }, 500);
    }

    // Initial styles for animation
    dynamicText.style.transition = 'opacity 0.5s, transform 0.5s, filter 0.5s';

    // Change every 5 seconds
    setInterval(updateText, 5000);
}

// ============================================
// NAVIGATION
// ============================================

function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const nav = document.getElementById('nav');
    const header = document.getElementById('header');

    // Mobile menu toggle
    if (menuToggle && nav) {
        menuToggle.addEventListener('click', () => {
            menuToggle.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.style.overflow = nav.classList.contains('active') ? 'hidden' : '';
        });

        // Close menu on link click
        const navLinks = nav.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Header scroll effect
    if (header) {
        let lastScroll = 0;
        window.addEventListener('scroll', () => {
            const currentScroll = window.pageYOffset;

            if (currentScroll > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }

            lastScroll = currentScroll;
        }, { passive: true });
    }

    // Active section highlighting
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        let current = '';
        const scrollPosition = window.pageYOffset + 200;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;

            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }, { passive: true });
}

// ============================================
// SCROLL EFFECTS
// ============================================

function initScrollEffects() {
    // Reveal animations on scroll
    const revealElements = document.querySelectorAll(
        '.service-card, .testimonial-card, .blog-card, .advantage-card'
    );

    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                revealObserver.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    revealElements.forEach((el, index) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
        revealObserver.observe(el);
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');

    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');

        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');

            // Close all items
            faqItems.forEach(i => i.classList.remove('active'));

            // Open clicked item if it wasn't active
            if (!isActive) {
                item.classList.add('active');
            }
        });
    });
}

// ============================================
// NEWSLETTER FORM
// ============================================

function initNewsletter() {
    const form = document.getElementById('newsletterForm');

    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const input = form.querySelector('input[type="email"]');
            const email = input.value;

            if (email) {
                // Show success message
                const btn = form.querySelector('button');
                const originalText = btn.textContent;
                btn.textContent = '✓';
                btn.style.background = '#00FF88';

                setTimeout(() => {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    input.value = '';
                }, 2000);
            }
        });
    }
}

// ============================================
// SMOOTH SCROLL
// ============================================

function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href === '#') return;

            const target = document.querySelector(href);
            if (target) {
                e.preventDefault();
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// ============================================
// FORM VALIDATION UTILITIES
// ============================================

const FormValidator = {
    toUpperCase: (value) => value.toUpperCase(),

    isValidEmail: (email) => {
        const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return re.test(email);
    },

    isValidPhone: (phone) => {
        const re = /^[\d\s\-\+\(\)]{10,}$/;
        return re.test(phone);
    },

    showError: (input, message) => {
        const existingError = input.parentElement.querySelector('.error-message');
        if (existingError) existingError.remove();

        const error = document.createElement('span');
        error.className = 'error-message';
        error.textContent = message;
        error.style.cssText = `
            color: #CC5500;
            font-size: 0.8rem;
            margin-top: 0.25rem;
            display: block;
        `;
        input.parentElement.appendChild(error);
        input.style.borderColor = '#CC5500';
    },

    clearError: (input) => {
        const error = input.parentElement.querySelector('.error-message');
        if (error) error.remove();
        input.style.borderColor = '';
    }
};

// ============================================
// ANIMATION UTILITIES
// ============================================

const Animations = {
    fadeIn: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transition = `opacity ${duration}ms`;
        requestAnimationFrame(() => {
            element.style.opacity = '1';
        });
    },

    slideUp: (element, duration = 300) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = `opacity ${duration}ms, transform ${duration}ms`;
        requestAnimationFrame(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        });
    },

    pulse: (element, duration = 1000) => {
        element.style.animation = `none`;
        requestAnimationFrame(() => {
            element.style.animation = `pulse ${duration}ms`;
        });
    }
};

// ============================================
// PARALLAX EFFECT (subtle)
// ============================================

window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const parallaxElements = document.querySelectorAll('.hero-grid');

    parallaxElements.forEach(el => {
        const speed = 0.5;
        el.style.transform = `translateY(${scrolled * speed}px)`;
    });
}, { passive: true });

// ============================================
// TECH BAR PAUSE ON HOVER
// ============================================

const techTrack = document.getElementById('techTrack');
if (techTrack) {
    const techBar = document.querySelector('.tech-bar');
    if (techBar) {
        techBar.addEventListener('mouseenter', () => {
            techTrack.style.animationPlayState = 'paused';
        });
        techBar.addEventListener('mouseleave', () => {
            techTrack.style.animationPlayState = 'running';
        });
    }
}

// ============================================
// LOADING STATE
// ============================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
});

// ============================================
// KEYBOARD NAVIGATION
// ============================================

document.addEventListener('keydown', (e) => {
    // ESC closes mobile menu
    if (e.key === 'Escape') {
        const nav = document.getElementById('nav');
        const menuToggle = document.getElementById('menuToggle');
        if (nav && nav.classList.contains('active')) {
            nav.classList.remove('active');
            menuToggle.classList.remove('active');
            document.body.style.overflow = '';
        }
    }
});

// ============================================
// FOOTER CONTACT FORM
// ============================================

function initFooterContactForm() {
    const form = document.getElementById('footerContactForm');
    const formStatus = document.getElementById('footerFormStatus');

    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // Validation
        if (!data.correo.includes('@')) {
            formStatus.textContent = 'Por favor ingresa un correo válido';
            formStatus.className = 'form-status error';
            return;
        }

        try {
            formStatus.textContent = 'Enviando...';
            formStatus.className = 'form-status';
            formStatus.style.display = 'block';

            // Enviar a la API
            const response = await fetch('/api/save_contact', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });

            const result = await response.json();

            if (response.ok) {
                formStatus.textContent = '¡Mensaje enviado exitosamente! Redirigiendo...';
                formStatus.className = 'form-status success';
                form.reset();

                // Redirigir al inicio después de 1.5 segundos
                setTimeout(() => {
                    window.location.href = '#inicio';
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                }, 1500);
            } else {
                formStatus.textContent = result.error || 'Error al enviar. Intenta de nuevo.';
                formStatus.className = 'form-status error';
            }

        } catch (error) {
            console.error('Error:', error);
            formStatus.textContent = 'Error de conexión. Verifica tu internet.';
            formStatus.className = 'form-status error';
        }
    });
}
