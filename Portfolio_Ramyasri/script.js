/* Premium JavaScript Functionality - Personal Portfolio for Angadi Ramyasri */

document.addEventListener('DOMContentLoaded', () => {
    
    // -------------------------------------------------------------
    // 1. Sticky Navigation Menu & Active Link Highlight
    // -------------------------------------------------------------
    const header = document.querySelector('.navbar');
    const navLinksItems = document.querySelectorAll('.nav-links a');
    const sections = document.querySelectorAll('section');

    window.addEventListener('scroll', () => {
        // Shrink navbar on scroll
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }

        // Active link tracking
        let currentSectionId = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120;
            const sectionHeight = section.clientHeight;
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });

        if (currentSectionId) {
            navLinksItems.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${currentSectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });

    // -------------------------------------------------------------
    // 2. Mobile Responsive Menu Hamburger Toggler
    // -------------------------------------------------------------
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('open');
            const icon = mobileMenuBtn.querySelector('i');
            icon.className = navLinks.classList.contains('open') ? 'fas fa-times' : 'fas fa-bars';
        });

        // Close mobile nav when link is clicked
        navLinksItems.forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('open');
                mobileMenuBtn.querySelector('i').className = 'fas fa-bars';
            });
        });
    }

    // -------------------------------------------------------------
    // 3. Smooth Rotating Typewriter Effect
    // -------------------------------------------------------------
    const typewriterEl = document.getElementById('typewriter');
    const occupations = [
        'Full Stack Developer',
        'Java Developer',
        'CSE Student',
        'Problem Solver'
    ];
    let occupationIndex = 0;
    let charIndex = 0;
    let isDeleting = false;

    function handleTypewriter() {
        const currentText = occupations[occupationIndex];
        
        if (isDeleting) {
            typewriterEl.textContent = currentText.substring(0, charIndex - 1);
            charIndex--;
        } else {
            typewriterEl.textContent = currentText.substring(0, charIndex + 1);
            charIndex++;
        }

        let typingSpeed = isDeleting ? 40 : 80;

        if (!isDeleting && charIndex === currentText.length) {
            typingSpeed = 1500; // Pause at full word
            isDeleting = true;
        } else if (isDeleting && charIndex === 0) {
            typingSpeed = 400; // Pause when empty
            isDeleting = false;
            occupationIndex = (occupationIndex + 1) % occupations.length;
        }

        setTimeout(handleTypewriter, typingSpeed);
    }

    if (typewriterEl) {
        setTimeout(handleTypewriter, 1000);
    }

    // -------------------------------------------------------------
    // 4. Skills Division Selector/Filter
    // -------------------------------------------------------------
    const skillTabBtns = document.querySelectorAll('.skill-tab-btn');
    const skillCards = document.querySelectorAll('.skill-card');

    skillTabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            skillTabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const selectedCategory = btn.getAttribute('data-category');

            skillCards.forEach(card => {
                const cardCategory = card.getAttribute('data-category');
                if (selectedCategory === 'all' || cardCategory === selectedCategory) {
                    card.style.display = 'flex';
                    // Re-trigger dynamic progress bar fill and number count up animation
                    const progressFill = card.querySelector('.progress-fill');
                    if (progressFill) {
                        const styleMatch = progressFill.getAttribute('style').match(/width:\s*(\d+)%/);
                        if (styleMatch) {
                            const targetVal = parseInt(styleMatch[1]);
                            progressFill.style.width = '0%';
                            
                            setTimeout(() => {
                                progressFill.style.width = targetVal + '%';
                            }, 50);

                            const percentEl = card.querySelector('.skill-percent');
                            if (percentEl) {
                                let currentVal = 0;
                                const duration = 800;
                                const stepTime = 16;
                                const stepVal = targetVal / (duration / stepTime);

                                const timer = setInterval(() => {
                                    currentVal += stepVal;
                                    if (currentVal >= targetVal) {
                                        percentEl.textContent = targetVal + '%';
                                        clearInterval(timer);
                                    } else {
                                        percentEl.textContent = Math.floor(currentVal) + '%';
                                    }
                                }, stepTime);
                            }
                        }
                    }
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 5. Featured Projects Filter Toggles
    // -------------------------------------------------------------
    const projectFilterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    projectFilterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            projectFilterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                const projectType = card.getAttribute('data-project-type');
                if (filterValue === 'all' || projectType === filterValue) {
                    card.style.display = 'flex';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // -------------------------------------------------------------
    // 6. Scroll-based Fade-In and Skills Bar Trigger
    // -------------------------------------------------------------
    // Add fade-in classes to all sections
    sections.forEach(sec => {
        if (sec.getAttribute('id') !== 'home') {
            sec.style.opacity = '0';
            sec.style.transform = 'translateY(30px)';
            sec.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        }
    });

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                
                // If it is the skills section, animate progress bars
                if (entry.target.id === 'skills') {
                    animateProgressBars();
                }
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.15
    });

    sections.forEach(sec => {
        if (sec.getAttribute('id') !== 'home') {
            revealObserver.observe(sec);
        }
    });

    // Handle initial progress bar fill and number count up animation
    function animateProgressBars() {
        const progressFills = document.querySelectorAll('.progress-fill');
        progressFills.forEach(fill => {
            const widthMatch = fill.getAttribute('style').match(/width:\s*(\d+)%/);
            if (widthMatch) {
                const targetVal = parseInt(widthMatch[1]);
                fill.style.width = '0%';
                
                setTimeout(() => {
                    fill.style.width = targetVal + '%';
                }, 100);

                // Dynamic counter ticker animation
                const card = fill.closest('.skill-card');
                if (card) {
                    const percentEl = card.querySelector('.skill-percent');
                    if (percentEl) {
                        let currentVal = 0;
                        const duration = 1000;
                        const stepTime = 16; 
                        const stepVal = targetVal / (duration / stepTime);

                        const timer = setInterval(() => {
                            currentVal += stepVal;
                            if (currentVal >= targetVal) {
                                percentEl.textContent = targetVal + '%';
                                clearInterval(timer);
                            } else {
                                percentEl.textContent = Math.floor(currentVal) + '%';
                            }
                        }, stepTime);
                    }
                }
            }
        });
    }

    // Trigger skills loading fallback if already visible on page load
    setTimeout(() => {
        const skillsSection = document.getElementById('skills');
        if (skillsSection) {
            const rect = skillsSection.getBoundingClientRect();
            if (rect.top >= 0 && rect.bottom <= window.innerHeight) {
                animateProgressBars();
            }
        }
    }, 1000);

    // -------------------------------------------------------------
    // 7. Light/Dark Theme Switching
    // -------------------------------------------------------------
    const themeToggleBtn = document.getElementById('theme-toggle');
    const themeIcon = themeToggleBtn ? themeToggleBtn.querySelector('i') : null;

    // Check for saved user preference, default to light mode
    const savedTheme = localStorage.getItem('theme') || 'light';
    
    if (savedTheme === 'dark') {
        enableDarkMode();
    } else {
        enableLightMode();
    }

    if (themeToggleBtn) {
        themeToggleBtn.addEventListener('click', () => {
            const isDark = document.body.classList.contains('dark-theme');
            if (isDark) {
                enableLightMode();
            } else {
                enableDarkMode();
            }
        });
    }

    function enableDarkMode() {
        document.body.classList.add('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-sun';
        }
        localStorage.setItem('theme', 'dark');
    }

    function enableLightMode() {
        document.body.classList.remove('dark-theme');
        if (themeIcon) {
            themeIcon.className = 'fas fa-moon';
        }
        localStorage.setItem('theme', 'light');
    }

    // -------------------------------------------------------------
    // 8. Contact Form Client-side Submission & Toast alerts
    // -------------------------------------------------------------
    const contactForm = document.getElementById('contact-form');
    const toast = document.getElementById('toast');
    const toastMsg = document.getElementById('toast-msg');

    if (contactForm && toast) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const origBtnText = submitBtn.innerHTML;

            // Submit Simulation loading styling
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Sending... <i class="fas fa-spinner fa-spin"></i>';

            setTimeout(() => {
                submitBtn.disabled = false;
                submitBtn.innerHTML = origBtnText;

                // Show success toast
                toastMsg.textContent = 'Message sent successfully! Thank you for reaching out.';
                toast.classList.add('show');
                contactForm.reset();

                setTimeout(() => {
                    toast.classList.remove('show');
                }, 4000);
            }, 1500);
        });
    }
});
