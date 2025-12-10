document.addEventListener("DOMContentLoaded", () => {

    /* ============================
       М О Б И Л Ь Н О Е  М Е Н Ю
    ============================== */
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');
    const header = document.querySelector('.header');

    menuToggle.addEventListener("click", () => {
        navLinks.classList.toggle("nav-open");
        menuToggle.classList.toggle("active");
    });

    // Закрытие меню по клику на ссылку
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinks.classList.remove("nav-open");
            menuToggle.classList.remove("active");
        });
    });

    // Закрытие при ресайзе
    window.addEventListener("resize", () => {
        if (window.innerWidth > 768) {
            navLinks.classList.remove("nav-open");
            menuToggle.classList.remove("active");
        }
    });



    /* ============================
       С К Р О Л Л — А Н И М А Ц И И
    ============================== */

    if (window.gsap) {
        gsap.from(".hero-content", {
            opacity: 0,
            y: 40,
            duration: 1,
            ease: "power3.out",
            delay: 0.2
        });

        gsap.from(".hero-image img", {
            opacity: 0,
            scale: 1.1,
            duration: 1.4,
            ease: "power3.out"
        });

        // Плавное появление блоков при скролле
        const animatedBlocks = document.querySelectorAll(
            ".feature-card, .portfolio-item, .section-title, .section-subtitle"
        );

        animatedBlocks.forEach(block => {
            gsap.from(block, {
                scrollTrigger: {
                    trigger: block,
                    start: "top 85%",
                },
                opacity: 0,
                y: 40,
                duration: 1,
                ease: "power3.out"
            });
        });
    }


    /* ============================
       П Л А В Н А Я  П Р О К Р У Т К А
    ============================== */
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener("click", (e) => {
            const id = anchor.getAttribute("href");
            if (id === "#") return;

            const target = document.querySelector(id);
            if (!target) return;

            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.pageYOffset - 90;

            window.scrollTo({
                top: offset,
                behavior: "smooth"
            });
        });
    });



    /* ============================
       С К Р Ы В А Ю Щ А Я С Я  Ш А П К А
    ============================== */
    let lastScroll = 0;

    window.addEventListener("scroll", () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll <= 0) {
            header.classList.remove("scroll-up");
            return;
        }

        if (currentScroll > lastScroll && !header.classList.contains("scroll-down")) {
            header.classList.remove("scroll-up");
            header.classList.add("scroll-down");
        } else if (currentScroll < lastScroll && header.classList.contains("scroll-down")) {
            header.classList.remove("scroll-down");
            header.classList.add("scroll-up");
        }

        lastScroll = currentScroll;
    });



    /* ============================
       Д О П О Л Н И Т Е Л Ь Н Ы Е  К Л А С С Ы  C S S
    ============================== */
    const dynamicStyles = document.createElement("style");
    dynamicStyles.textContent = `
        /* Мобильное меню */
        .nav-links.nav-open {
            display: flex !important;
            flex-direction: column;
            position: absolute;
            top: 100%;
            right: 0;
            left: 0;
            background: #f2f1f0;
            padding: 22px 25px;
            gap: 18px;
            box-shadow: 0 7px 25px rgba(0,0,0,0.12);
            z-index: 1000;
        }

        .menu-toggle.active i {
            transform: rotate(90deg);
            transition: 0.3s ease;
        }

        /* Плавное скрытие шапки */
        .header {
            position: fixed;
            width: 100%;
            top: 0;
            left: 0;
            transition: transform 0.35s ease, box-shadow 0.3s ease;
        }
        .header.scroll-down {
            transform: translateY(-110%);
        }
        .header.scroll-up {
            transform: translateY(0);
            box-shadow: 0 2px 18px rgba(0,0,0,0.12);
        }
    `;
    document.head.appendChild(dynamicStyles);

    
});

document.addEventListener("DOMContentLoaded", () => {
    const v = document.querySelector(".hero__video");

    // Если видео не загрузилось — показать градиент
    if (v) {
        v.addEventListener("error", () => {
            v.style.display = "none";
        });
    }

    // Лёгкая анимация появления (добавляется класс)
    setTimeout(() => {
        document.querySelector(".hero__content").classList.add("show");
    }, 200);
});


