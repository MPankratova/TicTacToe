'use strict';

let tikTakToe = {
    gameTableElement: document.getElementById('game'),
    status: 'playing',
    mapValues: [
        ['', '', ''],
        ['', '', ''],
        ['', '', '']
    ],
    phase: 'X',

    /**
     * Инициализация игры
     */
    init() {
        //Отрисовываем все ячейки
        this.renderMap();
        //Инициализируем обработчик событий
        this.initEventHandlers();
    },

    /**
     * Отрисовка ячеек на странице
     */
    renderMap() {
        for (let row = 0; row < 3; row++) {
            const tr = document.createElement('tr');
            this.gameTableElement.appendChild(tr);
            for (let col = 0; col < 3; col++) {
                let td = document.createElement('td');
                td.dataset.row = row.toString();
                td.dataset.col = col.toString();
                tr.appendChild(td);
            }
        }
    },

    /**
     * Инициализируем обработчик событий
     */
    initEventHandlers() {
        //Создаем обработчик событий при клике на таблицу
        this.gameTableElement.addEventListener('click', event => this.cellClickHandler(event));
    },

    /**
     * Обработчик события клика
     * @param {MouseEvent} event 
     */
    cellClickHandler(event) {
        // Если клик не корректный, то его не нужно обрабатывать,
        //выходим из функции
        if (!this.isCorrectClick(event)) {
            return;
        }
        
        //Заполняем ячейку
        this.fillCell(event);

        //Если кто то выиграл, заходим в if 
        if (this.hasWon()) {
            //Ставим статус игры - окончена
            this.setStatusStopped();
            //Сообщаем о победе
            this.sayWonPhase();
        }

        // Инче меняем игрока 
        this.togglePhase();

    },

    /**
     * Проверяем, был ли корректный клик
     * @param {Event} event 
     * @returns Вернет true, если статус игры "играем", кликнули на ячейку
     * и ячейка является пустой
     */
    isCorrectClick(event) {
        return this.isStatusPlaying() && this.isClickByCell(event) && this.isCellEmpty(event);
    },

    /**
     * Проверяем что статус игры "playing" и игра не законцена
     * @returns {boolean} true-если статус "играем", иначе false
     */
    isStatusPlaying() {
        return this.status === 'playing';
    },

    /**
     * Проверяем, что клик был по ячейке
     * @param {Event} event 
     * @returns {boolean} Вернет true, если клик был по ячейке
     */
    isClickByCell(event) {
        return event.target.tagName === 'TD';
    },

    /**
     * Проверка, что в ячйке нет значений
     * @param {Event} event 
     * @returns {boolean} вернет true, если ячейка пуста
     */
    isCellEmpty(event) {
        //получаем строку и колонку куда кликнули
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        return this.mapValues[row][col] === '';
    },

    /**
     * Заполняем ячейку в оторую кликнул пользователь
     * @param {Event} event 
     */
    fillCell(event) {
        let row = +event.target.dataset.row;
        let col = +event.target.dataset.col;
        //Заполняем ячейку и ставим занчение в массивеб в свойстве mapValue
        this.mapValues[row][col] = this.phase;
        event.target.textContent = this.phase;
    },

    /**
     * Проверка, есть ли выигрышная ситуация
     * @returns {boolean} вернет true, если игра выиграна
     */
    hasWon() {
        return this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 0 }, { x: 2, y: 0 }) ||
            this.isLineWon({ x: 0, y: 1 }, { x: 1, y: 1 }, { x: 2, y: 1 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 2 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 0, y: 1 }, { x: 0, y: 2 }) ||
            this.isLineWon({ x: 1, y: 0 }, { x: 1, y: 1 }, { x: 1, y: 2 }) ||
            this.isLineWon({ x: 2, y: 0 }, { x: 2, y: 1 }, { x: 2, y: 2 }) ||

            this.isLineWon({ x: 0, y: 0 }, { x: 1, y: 1 }, { x: 2, y: 2 }) ||
            this.isLineWon({ x: 0, y: 2 }, { x: 1, y: 1 }, { x: 2, y: 0 });
    },

    /**
     * 
     * @param {{x: int, y: int}} a 1-ая ячейка
     * @param {{x: int, y: int}} b 2-ая ячейка
     * @param {{x: int, y: int}} c 3-я ячейка
     * @returns {BlobEvent} вернет true, если линия выиграна
     */
    isLineWon(a, b, c) {
        let value = this.mapValues[a.x][a.y] + this.mapValues[b.x][b.y] + this.mapValues[c.x][c.y];
        return value === 'XXX' || value === 'OOO';
    },

    /**
     * Ставит статус игры в остатновлен
     */
    setStatusStopped() {
        this.status = 'stopped';
    },

    /**
     * Метод сообщает о победе
     */
    sayWonPhase() {
        let player = this.phase === 'X' ? 'Крестики' : 'Нолики';
        alert(`${player} выиграли!`);
    },

    /**
     * Метод, который меняет игрока
     */
    togglePhase () {
        this.phase = this.phase === 'X' ? 'O' : 'X';
    }

}

//Запускаем игру при полной загрузки страницы
window.addEventListener('load', tikTakToe.init());