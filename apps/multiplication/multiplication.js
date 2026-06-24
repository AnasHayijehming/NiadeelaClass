const totalRounds = 12;
let currentRound = 1;
let score = 0;
let timeLeft = 60;
let currentAnswer = 0;
let timerId = null;
let locked = false;

const questionEl = document.querySelector("#question");
const answersEl = document.querySelector("#answers");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const timerEl = document.querySelector("#timer");
const roundEl = document.querySelector("#round");
const progressEl = document.querySelector("#progress");
const progressTextEl = document.querySelector("#progress-text");
const restartButton = document.querySelector("#restart");

function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function shuffle(items) {
  return [...items].sort(() => Math.random() - 0.5);
}

function startTimer() {
  clearInterval(timerId);
  timerId = window.setInterval(() => {
    timeLeft -= 1;
    updateScore();
    timerEl.classList.toggle("timer-warning", timeLeft <= 10);
    if (timeLeft <= 0) {
      clearInterval(timerId);
      showSummary("หมดเวลา!");
    }
  }, 1000);
}

function buildProblem() {
  const first = randomInt(2, 12);
  const second = randomInt(2, 12);
  currentAnswer = first * second;
  questionEl.textContent = `${first} x ${second} = ?`;

  const options = new Set([currentAnswer]);
  while (options.size < 4) {
    const candidate = Math.max(2, currentAnswer + randomInt(-18, 18));
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
    score += 10 + Math.ceil(timeLeft / 10);
    feedbackEl.textContent = `ถูกต้อง! ได้โบนัสเวลา คำตอบคือ ${currentAnswer}`;
    feedbackEl.classList.remove("is-wrong");
  } else {
    feedbackEl.textContent = `ยังไม่ใช่ คำตอบคือ ${currentAnswer}`;
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
      showSummary("ครบทุกชุดแล้ว!");
      return;
    }
    currentRound += 1;
    locked = false;
    feedbackEl.textContent = "เลือกคำตอบก่อนเวลาหมด";
    feedbackEl.classList.remove("is-wrong");
    buildProblem();
    updateScore();
  }, 820);
}

function showSummary(title) {
  locked = true;
  clearInterval(timerId);
  questionEl.textContent = title;
  progressEl.style.width = "100%";
  progressTextEl.textContent = `ครบ ${totalRounds} ชุดแล้ว`;
  answersEl.innerHTML = "";
  const again = document.createElement("button");
  again.className = "answer-button";
  again.type = "button";
  again.textContent = "เล่นอีกครั้ง";
  again.addEventListener("click", resetGame);
  answersEl.appendChild(again);
  feedbackEl.textContent = `คะแนนรวม ${score} คะแนน จาก ${totalRounds} ชุด`;
  feedbackEl.classList.remove("is-wrong");
}

function updateScore() {
  scoreEl.textContent = score;
  timerEl.textContent = timeLeft;
  roundEl.textContent = `${currentRound}/${totalRounds}`;
  progressEl.style.width = `${((currentRound - 1) / totalRounds) * 100}%`;
  progressTextEl.textContent = `ทำถึงชุดที่ ${currentRound} จาก ${totalRounds}`;
}

function resetGame() {
  currentRound = 1;
  score = 0;
  timeLeft = 60;
  locked = false;
  feedbackEl.textContent = "เลือกคำตอบก่อนเวลาหมด";
  feedbackEl.classList.remove("is-wrong");
  timerEl.classList.remove("timer-warning");
  buildProblem();
  updateScore();
  startTimer();
}

restartButton.addEventListener("click", resetGame);
resetGame();
