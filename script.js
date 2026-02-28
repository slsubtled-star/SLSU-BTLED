document.addEventListener('DOMContentLoaded', () => {

    // ===== PRELOADER (UNCHANGED) =====
    const preloader = document.querySelector(".preloader");
    const content = document.getElementById("content");

    if (preloader) {
        setTimeout(() => {
            preloader.classList.add("fade-out");
            setTimeout(() => {
                preloader.style.display = "none";
                if (content) content.style.display = "block";
            }, 800);
        }, 500);
    }

    // ===== TESTIMONIAL CAROUSEL (MULTI-CARD INFINITE LOOP) =====
    const track = document.querySelector('.testimonial-track');
    const nextBtn = document.querySelector('.nextBtn');
    const prevBtn = document.querySelector('.prevBtn');

    if (track && nextBtn && prevBtn) {

        let cards = Array.from(track.children);

        // 🔁 Duplicate all cards
        cards.forEach(card => {
            track.appendChild(card.cloneNode(true));
        });

        const cardStyle = window.getComputedStyle(cards[0]);
        const marginRight = parseInt(cardStyle.marginRight) || 0;
        let cardWidth = cards[0].offsetWidth + marginRight * 2;

        let index = 0;
        const originalLength = cards.length;

        function moveCarousel(animate = true) {
            track.style.transition = animate ? 'transform 0.5s ease' : 'none';
            track.style.transform = `translateX(${-index * cardWidth}px)`;
        }

        nextBtn.addEventListener('click', () => {
            index++;
            moveCarousel();
        });

        prevBtn.addEventListener('click', () => {
            index--;
            moveCarousel();
        });

        // Auto-slide every 3 seconds
        setInterval(() => {
            index++;
            moveCarousel();
        }, 3000);

        // ♻ Reset seamlessly
        track.addEventListener('transitionend', () => {
            if (index >= originalLength) {
                index = 0;
                moveCarousel(false);
            }
            if (index < 0) {
                index = originalLength - 1;
                moveCarousel(false);
            }
        });

        window.addEventListener('resize', () => {
            cardWidth = cards[0].offsetWidth + marginRight * 2;
            moveCarousel(false);
        });
    }
    /*Accordion*/
    const headers = document.querySelectorAll(".accordion-header");

    headers.forEach(header => {
        header.addEventListener("click", () => {
            const item = header.parentElement;

            document.querySelectorAll(".accordion-item").forEach(i => {
            if (i !== item) i.classList.remove("active");
            });

            item.classList.toggle("active");
        });
    });
    /*Gallery*/
    const images = document.querySelectorAll('.gallery img');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const closeBtn = document.getElementById('closeBtn');

    images.forEach(img => {
        img.addEventListener('click', () => {
        lightbox.style.display = 'flex';
        lightboxImg.src = img.src;
        });
    });

    closeBtn.addEventListener('click', () => {
        lightbox.style.display = 'none';
    });

    // Close when clicking outside image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox) {
        lightbox.style.display = 'none';
        }
    });
});