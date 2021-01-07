import axios from 'axios'

const url = 'https://ecole-saint-augustin.herokuapp.com/'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  const resp = await axios.post(`${url}/users/checkemail`, data)
  console.log(resp)
}
