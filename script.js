document.addEventListener('DOMContentLoaded', function() {
    // Инициализация
    initLoader();
    initNavigation();
    initSmoothScroll();
    initSwiper();
    initModal();
    initForm();
    initAnimations();
    initMap();
    initScrollEffects();
    initTextBlocks();
    initCounters();
    initParallax();
    initScrollProgress();
    initCursorEffects();
    initVideoPlayer();
    initImageZoom();
    initStickyElements();
    initMenuObserver();
    initThemeToggle();
    initNotifications();
    initPerformanceMonitor();
});

// Лоадер
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
            // Восстанавливаем скролл после загрузки
            document.body.style.overflow = '';
        }, 800);
        
        // Фолбэк на случай если что-то пошло не так
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 3000);
    }
}

// Навигация
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('header');
    const navHeight = header ? header.offsetHeight : 0;

    // Мобильное меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function(e) {
            e.stopPropagation();
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
            
            // Добавляем оверлей для мобильного меню
            if (navLinks.classList.contains('active')) {
                const overlay = document.createElement('div');
                overlay.className = 'mobile-overlay';
                overlay.addEventListener('click', () => {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    overlay.remove();
                });
                document.body.appendChild(overlay);
            } else {
                const overlay = document.querySelector('.mobile-overlay');
                if (overlay) overlay.remove();
            }
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            if (menuToggle) menuToggle.classList.remove('active');
            if (navLinks) navLinks.classList.remove('active');
            document.body.style.overflow = '';
            const overlay = document.querySelector('.mobile-overlay');
            if (overlay) overlay.remove();
        });
    });

    // Изменение шапки при скролле
    let lastScrollTop = 0;
    window.addEventListener('scroll', () => {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (header) {
            // Эффект появления/исчезновения шапки
            if (scrollTop > 100) {
                header.classList.add('scrolled');
                if (scrollTop > lastScrollTop && scrollTop > 300) {
                    // Скролл вниз
                    header.style.transform = 'translateY(-100%)';
                } else {
                    // Скролл вверх
                    header.style.transform = 'translateY(0)';
                }
            } else {
                header.classList.remove('scrolled');
                header.style.transform = 'translateY(0)';
            }
            lastScrollTop = scrollTop;
            
            // Подсветка активного пункта меню
            highlightActiveMenuItem();
        }
    }, { passive: true });

    // Предотвращение прокрутки при открытом меню
    navLinks?.addEventListener('wheel', (e) => {
        if (navLinks.classList.contains('active')) {
            e.preventDefault();
        }
    });

    // Клик вне меню для закрытия
    document.addEventListener('click', (e) => {
        if (navLinks?.classList.contains('active') && 
            !navLinks.contains(e.target) && 
            menuToggle && !menuToggle.contains(e.target)) {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
            const overlay = document.querySelector('.mobile-overlay');
            if (overlay) overlay.remove();
        }
    });
}

// Подсветка активного пункта меню
function highlightActiveMenuItem() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    const scrollPos = window.scrollY + 100;
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const sectionId = section.getAttribute('id');
        
        if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    const header = document.querySelector('.header');
    const headerHeight = header ? header.offsetHeight : 0;
    
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const targetId = this.getAttribute('href');
            if (targetId === '#' || !targetId) return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                e.preventDefault();
                
                // Закрываем мобильное меню если открыто
                const menuToggle = document.getElementById('menuToggle');
                const navLinks = document.getElementById('navLinks');
                if (menuToggle && navLinks && navLinks.classList.contains('active')) {
                    menuToggle.classList.remove('active');
                    navLinks.classList.remove('active');
                    document.body.style.overflow = '';
                    const overlay = document.querySelector('.mobile-overlay');
                    if (overlay) overlay.remove();
                }
                
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Фокус для доступности
                setTimeout(() => {
                    targetElement.setAttribute('tabindex', '-1');
                    targetElement.focus();
                    targetElement.removeAttribute('tabindex');
                }, 1000);
            }
        });
    });
}

