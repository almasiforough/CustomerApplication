import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootGrid: {
    width: '70%',
    margin: 'auto',
    marginTop: 20,
    backgroundColor: theme.palette.background.main,
    borderRadius: 5,
    minHeight: 600,
    [theme.breakpoints.down('xs')]: {
      width: '95%'
    }
  },
  form: {
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    margin: theme.spacing(4),
    marginLeft: 0,
    width: '50%',
    [theme.breakpoints.down('xs')]: {
      width: '100%',
      margin: theme.spacing(2),
      marginLeft: 0
    }
  },
  submitButton: {
    width: '30%',
    marginTop: 20,
    marginLeft: 0,
    margin: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      width: '100%'
    }
  }
}))
