import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const notifyFailure = (message) =>
  toast.error(message, {
    position: 'top-left',
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
  })
