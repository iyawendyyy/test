document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('section');
    let currentSectionIndex = 0;
    let isScrolling = false;

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                currentSectionIndex = Array.from(sections).indexOf(entry.target);
                //window.history.replaceState(null, null, `#${entry.target.id}`);
            }
        });
    }, observerOptions);

    sections.forEach(section => {
        observer.observe(section);
    });

    const debounce = (func, wait) => {
        let timeout;
        return function(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func.apply(this, args), wait);
        };
    };

    const handleScroll = debounce((event) => {
        if (isScrolling) return;

        if (event.deltaY > 0) {
            // Scroll down
            if (currentSectionIndex < sections.length - 1) {
                currentSectionIndex++;
                isScrolling = true;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        } else {
            // Scroll up
            if (currentSectionIndex > 0) {
                currentSectionIndex--;
                isScrolling = true;
                sections[currentSectionIndex].scrollIntoView({ behavior: 'smooth' });
                setTimeout(() => { isScrolling = false; }, 1000);
            }
        }
    }, 2000); // Adjust the debounce delay as needed

    window.addEventListener('wheel', handleScroll);
});