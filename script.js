const operations = ["+", "-", "×", "÷"];
const questionEl = document.getElementById("question");
const choicesEl = document.getElementById("choices");
const feedbackEl = document.getElementById("feedback");

function getRandomInt(max) {
  return Math.floor(Math.random() * (max + 1));
}

function generateQuestion() {
  feedbackEl.textContent = "";
  choicesEl.innerHTML = "";

  const operation = operations[getRandomInt(3)];
  let num1 = getRandomInt(12);
  let num2 = getRandomInt(12);
  let correctAnswer;

  switch (operation) {
    case "+":
      correctAnswer = num1 + num2;
      break;
    case "-":
      if (num1 < num2) [num1, num2] = [num2, num1]; // no negatives
      correctAnswer = num1 - num2;
      break;
    case "×":
      correctAnswer = num1 * num2;
      break;
    case "÷":
      correctAnswer = num2 || 1;
      num1 = correctAnswer * getRandomInt(12);
      correctAnswer = num1 / correctAnswer;
      break;
  }

  questionEl.textContent = `${num1} ${operation} ${num2} = ?`;

  const answers = new Set([correctAnswer]);
  while (answers.size < 4) {
    answers.add(correctAnswer + getRandomInt(10) - 5);
  }

  Array.from(answers)
    .sort(() => 0.5 - Math.random())
    .forEach(answer => {
      const btn = document.createElement("button");
      btn.textContent = answer;
      btn.onclick = () => {
        feedbackEl.textContent = (answer === correctAnswer)
          ? "✅ Correct! Great job!"
          : "❌ Oops! Try the next one.";
      };
      choicesEl.appendChild(btn);
    });
}

// Load first question
generateQuestion();
