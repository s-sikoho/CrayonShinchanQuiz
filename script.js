let correctCount = 0;
let answeredCount = 0;
const score = document.getElementById("score");
const ratio = document.getElementById("ratio");
fetch("./questions.json")
  .then(response => response.json())
  .then(questions => {
    const quizList = document.getElementById("quiz-list");

    questions.forEach(question => {
      const card = document.createElement("div");
      card.className = "quiz-card";

      card.innerHTML = `
        <p>${question.q}</p>

        <button class="show-answer">
          回答を表示
        </button>

        <p class="answer" hidden>
          ${question.a}
        </p>

        <button class="correct" hidden>
          ○ 正解
        </button>

        <button class="incorrect" hidden>
          × 不正解
        </button>
        <span class="difficulty difficulty-${question.difficulty}">
          ${question.difficulty}
        </span>
      `;

      // このカードの中にある要素を取得
      const showButton = card.querySelector(".show-answer");
      const answer = card.querySelector(".answer");
      const correctButton = card.querySelector(".correct");
      const incorrectButton = card.querySelector(".incorrect");

      // ボタンにイベントを登録
      showButton.addEventListener("click", () => {
        answer.hidden = !answer.hidden;
        showButton.hidden = true;
        correctButton.hidden = !correctButton.hidden;
        incorrectButton.hidden = !incorrectButton.hidden;
      });

      correctButton.addEventListener("click", () => {
        correctCount++;
        answeredCount++;
        score.textContent = `正解数: ${correctCount}`;
        ratio.textContent = `正解率: ${Math.round(100 * correctCount / answeredCount)} %`;
        incorrectButton.hidden = true;
      });

      incorrectButton.addEventListener("click", () => {
        answeredCount++;
        ratio.textContent = `正解率: ${Math.round(100 * correctCount / answeredCount)} %`;
        correctButton.hidden = true;
      });

      quizList.appendChild(card);
    });
  });