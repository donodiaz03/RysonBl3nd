// Inicializar iconos
lucide.createIcons();

// Simple Reveal on Scroll
function handleScroll() {
    const reveals = document.querySelectorAll('.reveal');

    reveals.forEach(element => {
        const windowHeight = window.innerHeight;
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('active');
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    setTimeout(handleScroll, 100);

    // Pausar videos automáticamente cuando salen del área visible (scroll)
    if ('IntersectionObserver' in window) {
        const videoObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting) {
                    entry.target.pause();
                }
            });
        }, { threshold: 0.1 }); // Se activa cuando menos del 10% del video es visible

        document.querySelectorAll('video').forEach(video => {
            videoObserver.observe(video);

            // Pausar otros videos al reproducir uno
            video.addEventListener('play', () => {
                document.querySelectorAll('video').forEach(v => {
                    if (v !== video) v.pause();
                });
            });
        });
    }
});

window.addEventListener('scroll', handleScroll);

// Menu Móvil toggle
function toggleMenu() {
    const overlay = document.getElementById('menu-overlay');
    const icon = document.getElementById('menu-icon');
    const body = document.body;

    if (overlay.classList.contains('opacity-0')) {
        overlay.classList.remove('opacity-0', 'invisible');
        icon.setAttribute('data-lucide', 'x');
        body.style.overflow = 'hidden';
    } else {
        overlay.classList.add('opacity-0', 'invisible');
        icon.setAttribute('data-lucide', 'menu');
        body.style.overflow = '';
    }
    lucide.createIcons();
}

// Logic para Galería (Fotos / Videos)
function switchGallery(type) {
    const photosDiv = document.getElementById('gallery-photos');
    const videosDiv = document.getElementById('gallery-videos');
    const tabPhotos = document.getElementById('tab-photos');
    const tabVideos = document.getElementById('tab-videos');

    if (type === 'photos') {
        photosDiv.classList.remove('hidden');
        photosDiv.classList.add('grid');
        videosDiv.classList.add('hidden');
        videosDiv.classList.remove('grid');

        tabPhotos.classList.add('active');
        tabVideos.classList.remove('active');

        // Pausar todos los videos al salir de la pestaña
        document.querySelectorAll('#gallery-videos video').forEach(v => v.pause());
    } else {
        videosDiv.classList.remove('hidden');
        videosDiv.classList.add('grid');
        photosDiv.classList.add('hidden');
        photosDiv.classList.remove('grid');

        tabVideos.classList.add('active');
        tabPhotos.classList.remove('active');
    }
    // Re-trigger reveal for new content
    setTimeout(handleScroll, 50);
}
