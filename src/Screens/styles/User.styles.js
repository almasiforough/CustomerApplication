import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootGrid: {
    minHeight: '100vh',
    padding: 48,
    background: 'linear-gradient(105deg, #ffffff 56%, #426bff 70%)',
    [theme.breakpoints.down('xs')]: {
      padding: 16,
      background: 'linear-gradient(105deg, #ffffff 56%, #839efd 70%)'
    }
  },
  backButton: {
    textDecoration: 'none'
  }
}))
