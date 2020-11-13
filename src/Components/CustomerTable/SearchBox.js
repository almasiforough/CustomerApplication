import React from 'react'
import { Grid, InputAdornment, TextField } from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import useStyles from './Styles/SearchBox.styles'

export default function SerachBox({ onTextSearchChange }) {
  const classes = useStyles()
  return (
    <Grid item className={classes.rootGrid}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        className={classes.searchGrid}
      >
        <TextField
          variant="outlined"
          type="text"
          label="Search"
          placeholder="Search in Customers first name or last name"
          className={classes.searchNameInput}
          onChange={(e) => {
            onTextSearchChange(e.target.value)
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            )
          }}
        />
      </Grid>
    </Grid>
  )
}
