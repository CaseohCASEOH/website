let timer;
let timeLeft = 0;

window.onload = function () {
  const savedGoal = localStorage.getItem("goal");
  const savedTimeLeft = localStorage.getItem("timeLeft");

  if (savedGoal) {
    document.getElementById("goalDisplay").innerText = `Your Goal: ${savedGoal}`;
  }
  if (savedTimeLeft) {
    timeLeft = parseInt(savedTimeLeft);
    updateTimerDisplay();
  }
};

function startTimer() {
  const days = parseInt(document.getElementById("days").value);
  const hours = parseInt(document.getElementById("hours").value);
  const minutes = parseInt(document.getElementById("minutes").value);
  const seconds = parseInt(document.getElementById("seconds").value);

  timeLeft = (days * 86400) + (hours * 3600) + (minutes * 60) + seconds;

  if (timeLeft > 0) {
    localStorage.setItem("goal", `${days}d ${hours}h ${minutes}m ${seconds}s`);
    localStorage.setItem("timeLeft", timeLeft);
    document.getElementById("goalDisplay").innerText = `Your Goal: ${days}d ${hours}h ${minutes}m ${seconds}s`;

    clearInterval(timer);
    timer = setInterval(updateTimer, 1000);
  } else {
    alert("Please set a valid time!");
  }
}

function resettimer() {
  clearInterval(timer);
  timeLeft = 0;
  localStorage.removeItem("timeLeft");
  document.getElementById("timerDisplay").innerText = "00:00:00";
  document.getElementById("goalDisplay").innerText = "";
}

function updatetimert() {
  if (timeLeft > 0) {
    timeLeft--;
    localStorage.setItem("timeLeft", timeLeft);
    updateTimerDisplay();
  } else {
    clearInterval(timer);
    alert("Goal Is Finshed!");
  }
}

function updatetimer() {
  const days = Math.floor(timeLeft / 86400);
  const hours = Math.floor((timeLeft % 86400) / 3600);
  const minutes = Math.floor((timeLeft % 3600) / 60);
  const seconds = timeLeft % 60;

  document.getElementById("timerDisplay").innerText =
    `${String(days).padStart(2, '0')}:${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}
