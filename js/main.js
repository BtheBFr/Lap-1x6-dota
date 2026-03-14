// Основной файл с логикой сайта

// Данные о героях
const heroesData = {
    "luna": {
        name: "Luna",
        nameRu: "Луна",
        icon: "icons/heroes/luna.png",
        skills: {
            "q": {
                name: "Lucent Beam",
                nameRu: "Люцент Бим",
                icon: "icons/skills/luna/lucent_beam.png",
                description: "Наносит магический урон одной цели. Можно улучшить талантом на перезарядку.",
                build: "builds/luna/lucent_beam.jpg"
            },
            "w": {
                name: "Moon Glaive",
                nameRu: "Мун Глейв",
                icon: "icons/skills/luna/moon_glaive.png",
                description: "Атаки перескакивают на ближайших врагов. С каждым прыжком урон снижается.",
                build: "builds/luna/moon_glaive.jpg"
            },
            "e": {
                name: "Lunar Blessing",
                nameRu: "Лунар Блессинг",
                icon: "icons/skills/luna/lunar_blessing.png",
                description: "Пассивно увеличивает урон союзникам. Дает бонус к дальности атаки ночью.",
                build: "builds/luna/lunar_blessing.jpg"
            },
            "r": {
                name: "Eclipse",
                nameRu: "Эклипс",
                icon: "icons/skills/luna/eclipse.png",
                description: "Призывает лунные лучи, которые бьют по врагам вокруг. Длится несколько секунд.",
                build: "builds/luna/eclipse.jpg"
            },
            "d": {
                name: "Dragon Lance",
                nameRu: "Драгон Ланс",
                icon: "icons/skills/luna/dragon_lance.png",
                description: "Увеличивает дальность атаки и дает характеристики.",
                build: "builds/luna/dragon_lance.jpg"
            },
            "f": {
                name: "Butterfly",
                nameRu: "Баттерфляй",
                icon: "icons/skills/luna/butterfly.png",
                description: "Дает уклонение, скорость атаки и ловкость.",
                build: "builds/luna/butterfly.jpg"
            }
        }
    },
    "pudge": {
        name: "Pudge",
        nameRu: "Пудж",
        icon: "icons/heroes/pudge.png",
        skills: {
            "q": {
                name: "Meat Hook",
                nameRu: "Мит Хук",
                icon: "icons/skills/pudge/hook.png",
                description: "Бросает крюк, который зацепляет первого врага и притягивает к Pudge.",
                build: "builds/pudge/hook.jpg"
            },
            "w": {
                name: "Rot",
                nameRu: "Рот",
                icon: "icons/skills/pudge/rot.png",
                description: "Наносит урон всем вокруг, но также замедляет и наносит урон самому Pudge.",
                build: "builds/pudge/rot.jpg"
            },
            "e": {
                name: "Flesh Heap",
                nameRu: "Флеш Хип",
                icon: "icons/skills/pudge/flesh_heap.png",
                description: "Пассивно дает сопротивление магии и силу за каждый труп рядом.",
                build: "builds/pudge/flesh_heap.jpg"
            },
            "r": {
                name: "Dismember",
                nameRu: "Дисмембер",
                icon: "icons/skills/pudge/dismember.png",
                description: "Хватает врага и наносит урон с течением времени, оглушая его.",
                build: "builds/pudge/dismember.jpg"
            }
        }
    }
};

// Загрузка главной страницы
document.addEventListener('DOMContentLoaded', function() {
    // Загружаем героев на главную
    loadHeroes();
    
    // Проверяем на какой мы странице
    if (window.location.pathname.includes('hero.html')) {
        loadHeroPage();
    }
    
    if (window.location.pathname.includes('build.html')) {
        loadBuildPage();
    }

    // Кнопка на главную
    const homeBtn = document.getElementById('homeBtn');
    if (homeBtn) {
        homeBtn.addEventListener('click', () => {
            window.location.href = 'index.html';
        });
    }
});