// Инициализация Swiper
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        // Основной слайдер проектов
        const projectsSlider = new Swiper('.projects-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            grabCursor: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
                pauseOnMouseEnter: true,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
            },
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
                dynamicBullets: true,
            },
            breakpoints: {
                640: {
                    slidesPerView: 1.2,
                    spaceBetween: 20,
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 25,
                },
                1024: {
                    slidesPerView: 3,
                    spaceBetween: 30,
                },
                1440: {
                    slidesPerView: 3,
                    spaceBetween: 40,
                }
            },
            on: {
                init: function() {
                    this.el.classList.add('swiper-initialized');
                }
            }
        });
        
        // Слайдер медиа
        const mediaSlider = document.querySelector('.media-slider');
        if (mediaSlider) {
            new Swiper('.media-slider', {
                slidesPerView: 1,
                spaceBetween: 20,
                loop: true,
                autoplay: {
                    delay: 4000,
                },
                breakpoints: {
                    768: {
                        slidesPerView: 2,
                    },
                    1024: {
                        slidesPerView: 3,
                    }
                }
            });
        }
        
        // Ленивая загрузка для Swiper
        projectsSlider.on('slideChange', function() {
            const activeSlide = this.slides[this.activeIndex];
            const images = activeSlide.querySelectorAll('img[data-src]');
            images.forEach(img => {
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
            });
        });
    }
}

// Модальное окно для изображений
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');

    if (!modal || !modalImg) return;

    let isAnimating = false;

    // Открытие модального окна
    document.querySelectorAll('[data-modal-src]').forEach(img => {
        img.addEventListener('click', function(e) {
            e.preventDefault();
            
            if (isAnimating) return;
            isAnimating = true;
            
            const src = this.getAttribute('data-modal-src');
            const alt = this.getAttribute('alt') || 'Изображение проекта';
            
            // Показываем лоадер
            modalImg.style.opacity = '0';
            modalImg.src = src;
            modalImg.alt = alt;
            
            // Добавляем описание если есть
            const description = this.getAttribute('data-description');
            let caption = modal.querySelector('.modal-caption');
            if (description) {
                if (!caption) {
                    caption = document.createElement('div');
                    caption.className = 'modal-caption';
                    modal.appendChild(caption);
                }
                caption.textContent = description;
            } else if (caption) {
                caption.remove();
            }
            
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
            
            // Плавное появление изображения
            modalImg.onload = () => {
                modalImg.style.opacity = '1';
                isAnimating = false;
            };
            
            // Таймаут на случай ошибки загрузки
            setTimeout(() => {
                isAnimating = false;
            }, 1000);
        });
    });

    // Закрытие модального окна
    function closeModal() {
        if (isAnimating) return;
        
        modal.classList.remove('active');
        setTimeout(() => {
            document.body.style.overflow = '';
        }, 300);
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === this && !isAnimating) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active') && !isAnimating) {
            closeModal();
        }
    });
    
    // Закрытие по свайпу на мобильных
    let touchStartX = 0;
    modal.addEventListener('touchstart', (e) => {
        touchStartX = e.touches[0].clientX;
    });
    
    modal.addEventListener('touchend', (e) => {
        const touchEndX = e.changedTouches[0].clientX;
        if (Math.abs(touchEndX - touchStartX) > 100) {
            closeModal();
        }
    });
}

