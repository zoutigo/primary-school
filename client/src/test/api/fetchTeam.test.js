import axios from 'axios'
import { apiFecthTeam } from '../../utils/api'

jest.mock('axios')

describe('apiFetchTeam', () => {
  const URL = `${process.env.REACT_APP_ENDPOINT}/users/team`

  it('fetches successfully Team datas from an API', async () => {
    const data = { name: 'Hello' }

    axios.get.mockImplementationOnce(() => Promise.resolve(data))

    await expect(apiFecthTeam('react')).resolves.toEqual(data)

    expect(axios.get).toHaveBeenCalledWith(URL)
  })

  it('fetches erroneously data Team from an API', async () => {
    const errorMessage = 'Network Error'

    axios.get.mockImplementationOnce(() =>
      Promise.reject(new Error(errorMessage))
    )

    await expect(apiFecthTeam('react')).rejects.toThrow(errorMessage)
  })
})
