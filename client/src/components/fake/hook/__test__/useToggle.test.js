import { renderHook, act } from '@testing-library/react-hooks'
import { useToggle } from '../useToggle'

it('test useToggle', () => {
  let { result } = renderHook(() => useToggle(false))
  expect(result.current[0]).toBeFalsy()
  act(() => result.current[1]())
  expect(result.current[0]).toBeTruthy()
})