// Форма обратной связи
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (!contactForm) return;
    
    const inputs = contactForm.querySelectorAll('.form-control');
    const submitBtn = contactForm.querySelector('button[type="submit"]');
    
    // Валидация в реальном времени
    inputs.forEach(input => {
        input.addEventListener('blur', function() {
            validateField(this);
        });
        
        input.addEventListener('input', function() {
            if (this.classList.contains('error')) {
                validateField(this);
            }
        });
    });
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        if (!validateForm()) return;
        
        const formData = new FormData(this);
        const originalText = submitBtn.textContent;
        const originalHTML = submitBtn.innerHTML;
        
        // Показываем загрузку
        submitBtn.textContent = 'Отправка...';
        submitBtn.disabled = true;
        submitBtn.classList.add('loading');
        
        try {
            // Симуляция отправки
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // Успешная отправка
            showNotification('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.', 'success');
            contactForm.reset();
            
            // Анимация успеха
            submitBtn.classList.remove('loading');
            submitBtn.classList.add('success');
            setTimeout(() => {
                submitBtn.classList.remove('success');
            }, 2000);
            
        } catch (error) {
            showNotification('Ошибка отправки. Пожалуйста, попробуйте позже.', 'error');
            submitBtn.classList.remove('loading');
        } finally {
            // Восстанавливаем кнопку
            submitBtn.textContent = originalText;
            submitBtn.innerHTML = originalHTML;
            submitBtn.disabled = false;
            submitBtn.classList.remove('loading');
        }
    });
    
    function validateField(field) {
        let isValid = true;
        let errorMessage = '';
        
        switch(field.type) {
            case 'email':
                const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
                isValid = emailRegex.test(field.value);
                errorMessage = 'Введите корректный email';
                break;
            case 'tel':
                const phoneRegex = /^[\d\s\-\+\(\)]+$/;
                isValid = phoneRegex.test(field.value) && field.value.replace(/\D/g, '').length >= 10;
                errorMessage = 'Введите корректный номер телефона';
                break;
            default:
                isValid = field.value.trim() !== '';
                errorMessage = 'Это поле обязательно для заполнения';
        }
        
        if (isValid) {
            field.classList.remove('error');
            field.classList.add('valid');
            removeError(field);
        } else {
            field.classList.remove('valid');
            field.classList.add('error');
            showError(field, errorMessage);
        }
        
        return isValid;
    }
    
    function validateForm() {
        let isValid = true;
        
        inputs.forEach(input => {
            if (!validateField(input)) {
                isValid = false;
            }
        });
        
        return isValid;
    }
    
    function showError(field, message) {
        removeError(field);
        const error = document.createElement('div');
        error.className = 'form-error';
        error.textContent = message;
        error.style.cssText = `
            color: #dc3545;
            font-size: 12px;
            margin-top: 5px;
            display: block;
        `;
        field.parentNode.appendChild(error);
    }
    
    function removeError(field) {
        const error = field.parentNode.querySelector('.form-error');
        if (error) {
            error.remove();
        }
    }
}

// Анимации при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
                observer.unobserve(entry.target);
                
                // Запускаем счетчики если они есть
                if (entry.target.querySelector('.counter')) {
                    initCountersInSection(entry.target);
                }
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.fade-in-up, .reveal-text, .animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
    
    // Анимация для изображений
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('loaded');
                imageObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });
    
    document.querySelectorAll('.lazy-image').forEach(img => {
        imageObserver.observe(img);
    });
}

// Яндекс Карта
function initMap() {
    if (typeof ymaps !== 'undefined' && document.getElementById('map')) {
        ymaps.ready(function() {
            const map = new ymaps.Map('map', {
                center: [55.7415, 37.6691],
                zoom: 16,
                controls: ['zoomControl', 'fullscreenControl'],
                behaviors: ['drag', 'scrollZoom']
            });

            // Стилизация карты
            map.behaviors.disable('scrollZoom');
            
            // Собственный стиль
            map.options.set({
                suppressMapOpenBlock: true
            });

            // Метка
            const placemark = new ymaps.Placemark([55.7415, 37.6691], {
                balloonContentHeader: 'MMVI Шоурум',
                balloonContentBody: '<strong>Москва, Марксистская 20, стр 1</strong><br>Ежедневно с 10:00 до 20:00',
                hintContent: 'Показать информацию'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAiIGhlaWdodD0iNDAiIHZpZXdCb3g9IjAgMCA0MCA0MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48Y2lyY2xlIGN4PSIyMCIgY3k9IjIwIiByPSIxNSIgZmlsbD0iIzAwNTQzOSIgZmlsbC1vcGFjaXR5PSIwLjgiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSIyIi8+PGNpcmNsZSBjeD0iMjAiIGN5PSIyMCIgcj0iNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            });

            map.geoObjects.add(placemark);
            
            // Открываем балун по клику
            placemark.events.add('click', function() {
                map.balloon.open([55.7415, 37.6691], {
                    contentHeader: 'MMVI Шоурум',
                    contentBody: 'Москва, Марксистская 20, стр 1<br>Телефон: +7 (495) 670-70-04<br>Часы работы: Пн-Пт 10:00-20:00',
                    contentFooter: '<a href="https://yandex.ru/maps/org/mmvi/1124717905/" target="_blank">Подробнее на Яндекс.Картах</a>'
                });
            });
            
            // Адаптация под мобильные
            if (window.innerWidth < 768) {
                map.behaviors.disable('drag');
            }
        });
    } else {
        // Фолбэк если карта не загрузилась
        const mapContainer = document.getElementById('map');
        if (mapContainer) {
            mapContainer.innerHTML = `
                <div style="padding: 40px; text-align: center; color: #666;">
                    <h3>MMVI Шоурум</h3>
                    <p>Москва, Марксистская 20, стр 1</p>
                    <a href="https://yandex.ru/maps/org/mmvi/1124717905/" target="_blank" style="color: #005439; text-decoration: underline;">
                        Посмотреть на Яндекс.Картах
                    </a>
                </div>
            `;
        }
    }
}

