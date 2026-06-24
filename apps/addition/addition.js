const totalRounds = 10;
let currentRound = 1;
let score = 0;
let streak = 0;
let currentAnswer = 0;
let locked = false;

const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const streakEl = document.querySelector("#streak");
const roundEl = document.querySelector("#round");
const progressEl = document.querySelector("#progress");
const progressTextEl = document.querySelector("#progress-text");
const operationLabelEl = document.querySelector("#operation-label");
const restartButton = document.querySelector("#restart");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function buildProblem() {
  const addition = Math.random() > 0.42;
  let first = randomInt(12, 88);
  let second = randomInt(5, 49);

  if (!addition && second > first) {
    [first, second] = [second, first];
  }

  currentAnswer = addition ? first + second : first - second;
  operationLabelEl.textContent = addition ? "บวกเลข" : "ลบเลข";
  questionEl.textContent = `${first} ${addition ? "+" : "-"} ${second} = ?`;

  const options = new Set([currentAnswer]);
  while (options.size < 3) {
    const delta = randomInt(-12, 12) || 5;
    const candidate = Math.max(0, currentAnswer + delta);
    options.add(candidate);
  }

  answersEl.innerHTML = "";
  shuffle([...options]).forEach((option) => {
    const button = document.createElement("button");
    button.className = "answer-button";
    button.type = "button";
    button.textContent = option;
    button.addEventListener("click", () => chooseAnswer(button, option));
    answersEl.appendChild(button);
  });
}

function chooseAnswer(button, value) {
  if (locked) return;
  locked = true;

  const correct = value === currentAnswer;
  button.classList.add(correct ? "is-correct" : "is-wrong");

  if (correct) {
    streak += 1;
    score += 10 + Math.min(streak * 2, 10);
    feedbackEl.textContent = `ถูกต้อง เก่งมาก! คำตอบคือ ${currentAnswer}`;
    feedbackEl.classList.remove("is-wrong");
  } else {
    streak = 0;
    feedbackEl.textContent = `ยังไม่ใช่ คำตอบที่ถูกคือ ${currentAnswer}`;
    feedbackEl.classList.add("is-wrong");
    [...answersEl.children].forEach((item) => {
      if (Number(item.textContent) === currentAnswer) {
        item.classList.add("is-correct");
      }
    });
  }

  updateScore();

  window.setTimeout(() => {
    if (currentRound >= totalRounds) {
      showSummary();
      return;
    }
    currentRound += 1;
    locked = false;
    feedbackEl.textContent = "เลือกคำตอบที่ถูกต้อง";
    feedbackEl.classList.remove("is-wrong");
    buildProblem();
    updateScore();
  }, 950);
}

function showSummary() {
  questionEl.textContent = "จบเกม!";
  operationLabelEl.textContent = "สรุปคะแนน";
  progressEl.style.width = "100%";
  progressTextEl.textContent = `ครบ ${totalRounds} ข้อแล้ว`;
  answersEl.innerHTML = "";
  const again = document.createElement("button");
  again.className = "answer-button";
  again.type = "button";
  again.textContent = "เล่นอีกครั้ง";
  again.addEventListener("click", resetGame);
  answersEl.appendChild(again);
  feedbackEl.textContent = `ได้ ${score} คะแนนจากทั้งหมด ${totalRounds} ข้อ`;
  feedbackEl.classList.remove("is-wrong");
}

function updateScore() {
  scoreEl.textContent = score;
  streakEl.textContent = streak;
  roundEl.textContent = `${currentRound}/${totalRounds}`;
  progressEl.style.width = `${((currentRound - 1) / totalRounds) * 100}%`;
  progressTextEl.textContent = `ทำถึงข้อที่ ${currentRound} จาก ${totalRounds}`;
}

function resetGame() {
  currentRound = 1;
  score = 0;
  streak = 0;
  locked = false;
  feedbackEl.textContent = "เลือกคำตอบที่ถูกต้อง";
  feedbackEl.classList.remove("is-wrong");
  progressEl.style.width = "0%";
  buildProblem();
  updateScore();
}

restartButton.addEventListener("click", resetGame);
resetGame();
