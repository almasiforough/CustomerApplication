import { makeStyles } from '@material-ui/core'

export default makeStyles((theme) => ({
  rootGrid: {},
  buttonStyle: {},
  tableHeaderCell: {
    fontWeight: 700
  },
  tableContainer: {
    overflowX: 'auto',
    [theme.breakpoints.down('xs')]: {
      marginTop: 16
    }
  },
  addButtonMobileSize: {
    background: theme.palette.primary.light,
    color: 'white'
  },
  circularProgressContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 80
  }
}))
