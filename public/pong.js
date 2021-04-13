const body = document.body
const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

const game = { 
  width: 700,
  height: 540,
  gravity: 0.25,
  friction: 0.98

}

canvas.width = game.width
canvas.height = game.height

const player = { 
  width: 7, height: 60, 
  x: 40, y: 270,
  speed: 15
}

const ball = {
  width: 10,
  height: 10,
  radius: 5,
  x: canvas.width / 2,
  y: canvas.height / 2,
  velX: -5,
  velY: 5
  
}

const renderPlayer = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  ctx.shadowColor = 'white'
  ctx.shadowBlur = 7
  ctx.fillStyle = 'white'
  ctx.fillRect(player.x, player.y, player.width, player.height)

}

const movePlayer = event => {
  const userKey = event.key
  if ( userKey === 'ArrowUp' ) {
    player.y -= player.speed 

  } else if ( userKey === 'ArrowDown') {
    player.y += player.speed

  }

  if ( player.y < 0 ) {
    return player.y = 0

  } else if ( player.y > canvas.height - player.height) {

    return player.y = canvas.height - player.height
  }

}

const renderBall = () => {
  moveBall()
  ballCollision()

  ctx.beginPath()
  ctx.shadowColor = 'FFF'
  ctx.shadowBlur = 15
  ctx.fillStyle = 'FFF'
  ctx.arc(ball.x, ball.y, ball.radius, 0, Math.PI * 2)
  ctx.fill()
  
}

const moveBall = () => {
  // update ball position
  ball.x += ball.velX
  ball.y += ball.velY

}

const ballCollision = () => {
  const playerScore = document.querySelector('.user-score')
  const cpuScore = document.querySelector('.cpu-score')

  //bottom
  if ( ball.y + ball.radius >= canvas.height ) {
    ball.velY = -ball.velY
    ball.y = canvas.height - ball.radius

  //top
  } else if ( ball.y - ball.radius <= 0 ) {
    ball.velY = -ball.velY
    ball.y = ball.radius

  //left
  } else if ( ball.x + ball.radius <= 0 ) {
    ball.velX = -ball.velX
    ball.x = ball.radius

    cpuScore.innerHTML = parseInt(cpuScore.innerHTML) + 1  

  // right
  } else if ( ball.x - ball.radius >= canvas.width ) {
    ball.velX = -ball.velX
    ball.x = canvas.width - ball.radius

    playerScore.innerHTML = parseInt(playerScore.innerHTML) + 1  

  }

}

const gameInit = () => {
  renderPlayer()
  renderBall()

  requestAnimationFrame(gameInit)
}

window.onkeydown = movePlayer
document.addEventListener('DOMContentLoaded', gameInit)
