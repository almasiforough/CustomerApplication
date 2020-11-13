import * as Yup from 'yup'

export const validationSchema = Yup.object({
  firstName: Yup.string('Enter first name')
    .min(3, 'First name must at least be 3 characters')
    .required('First Name is required'),
  lastName: Yup.string('Enter last name')
    .min(3, 'Last name must at least be 3 characters')
    .required('Last Name is required'),
  dateOfBirth: Yup.string('Enter dateOfBirth').required(
    'Date of birth is required'
  )
})
