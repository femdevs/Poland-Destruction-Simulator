document.addEventListener('DOMContentLoaded', function() {
  // Define variables
  var score = 0;
  var personalBest = parseInt(localStorage.getItem('personalBest')) || 0; // Load personal best from local storage
  var isGameStarted = false;
  var isGameOver = false;
  var timeLeft = 15;
  var mapWidth = 600;
  var mapHeight = 400;

  // Game Over message element
  var gameOverElement = document.getElementById('gameOver');

  // Show personal best score
  document.getElementById('personalBest').innerText = 'Personal Best: ' + personalBest;

  // Function to display or hide game elements based on game state
  function toggleGameElements() {
    if (isGameStarted) {
      document.getElementById('destroyButton').style.display = 'block'; // Show the "Destroy!" button
      document.getElementById('startButton').style.display = 'none'; // Hide the "Start Game" button
    } else {
      document.getElementById('startButton').style.display = 'block'; // Show the "Start Game" button
      document.getElementById('destroyButton').style.display = 'none'; // Hide the "Destroy!" button
    }

    if (isGameOver) {
      gameOverElement.style.display = 'block'; // Show the Game Over message
      document.getElementById('startButton').style.display = 'block'; // Show the "Start Game" button
    } else {
      gameOverElement.style.display = 'none'; // Hide the Game Over message
    }
  }

  // Function to start or restart the game
  function startGame() {
    score = 0;
    isGameStarted = true;
    isGameOver = false;
    timeLeft = 15;
    document.getElementById('score').innerText = 'Score: 0';
    document.getElementById('timeLeft').innerText = 'Time Left: 15';
    toggleGameElements();
    startTimer();
  }

  // Add click event to the "Start Game" button
  document.getElementById('startButton').addEventListener('click', function() {
    startGame();
  });

  // Add click event to the "Destroy!" button
  document.getElementById('destroyButton').addEventListener('click', function() {
    if (!isGameOver) {
      var audio = new Audio('assets/explosion.mp3');
      audio.play();

      var destructionEffect = document.createElement('div');
      destructionEffect.className = 'destruction-effect';

      // Center the explosion on the map
      var mapElement = document.getElementById('map');
      destructionEffect.style.top = (mapHeight - 200) / 2 + 'px';
      destructionEffect.style.left = (mapWidth - 200) / 2 + 'px';

      mapElement.appendChild(destructionEffect);

      setTimeout(function() {
        mapElement.removeChild(destructionEffect);
      }, 2000);

      // Increment the score and update the score display
      score++;
      document.getElementById('score').innerText = 'Score: ' + score;

      // Update personal best if needed and save to local storage
      if (score > personalBest) {
        personalBest = score;
        document.getElementById('personalBest').innerText = 'Personal Best: ' + personalBest;
        localStorage.setItem('personalBest', personalBest);
      }
    }
  });

  // Timer function
  function startTimer() {
    var timerInterval = setInterval(function() {
      timeLeft--;
      document.getElementById('timeLeft').innerText = 'Time Left: ' + timeLeft;

      if (timeLeft <= 0) {
        clearInterval(timerInterval);
        isGameOver = true;
        isGameStarted = false;
        toggleGameElements();
      }
    }, 1000); // Update time every second
  }

  // Initial display of game elements
  toggleGameElements();
});
