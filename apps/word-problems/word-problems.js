const problems = [
  {
    topic: "ตลาดผลไม้",
    text: "แม่ซื้อแอปเปิล 3 ถุง ถุงละ 25 บาท และซื้อมะม่วง 2 ถุง ถุงละ 18 บาท แม่จ่ายเงินทั้งหมดกี่บาท?",
    answer: 111,
    hint: "คิดราคาแอปเปิลก่อน แล้วบวกราคามะม่วง",
  },
  {
    topic: "ห้องสมุด",
    text: "ห้องสมุดมีหนังสือคณิตศาสตร์ 48 เล่ม ครูนำมาเพิ่มอีก 27 เล่ม แล้วแจกให้นักเรียนยืม 16 เล่ม เหลือหนังสือกี่เล่ม?",
    answer: 59,
    hint: "รวมหนังสือทั้งหมดก่อน แล้วลบจำนวนที่ยืม",
  },
  {
    topic: "กิจกรรมกีฬา",
    text: "นักเรียน 6 กลุ่ม แต่ละกลุ่มมีลูกบอล 4 ลูก รวมมีลูกบอลทั้งหมดกี่ลูก?",
    answer: 24,
    hint: "ใช้การคูณจำนวนกลุ่มกับจำนวนลูกบอลต่อกลุ่ม",
  },
  {
    topic: "ร้านเครื่องเขียน",
    text: "ดินสอราคาแท่งละ 7 บาท ถ้าซื้อ 9 แท่ง และมียางลบราคา 12 บาท ต้องจ่ายทั้งหมดกี่บาท?",
    answer: 75,
    hint: "หาค่าดินสอทั้งหมด แล้วบวกราคายางลบ",
  },
  {
    topic: "ปลูกผัก",
    text: "แปลงผักมีต้นคะน้า 8 แถว แถวละ 6 ต้น ถ้าตายไป 5 ต้น จะเหลือต้นคะน้ากี่ต้น?",
    answer: 43,
    hint: "คูณจำนวนแถวกับจำนวนต้นต่อแถว แล้วลบต้นที่ตาย",
  },
  {
    topic: "แบ่งขนม",
    text: "ครูมีขนม 72 ชิ้น แบ่งให้นักเรียน 8 คนเท่า ๆ กัน นักเรียนแต่ละคนได้ขนมกี่ชิ้น?",
    answer: 9,
    hint: "แบ่งจำนวนขนมทั้งหมดด้วยจำนวนนักเรียน",
  },
];

let currentIndex = 0;
let score = 0;
let answered = false;

const topicEl = document.querySelector("#topic");
const questionEl = document.querySelector("#question");
const answerInput = document.querySelector("#answer");
const checkButton = document.querySelector("#check");
const nextButton = document.querySelector("#next");
const restartButton = document.querySelector("#restart");
const feedbackEl = document.querySelector("#feedback");
const scoreEl = document.querySelector("#score");
const roundEl = document.querySelector("#round");
const progressEl = document.querySelector("#progress");
const progressTextEl = document.querySelector("#progress-text");

function renderProblem() {
  const problem = problems[currentIndex];
  answered = false;
  topicEl.textContent = problem.topic;
  questionEl.textContent = problem.text;
  answerInput.value = "";
  answerInput.disabled = false;
  checkButton.disabled = false;
  feedbackEl.textContent = "อ่านโจทย์แล้วกรอกคำตอบเป็นตัวเลข";
  feedbackEl.classList.remove("is-wrong");
  updateScore();
  answerInput.focus();
}

function checkAnswer() {
  if (answered) return;
  const problem = problems[currentIndex];
  const value = Number(answerInput.value);

  if (!Number.isFinite(value)) {
    feedbackEl.textContent = "ใส่ตัวเลขก่อนตรวจคำตอบ";
    feedbackEl.classList.add("is-wrong");
    answerInput.focus();
    return;
  }

  answered = true;
  answerInput.disabled = true;
  checkButton.disabled = true;

  if (value === problem.answer) {
    score += 20;
    feedbackEl.textContent = `ถูกต้อง! คำตอบคือ ${problem.answer}`;
    feedbackEl.classList.remove("is-wrong");
    questionEl.animate(
      [
        { transform: "scale(1)" },
        { transform: "scale(1.025)" },
        { transform: "scale(1)" },
      ],
      { duration: 260, easing: "ease-out" },
    );
  } else {
    feedbackEl.textContent = `ยังไม่ใช่ คำตอบคือ ${problem.answer} | ช่วยคิด: ${problem.hint}`;
    feedbackEl.classList.add("is-wrong");
  }

  updateScore();
}

function nextProblem() {
  if (!answered) {
    feedbackEl.textContent = "ลองตอบข้อนี้ก่อน แล้วค่อยไปข้อต่อไป";
    feedbackEl.classList.add("is-wrong");
    answerInput.focus();
    return;
  }

  if (currentIndex >= problems.length - 1) {
    showSummary();
    return;
  }
  currentIndex += 1;
  renderProblem();
}

function showSummary() {
  topicEl.textContent = "สรุปผล";
  questionEl.textContent = `ทำครบแล้ว ได้ ${score} คะแนน จาก ${problems.length * 20} คะแนน`;
  answerInput.disabled = true;
  checkButton.disabled = true;
  feedbackEl.textContent = "กดเริ่มใหม่เพื่อฝึกอีกครั้ง";
  feedbackEl.classList.remove("is-wrong");
  progressEl.style.width = "100%";
  progressTextEl.textContent = `ครบ ${problems.length} ข้อแล้ว`;
}

function updateScore() {
  scoreEl.textContent = score;
  roundEl.textContent = `${currentIndex + 1}/${problems.length}`;
  progressEl.style.width = `${(currentIndex / problems.length) * 100}%`;
  progressTextEl.textContent = `ทำถึงข้อที่ ${currentIndex + 1} จาก ${problems.length}`;
}

function resetGame() {
  currentIndex = 0;
  score = 0;
  renderProblem();
}

checkButton.addEventListener("click", checkAnswer);
nextButton.addEventListener("click", nextProblem);
restartButton.addEventListener("click", resetGame);
answerInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkAnswer();
  }
});

resetGame();
