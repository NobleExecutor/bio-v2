/**
 * Back to Top Floating Button Controller
 * Monitors viewport scroll depth and provides smooth scroll back to top.
 */
(function initBackToTop() {
    var backToTop = document.getElementById('back-to-top');
    if (!backToTop) return;

    function updateBackToTop() {
        if (window.scrollY > 300) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }
    }

    window.addEventListener('scroll', updateBackToTop, { passive: true });
    updateBackToTop();

    backToTop.addEventListener('click', function (e) {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();
