import * as yup from 'yup'
import { apiCheckEmail } from '../api'

const passRegExp = new RegExp('^(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9]).{8,}$')
export const pageUpdateSchema = yup.object().shape({
  // text: yup.string().required('Il faut au moins une phrase'),
  // alias: yup.mixed().oneOf(list),
  alias: yup.string(),
})

export const pageCreationSchema = yup.object().shape({
  // text: yup.string().required('Il faut au moins une phrase'),
  title: yup
    .string()
    .required('le titre de page est obligatoire')
    .min(3, '3 caractètres minimum')
    .max(30, '30 caractètres maximum'),
  alias: yup
    .string()
    .required("l'alias obligatoire")
    .min(3, '3 caractètres minimum')
    .max(30, '30 caractères maximum'),
  editorText: yup.string().required('la page doit avoir un contenu'),
})

export const loginSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`),

  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passRegExp, 'Mot de pass non valide'),
})

export const registerSchema = yup.object().shape({
  email: yup
    .string()
    .required('le mail est obligatoire')
    .email(`ce format mail n'est pas valide`)
    .test(
      'emailExists',
      'ce mail appartient a un utilisateur',
      async (value) => (await apiCheckEmail(value)) === true
    ),
  password: yup
    .string()
    .required('le mot de pass est obligatoire')
    .matches(passRegExp, 'Mot de pass non valide'),

  passwordConfirm: yup
    .string()
    .oneOf([yup.ref('password'), null], 'Mauvaise correspondance')
    .required('Veillez confirmer le mot de pass'),
})
