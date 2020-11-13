import React, { useEffect, useState } from 'react'
import { Formik, Form, Field } from 'formik'
import { Button, CircularProgress, Hidden } from '@material-ui/core'
import { TextField } from 'formik-material-ui'
import { useHistory, useParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import DateFnsUtils from '@date-io/date-fns'
import { KeyboardDatePicker } from 'formik-material-ui-pickers'
import { MuiPickersUtilsProvider } from '@material-ui/pickers'
import Moment from 'moment'
import { validationSchema } from './validation'
import { request } from '../../helpers/request'
import BASEURL from '../../Constants/Apis'
import useStyles from './styles/index.styles'

export default function App() {
  const classes = useStyles()
  const { id } = useParams()
  const history = useHistory()
  const [initData, setInitData] = useState({
    firstName: '',
    lastName: '',
    dateOfBirth: null
  })

  useEffect(() => {
    if (id) {
      request(`${BASEURL}/${id}`)
        .then(([status, responseJSON]) => {
          if (status === 200) {
            setInitData(responseJSON)
          } else {
            toast.error('Error getting user data!! Please try again')
          }
        })
        .catch(() => {
          toast.error('Server error getting user data!!')
        })
    }
  }, [id])

  const handleSubmit = (values) => {
    // eslint-disable-next-line no-param-reassign
    values.dateOfBirth = values.dateOfBirth
      ? Moment(values.dateOfBirth).format('YYYY-MM-DD')
      : values.dateOfBirth
    if (id) {
      return request(`${BASEURL}/${id}`, 'PUT', values)
        .then(([status, responseJSON]) => {
          if (status === 200) {
            toast.success(
              `Customer ${responseJSON.firstName} Updated Successfuly`
            )
            history.push('/')
          } else {
            toast.error('Can not update user. Please check user inputs')
          }
        })
        .catch(() => {
          toast.error('Server Error!!')
        })
    }
    return request(BASEURL, 'POST', values)
      .then(([status, responseJSON]) => {
        if (status === 201) {
          toast.success(
            `Customer ${responseJSON.firstName} Created Successfuly`
          )
          history.push('/')
        } else {
          toast.error('Can not create user. Please check user inputs')
        }
      })
      .catch(() => {
        toast.error('Server Error!!')
      })
  }

  return (
    <MuiPickersUtilsProvider utils={DateFnsUtils}>
      <Formik
        enableReinitialize
        initialValues={{ ...initData }}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          handleSubmit(values).then(() => setSubmitting(false))
        }}
      >
        {({ submitForm, isSubmitting }) => (
          <Form className={classes.form}>
            <Field
              component={TextField}
              type="text"
              name="firstName"
              label="First name"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
            <Field
              component={TextField}
              type="text"
              name="lastName"
              label="Last name"
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
              variant="outlined"
            />
            <Hidden smUp>
              <Field
                component={KeyboardDatePicker}
                name="dateOfBirth"
                label="Date of birth"
                className={classes.textField}
                format="yyyy-MM-dd"
                InputLabelProps={{
                  shrink: true
                }}
                inputVariant="outlined"
              />
            </Hidden>
            <Hidden xsDown>
              <Field
                component={KeyboardDatePicker}
                name="dateOfBirth"
                label="Date of birth"
                className={classes.textField}
                format="yyyy-MM-dd"
                InputLabelProps={{
                  shrink: true
                }}
                variant="inline"
                inputVariant="outlined"
                disableToolbar
              />
            </Hidden>
            <Button
              variant="contained"
              color="primary"
              disabled={isSubmitting}
              onClick={submitForm}
              className={classes.submitButton}
            >
              Submit
              {isSubmitting && <CircularProgress />}
            </Button>
          </Form>
        )}
      </Formik>
    </MuiPickersUtilsProvider>
  )
}
