document.getElementById('destroyButton').addEventListener('click', function() {
  var audio = new Audio('explosion.mp3'); // Replace 'explosion.mp3' with your sound effect file
  audio.play();

  var destructionEffect = document.createElement('div');
  destructionEffect.className = 'destruction-effect';
  document.getElementById('map').appendChild(destructionEffect);

  setTimeout(function() {
    document.getElementById('map').removeChild(destructionEffect);
  }, 2000); // Adjust the duration of the visual effect (in milliseconds) as needed
});
