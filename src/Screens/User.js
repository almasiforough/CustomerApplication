import React from 'react'
import { Grid, Typography } from '@material-ui/core'
import { Link, useParams } from 'react-router-dom'
import useStyles from './styles/User.styles'
import UserForm from '../Components/UserForm'

export default function User() {
  const { id } = useParams()
  const classes = useStyles()
  return (
    <Grid className={classes.rootGrid}>
      <Link to="/" className={classes.backButton}>
        {'< '} Back to List
      </Link>
      <Typography variant="h2">{id ? 'Update User' : 'Create User'}</Typography>
      <UserForm />
    </Grid>
  )
}
