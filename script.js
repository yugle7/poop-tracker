// Вычисление объема кала


const getBMR = ({age, sex, weight}) => {
    if (sex) {
        if (age < 3) return 60.9 * weight - 54;
        if (age < 10) return 22.7 * weight + 495;
        if (age < 18) return 17.5 * weight + 651;
        if (age < 30) return 16.0 * weight + 545;
        if (age < 60) return 14.2 * weight + 593;
        return 13.5 * weight + 514;
    }
    if (age < 3) return 61.0 * weight - 51;
    if (age < 10) return 22.5 * weight + 499;
    if (age < 18) return 12.2 * weight + 746;
    if (age < 30) return 13.1 * weight + 558;
    if (age < 60) return 9.74 * weight + 694;
    return 10.1 * weight + 569;
}

const getStool = (age, sex) => {
    if (age < 1) return 90;
    if (age < 2) return 60;
    if (age < 4) return 70;
    if (age < 6) return 80;
    if (age < 8) return 84;
    if (age < 10) return 88;
    if (age < 12) return 90;
    if (age < 14) return 95;
    if (age < 16) return 100;
    if (age < 18) return sex ? 120 : 110;
    if (age < 65) return sex ? 135 : 125;
    return sex ? 130 : 121
};

const getFiber = (age, sex) => {
    if (age < 2) return 10;
    if (age < 3) return 13.5;
    if (age < 4) return 14.9;
    if (age < 5) return 16.1;
    if (age < 6) return 17.4;
    if (age < 7) return 18.6;
    if (age < 8) return 20.1;
    if (age < 9) return 21.8;
    if (age < 10) return 23.7;
    if (age < 12) return sex ? 28 : 25;
    if (age < 14) return sex ? 31 : 26;
    if (age < 19) return sex ? 38 : 26;
    if (age < 51) return sex ? 38 : 25;
    return sex ? 30 : 21;
};

const getDefaultPerson = () => ({sex: false, weight: 63, height: 157, age: 31, activity: 1.2, frequency: 0.8});
let person = getDefaultPerson();

const setPersonVolume = () => {
    const fiber = 0.014 * getBMR(person) * person.activity;
    const volume = getStool(person) + 1.76 * (fiber - getFiber(person));
    person.volume = Math.max(50, Math.min(500, Math.round(volume / person.frequency)));
};

setPersonVolume();

const minVolume = 40;
const maxVolume = 400;

const getVolume = i => {
    if (i <= 10) return minVolume;
    if (i < 50) return Math.round(person.volume + (i - 50) * (person.volume - minVolume) / 40);
    if (i === 50) return person.volume;
    if (i < 90) return Math.round(person.volume + (i - 50) * (maxVolume - person.volume) / 40);
    return maxVolume;
}

let day = new Date();
let today = new Date(day);

const getDate = (date) => date.getFullYear() * 10000 + date.getMonth() * 100 + date.getDate();

const getDefaultRecord = () => ({
    pooped: getDate(day) === getDate(today) ? new Date() : day,
    bristol: 4,
    volume: 50,
    color: 'brown',
    tags: []
});

// Константы


const defaultTags = [
    'Боль',
    'Газы',
    'Вздутие',
    'Напряжение',
    'Кофе',
    'Лекарства',
    'Прогулка',
    'Бег',
    'Стресс',
    'После еды'
];

const SCALES = {
    white: 6,
    gray: 4,
    yellow: 2.5,
    orange: 2,
    light_brown: 1.5,
    brown: 1,
    dark_brown: 1.5,
    black: 5,
    green: 3,
    red: 7
}

const COLORS = {
    white: 'Белая',
    gray: 'Серая',
    yellow: 'Желтая',
    orange: 'Оранжевая',
    'light-brown': 'Светло-коричневая',
    brown: 'Коричневая',
    'dark-brown': 'Темно-коричневая',
    black: 'Черная',
    green: 'Зеленая',
    red: 'Красная'
}


const VOLUMES = ['Очень мало', 'Мало', 'Средне', 'Много', 'Очень много'];

const BRISTOLS = [
    '1 — отдельные твердые комочки',
    '2 — колбаска с комочками',
    '3 — колбаска с трещинами',
    '4 — гладкая, мягкая, оформленная',
    '5 — мягкие комочки с четкими краями',
    '6 — мягкие рыхлые кусочки',
    '7 — водянистая, без твердых частей'
];

const BR = [
    'Твердая',
    'Комковатая',
    'Потрескавшаяся',
    'Гладкая',
    'Мягкая',
    'Рыхлая',
    'Водянистая',
];

const MON = ['янв', 'фев', 'мар', 'апр', 'май', 'июн', 'июл', 'авг', 'сен', 'окт', 'ноя', 'дек'];
const MONTH = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const WD = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const MN = ['Я', 'Ф', 'М', 'А', 'М', 'И', 'И', 'А', 'С', 'О', 'Н', 'Д'];

