// main.js - Основные скрипты для сайта MMVI

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
});

// Лоадер
function initLoader() {
    const loader = document.querySelector('.loader');
    if (loader) {
        setTimeout(() => {
            loader.classList.add('hidden');
        }, 1000);
    }
}

// Навигация
function initNavigation() {
    const menuToggle = document.getElementById('menuToggle');
    const navLinks = document.getElementById('navLinks');
    const header = document.getElementById('header');

    // Мобильное меню
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navLinks.classList.toggle('active');
            document.body.style.overflow = navLinks.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Закрытие меню при клике на ссылку
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navLinks.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Изменение шапки при скролле
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
}

// Плавная прокрутка
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// Инициализация Swiper
function initSwiper() {
    if (typeof Swiper !== 'undefined') {
        const projectsSlider = new Swiper('.projects-slider', {
            slidesPerView: 1,
            spaceBetween: 30,
            loop: true,
            speed: 800,
            autoplay: {
                delay: 5000,
                disableOnInteraction: false,
            },
            navigation: {
                nextEl: '.swiper-button-next',
                prevEl: '.swiper-button-prev',
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
}

// Модальное окно для изображений
function initModal() {
    const modal = document.getElementById('projectModal');
    const modalImg = document.getElementById('modalImage');
    const modalClose = document.querySelector('.modal-close');

    // Открытие модального окна
    document.querySelectorAll('[data-modal-src]').forEach(img => {
        img.addEventListener('click', function() {
            const src = this.getAttribute('data-modal-src');
            modalImg.src = src;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden';
        });
    });

    // Закрытие модального окна
    function closeModal() {
        modal.classList.remove('active');
        document.body.style.overflow = '';
    }

    if (modalClose) {
        modalClose.addEventListener('click', closeModal);
    }

    // Закрытие по клику вне изображения
    modal.addEventListener('click', function(e) {
        if (e.target === this) {
            closeModal();
        }
    });

    // Закрытие по Escape
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });
}

// Форма обратной связи
function initForm() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', async function(e) {
            e.preventDefault();
            
            const formData = new FormData(this);
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Показываем загрузку
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            try {
                // Здесь должна быть реальная отправка на сервер
                await new Promise(resolve => setTimeout(resolve, 1500));
                
                // Успешная отправка
                alert('Сообщение отправлено! Мы свяжемся с вами в ближайшее время.');
                contactForm.reset();
                
            } catch (error) {
                alert('Ошибка отправки. Пожалуйста, попробуйте позже.');
            } finally {
                // Восстанавливаем кнопку
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }
        });
    }
}

// Анимации при скролле
function initAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in-up');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Наблюдаем за элементами с анимацией
    document.querySelectorAll('.fade-in-up').forEach(el => {
        observer.observe(el);
    });
}

// Яндекс Карта
function initMap() {
    if (typeof ymaps !== 'undefined') {
        ymaps.ready(function() {
            const map = new ymaps.Map('map', {
                center: [55.7415, 37.6691], // Координаты Марксистской 20
                zoom: 15,
                controls: ['zoomControl']
            });

            // Добавляем метку
            const placemark = new ymaps.Placemark([55.7415, 37.6691], {
                hintContent: 'MMVI Шоурум',
                balloonContent: 'Москва, Марксистская 20, стр 1'
            }, {
                iconLayout: 'default#image',
                iconImageHref: 'https://cdn-icons-png.flaticon.com/512/684/684908.png',
                iconImageSize: [40, 40],
                iconImageOffset: [-20, -40]
            });

            map.geoObjects.add(placemark);
        });
    }
}

// Эффекты при скролле
function initScrollEffects() {
    // Параллакс для героя
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroImage = document.querySelector('.hero-image img');
        
        if (heroImage) {
            heroImage.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
}

// Управление видео/анимациями
function initMedia() {
    // Ленивая загрузка изображений
    const lazyImages = document.querySelectorAll('img[data-src]');
    
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute('data-src');
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => imageObserver.observe(img));
}

// Обработка ошибок
window.addEventListener('error', function(e) {
    console.error('Произошла ошибка:', e.error);
});

// Инициализация при полной загрузке страницы
window.addEventListener('load', function() {
    // Проверка поддержки WebP
    const isWebPSupported = () => {
        const elem = document.createElement('canvas');
        if (!!(elem.getContext && elem.getContext('2d'))) {
            return elem.toDataURL('image/webp').indexOf('data:image/webp') == 0;
        }
        return false;
    };

    if (isWebPSupported()) {
        document.documentElement.classList.add('webp');
    } else {
        document.documentElement.classList.add('no-webp');
    }
});
