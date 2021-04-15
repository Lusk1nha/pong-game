const body = document.body
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const winContainer = document.querySelector('.whoWins')

const playerScore = document.querySelector('.user-score')
const cpuScore = document.querySelector('.cpu-score')

const game = {
  // Game infos
  width: 1000,
  height: 540,
  gravity: 0.25,
  friction: 0.98

}

canvas.width = game.width
canvas.height = game.height

const player = {
  // Player infos
  width: 7, height: 65, 
  x: 45, y: canvas.height / 2 - 32.5,
  speed: 12

}

const CPU = {
  // CPU infos
  width: 7, height: 65, 
  x: canvas.width - 45, y: canvas.height / 2 - 32.5,
  speed: 5

}

const ball = {
  // Ball infos
  width: 10,
  height: 10,
  radius: 5,
  x: canvas.width / 2,
  y: canvas.height / 2,
  velX: -5,
  velY: 2,

}

const defaultGame = () => {
  // Return all the default infos as Position, Points, and speeds.

  winContainer.hidden = true

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 7
  ctx.fillStyle = 'white'
  ctx.fillRect(45, canvas.height / 2 - 32.5, player.width, player.height)

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 7
  ctx.fillStyle = 'white'
  ctx.fillRect(canvas.width - 45, canvas.height / 2 - 32.5, CPU.width, CPU.height)

  ctx.beginPath()
  ctx.shadowColor = 'red'
  ctx.shadowBlur = 25
  ctx.fillStyle = 'white'
  ctx.arc(canvas.width / 2, canvas.height / 2, ball.radius, 0, Math.PI * 2)
  ctx.fill()


  player.x = 45
  player.y = canvas.height / 2 - 32.5

  CPU.x = canvas.width - 45
  CPU.y = canvas.height / 2 - 32.5

  ball.x = canvas.width / 2
  ball.y = canvas.height / 2
  ball.velX = -5
  ball.velY = 5

  playerScore.innerHTML = 0
  cpuScore.innerHTML = 0

  setTimeout(() => {
    window.onkeydown = movePlayer
    updateGame()
  }, 2000)

}


const renderPlayer = () => {
  // RENDER PLAYER with actual position
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 7
  ctx.fillStyle = 'white'
  ctx.fillRect(player.x, player.y, player.width, player.height)

  

}

const movePlayer = event => {
  // GIVE to the PLAYER movement with ARROW UP and ARROW DOWN
  const userKey = event.key
  if ( userKey === 'ArrowUp' || userKey === 'w' ) {
    player.y -= player.speed

  } else if ( userKey === 'ArrowDown' || userKey === 's' ) {
    player.y += player.speed

  } else if ( userKey === 'Escape') {
    window.cancelAnimationFrame(start)
    window.onkeydown = null
    
    defaultGame()
  }

  // This statement blocks the PLAYER from passing beyond the edges of the canvas 
  if ( player.y < 0 ) {
    return player.y = 0

  } else if ( player.y > canvas.height - player.height) {

    return player.y = canvas.height - player.height
  }

}

const renderCPU = () => {
  // RENDER CPU with actual position
  moveCPU()

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 7
  ctx.fillStyle = 'white'
  ctx.fillRect(CPU.x, CPU.y, CPU.width, CPU.height)

}

const moveCPU = () => {
  // MOVE the CPU following the ball position
  if ( CPU.y > ball.y ) CPU.y -= CPU.speed
  else CPU.y += CPU.speed

  // This statement blocks the CPU from passing beyond the edges of the canvas 
  if ( CPU.y < 0 ) {
    return CPU.y = 0

  } else if ( CPU.y > canvas.height - CPU.height) {

    return CPU.y = canvas.height - CPU.height
  }

}


const renderBall = () => {
  // RENDER ball in canvas
  moveBall()
  ballCollision()

  ctx.beginPath()
  ctx.shadowColor = 'red'
  ctx.shadowBlur = 25
  ctx.fillStyle = 'white'
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()

}

const moveBall = () => {
  // UPDATE ball position
  ball.x += ball.velX
  ball.y += ball.velY

}

const ballCollision = () => {
  //console.log(`player-x: ${player.x}, player-y: ${player.y}, CPU: ${CPU.x}, Ball-x: ${ball.x}, Ball-y: ${ball.y}`)

  // BOTTOM - Collisition
  if ( ball.y + ball.radius >= canvas.height ) {
    ball.velY = -ball.velY
    ball.y = canvas.height - ball.radius

  // TOP - Collisition
  } else if ( ball.y - ball.radius <= 0 ) {
    ball.velY = -ball.velY
    ball.y = ball.radius

  // LEFT - Collisition
  } else if ( ball.x + ball.radius <= 0 ) {

    ball.x = canvas.width / 2
    ball.y = player.y
    ball.velX = 0
    ball.velY = 0

    setTimeout(() => {
      ball.velX = -5
      ball.velY = 2
    }, 2000)


    cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1

  // RIGHT - Collisition
  } else if ( ball.x - ball.radius >= canvas.width ) {
    
    ball.x = canvas.width / 2
    ball.y = CPU.y
    ball.velX = 0
    ball.velY = 0

    setTimeout(() => {
      ball.velX = 5
      ball.velY = 2
    }, 2000)

    playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1

  // Player
  } else if ( ball.x - 10 === player.x && ball.y >= player.y - player.height / 2 && ball.y <= player.y + player.height ) {
    if ( ball.velX < 0 ) {
      ball.velX = 10
      ball.velY = 5

    }

    console.log(ball.velX)

  // CPU
  } else if ( ball.x === CPU.x  && ball.y >= CPU.y - CPU.height / 2 && ball.y <= CPU.y + CPU.height ) {
    ball.velX = -ball.velX

  }
}

const Win = () => {
  // Check if the Player or CPU reaches the 5 points.

  if ( playerScore.innerHTML >= 5 ) {
    winContainer.hidden = false
    winContainer.innerHTML = 'Player Wins'
    return true

  } else if ( cpuScore.innerHTML >= 5 ) {
    winContainer.hidden = false
    winContainer.innerHTML = 'CPU Wins'
    return true

  }

  return false
}

const updateGame = () => {
  // This give to the game the all infos as Player, ball, and CPU position.
  renderPlayer()
  renderCPU()
  renderBall()

  if (Win()) return
 
  start = requestAnimationFrame(updateGame)
}

// When the page completely loads to the user, the game it's begin
document.addEventListener('DOMContentLoaded', () => {
  renderPlayer()
  renderBall()
  renderCPU()

  window.onkeydown = (e) => {
    if ( e.key === 'Enter' ) {

      window.onkeydown = null
      window.onkeydown = movePlayer

      updateGame()

    }
  }
})
