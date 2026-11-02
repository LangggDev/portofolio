// Jam lokal (WIB)
const clocks = document.querySelectorAll('[data-clock]');
function tick() {
    const time = new Date().toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        timeZone: 'Asia/Jakarta',
    });
    clocks.forEach(el => (el.textContent = time.replace('.', ':')));
}
tick();
setInterval(tick, 15000);

document.querySelectorAll('[data-year]').forEach(el => (el.textContent = new Date().getFullYear()));

// Topbar: sembunyi saat scroll ke bawah, muncul lagi saat scroll ke atas
const topbar = document.getElementById('topbar');
let lastY = window.scrollY;
window.addEventListener('scroll', () => {
    const y = window.scrollY;
    topbar.classList.toggle('scrolled', y > 20);
    topbar.classList.toggle('hide', y > lastY && y > 300 && !nav.classList.contains('open'));
    lastY = y;
}, { passive: true });

// Menu mobile
const nav = document.getElementById('nav');
const menuBtn = document.getElementById('menu-btn');
menuBtn.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    menuBtn.textContent = open ? 'Tutup' : 'Menu';
    menuBtn.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    menuBtn.textContent = 'Menu';
    menuBtn.setAttribute('aria-expanded', false);
}));

// Reveal saat elemen masuk layar
const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in');
            revealObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.15, rootMargin: '0px 0px -40px 0px' });
document.querySelectorAll('.reveal').forEach(el => revealObserver.observe(el));

// Tandai menu sesuai section yang sedang dibaca
const navLinks = [...nav.querySelectorAll('a')];
const sectionObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        navLinks.forEach(a => a.classList.toggle('active', a.hash === '#' + entry.target.id));
    });
}, { rootMargin: '-45% 0px -50% 0px' });
document.querySelectorAll('section[id]').forEach(s => sectionObserver.observe(s));

// Label "buka situs" mengikuti kursor di screenshot proyek
document.querySelectorAll('.project-shot').forEach(shot => {
    const tag = shot.querySelector('.cursor-tag');
    shot.addEventListener('mousemove', e => {
        const r = shot.getBoundingClientRect();
        tag.style.left = (e.clientX - r.left) + 'px';
        tag.style.top = (e.clientY - r.top) + 'px';
    });
});

// Tombol "tanya" di tiap jasa langsung bawa pesan WhatsApp yang sudah terisi
document.querySelectorAll('[data-wa]').forEach(a => {
    const text = `Halo KangDev, saya mau konsultasi soal ${a.dataset.wa}.`;
    a.href = 'https://wa.me/6287841413309?text=' + encodeURIComponent(text);
});

// Form kontak -> buka WhatsApp dengan pesan yang sudah terisi
const form = document.getElementById('contact-form');
form.addEventListener('submit', e => {
    e.preventDefault();
    const data = new FormData(form);
    const text =
        `Halo Erlangga, saya ${data.get('nama')}.\n` +
        `Keperluan: ${data.get('jenis')}\n\n` +
        data.get('pesan');
    window.open('https://wa.me/6287841413309?text=' + encodeURIComponent(text), '_blank', 'noopener');
});
