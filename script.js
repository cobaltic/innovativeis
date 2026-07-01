(() => {
    const root = document.documentElement;
    const logo = document.querySelector('.logo');
    const themeToggle = document.getElementById('theme-toggle');
    const langToggle = document.getElementById('lang-toggle');

    const LANG_KEY = 'lang';

    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

    function applyTheme(theme) {
        root.setAttribute('data-theme', theme);
        if (logo) logo.src = theme === 'dark' ? 'logo-neg.svg' : 'logo-pos.svg';
    }

    applyTheme(prefersDark.matches ? 'dark' : 'light');

    prefersDark.addEventListener('change', (e) => {
        applyTheme(e.matches ? 'dark' : 'light');
    });

    themeToggle.addEventListener('click', () => {
        const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
        applyTheme(next);
    });

    function applyLang(lang) {
        document.documentElement.lang = lang;
        document.querySelectorAll('[data-lang]').forEach((el) => {
            el.hidden = el.dataset.lang !== lang;
        });
    }

    const lang = localStorage.getItem(LANG_KEY) || 'hr';
    applyLang(lang);

    langToggle.addEventListener('click', () => {
        const next = document.documentElement.lang === 'hr' ? 'en' : 'hr';
        applyLang(next);
        localStorage.setItem(LANG_KEY, next);
    });
})();

