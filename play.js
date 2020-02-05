var player = require('play-sound')(opts = {})

var audio = player.play('1.mp3', function(err){
    if (err && !err.killed) throw err
  })


  
  let timerId = setInterval(() => audio.kill(), 20000);

  