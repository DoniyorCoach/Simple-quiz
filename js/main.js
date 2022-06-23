const questions = [{
        question: "Какая из этих съедобных фраз не имеет отношения к веб-разработке?",
        answers: ["Гамбургер", "Хлебные крошки", "Чай", "Сливки"],
        correct: 4,
    },
    {
        question: "Разработчик исправил ошибку в коде и хочет поделиться этим с остальными программистами. Что нужно сделать?",
        answers: [
            "Отправить POST-запрос на продакшен",
            "Задеплоить новый инстанс",
            "Распарсить джейсон",
            "Залить коммит и смержить ветку",
        ],
        correct: 4,
    },
    {
        question: "Какого языка, применяемого в веб-разработке, не существует?",
        answers: [
            "PHP",
            "PYTHON",
            "JS",
            "KALIBRI",
        ],
        correct: 4,
    },
    {
        question: "Каким животным называют домашнюю директорию пользователя в linux-системах?",
        answers: ["Питон", "Хомяк", "Лиса", "Бобёр"],
        correct: 2,
    },
    {
        question: "Какого веб-браузера не существует?",
        answers: ["Огнелис", "Ишак", "Опера", "Пейпал"],
        correct: 4,
    },
    {
        question: "Главный тег?",
        answers: ["head", "html", "main", "body"],
        correct: 2,
    }
];

// Находим элементы 
const headerContainer = document.querySelector('#header');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');

// Переменные игры 
let score = 0; // 
let questionScore = 1;
let questionIndex = 0; 

clearPage();
showQuestion();
submitBtn.onclick = checkAnswer;


function clearPage() {
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion() {

    // Вопросы
    const headerTemplate = `<h2 class="title">${questions[questionIndex]['question']}</h2> <p class="counter"> ${questionScore} из ${questions.length}</p>`;
    headerContainer.innerHTML = headerTemplate;

    // Варианты ответов
    let answerNumber = 1;
    for (answerText of questions[questionIndex]['answers']) {
        const questionTemplate =
            `<li>
                <label>
				    <input value="${answerNumber}" type="radio" class="answer" name="answer" />
				    <span>${answerText}</span>
			    </label>
            </li>`;

        listContainer.innerHTML += questionTemplate;
        answerNumber++;
    }
    questionScore++;
}

function checkAnswer() {
    // Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');

    // Если ответ не выбран - ничего не делаем, выходим из функции
    if (!checkedRadio) {
        submitBtn.blur();
        return;
    }

    // Узнаем номер ответа пользователя
    const userAnswer = parseInt(checkedRadio.value);


    // Если ответил верно - увеличиваем счет
    if (userAnswer === questions[questionIndex]['correct']) {
        score++;
    }

    // Проверяем последний вопрос или нет
    if (questionIndex + 1 !== questions.length) {
        clearPage();
        questionIndex++;
        showQuestion();

    } else {
        clearPage();
        showResults();
    }
}

function showResults() {
    // Варианты заголовкой и текста
    let title, message;
    if (score === questions.length) {
        title = 'Поздравляем!  😎';
        message = 'Вы ответили верно на все вопросы! 👍';
    } else if ((score * 100) / questions.length >= 50) {
        title = 'Неплохой результат! 🧐';
        message = 'Вы дали более половины правильных ответов! 👍';
    } else {
        title = 'Стоит постараться! 🙁';
        message = 'Пока у вас меньше половины правильных ответов! 😨';
    }

    // Результат
    let result = `Результат: ${score} из ${questions.length}`;

    const resultsTemplate =
        `<h2 class="title">${title}</h2>
        <h3 class="summary">${message}</h3>
        <p class="result">${result}</p>`;

    headerContainer.innerHTML = resultsTemplate;

    submitBtn.blur();
    submitBtn.innerHTML = "Начать заново";

    // Очиста истории т.е перезагрузка страницы
    submitBtn.onclick = () => history.go();
}