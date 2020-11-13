import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootGrid: {
    padding: 25,
    paddingLeft: 0,
    flex: 1,
    [theme.breakpoints.down('xs')]: {
      padding: 5,
      paddingLeft: 0
    }
  },
  searchNameInput: {
    flex: 1,
    fontSize: 16,
    border: 'none',
    '&:focus': {
      outline: 'none'
    }
  },
  searchGrid: {
    paddingRight: 10,
    [theme.breakpoints.down('xs')]: {
      paddingRight: 0
    }
  }
}))