// Эффекты при скролле
function initScrollEffects() {
    // Параллакс для героя
    const heroImage = document.querySelector('.hero-image img');
    if (heroImage) {
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            const speed = 0.3;
            heroImage.style.transform = `translateY(${scrolled * speed}px)`;
        }, { passive: true });
    }
    
    // Параллакс для других элементов
    document.querySelectorAll('.parallax-element').forEach(el => {
        const speed = parseFloat(el.dataset.speed) || 0.5;
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        }, { passive: true });
    });
    
    // Эффект появления при скролле
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        document.querySelectorAll('.scroll-fade').forEach(el => {
            const elementTop = el.offsetTop;
            const elementHeight = el.offsetHeight;
            const windowHeight = window.innerHeight;
            
            if (scrolled > elementTop - windowHeight + 100) {
                const opacity = 1 - (elementTop + elementHeight - scrolled - windowHeight) / (windowHeight);
                el.style.opacity = Math.max(0, Math.min(1, opacity));
            }
        });
    }, { passive: true });
}

// Текстовые блоки и анимации
function initTextBlocks() {
    // Анимация появления текста
    const textBlocks = document.querySelectorAll('.text-block, .split-section .text-side');
    
    textBlocks.forEach(block => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateText(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.3 });
        
        observer.observe(block);
    });
    
    // Анимация разделения текста
    document.querySelectorAll('.split-text').forEach(text => {
        const originalText = text.textContent;
        const words = originalText.split(' ');
        text.innerHTML = words.map(word => 
            `<span class="word" style="display: inline-block; opacity: 0; transform: translateY(20px);">${word}</span>`
        ).join(' ');
    });
    
    // Анимация маскировки текста
    document.querySelectorAll('.mask-text').forEach(text => {
        text.addEventListener('mouseenter', function() {
            this.style.webkitTextStroke = '1px #005439';
            this.style.webkitTextFillColor = 'transparent';
        });
        
        text.addEventListener('mouseleave', function() {
            this.style.webkitTextStroke = '0';
            this.style.webkitTextFillColor = '';
        });
    });
    
    function animateText(element) {
        const words = element.querySelectorAll('.word');
        words.forEach((word, index) => {
            setTimeout(() => {
                word.style.opacity = '1';
                word.style.transform = 'translateY(0)';
            }, index * 100);
        });
    }
}

// Счетчики
function initCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    animateCounter(entry.target);
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(counter);
    });
}

function initCountersInSection(section) {
    const counters = section.querySelectorAll('.counter');
    counters.forEach(counter => {
        animateCounter(counter);
    });
}

function animateCounter(counter) {
    const target = parseInt(counter.getAttribute('data-target') || counter.textContent);
    const suffix = counter.getAttribute('data-suffix') || '';
    const duration = 2000;
    const step = target / (duration / 16);
    let current = 0;
    
    const timer = setInterval(() => {
        current += step;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        counter.textContent = Math.floor(current) + suffix;
    }, 16);
}

// Параллакс эффекты
function initParallax() {
    const parallaxElements = document.querySelectorAll('[data-parallax]');
    
    parallaxElements.forEach(el => {
        const speed = parseFloat(el.dataset.parallax) || 0.5;
        
        window.addEventListener('scroll', () => {
            const scrolled = window.pageYOffset;
            el.style.transform = `translateY(${scrolled * speed}px)`;
        }, { passive: true });
    });
}

