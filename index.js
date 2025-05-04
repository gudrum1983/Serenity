function applyBlurOnScroll(id, selector) {
    const element = document.getElementById(id);
    if (!element) return;

    window.addEventListener('scroll', () => {
        if (window.scrollY > 0) {
            element.classList.add(selector);
        } else {
            element.classList.remove(selector);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    applyBlurOnScroll('header', 'Header_type_scrolled');
});
