import React from 'react'
import { Grid } from '@material-ui/core'
import useStyles from './styles/Home.styles'
import CustomerTable from '../Components/CustomerTable'

export default function Home() {
  const classes = useStyles()
  return (
    <Grid className={classes.rootGrid}>
      <CustomerTable />
    </Grid>
  )
}