// Прогресс скролла
function initScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 0%;
        height: 3px;
        background: #005439;
        z-index: 9999;
        transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);
    
    window.addEventListener('scroll', () => {
        const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
        const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (winScroll / height) * 100;
        progressBar.style.width = scrolled + "%";
    }, { passive: true });
}

// Эффекты курсора
function initCursorEffects() {
    if (window.innerWidth > 768) {
        const cursor = document.createElement('div');
        cursor.className = 'custom-cursor';
        cursor.style.cssText = `
            position: fixed;
            width: 20px;
            height: 20px;
            border: 2px solid #005439;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9999;
            transform: translate(-50%, -50%);
            transition: width 0.3s, height 0.3s, background 0.3s;
            mix-blend-mode: difference;
        `;
        document.body.appendChild(cursor);
        
        const follower = document.createElement('div');
        follower.className = 'cursor-follower';
        follower.style.cssText = `
            position: fixed;
            width: 8px;
            height: 8px;
            background: #005439;
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            transform: translate(-50%, -50%);
            transition: all 0.1s;
        `;
        document.body.appendChild(follower);
        
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            
            setTimeout(() => {
                follower.style.left = e.clientX + 'px';
                follower.style.top = e.clientY + 'px';
            }, 50);
        });
        
        // Эффекты при наведении
        const interactiveElements = document.querySelectorAll('a, button, .btn, [data-cursor-hover]');
        
        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                cursor.style.width = '40px';
                cursor.style.height = '40px';
                cursor.style.backgroundColor = 'rgba(0, 84, 57, 0.2)';
            });
            
            el.addEventListener('mouseleave', () => {
                cursor.style.width = '20px';
                cursor.style.height = '20px';
                cursor.style.backgroundColor = 'transparent';
            });
        });
        
        // Скрываем курсор когда мышь не двигается
        let timer;
        document.addEventListener('mousemove', () => {
            cursor.style.opacity = '1';
            follower.style.opacity = '1';
            clearTimeout(timer);
            timer = setTimeout(() => {
                cursor.style.opacity = '0';
                follower.style.opacity = '0';
            }, 3000);
        });
    }
}

// Видеоплеер
function initVideoPlayer() {
    const videos = document.querySelectorAll('video');
    
    videos.forEach(video => {
        // Ленивая загрузка видео
        if (video.hasAttribute('data-src')) {
            const source = video.querySelector('source');
            if (source) {
                source.src = video.getAttribute('data-src');
                video.load();
                video.removeAttribute('data-src');
            }
        }
        
        // Автовоспроизведение с задержкой
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    setTimeout(() => {
                        video.play().catch(e => console.log('Autoplay prevented:', e));
                    }, 500);
                } else {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });
        
        observer.observe(video);
        
        // Контролы для мобильных
        if (window.innerWidth <= 768) {
            video.setAttribute('controls', 'true');
        }
    });
}

// Зум изображений
function initImageZoom() {
    const zoomableImages = document.querySelectorAll('[data-zoomable]');
    
    zoomableImages.forEach(img => {
        img.style.cursor = 'zoom-in';
        img.addEventListener('click', function() {
            if (this.classList.contains('zoomed')) {
                this.classList.remove('zoomed');
                this.style.cursor = 'zoom-in';
            } else {
                this.classList.add('zoomed');
                this.style.cursor = 'zoom-out';
            }
        });
        
        // Выход по ESC
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && img.classList.contains('zoomed')) {
                img.classList.remove('zoomed');
                img.style.cursor = 'zoom-in';
            }
        });
    });
}

// Липкие элементы
function initStickyElements() {
    const stickyElements = document.querySelectorAll('[data-sticky]');
    
    stickyElements.forEach(el => {
        const offset = parseInt(el.dataset.stickyOffset) || 0;
        const originalPosition = el.getBoundingClientRect().top + window.pageYOffset;
        
        window.addEventListener('scroll', () => {
            if (window.pageYOffset > originalPosition - offset) {
                el.classList.add('sticky');
            } else {
                el.classList.remove('sticky');
            }
        }, { passive: true });
    });
}

