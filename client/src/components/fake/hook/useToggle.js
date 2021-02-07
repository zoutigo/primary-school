import { useState } from 'react'

export const useToggle = (initial) => {
  const [state, setState] = useState(initial)
  return [
    state,
    () => {
      setState((state) => !state)
    },
  ]
}