// Инструменты

const getTimeText = (date) => `${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;

const getDateText = (date) => date.getDate() + ' ' + MON[date.getMonth()];

// Состояние

// 2. Форма добавления

let record = getDefaultRecord();
let records = [];

let tags = [];

// Элементы

const htmlElement = document.documentElement;

const navigation = document.getElementById('navigation');

// Навигация

const toCalendar = document.getElementById("to-calendar");


const pages = {
    calendar: document.getElementById("calendar-page"),
    record: document.getElementById('record-page'),
    stats: document.getElementById("stats-page"),
    settings: document.getElementById("settings-page")
};
let page = pages.calendar;

const nav = document.getElementById('nav');
const [calendarLink, recordLink, statsLink, settingsLink] = nav.children;

let link = calendarLink

const toggle = () => {
    page.classList.toggle('hidden');
    link.classList.toggle('active');
    if (page === pages.record) nav.parentElement.classList.toggle('hidden');
}

nav.onclick = e => {
    const button = e.target.closest('button');
    if (!button || button === link) return;
    toggle();
    page = pages[button.dataset.page];
    link = button;
    toggle();
    if (page === pages.record) {
        record = getDefaultRecord();
        setForm();
    }
}

const toCalendarPage = () => {
    toggle();
    page = pages.calendar;
    link = calendarLink;
    toggle();
}

toCalendar.onclick = e => {
    e.preventDefault();
    toCalendarPage();
    calendarDate = new Date(day);
    calendarDate.setDate(1);
    renderPageCalendar();
}

// 1. Календарь

const calendar = document.getElementById('calendar');
const days = document.getElementById('days');

let calendarDate = new Date(day);
let chosenButton;

const addPageMonth = (delta) => {
    const month = calendarDate.getMonth() + delta;
    const year = calendarDate.getFullYear();
    const m = (month + 12) % 12;
    const y = year + delta * (month !== m);
    calendarDate.setFullYear(y);
    calendarDate.setMonth(m);
}

calendar.addEventListener('click', e => {
    let button = e.target.closest('button');
    if (!button) return;
    if (button.id) {
        addPageMonth(button.id === 'prev' ? -1 : 1);
        return calendar.replaceChildren(getCalendarPage());
    }
    button = button.firstElementChild;
    if (button === chosenButton) return;

    chosenButton.classList.remove('big');
    chosenButton = button;

    day = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), +chosenButton.innerText, 12);
    chosenButton.classList.add('big');

    renderChosenRecords();
});

let calendarPages = {};

const getRecord = (date) => {
    const src = records.filter(({pooped}) => getDate(pooped) === date)
    if (!src.length) return null;

    if (src.length === 1) {
        const {color, volume, bristol} = src[0];
        return {color, volume, bristol, count: 1};
    }

    const colors = {};
    const bristols = {};

    const dst = {volume: 0, count: src.length};
    src.forEach(({color, volume, bristol}) => {
        colors[color] = (colors[color] || 0) + volume * SCALES[color];
        bristols[bristol] = (bristols[bristol] || 0) + volume * SCALES[color];
        dst.volume += volume;
    });

    let s = 0;
    for (const [color, scale] of Object.entries(colors)) {
        if (scale > s) {
            dst.color = color;
            s = scale;
        }
    }
    s = 0;
    for (const [bristol, scale] of Object.entries(bristols)) {
        if (scale > s) {
            dst.bristol = bristol;
            s = scale;
        }
    }
    return dst;
}

const getRecordStyle = (color, volume) => {
    const size = Math.min(64, 16 + 16 * volume / 50);
    return `width:${size}px;height:${size}px;background:var(--inner-${color})`;
}

const getRecordHtml = (
    {color, volume, count}
) => `<i style="${getRecordStyle(color, volume)}"></i><small>${count > 1 ? count : ''}</small>`;


const getCalendarPage = (delta = 0) => {
    const month = calendarDate.getMonth() + delta;
    const year = calendarDate.getFullYear();

    const m = (month + 12) % 12;
    const y = year + delta * (month !== m);

    const k = 100 * y + m;

    if (k in calendarPages) return calendarPages[k];

    const first = (new Date(y, m, 1).getDay() + 6) % 7;
    const last = new Date(y, m + 1, 0).getDate();

    const t = getDate(today);
    const c = getDate(day);

    const getClass = (d) => {
        if (d === c) return 'big';
        if (d > t) return 'gray';
        return '';
    }

    const dayHtml = (n) => {
        const d = getDate(new Date(y, m, n));
        const r = getRecord(d);
        return `<button><span class="${getClass(d)}">${n}</span>${r ? getRecordHtml(r) : ''}</button>`
    }

    let days = WD.map(d => `<span>${d}</span>`).join('') + '<button class="empty"></button>'.repeat(first);
    for (let i = 1; i <= last; i++) days += dayHtml(i);

    calendarPages[k] = document.createElement('DIV');
    calendarPages[k].className = 'calendar';
    calendarPages[k].innerHTML = `<h2 class="row">
        <button id="prev"><svg><use href="sprite.svg#prev"></use></svg></button>
        <span class="big">${MONTH[m]} ${y}</span>
        <button id="next"><svg><use href="sprite.svg#next"></use></svg></button>
    </h2>
    <div class="days">${days}</div>`;

    return calendarPages[k];
}

const renderPageCalendar = () => {
    console.log('renderPageCalendar');
    calendar.replaceChildren(getCalendarPage());
    chosenButton = calendar.getElementsByClassName('big')[1];
}


// 1.1 Записи дня

const recordHtml = ({created, pooped, bristol, color, volume, tags}) => {
    return `<button class="col" data-created="${created}">
        <div class="tags">${tags.map(q => `<span class="small gray">${q}</span>`).join('')}</div>
        <div class="record">
            <div class="color" style="${getColorStyle(color)}"></div>
