import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootGrid: {
    minHeight: '100vh',
    padding: '5% 15%',
    [theme.breakpoints.down('xs')]: {
      padding: '5% 10%'
    }
  }
}))
