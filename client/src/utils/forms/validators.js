import * as yup from 'yup'

export const pageUpdateSchema = yup.object().shape({
  // text: yup.string().required('Il faut au moins une phrase'),
  // alias: yup.mixed().oneOf(list),
  alias: yup.string(),
})
