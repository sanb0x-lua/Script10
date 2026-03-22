const isMobile = /Mobi|Android/i.test(navigator.userAgent);
const clickSound = document.getElementById('clickSound');
const langBtn = document.getElementById('langBtn');

let lang = localStorage.getItem('lang') || 'ru';

const text = {
    ru: {
        subtitle: "Сайт модов и скриптов. Все файлы сделаны Санбоксом",
        modsTitle: "Доступные моды",
        scriptTitle: "Скрипт",
        scriptDesc: "Сильнейший скрипт в игре, созданный для разрушения игры.",
        modDesc: "PvP интерфейс, оптимизация скриптов, аккаунт Санты, без рекламы, кастомный свет, красная ночь, открыты все платные предметы.",
        download: "Скачать",
        tutorialTitle: "Инструкция по ZIP файлах (MT Manager)",
        tutorial: [
            "Скачайте ZIP файл.",
            "Откройте MT Manager.",
            "Перейдите в папку Download.",
            "Зажмите скачанный ZIP файл.",
            "Выберите Извлечь в.",
            "Нажмите ОК",
            "Готово."
        ]
    },
    en: {
        subtitle: "Mods and scripts website. All files are made by Sanbox",
        modsTitle: "Available mods",
        scriptTitle: "Script",
        scriptDesc: "The most powerful script in the game, created to destroy the game.",
        modDesc: "PvP UI, script optimization, Santa account, no ads, custom lighting, red night, all paid items unlocked.",
        download: "Download",
        tutorialTitle: "ZIP Guide (MT Manager)",
        tutorial: [
            "Download the ZIP file.",
            "Open MT Manager.",
            "Go to the Download folder.",
            "Hold the downloaded ZIP file.",
            "Select Extract to.",
            "Press OK.",
            "Done."
        ]
    }
};

function applyLang() {
    const t = text[lang];

    document.getElementById('subtitle').textContent = t.subtitle;
    document.getElementById('modsTitle').textContent = t.modsTitle;
    document.getElementById('scriptTitle').textContent = t.scriptTitle;
    document.getElementById('scriptDesc').textContent = t.scriptDesc;
    document.getElementById('modDesc').textContent = t.modDesc;

    document.getElementById('download1').textContent = t.download;
    document.getElementById('download2').textContent = t.download;

    document.getElementById('tutorialTitle').textContent = t.tutorialTitle;

    const list = document.getElementById('tutorialList');
    list.innerHTML = "";
    t.tutorial.forEach(i => {
        const li = document.createElement('li');
        li.textContent = i;
        list.appendChild(li);
    });

    langBtn.textContent = t.btn;
}

langBtn.addEventListener('click', () => {
    lang = lang === 'ru' ? 'en' : 'ru';
    localStorage.setItem('lang', lang);
    location.reload();
});

applyLang();

function createLines() {
    const bg = document.getElementById('bg');
    const count = isMobile ? 2 : 6;

    for (let i = 0; i < count; i++) {
        const line = document.createElement('div');
        line.classList.add('line');
        line.style.left = Math.random() * 100 + 'vw';
        line.style.animationDuration = (Math.random() * 4 + 5) + 's';
        bg.appendChild(line);
        setTimeout(() => line.remove(), 9000);
    }
}

setInterval(createLines, isMobile ? 3000 : 1500);

document.querySelectorAll('.download-btn').forEach(btn => {
    btn.addEventListener('click', function(e) {
        e.preventDefault();
        if (this.classList.contains('loading')) return;

        clickSound.currentTime = 0;
        clickSound.play();

        this.classList.add('loading');
        const fileName = this.dataset.file;
        const textBtn = this.querySelector('.btn-text');

        textBtn.textContent = lang === 'ru' ? "Скачивание..." : "Downloading...";

        setTimeout(() => {
            const link = document.createElement('a');
            link.href = fileName;
            link.download = fileName;
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            textBtn.textContent = text[lang].download;
            this.classList.remove('loading');
        }, 2000);
    });
});