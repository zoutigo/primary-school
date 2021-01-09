import axios from 'axios'

const url = 'https://ecole-saint-augustin.herokuapp.com'

export const apiCheckEmail = async (value) => {
  const data = { email: value }
  try {
    let response = await axios.post(
      'https://ecole-saint-augustin.herokuapp.com/users/checkemail',
      data
    )
    console.log(response.status)
    if (response.status === 200) {
      return false
    }
    return true
  } catch (error) {
    return false
  }
}