<!--            <svg class="img" style="${getColorStyle(color)}"><use href="sprite.svg#bristol-${bristol}"></use></svg>-->
            <div>${BR[bristol - 1]}</div>
            <span class="small gray right">${VOLUMES[Math.floor(volume / 20)]}</span>
            <span class="mono gray small">${getTimeText(pooped)}</span>
        </div>
    </button>`;
}

const chosenRecords = document.getElementById('chosen-records');
const chosenDay = document.getElementById('chosen-day');

const renderChosenRecords = () => {
    const d = getDate(day);
    chosenDay.innerText = day.getDate() + ' ' + MON[day.getMonth()];
    const src = records.filter(({pooped}) => getDate(pooped) === d).sort((a, b) => a.pooped - b.pooped);
    chosenRecords.innerHTML = src.length ? src.map(recordHtml).join('') : `<div class="small gray center">нет записей</div>`;
}

chosenRecords.onclick = e => {
    const button = e.target.closest('button');
    if (!button) return
    const created = +button.dataset.created;
    record = records.find(r => r.created === created);
    setForm();
    toggle();
    page = pages.record;
    link = recordLink;
    toggle();
}

// 1.1 Листание календаря

let startX = null;
let dragging = false;

let width = 0;
let delta = 0;
let shift = 0;
let minShift = 10;
let maxShift = 40;

const calendars = document.getElementById('calendars');

const renderCalendars = () => {
    width = calendar.clientWidth + 30;
    calendars.style.setProperty('--width', `${calendar.clientWidth}px`);

    calendars.replaceChildren(
        getCalendarPage(-1),
        getCalendarPage(),
        getCalendarPage(1)
    );
    calendar.replaceChildren(calendars);

    calendars.style.transition = 'none';
    calendars.style.transform = `translateX(-${width}px)`;
};

calendars.addEventListener('transitionend', () => {
    addPageMonth(delta);
    calendar.replaceChildren(getCalendarPage());
});

calendar.addEventListener('pointerdown', e => {
    startX = e.clientX;
    delta = 0;
    dragging = false;
});

calendar.addEventListener('pointermove', e => {
    if (startX === null) return;

    shift = e.clientX - startX;

    if (!dragging) {
        if (Math.abs(shift) < minShift) return;
        dragging = true;

        delta = shift > 0 ? -1 : 1;
        startX -= delta * minShift;
        shift += delta * minShift;

        renderCalendars();
        calendar.setPointerCapture(e.pointerId);
    }
    calendars.style.transform = `translateX(${shift - width}px)`;
});

const stopDragging = e => {
    if (startX === null) return;
    startX = null;

    if (!dragging) return;
    dragging = false;

    startX = null;

    delta = 0;
    if (Math.abs(shift) > maxShift) delta = shift > 0 ? -1 : 1;

    calendars.style.transition = `transform 0.2s ease`;
    calendars.style.transform = `translateX(-${width + delta * width}px)`;
};

calendar.addEventListener('pointerup', stopDragging);
calendar.addEventListener('pointercancel', stopDragging);


// 2. Форма добавления

const approveAction = document.getElementById("approve");
const rejectAction = document.getElementById("reject");

const poopedDate = document.getElementById('pooped-date');
const poopedTime = document.getElementById('pooped-time');
const colorLabel = document.getElementById('color-label');

const bristolIcons = document.getElementById('bristol-icons');
const bristolLabel = document.getElementById('bristol-label');

const volumeLabel = document.getElementById('volume-label');
const volumeRange = document.getElementById('volume-range');
const volumeValue = document.getElementById('volume-value');
const colorIcons = document.getElementById('color-icons');

const tagButtons = document.getElementById('tag-buttons');
const tagActions = document.getElementById('tag-actions');
const tagsEditor = document.getElementById('tags-editor');
const editTagsButton = document.getElementById('edit-tags');
const createTagButton = document.getElementById('create-tag');
const tagInput = document.getElementById('tag');

const closeTags = document.getElementById('close-tags');
const applyTags = document.getElementById('apply-tags');

const overlay = document.getElementById('overlay');

rejectAction.onclick = e => {
    e.preventDefault();
    if (record.created) {
        records = records.filter(({created}) => created !== record.created);
        saveRecord();
        renderChosenRecords();
        calendarPages = {};
        renderPageCalendar();
    }
    toCalendarPage();
};

approveAction.onclick = (e) => {
    console.log('approveAction');
    e.preventDefault();
    record.tags = [...tagButtons.querySelectorAll('.selected')].map(q => q.innerText);

    if (record.created) {
        const i = records.indexOf(({created}) => created === record.created);
        records[i] = record;
    } else {
        record.created = new Date().getTime();
        records.push(record);
    }
    saveRecord();
    renderChosenRecords();
    calendarPages = {};
    renderPageCalendar();
    toCalendarPage();
}

// 3. Статистика
// 4. Настройки

// Иконки

// 2. Форма добавления

// Обработчики


// Отображение

// 1. Бристоль

let bristolIcon;

bristolIcons.innerHTML = [1, 2, 3, 4, 5, 6, 7].map(bristol => `<button class="icon" role="radio" aria-label="${bristol}"><svg  class="img"><use href="sprite.svg#bristol-${bristol}"></use></svg></button>`).join('');

const setBristol = (icon) => {
    if (icon === bristolIcon) return;

    if (bristolIcon) {
        bristolIcon.style.setProperty('--inner', 'none');
        bristolIcon.style.setProperty('--outer', 'gray');
        bristolIcon.classList.remove('selected');
    }
    bristolIcon = icon;

    record.bristol = +bristolIcon.ariaLabel;
    bristolLabel.innerText = BRISTOLS[record.bristol - 1];

    bristolIcon.classList.add('selected');
    bristolIcon.style.setProperty('--inner', `var(--inner-${record.color})`);
    bristolIcon.style.setProperty('--outer', `var(--outer-${record.color})`);
}

bristolIcons.addEventListener('click', ({target}) => {
    const icon = target.closest('.icon');
    icon && setBristol(icon)
});

// 2. Цвет

let colorIcon;

const getColorStyle = (color) => `--inner: var(--inner-${color});--outer: var(--outer-${color})`

colorIcons.innerHTML = Object.keys(COLORS).map(color =>
    `<button class="color" style="${getColorStyle(color)}" role="radio" aria-label="${color}"></button>`
).join('');

const setColor = (icon) => {
    if (icon === colorIcon) return;
    if (colorIcon) {
        colorIcon.classList.remove('selected');
    }
    colorIcon = icon;
    colorIcon.classList.add('selected');

    record.color = colorIcon.ariaLabel;
    colorLabel.innerText = COLORS[record.color];

    bristolIcon.style.setProperty('--inner', `var(--inner-${record.color})`);
    bristolIcon.style.setProperty('--outer', `var(--outer-${record.color})`);
}


colorIcons.addEventListener('click', ({target}) => {
    const icon = target.closest('.color');
    icon && setColor(icon);
});

// 3. Объем

volumeRange.oninput = () => {
    record.volume = +volumeRange.value;
    setVolume();
}

const setVolume = () => {
    volumeValue.innerText = getVolume(volumeRange.value) + ' гр';
    volumeValue.style.left = `calc(${volumeRange.value}% - ${0.45 * volumeRange.value}px)`;
    volumeLabel.innerText = VOLUMES[Math.floor(volumeRange.value / 20)];
    volumeRange.style.setProperty('--value', `${volumeRange.value}%`);
}

// 4. Теги

const getTagButtonsHtml = () => tags.map(tag => `<button class="tap ${record.tags.includes(tag) ? 'selected' : ''}">${tag}</button>`).join('');
const getTagActionsHtml = () => tags.map(tag => `<button class="tap red">${tag}</button>`).join('');

tagButtons.onclick = e => {
    const button = e.target.closest('button');
    if (!button) return;
    button.classList.toggle('selected');
}


// Форма

function setForm() {
    const pooped = new Date(record.pooped);

    poopedDate.innerText = getDateText(pooped);
    poopedTime.innerText = getTimeText(pooped);

    if (record.created) {
        rejectAction.innerText = 'Удалить';
        approveAction.innerText = 'Обновить';
    } else {
        rejectAction.innerText = 'Отменить';
        approveAction.innerText = 'Добавить';
    }

    for (const icon of bristolIcons.children) {
        if (record.bristol === +icon.ariaLabel) {
            setBristol(icon)
            break;
        }
    }
    for (const icon of colorIcons.children) {
        if (record.color === icon.ariaLabel) {
            setColor(icon)
            break;
        }
    }
    volumeRange.value = record.volume.toString();
    setVolume();
    tagButtons.innerHTML = getTagButtonsHtml();
}

// Добавление тегов

const viewport = window.visualViewport;

const openTagsEditor = () => {
    editTagsButton.classList.add('hidden');
    tagActions.innerHTML = getTagActionsHtml();
    overlay.onclick = closeTagEditor;
    overlay.classList.add('open');
    tagsEditor.classList.add('open');
    // tagInput.focus({preventScroll: true});
};

editTagsButton.onclick = openTagsEditor;

const closeTagEditor = () => {
    editTagsButton.classList.remove('hidden');
    overlay.classList.remove('open');
    tagsEditor.classList.remove('open');
};

const applyTagEditor = () => {
    tags = [...tagActions.children].map(q => q.innerText);
    saveTags();
    tagButtons.innerHTML = getTagButtonsHtml();
    closeTagEditor();
};

closeTags.onclick = closeTagEditor;
applyTags.onclick = applyTagEditor;

createTagButton.onclick = (e) => {
    e.preventDefault();
    if (!tagInput.value) return;

    const q = document.createElement('BUTTON');
    q.className = 'tap red';
    q.innerText = tagInput.value;

    tagInput.value = '';
    tagInput.focus();

    tagActions.appendChild(q);
}

tagActions.onclick = e => {
    const button = e.target.closest('button');
    if (!button) return;
    tagInput.value = button.innerText;
    button.remove();
}

// Выбор времени

let add, update, hour, minute;

const handRadius = 16, dr = 4;
const clock = document.getElementById('clock');
const hand = document.getElementById('hand');
const dayButton = document.getElementById('day');
const hourButton = document.getElementById('hour');
const minuteButton = document.getElementById('minute');
const line = document.getElementById('line');
const white = document.getElementById('white');
const black = document.getElementById('black');
const whenPicker = document.getElementById('when-picker');
const whenCalendar = document.getElementById('when-calendar');
const whenDays = document.getElementById('when-days');
const whenMonth = document.getElementById('when-month');

const closeWhen = document.getElementById('close-when');
const applyWhen = document.getElementById('apply-when');

const cx = 125, cy = 125, R = 100, r = 70;
const minuteLabels = ['00', '05', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55'];
const hourLabelsAM = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11'];
const hourLabelsPM = ['12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];

const setDay = () => dayButton.innerText = day.getDate() + ' ' + MON[day.getMonth()];
const setHour = () => hourButton.innerText = String(hour).padStart(2, '0');
const setMinute = () => minuteButton.innerText = String(minute).padStart(2, '0');

const updateHand = (angle, radius) => {
    const x = cx + radius * Math.cos(angle), y = cy + radius * Math.sin(angle);
    hand.style.left = `${x - handRadius}px`;
    hand.style.top = `${y - handRadius}px`;
    line.style.width = `${radius}px`;
    line.style.transform = `rotate(${angle}rad)`;
    white.style.clipPath = `circle(${handRadius}px at ${x}px ${y}px)`;
};

const getPointStyle = (x, y) => `left:${x}%;top:${y}%`

const createTicks = (labels, radius) => labels.map((label, i) => {
    const angle = (i / 6 - .5) * Math.PI;
    const x = 50 + radius * Math.cos(angle);
    const y = 50 + radius * Math.sin(angle);
    return `<div class="tick" style="${getPointStyle(x, y)}">${label}</div>`;
}).join('');

const toMinute = () => {
    whenCalendar.style.display = 'none';
    clock.style.display = 'block';
    white.innerHTML = black.innerHTML = createTicks(minuteLabels, 40);
    updateHand((minute / 30 - .5) * Math.PI, R);
    update = updateMinute;
    add = addMinute;
    minuteButton.classList.add('selected');
    hourButton.classList.remove('selected');
    dayButton.classList.remove('selected');
};

const toHour = () => {
    whenCalendar.style.display = 'none';
    clock.style.display = 'block';
    white.innerHTML = black.innerHTML = createTicks(hourLabelsAM, 40) + createTicks(hourLabelsPM, 28);
    updateHand((hour / 6 - .5) * Math.PI, hour >= 12 ? r : R);
    update = updateHour;
    add = addHour;
    hourButton.classList.add('selected');
    minuteButton.classList.remove('selected');
    dayButton.classList.remove('selected');
};

const updateMinute = e => {
    const rect = clock.getBoundingClientRect();
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    const angle = Math.atan2(y, x);
    updateHand(angle, R);
    minute = getMinute(angle);
    setMinute();
};

const updateHour = e => {
    const rect = clock.getBoundingClientRect();
    const x = e.clientX - rect.left - cx;
    const y = e.clientY - rect.top - cy;
    const angle = Math.atan2(y, x);
    const pm = 4 * (x * x + y * y) < (r + R) ** 2;
    updateHand(angle, pm ? r : R);
    hour = getHour(angle) + 12 * pm;
    setHour();
};

const getMinute = angle => (Math.round(30 * angle / Math.PI) + 75) % 60;
const getHour = angle => (Math.round(6 * angle / Math.PI) + 15) % 12;

const renderCalendar = () => {
    const y = calendarDate.getFullYear();
    const m = calendarDate.getMonth();

    const first = (new Date(y, m, 1).getDay() + 6) % 7;
    const last = new Date(y, m + 1, 0).getDate();

    const today = getDate(new Date());
    const selected = getDate(day);

    const getDayType = (n) => {
        const d = getDate(new Date(y, m, n));

        if (d === selected) return 'selected';
        if (d === today) return 'today';
        if (d > today) return 'future';
        return '';
    }
    const dayHtml = (n) => `<button class="${getDayType(n)}">${n}</button>`;

    let days = '<button class="empty"></button>'.repeat(first);
    for (let i = 1; i <= last; i++) days += dayHtml(i);

    whenDays.innerHTML = days;
};

const toDay = () => {
    clock.style.display = 'none';
    whenCalendar.style.display = 'block';
    dayButton.classList.add('selected');
    hourButton.classList.remove('selected');
    minuteButton.classList.remove('selected');
    add = addMonth;
    update = null;
    calendarDate = new Date(day);
    calendarDate.setDate(1);
    renderCalendar();
};

const openWhenPicker = (to) => {
    console.log('openWhenPicker')
    day = new Date(record.pooped);
    hour = record.pooped.getHours();
    minute = record.pooped.getMinutes();

    setDay();
    setHour();
    setMinute();

    to();
    overlay.onclick = closeWhenPicker;

    overlay.classList.add('open');
    whenPicker.classList.add('open');
};

const closeWhenPicker = () => {
    overlay.classList.remove('open');
    whenPicker.classList.remove('open');
};

const applyWhenPicker = () => {
    record.pooped = new Date(day);
    record.pooped.setHours(hour, minute);
    render();
    closeWhenPicker();
};

const render = () => {
    poopedDate.innerText = getDateText(record.pooped);
    poopedTime.innerText = getTimeText(record.pooped)
};

dayButton.onclick = toDay;
hourButton.onclick = toHour;
minuteButton.onclick = toMinute;
poopedTime.onclick = () => openWhenPicker(toHour);
poopedDate.onclick = () => openWhenPicker(toDay);

const addMinute = (d) => {
    minute = (minute + 60 + d) % 60;
    updateHand((minute / 30 - .5) * Math.PI, R);
    setMinute();
}

const addHour = (d) => {
    hour = (hour + 24 + d) % 24;
    updateHand((hour / 6 - .5) * Math.PI, hour >= 12 ? r : R);
    setHour();
}

const addMonth = (d) => {
    const m = calendarDate.getMonth();
    calendarDate.setFullYear(calendarDate.getFullYear() + Math.floor((m + d) / 12));
    calendarDate.setMonth((m + d + 12) % 12);
    renderCalendar();
}

document.getElementById('when-prev').onclick = () => add(-1);
document.getElementById('when-next').onclick = () => add(1);

whenDays.onclick = e => {
    const button = e.target.closest('button');
    if (!button) return;
    day = new Date(calendarDate.getFullYear(), calendarDate.getMonth(), +button.innerText);
    setDay();
    toHour();
};

clock.addEventListener('pointerdown', e => {
    hand.setPointerCapture(e.pointerId);
    update(e);
});

clock.addEventListener('pointermove', e => {
    if (hand.hasPointerCapture(e.pointerId)) update(e);
});

clock.addEventListener('pointerup', e => {
    if (!hand.hasPointerCapture(e.pointerId)) return;
    update(e);
    hand.releasePointerCapture(e.pointerId);
    if (update === updateHour) toMinute();
});

clock.addEventListener('pointercancel', e => {
    if (hand.hasPointerCapture(e.pointerId)) hand.releasePointerCapture(e.pointerId);
});

closeWhen.onclick = closeWhenPicker;
applyWhen.onclick = applyWhenPicker;

render();


// Загрузка

const loadTags = () => {
    console.log('loadTags')
    const t = localStorage.getItem('tags');
    tags = t ? JSON.parse(t).filter(Boolean) : defaultTags;
};

const loadRecords = () => {
    console.log('loadRecords')
    const t = localStorage.getItem('records');
    records = t ? JSON.parse(t).filter(Boolean) : [];
    records.forEach(q => q.pooped = new Date(q.pooped));
};

const loadRecord = (created) => {
    console.log('loadRecord');
    record = structuredClone(records.find(r => r.created === created));
}

const saveRecord = () => {
    console.log('saveRecord');
    localStorage.setItem('records', JSON.stringify(records));
}

const saveTags = () => {
    console.log('saveTags');
    localStorage.setItem('tags', JSON.stringify(tags));
}

// 2.3

const resetButton = document.getElementById('reset');

resetButton.onclick = e => {
    e.preventDefault();
    records.length = 0;
    saveRecord();
    renderChosenRecords();
    calendarPages = {};
    renderPageCalendar();
}

// 3. Статистика

const periodArea = document.getElementById('period');
const indicator = periodArea.children[0];
let active = periodArea.children[1];

const rangeArea = document.getElementById('range');
const rangeLabel = document.getElementById('range-label');

const W = 0;
const M = 1;
const Y = 2;


let period = W;
let currentDate = new Date();

const startOfDay = date => {
    date = new Date(date);
    date.setHours(0, 0, 0, 0);
    return date;
};

const endOfDay = date => {
    date = new Date(date);
    date.setHours(23, 59, 59, 999);
    return date;
};

const getMonday = (date) => {
    date = new Date(date);
    const day = date.getDay();
    const d = day === 0 ? 6 : day - 1;
    date.setDate(date.getDate() - d);
    date.setHours(0, 0, 0, 0);
    return date;
}

const getRange = (date) => {
    date = startOfDay(date);

    if (period === W) {
        const start = getMonday(date);
        const end = new Date(start);
        end.setDate(end.getDate() + 7);
        return [start, end];
    }

    if (period === M) {
        const start = getMonday(new Date(date.getFullYear(), date.getMonth(), 1));
        const end = getMonday(new Date(date.getFullYear(), date.getMonth() + 1, 0));
        end.setDate(end.getDate() + 7);
        return [start, end];
    }

    const start = new Date(date.getFullYear(), 0, 1);
    const end = new Date(date.getFullYear() + 1, 0, 1);
    return [start, end];
}

const formatDate = (date) => date.getDate() + ' ' + MON[date.getMonth()];

function renderRange() {
    if (period === W) {
        const [start, end] = getRange(currentDate);
        rangeLabel.innerHTML =
            `<span>${formatDate(start)}</span><span>—</span><span>${formatDate(end)}</span>`;
    }
    else if (period === M) rangeLabel.innerHTML = MONTH[currentDate.getMonth()];
    else rangeLabel.innerHTML = currentDate.getFullYear().toString();
}

function shiftRange(direction) {
    if (period === W) {
        currentDate.setDate(currentDate.getDate() + direction * 7);
    } else if (period === M) {
        currentDate.setDate(1);
        currentDate.setMonth(currentDate.getMonth() + direction);
    } else {
        currentDate.setDate(1);
        currentDate.setMonth(0);
        currentDate.setFullYear(currentDate.getFullYear() + direction);
    }
    renderRange();
}

function getBuckets(start, end) {
    const buckets = [];

    if (period === W) {
        for (let i = 0; i < 7; i++) {
            buckets.push({label: WD[i], start: new Date(start), end: endOfDay(start)});
            start.setDate(start.getDate() + 1);
        }
    } else if (period === M) {
        const s = new Date(start);
        while (s < end) {
            const e = new Date(s);
            e.setDate(e.getDate() + 7);
            buckets.push({
                label: s.getDate(),
                start: new Date(s),
                end: e
            });
            s.setDate(s.getDate() + 7);
        }
    } else {
        for (let m = 0; m < 12; m++) {
            const s = new Date(start.getFullYear(), m, 1);
            const e = new Date(start.getFullYear(), m + 1, 0);
            buckets.push({label: MN[m], start: s, end: endOfDay(e)});
        }
    }
    console.log(buckets)

    return buckets;
}

function bucketize(records, buckets) {
    return buckets.map(b => records.filter(({pooped}) => {
        const d = new Date(pooped);
        return d >= b.start && d <= b.end;
    }));
}

function renderHList(id, entries) {
    const container = document.getElementById(id);

    if (!entries.length) {
        container.innerHTML = '<div class="empty">Нет данных за период</div>';
        container.style.removeProperty('--total');
        return;
    }

    const total = Math.max(...entries.map(e => e.count));
    container.style.setProperty('--total', total.toString());

    container.innerHTML = entries.map(e => {
        return `
                <div class="h-col" style="--color: var(${e.color})">
                    <div class="h-label">${e.label}</div>
                    <div class="h-value" style="--count: ${e.count}">
                        <div class="h-bar"></div>
                        <span class="h-number">${e.count}</span>
                    </div>
                </div>
            `;
    }).join('');
}

function renderVChart(id, buckets, values, decimals = 1, normal = 0, color = 'blue', value = 0) {
    const container = document.getElementById(id);

    console.log(container)
    console.log(container.previousElementSibling)
    container.parentElement.firstElementChild.lastElementChild.innerText = Math.round(value * decimals) / decimals;

    if (!values.some(v => v != null && v > 0)) {
        container.innerHTML = '<div class="empty">Нет данных за период</div>';
        return;
    }

    const total = Math.max(...values.filter(v => v != null && v > 0), normal) * 1.08;

    const barsHtml = buckets.map((b, i) => {
        const v = values[i];
        if (v == null || v === 0) {
            return `<div class="v-col"><span class="v-label">${b.label}</span></div>`;
        }
        const number = Math.round(v * decimals) / decimals;
        return `
                <div class="v-col" style="--count: ${v}">
                    <span class="v-number">${number}</span>
                    <div class="v-bar"></div>
                    <span class="v-label">${b.label}</span>
                </div>
            `;
    }).join('');

    const normalHtml = normal != null && normal > 0
        ? `<span class="v-normal" style="--count: ${normal}">
                   <span>${Math.round(normal * decimals) / decimals}</span>
               </span>`
        : '';

    container.innerHTML = `
            <section style="--total: ${total}; --color: var(--${color})">
                ${normalHtml}
                <div class="v-row">${barsHtml}</div>
            </section>
        `;
}

function renderTags(records) {
    const map = new Map();
    records.forEach(r => {
        (r.tags || []).forEach(tag => {
            map.set(tag, (map.get(tag) || 0) + 1);
        });
    });

    const entries = [...map.entries()]
        .map(([label, count]) => ({label, count, color: '--blue'}))
        .sort((a, b) => b.count - a.count);

    renderHList('tags-list', entries);
}

function renderColor(records) {
    const map = new Map();
    records.forEach(r => map.set(r.color, (map.get(r.color) || 0) + 1));

    const entries = [...map.entries()]
        .map(([key, count]) => ({
            key,
            count,
            label: COLORS[key] || key,
            color: `--inner-${key}`
        }))
        .sort((a, b) => b.count - a.count);

    renderHList('color-list', entries);
}

function renderForm(records) {
    const map = new Map();
    records.forEach(r => map.set(r.bristol, (map.get(r.bristol) || 0) + 1));

    const entries = [...map.entries()]
        .map(([bristol, count]) => ({
            key: bristol,
            count,
            label: BR[bristol - 1],
            color: '--blue'
        }))
        .sort((a, b) => a.key - b.key);

    renderHList('form-list', entries);
}

function renderBristol(records, buckets) {
    const groups = bucketize(records, buckets);
    const values = groups.map(g => {
        if (!g.length) return null;
        return g.reduce((s, r) => s + r.bristol, 0) / g.length;
    });

    const value = records.length ? records.reduce((s, r) => s + r.bristol, 0) / records.length : 0;
    renderVChart('bristol-chart', buckets, values, 2, 4, 'yellow', value);
}

const getNormal = (value) => {
    if (period === W) return value;
    if (period === M) return value * 7;
    return value * 30;
}

function renderCount(records, buckets) {
    const groups = bucketize(records, buckets);
    const values = groups.map(g => g.length);
    const value = records.length;
    const normal = getNormal(0.8);
    renderVChart('count-chart', buckets, values, 10, normal, 'blue', value);
}

function renderVolume(records, buckets) {
    const groups = bucketize(records, buckets);
    const values = groups.map(g => g.length ? g.reduce((s, r) => s + getVolume(r.volume), 0) : null);
    const value = records.length ? records.reduce((s, r) => s + getVolume(r.volume), 0) : null;
    const normal = getNormal(0.8 * getVolume(50));
    renderVChart('volume-chart', buckets, values, 1, normal, 'yellow', value);
}

function renderStats() {
    const [start, end] = getRange(currentDate);

    const dst = records.filter(r => {
        const d = new Date(r.pooped);
        return d >= start && d < end;
    });

    const buckets = getBuckets(start, end);

    renderTags(dst);
    renderColor(dst);
    renderForm(dst);
    renderBristol(dst, buckets);
    renderCount(dst, buckets);
    renderVolume(dst, buckets);
}

rangeArea.addEventListener('click', e => {
    const button = e.target.closest('button');
    if (!button) return;
    shiftRange(+button.dataset.add);
    renderStats();
});

periodArea.onclick = e => {
    const button = e.target.closest('button');
    if (!button || button === active) return;

    active.classList.remove('active');
    active = button;
    active.classList.add('active');
    indicator.style.transform = `translateX(${active.dataset.i * 100}%)`;

    period = +button.dataset.i;
    currentDate = new Date();
    renderRange();
    renderStats();
};


(function () {
    // loadTheme();
    // setLanguage();
    loadTags();
    loadRecords();
    renderPageCalendar();
    renderChosenRecords();
    setForm();
    renderRange();
    renderStats();
    // setRecords();
})();