// Observer для меню
function initMenuObserver() {
    const sections = document.querySelectorAll('section[id]');
    const menuItems = document.querySelectorAll('.nav-link[href^="#"]');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const id = entry.target.getAttribute('id');
                menuItems.forEach(item => {
                    item.classList.remove('active');
                    if (item.getAttribute('href') === `#${id}`) {
                        item.classList.add('active');
                    }
                });
            }
        });
    }, { threshold: 0.5 });
    
    sections.forEach(section => observer.observe(section));
}

// Переключение темы
function initThemeToggle() {
    const themeToggle = document.querySelector('[data-theme-toggle]');
    if (!themeToggle) return;
    
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    // Устанавливаем тему
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        // Обновляем иконку
        const icon = themeToggle.querySelector('i');
        if (icon) {
            icon.className = theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
        }
    }
    
    // Инициализация
    setTheme(currentTheme);
    
    // Переключение
    themeToggle.addEventListener('click', () => {
        const current = document.documentElement.getAttribute('data-theme');
        const newTheme = current === 'dark' ? 'light' : 'dark';
        setTheme(newTheme);
    });
    
    // Следим за системными настройками
    prefersDark.addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
}

// Уведомления
function initNotifications() {
    window.showNotification = function(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 15px 20px;
            background: ${type === 'success' ? '#005439' : type === 'error' ? '#dc3545' : '#252525'};
            color: white;
            border-radius: 4px;
            z-index: 10000;
            transform: translateX(150%);
            transition: transform 0.3s ease;
            max-width: 300px;
            box-shadow: 0 5px 15px rgba(0,0,0,0.1);
        `;
        
        document.body.appendChild(notification);
        
        // Показываем
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);
        
        // Скрываем через 5 секунд
        setTimeout(() => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        }, 5000);
        
        // Закрытие по клику
        notification.addEventListener('click', () => {
            notification.style.transform = 'translateX(150%)';
            setTimeout(() => {
                notification.remove();
            }, 300);
        });
    };
}

// Мониторинг производительности
function initPerformanceMonitor() {
    // Замер времени загрузки
    const perfEntries = performance.getEntriesByType("navigation");
    if (perfEntries.length > 0) {
        const navEntry = perfEntries[0];
        console.log('Время загрузки страницы:', navEntry.loadEventEnd - navEntry.startTime, 'мс');
    }
    
    // Мониторинг скролла
    let scrollTimeout;
    window.addEventListener('scroll', () => {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(() => {
            // Освобождаем ресурсы после остановки скролла
            if (window.requestIdleCallback) {
                requestIdleCallback(() => {
                    // Оптимизации при простое
                });
            }
        }, 100);
    }, { passive: true });
    
    // Мониторинг FPS
    if ('PerformanceObserver' in window) {
        const observer = new PerformanceObserver((list) => {
            for (const entry of list.getEntries()) {
                if (entry.name === 'first-contentful-paint') {
                    console.log('FCP:', entry.startTime, 'мс');
                }
            }
        });
        observer.observe({ entryTypes: ['paint'] });
    }
}

// Утилиты
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Экспорт для глобального использования
window.MMVI = {
    initLoader,
    initNavigation,
    initSmoothScroll,
    initSwiper,
    initModal,
    initForm,
    initAnimations,
    initMap,
    initScrollEffects,
    initTextBlocks,
    initCounters,
    showNotification: window.showNotification,
    debounce,
    throttle
};

// Запускаем после полной загрузки
window.addEventListener('load', function() {
    // Проверка WebP
    const isWebPSupported = () => {
        const elem = document.createElement('canvas');
        if (elem.getContext && elem.getContext('2d')) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') === 0;
        }
        return false;
    };
    
    if (isWebPSupported()) {
        document.documentElement.classList.add('webp');
    } else {
        document.documentElement.classList.add('no-webp');
    }
    
    // Ленивая загрузка всех изображений
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                if (img.dataset.srcset) img.srcset = img.dataset.srcset;
                img.classList.add('loaded');
                imageObserver.unobserve(img);
            }
        });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
    
    // Сообщаем что страница загружена
    document.documentElement.classList.add('page-loaded');
    
    // Отправляем метрику (пример)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: document.title,
            page_location: window.location.href
        });
    }
});
