import axios from 'axios'

const url = 'https://ecole-saint-augustin.herokuapp.com'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  try {
    let response = await axios.post(`${url}//users/checkemail`, data)
    if (response) {
      console.log('camarche aussi')
      return 'false'
    }
  } catch (error) {
    if (error.response.status === 404) {
      console.log('ca marche')
      return 'true'
    }
  }
}