// Загрузка сетки героев
function loadHeroes() {
    const heroesGrid = document.getElementById('heroesGrid');
    if (!heroesGrid) return;
    
    heroesGrid.innerHTML = '';
    
    Object.keys(heroesData).forEach(heroKey => {
        const hero = heroesData[heroKey];
        const heroCard = document.createElement('div');
        heroCard.className = 'hero-card';
        heroCard.setAttribute('data-hero', heroKey);
        heroCard.onclick = () => goToHero(heroKey);
        
        heroCard.innerHTML = `
            <img src="${hero.icon}" alt="${hero.name}" class="hero-icon" loading="lazy">
            <div class="hero-name">${hero.name}</div>
        `;
        
        heroesGrid.appendChild(heroCard);
    });
}

// Поиск героев (ИСПРАВЛЕННЫЙ - ищет и по-русски и по-английски)
const searchInput = document.getElementById('searchInput');
if (searchInput) {
    searchInput.addEventListener('input', function(e) {
        const searchTerm = e.target.value.toLowerCase().trim();
        const heroCards = document.querySelectorAll('.hero-card');
        
        heroCards.forEach(card => {
            const heroKey = card.getAttribute('data-hero');
            const hero = heroesData[heroKey];
            
            // Проверяем совпадение с английским или русским названием
            const nameEn = hero.name.toLowerCase();
            const nameRu = hero.nameRu ? hero.nameRu.toLowerCase() : '';
            
            if (nameEn.includes(searchTerm) || nameRu.includes(searchTerm)) {
                card.style.display = 'block';
                card.style.animation = 'fadeIn 0.5s ease';
            } else {
                card.style.display = 'none';
            }
        });
    });
}

// Переход на страницу героя
function goToHero(heroKey) {
    localStorage.setItem('currentHero', heroKey);
    window.location.href = 'hero.html';
}

// Загрузка страницы героя
function loadHeroPage() {
    const heroKey = localStorage.getItem('currentHero');
    const hero = heroesData[heroKey];
    
    if (!hero) {
        window.location.href = 'index.html';
        return;
    }
    
    // Заполняем шапку
    document.getElementById('heroIcon').src = hero.icon;
    document.getElementById('heroIcon').alt = hero.name;
    document.getElementById('heroName').textContent = hero.name;
    
    // Загружаем скиллы
    const skillsGrid = document.getElementById('skillsGrid');
    skillsGrid.innerHTML = '';
    
    const keybindings = JSON.parse(localStorage.getItem('keybindings')) || {
        q: 'Q', w: 'W', e: 'E', r: 'R', d: 'D', f: 'F'
    };
    
    Object.keys(hero.skills).forEach(skillKey => {
        const skill = hero.skills[skillKey];
        const skillCard = document.createElement('div');
        skillCard.className = 'skill-card';
        skillCard.onclick = () => goToBuild(heroKey, skillKey);
        
        skillCard.innerHTML = `
            <div class="skill-key">${keybindings[skillKey] || skillKey.toUpperCase()}</div>
            <div class="skill-header">
                <img src="${skill.icon}" alt="${skill.name}" class="skill-icon">
                <div class="skill-name">${skill.name}</div>
            </div>
            <div class="skill-description">${skill.description}</div>
        `;
        
        skillsGrid.appendChild(skillCard);
    });
}

// Переход на страницу сборки
function goToBuild(heroKey, skillKey) {
    localStorage.setItem('currentBuildHero', heroKey);
    localStorage.setItem('currentBuildSkill', skillKey);
    window.location.href = 'build.html';
}

// Загрузка страницы сборки
function loadBuildPage() {
    const heroKey = localStorage.getItem('currentBuildHero');
    const skillKey = localStorage.getItem('currentBuildSkill');
    
    const hero = heroesData[heroKey];
    if (!hero || !hero.skills[skillKey]) {
        window.location.href = 'index.html';
        return;
    }
    
    const skill = hero.skills[skillKey];
    
    document.getElementById('buildHeroName').textContent = hero.name;
    document.getElementById('buildSkillName').textContent = skill.name;
    document.getElementById('buildImage').src = skill.build;
    document.getElementById('buildImage').alt = `${hero.name} - ${skill.name}`;
}

