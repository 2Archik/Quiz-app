const questions = [
  {
    question: "Какой язык работает в браузере?",
    answers: ["Java", "C", "Python", "JavaScript"],
    correct: 4,
  },
  {
    question: "Что означает CSS?",
    answers: [
      "Central Style Sheets",
      "Cascading Style Sheets",
      "Cascading Simple Sheets",
      "Cars SUVs Sailboats",
    ],
    correct: 2,
  },
  {
    question: "Что означает HTML?",
    answers: [
      "Hypertext Markup Language",
      "Hypertext Markdown Language",
      "Hyperloop Machine Language",
      "Helicopters Terminals Motorboats Lamborginis",
    ],
    correct: 1,
  },
  {
    question: "В каком году был создан JavaScript?",
    answers: ["1996", "1995", "1994", "все ответы неверные"],
    correct: 2,
  },
];

const headerContainer = document.querySelector("#header");
const listContainer = document.querySelector("#list");
const submiteBtn = document.querySelector("#submit");

// Переменные игры
let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();
submiteBtn.onclick = checkAnswer;

function clearPage() {
  headerContainer.innerHTML = "";
  listContainer.innerHTML = "";
}

function showQuestion() {
  const headerTemplate = `<h2 class="title">%title%</h2>`;
  const title = headerTemplate.replace(
    "%title%",
    questions[questionIndex]["question"]
  );
  headerContainer.innerHTML = title;

  // Варианты ответов
  let answerNumber = 1;
  for (answerText of questions[questionIndex]["answers"]) {
    questionTemplate = `<li>
		<label>
			<input value="%number%" type="radio" class="answer" name="answer" />
			<span>%answer%</span>
		</label>
	</li>`;

    const answerHtml = questionTemplate
      .replace("%answer%", answerText)
      .replace("%number%", answerNumber);
    listContainer.innerHTML += answerHtml;
    answerNumber++;
  }
}

function checkAnswer() {
  // Находим выбранную радиокнопку
  const checkedRadio = listContainer.querySelector(
    'input[type="radio"]:checked'
  );

  // Если ответ не выбран - ничего не делаем, выходим из функции
  if (!checkedRadio) {
    submiteBtn.blur();
    return;
  }

  // Узнаем номер ответа пользователя
  const userAnswer = parseInt(checkedRadio.value);

  // Если ответ верный - увеличиваем счет
  if (userAnswer === questions[questionIndex]["correct"]) {
    score++;
  }

  // Проверяем последний ли это вопрос
  if (questionIndex !== questions.length - 1) {
    questionIndex++;
    clearPage();
    showQuestion();
  } else {
    clearPage();
    showResults();
  }
}

function showResults() {
  const resultsTemplate = `<h2 class="title">%title%</h2>
  <h3 class="summary">%message%</h3>
  <p class="result">%result%</p>`;

  let title, message;

  // Варианты заголовков и текста
  if (score === questions.length) {
    title = "Фига се ты монстр!";
    message = "Все ответы верные";
  } else if ((score * 100) / questions.length >= 50) {
    title = "Ну норм";
    message = "Больше половины правильных ответов =)";
  } else {
    title = "Ну ты и лошара =)";
    message = "Меньше 2х правильных ответов";
  }

  // Результат
  let result = `${score} из ${questions.length}`;

  // Финальный ответ, подставляю данные в шаблон
  const finalMessage = resultsTemplate
    .replace("%title%", title)
    .replace("%message%", message)
    .replace("%result%", result);

  headerContainer.innerHTML = finalMessage;

  // Меняю кнопку на "Играть снова"
  submiteBtn.blur();
  submiteBtn.innerText = "Начать заново";
  submiteBtn.onclick = () => history.go();
}
