import type { MouseEvent, TouchEvent } from 'react'

type EventHandlers<T = HTMLElement> = {
  onClick?: (event: MouseEvent<T>) => void
  onMouseDown?: (event: MouseEvent<T>) => void
  onMouseUp?: (event: MouseEvent<T>) => void
  onPointerDown?: (event: MouseEvent<T>) => void
  onPointerUp?: (event: MouseEvent<T>) => void
  onTouchStart?: (event: TouchEvent<T>) => void
  onTouchEnd?: (event: TouchEvent<T>) => void
}

const stopPropagation = <T extends HTMLElement>(event: MouseEvent<T>): void => event.stopPropagation()

const stopPropagationTouch = <T extends HTMLElement>(event: TouchEvent<T>): void => event.stopPropagation()

export const stopPropagationHandlers: EventHandlers = {
  onClick: stopPropagation,
  onMouseDown: stopPropagation,
  onMouseUp: stopPropagation,
  onPointerDown: stopPropagation,
  onPointerUp: stopPropagation,
  onTouchEnd: stopPropagationTouch,
  onTouchStart: stopPropagationTouch
}