// Кнопка назад
const backBtn = document.getElementById('backBtn');
if (backBtn) {
    backBtn.addEventListener('click', () => {
        window.location.href = 'hero.html';
    });
}

// Скачать сборку
const downloadBtn = document.getElementById('downloadBtn');
if (downloadBtn) {
    downloadBtn.addEventListener('click', function() {
        const img = document.getElementById('buildImage');
        const link = document.createElement('a');
        link.href = img.src;
        link.download = img.src.split('/').pop();
        link.click();
        
        showToast('Скачивание начато');
    });
}

// Модальное окно поддержки
const supportBtn = document.getElementById('supportBtn');
const supportModal = document.getElementById('supportModal');
const closeSupportModal = document.getElementById('closeSupportModal');

if (supportBtn) {
    supportBtn.addEventListener('click', () => {
        supportModal.classList.add('active');
    });
}

if (closeSupportModal) {
    closeSupportModal.addEventListener('click', () => {
        supportModal.classList.remove('active');
        resetSupportModal();
    });
}

// Модальное окно настроек
const settingsBtn = document.getElementById('settingsBtn');
const settingsModal = document.getElementById('settingsModal');
const closeSettingsModal = document.getElementById('closeSettingsModal');

if (settingsBtn) {
    settingsBtn.addEventListener('click', () => {
        settingsModal.classList.add('active');
    });
}

if (closeSettingsModal) {
    closeSettingsModal.addEventListener('click', () => {
        settingsModal.classList.remove('active');
    });
}

// Закрытие модальных окон при клике вне их
window.addEventListener('click', (e) => {
    if (e.target === supportModal) {
        supportModal.classList.remove('active');
        resetSupportModal();
    }
    
    if (e.target === settingsModal) {
        settingsModal.classList.remove('active');
    }
});

// Сброс модального окна поддержки
function resetSupportModal() {
    document.querySelectorAll('.support-option').forEach(opt => {
        opt.classList.remove('selected');
    });
    document.getElementById('additionalFields').style.display = 'none';
    document.getElementById('heroField').value = '';
    document.getElementById('skillField').value = '';
    document.getElementById('descriptionField').value = '';
}

// Выбор опции поддержки
document.querySelectorAll('.support-option').forEach(option => {
    option.addEventListener('click', function() {
        document.querySelectorAll('.support-option').forEach(opt => {
            opt.classList.remove('selected');
        });
        
        this.classList.add('selected');
        
        const problem = this.dataset.problem;
        const additionalFields = document.getElementById('additionalFields');
        const heroField = document.getElementById('heroField');
        const skillField = document.getElementById('skillField');
        
        additionalFields.style.display = 'block';
        
        // Показываем нужные поля
        if (problem === 'missing_skill') {
            heroField.style.display = 'block';
            skillField.style.display = 'block';
            document.getElementById('descriptionField').style.display = 'block';
        } else if (problem === 'wrong_build' || problem === 'missing_hero') {
            heroField.style.display = 'block';
            skillField.style.display = 'none';
            document.getElementById('descriptionField').style.display = 'block';
        } else {
            heroField.style.display = 'none';
            skillField.style.display = 'none';
            document.getElementById('descriptionField').style.display = 'block';
        }
    });
});

// Отправка поддержки
const submitSupport = document.getElementById('submitSupport');
if (submitSupport) {
    submitSupport.addEventListener('click', function() {
        const selectedOption = document.querySelector('.support-option.selected');
        if (!selectedOption) {
            showToast('Выберите тип проблемы');
            return;
        }
        
        const problem = selectedOption.dataset.problem;
        const hero = document.getElementById('heroField').value;
        const skill = document.getElementById('skillField').value;
        const description = document.getElementById('descriptionField').value;
        
        if (!description) {
            showToast('Опишите проблему');
            return;
        }
        
        if (typeof submitSupportTicket === 'function') {
            submitSupportTicket(problem, hero, skill, description);
        } else {
            showToast('Спасибо за обращение!');
            supportModal.classList.remove('active');
            resetSupportModal();
        }
    });
}

// Уведомления
function showToast(message) {
    const toast = document.getElementById('toast');
    toast.textContent = message;
    toast.classList.add('show');
    
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}
