const burg = document.querySelector('.header__burg');
burg.addEventListener('click', () => {
    const blockMob = document.querySelector('.header__mobNav');
    blockMob.classList.toggle("header__mobNav-active");
})
const cross = document.querySelector('.header__crossImg');
cross.addEventListener('click', () => {
    const blockMob = document.querySelector('.header__mobNav');
    blockMob.classList.remove("header__mobNav-active");
})


// Получаем радио-кнопки и SVG элементы
const radios = document.querySelectorAll('input[name="radio"]');
const radiosTypes = document.querySelectorAll('input[name="radioType"]');
const svgContainers = document.querySelectorAll('.main__infoAdd');
let type = 1;
// Функция для обновления отображения SVG

function updateSVG() {
    const selectedValue = document.querySelector('input[name="radio"]:checked').value;

    svgContainers.forEach(svg => {
        // Убираем активное состояние
        svg.classList.remove('preactive');
        svg.classList.remove('active');
    });

    // Показываем нужный SVG
    const activeSvg = document.getElementById(`svg-${selectedValue}`);

    // Небольшая задержка для запуска анимации opacity
    activeSvg.classList.add('preactive');
    setTimeout(() => {
        activeSvg.classList.add('active');
    }, 250);

}

// Добавляем обработчики событий на изменение радио-кнопок
radios.forEach(radio => {
    radio.addEventListener('change', updateSVG); // Передаем аргумент 1
});

radiosTypes.forEach(radio => {
    radio.addEventListener('change', (event) => {
        const selectedValue = event.target.value;
        changeType(selectedValue);
    });
});
function changeType(value) {
    if (value == 11) {
        type = 0;
        removeRowEventListeners(); // Удаляем слушатели первого типа
        removeMapEventListeners();
        processingFirstType();
    }
    if (value == 12) {
        type = 0;
        removeRowEventListeners(); // Удаляем слушатели первого типа
        removeMapEventListeners();
        processingSecondType();
    }
    if (value == 13) {
        type = 0;
        removeRowEventListeners(); 
        removeMapEventListeners();
        processingThirdType();
    }
}

function setRadioChecked(pageId) {
    let radioId;

    console.log(pageId);
    if (pageId === "Page 1") {
        radioId = "radio-1";
    } else if (pageId === "Page 2") {
        radioId = "radio-2";
    } else if (pageId === "Page 3") {
        radioId = "radio-3";
    } else if (pageId === "Style 1") {
        radioId = "radio-11";
    } else if (pageId === "Style 2") {
        radioId = "radio-12";
    } 
    

    const radio = document.getElementById(radioId);
    if (radio) {
        radio.checked = true;
    }
}

// Вызываем функцию при загрузке страницы
updateSVG();

const frstPage = ["mod-5", "mod-6"];
const scndPage = ["mod-1", "mod-2", "mod-3", "mod-4", "mod-6"];

let map = new Map([
    ["mod-2", "m8-1-v"],
    ["mod-3", "m13-v"],
    ["mod-4", "m15-v"],
    ["mod-5", "m16-v"],
    ["mod-6", "m19-1-v"]
]);

let activeRow = null;
let mapEventListeners = new Map();
if (type == 1) {
    processingFirstType();
} 

function removeRowEventListeners() {
    document.querySelectorAll('tr').forEach(row => {
        row.removeEventListener('click', rowClickListener);
    });
}

function removeMapEventListeners() {
    mapEventListeners.forEach((listener, elementId) => {
        const element = document.getElementById(elementId);
        if (element) {
            element.removeEventListener('click', listener);
        }
    });
}


function rowClickListener(event) {
    const rowId = this.id;
    const addId = map.get(rowId);

    const add = document.getElementById(addId);

    if (activeRow && activeRow !== this) {
        activeRow.classList.remove("table__row-active");
    }

    document.querySelectorAll('.modul_button').forEach(item => {
        item.classList.remove("hideAdd");
    });
    add.classList.add("hideAdd");

    this.classList.add("table__row-active");
    activeRow = this;

    if (frstPage.includes(rowId) && document.querySelector('input[name="radio"]:checked').value != 1) {
        setRadioChecked("Page 1");
        updateSVG();
    } else if (scndPage.includes(rowId) && document.querySelector('input[name="radio"]:checked').value != 2) {
        setRadioChecked("Page 2");
        updateSVG();
    } 
}


function processingFirstType() {
    setRadioChecked("Style 1");
    document.querySelectorAll('.modul_button').forEach(item => {
        item.classList.remove("hideSecond");
    });
    document.querySelectorAll('tr').forEach(row => {
        row.addEventListener('click', rowClickListener); // Добавляем слушатель клика на строки
    });

    map.forEach((value, key) => {
        const rowId = key;
        let element = document.getElementById(value);
        const row = document.getElementById(rowId);

        if (element) {
            // Создаем обработчик для элемента
            const listener = function() {
                let c = 0
                const addId = map.get(rowId);
    
                const add = document.getElementById(addId);
                if (c === 0) {
                    console.log(c);
                    if (activeRow && activeRow !== row) {
                        activeRow.classList.remove("table__row-active");
                    }
                    row.classList.add("table__row-active");
                    activeRow = row;
                    
    
                    document.querySelectorAll('.modul_button').forEach(item => {
                        item.classList.remove("hideAdd");
                    });
                    add.classList.add("hideAdd");
                    c++;
                }
                
                // Рекурсивно зацикливаем анимацию только для hideAdd-2
                function animate() {
                    
                    console.log(c);
                    setTimeout(() => {
                        add.classList.add("hideAdd-2");
                        setTimeout(() => {
                            add.classList.remove("hideAdd-2");
                            // Запускаем анимацию снова
                            animate();
                        }, 8000); // Пауза перед повтором анимации
                    }, 4000); // Пауза перед началом анимации
                }
                // Запускаем анимацию первый раз
                animate();
            };

            // Сохраняем обработчик в mapEventListeners
            mapEventListeners.set(value, listener);

            // Добавляем слушатель на элемент
            element.addEventListener('click', listener);
        }
    });

    
}

function processingSecondType() {
    document.querySelectorAll('.modul_button').forEach(item => {
        item.classList.add("hideSecond");
    });
    document.querySelectorAll('tr').forEach(row => {
        row.classList.remove("table__row-active");
        row.addEventListener('click', processingFirstType);// Добавляем слушатель клика на строки
    });

}
function processingThirdType() {
    document.querySelectorAll('.modul_button').forEach(item => {
        item.classList.remove("hideSecond");
        item.classList.remove("hideAdd");
        item.classList.remove("hideAdd-2");
        
    });
    document.querySelectorAll('tr').forEach(row => {
        row.classList.remove("table__row-active");
        row.addEventListener('click', processingFirstType);// Добавляем слушатель клика на строки
    });
}

function findKeyByValue(map, valueToFind) {
    let foundKey = null;

    map.forEach((value, key) => {
        if (value === valueToFind) {
            foundKey = key;
        }
    });

    return foundKey;
}