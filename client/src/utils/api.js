import axios from 'axios'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  let url = 'https://ecole-saint-augustin.herokuapp.com/users/checkemail'
  try {
    let response = await axios.post(url, data)
    if (response.status === 200) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}

export const apiRegister = async (datas) => {
  let url = 'https://ecole-saint-augustin.herokuapp.com/users'

  try {
    let req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}
export const apiLogin = async (datas) => {
  let url = 'https://ecole-saint-augustin.herokuapp.com/users/login'

  try {
    let req = await axios.post(url, datas)
    return req
  } catch (err) {
    return err
  }
}

export const apiFecthUserDatas = async (id) => {
  let url = `http://localhost:3500/users/${id}`

  let result = await fetch(
    'http://localhost:3500/users/5ff991c7eba87d14d21fa08f'
  ).then((res) => {
    return res
  })

  return result.json()

  // axios.get(url).then((res) => res)
}

export const apiFecthTeam = async () => {
  let URL = `${process.env.REACT_APP_ENDPOINT}/users/team`
  let result = await axios.get(URL)
  return result
}
