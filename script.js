document.addEventListener('DOMContentLoaded', function() {
    const navToggle = document.querySelector('.nav-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');
    const navbar = document.querySelector('.navbar');
    const contactForm = document.getElementById('contactForm');

    navToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        const icon = navToggle.querySelector('i');
        if (navMenu.classList.contains('active')) {
            icon.classList.remove('fa-bars');
            icon.classList.add('fa-times');
        } else {
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        }
    });

    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            const icon = navToggle.querySelector('i');
            icon.classList.remove('fa-times');
            icon.classList.add('fa-bars');
        });
    });

    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
        }

        const sections = document.querySelectorAll('section[id]');
        let current = '';

        sections.forEach(function(section) {
            const sectionTop = section.offsetTop - 100;
            const sectionHeight = section.clientHeight;

            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(function(link) {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + current) {
                link.classList.add('active');
            }
        });
    });

    document.querySelectorAll('a[href^="#"]').forEach(function(anchor) {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navbarHeight = navbar.offsetHeight;
                const targetPosition = targetElement.offsetTop - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(function(entry) {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    const animatedElements = document.querySelectorAll('.blog-card, .project-card, .contact-item, .about-info, .about-skills, .about-goals');
    animatedElements.forEach(function(el) {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });

    document.querySelectorAll('.skill-tag').forEach(function(tag) {
        tag.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });
        tag.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    });

    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const btn = this.querySelector('button[type="submit"]');
            const originalText = btn.textContent;
            btn.textContent = '发送中...';
            btn.disabled = true;

            setTimeout(function() {
                btn.textContent = '发送成功！';
                btn.style.background = '#28a745';

                setTimeout(function() {
                    btn.textContent = originalText;
                    btn.style.background = '';
                    btn.disabled = false;
                    contactForm.reset();
                }, 2000);
            }, 1500);
        });
    }

    const heroText = document.querySelector('.hero-text');
    const heroImage = document.querySelector('.hero-image');

    if (heroText && heroImage) {
        heroText.style.animation = 'fadeInLeft 1s ease forwards';
        heroImage.style.animation = 'fadeInRight 1s ease forwards';
    }

    const avatar = document.querySelector('.avatar');
    if (avatar) {
        avatar.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.05)';
        });
        avatar.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
    }

    window.addEventListener('scroll', function() {
        const scrolled = window.scrollY;
        const hero = document.querySelector('.hero');
        if (hero && scrolled < window.innerHeight) {
            hero.style.backgroundPositionY = scrolled * 0.3 + 'px';
        }
    });

    const blogCards = document.querySelectorAll('.blog-card');
    blogCards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + 's';
    });

    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(function(card, index) {
        card.style.animationDelay = (index * 0.1) + 's';
    });

    document.querySelectorAll('.info-item, .goal-item').forEach(function(item) {
        item.addEventListener('mouseenter', function() {
            this.style.borderLeft = '3px solid #2d6a4f';
        });
        item.addEventListener('mouseleave', function() {
            this.style.borderLeft = 'none';
        });
    });
});
