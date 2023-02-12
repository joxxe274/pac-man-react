import React from 'react';

import styles from '~/styles/map.module.scss'
import { PacMan } from '../pac-man/PacMan.component';
import { useKeyDown } from '../../hooks/UseKeyDown.hook';

const MAP = [
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 1],
  [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1],
]

interface Props {
  map?: number[][]
}

export const TestMap: React.FC<Props> = ({
  map = MAP
}) => {

  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const [position, setPosition] = React.useState({x: 1, y: 1})
  const [direction, setDirection] = React.useState('right')
  const [nextDirection, setNextDirection] = React.useState<'up' | 'down' | 'left' | 'right' | null>(null)
  const [isMoving, setIsMoving] = React.useState(false)
  const [timeOutMove, setTimeOutMove] = React.useState<NodeJS.Timeout | null>(null)
  const [canMoveRight, setCanMoveRight] = React.useState(true)
  const [canMoveLeft, setCanMoveLeft] = React.useState(true)
  const [canMoveUp, setCanMoveUp] = React.useState(true)
  const [canMoveDown, setCanMoveDown] = React.useState(true)
  const [speed, setSpeed] = React.useState(150)


  useKeyDown({
    callback: (e) => {
      const { moveRight, moveLeft, moveUp, moveDown } = setCanMove(position.x, position.y)
      if (e === 'Enter') {
        setIsMoving(!isMoving)
      }
      if (e === 'ArrowUp') {
        if (moveUp) {
          setDirection('up')
          return;
        }
        setNextDirection('up')
      }
      if (e === 'ArrowDown') {
        if (moveDown) {
          setDirection('down')
          return;
        }
        setNextDirection('down')
      }
      if (e === 'ArrowLeft') {
        if (moveLeft) {
          setDirection('left')
          return;
        }
        setNextDirection('left')
      }
      if (e === 'ArrowRight') {
        if (moveRight) {
          setDirection('right')
          return;
        }
        setNextDirection('right')
      }
    },
    keys: ['Enter', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight']
  })

  React.useEffect(() => {
    map.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 2) {
          setPosition({x , y})
        }
      })
    })
  }, [])

  React.useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas?.getContext('2d')

    if (!context) return

    context.fillStyle = '#000000'
    context.fillRect(0, 0, context.canvas.width, context.canvas.height)
    context.fillStyle = 'red'
    context.beginPath()
    map.forEach((row, y) => {
      row.forEach((col, x) => {
        if (col === 1) {
          context.fillStyle = 'red'
          context.fillRect(x * 15, y * 15, 15, 15)
        }
        if (col === 0) {
          context.fillStyle = 'blue'
          if (
            map[y+1][x] !== 1
            && map[y][x+1] !== 1
            ) {
            context.fillRect((x * 15 + 14), (y * 15) + 14, 4, 4)
          }

        }
      })
    })
    context.fill()
  }, [])


  React.useEffect(() => {
    if (!isMoving && timeOutMove) {
      clearTimeout(timeOutMove)
      setTimeOutMove(null)
    }

    if (isMoving && !timeOutMove) {
      const timeOut = setTimeout(() => {
        const { x, y } = position
        const nextPosition = { x, y }
        const setNextPosition = (x: number, y: number) => {nextPosition.x = x, nextPosition.y = y};
        const {moveRight, moveLeft, moveUp, moveDown} = setCanMove(position.x, position.y)
        switch (direction) {
          case 'right':
            moveRight && setNextPosition(x + 1, y)
            break;
          case 'left':
            moveLeft && setNextPosition(x - 1, y)
            break;
          case 'up':
            moveUp && setNextPosition(x, y - 1)
            break;
          case 'down':
            moveDown && setNextPosition(x, y + 1)
            break;
        }
        setPosition(nextPosition);
        setCanMove(nextPosition.x, nextPosition.y);
        setTimeOutMove(null)
      }, speed)
      setTimeOutMove(timeOut)
    }
  }, [isMoving, timeOutMove, canMoveDown, canMoveLeft, canMoveRight, canMoveUp, direction])


  const setCanMove = (x: number, y: number, skipSetMovements = false) => {
    const moveRight = (map[y] && map[y][x + 2] !== undefined && (map[y][x + 2] === 0 || map[y][x + 2] === 2)) && (map[y + 1] && map[y + 1][x + 2] !== undefined && (map[y + 1][x + 2] === 0 || map[y + 1][x + 2] === 2))
    const moveLeft = (map[y] && map[y][x - 1] !== undefined  && (map[y][x - 1] === 0 || map[y][x - 1] === 2)) && (map[y + 1] && map[y + 1][x - 1] !== undefined  && (map[y + 1][x - 1] === 0 || map[y + 1][x - 1] === 2))
    const moveUp = (map[y - 1] && map[y - 1][x] !== undefined && (map[y - 1][x] === 0 || map[y - 1][x] === 2)) && (map[y - 1] && map[y - 1][x + 1] !== undefined && (map[y - 1][x + 1] === 0 || map[y - 1][x + 1] === 2))
    const moveDown = (map[y + 2] && map[y + 2][x] !== undefined   && (map[y + 2][x] === 0 || map[y + 2][x] === 2)) && (map[y + 2] && map[y + 2][x + 1] !== undefined   && (map[y + 2][x + 1] === 0 || map[y + 2][x + 1] === 2))
    if (!skipSetMovements) {
      setCanMoveRight(moveRight)
      setCanMoveLeft(moveLeft)
      setCanMoveUp(moveUp)
      setCanMoveDown(moveDown)
    }
    return { moveRight, moveLeft, moveUp, moveDown }
  }

  React.useEffect(() => {
    if (nextDirection) {
    const { x, y } = position;
    const nextPositionX = direction === 'right' ? x + 1 : direction === 'left' ? x - 1 : x;
    const nextPositionY = direction === 'down' ? y + 1 : direction === 'up' ? y - 1 : y;
    const { moveRight, moveLeft, moveUp, moveDown } = setCanMove(nextPositionX, nextPositionY, true);
      if (nextDirection === 'right' && moveRight) {
        setDirection('right')
        setNextDirection(null)
      }
      if (nextDirection === 'left' && moveLeft) {
        setDirection('left')
        setNextDirection(null)
      }
      if (nextDirection === 'up' && moveUp) {
        setDirection('up')
        setNextDirection(null)
      }
      if (nextDirection === 'down' && moveDown) {
        setDirection('down')
        setNextDirection(null)
      }
    }
  }, [nextDirection, position]);



  return (
    <>
      <div id={styles['test-map']} style={{
        width: map[0].length * 15,
        height: map.length * 15,
      }}>
        <canvas ref={canvasRef} width={map[0].length * 15} height={map.length * 15} />
        <PacMan x={position.x * 15} y={position.y * 15} speed={speed} />
      </div>
    </>
  )
}