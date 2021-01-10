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
  let url = 'https://ecole-saint-augustin.herokuapp.com/users'
  axios.get(url, datas).then((res) => res)
}
