import React, { useEffect, useState } from 'react'
import {
  Grid,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  IconButton,
  Paper,
  Hidden,
  CircularProgress
} from '@material-ui/core'
import AddIcon from '@material-ui/icons/Add'
import EditIcon from '@material-ui/icons/Edit'
import DeleteIcon from '@material-ui/icons/Delete'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import { toast } from 'react-toastify'
import useStyles from './Styles/index.styles'
import { request } from '../../helpers/request'
import SearchBox from './SearchBox'
import BASEURL from '../../Constants/Apis'
import AlertDialog from '../AlertDialog'

const options = {
  isCaseSensitive: false,
  shouldSort: true,
  threshold: 0.6,
  minMatchCharLength: 1,
  keys: ['firstName', 'lastName']
}

export default function CustomerInfo() {
  const classes = useStyles()
  const [customersList, setCustomersList] = useState([])
  const [waitingForCustomersList, setWaitingForCustomersList] = useState(false)
  const [filteredcustomersList, setFilteredcustomersList] = useState([])
  const [searchedText, setSearchedText] = useState('')
  const [dialogIsOpen, setDialogIsOpen] = useState(false)
  const [selectedItemforDeletion, setSelectedItemforDeletion] = useState(null)
  const [LoadingForDeletion, setLoadingForDeletion] = useState(false)

  useEffect(() => {
    if (searchedText && searchedText.length >= 2) {
      const fuse = new Fuse(customersList, options)
      const newFilteredList = fuse.search(searchedText).map(({ item }) => item)
      setFilteredcustomersList(newFilteredList)
    } else {
      setFilteredcustomersList([
        ...customersList.sort((b, a) => (a.firstName < b.firstName ? 1 : -1))
      ])
    }
  }, [searchedText, customersList])

  const getListOfCustomers = () => {
    return request(BASEURL).then(([status, JSONResponse]) => {
      if (status === 200) {
        setCustomersList(JSONResponse)
      }
    })
  }

  useEffect(() => {
    setWaitingForCustomersList(true)
    getListOfCustomers().then(() => setWaitingForCustomersList(false))
  }, [])

  const onDelete = (id) => {
    setSelectedItemforDeletion(id)
    setDialogIsOpen(true)
  }

  const handleDeleteCustomer = () => {
    setLoadingForDeletion(true)
    request(`${BASEURL}/${selectedItemforDeletion}`, 'DELETE')
      .then(([status, responseJSON]) => {
        if (status === 200) {
          toast.success(
            `Customer ${responseJSON.firstName} deleted successfuly`
          )
        } else {
          toast.success(`Can not delete user!! Please try again.`)
        }
        getListOfCustomers().then(() => {
          setDialogIsOpen(false)
          setLoadingForDeletion(false)
        })
      })
      .catch(() => {
        toast.success(`Server Error!`)
        setDialogIsOpen(false)
        setLoadingForDeletion(false)
      })
  }

  return (
    <Grid className={classes.rootGrid}>
      <AlertDialog
        isOpen={dialogIsOpen}
        onClose={() => setDialogIsOpen(false)}
        title="Delete Customer"
        dialogText="Are you sure you want to delete this customer from the list?"
        onAcceptClicked={handleDeleteCustomer}
        loading={LoadingForDeletion}
      />
      <Grid container alignItems="center">
        <SearchBox onTextSearchChange={(text) => setSearchedText(text)} />
        <Hidden xsDown>
          <Button
            variant="contained"
            color="secondary"
            className={classes.button}
            endIcon={<AddIcon />}
            component={Link}
            to="/user"
          >
            Add New Coustomer
          </Button>
        </Hidden>
        <Hidden smUp>
          <IconButton
            variant="contained"
            component={Link}
            to="/user"
            className={classes.addButtonMobileSize}
          >
            <AddIcon />
          </IconButton>
        </Hidden>
      </Grid>
      <Paper className={classes.tableContainer}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableHeaderCell}>
                First Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Last Name
              </TableCell>
              <TableCell className={classes.tableHeaderCell}>
                Date Of Birth
              </TableCell>
              <TableCell />
              <TableCell />
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredcustomersList.map((row) => (
              <TableRow key={row.id}>
                <TableCell component="th" scope="row">
                  {row.firstName}
                </TableCell>
                <TableCell>{row.lastName}</TableCell>
                <TableCell>{row.dateOfBirth}</TableCell>
                <TableCell>
                  <Link to={`/user/${row.id}`} user={row}>
                    <EditIcon />
                  </Link>
                </TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => onDelete(row.id)}>
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {waitingForCustomersList && (
          <Grid className={classes.circularProgressContainer}>
            <CircularProgress />
          </Grid>
        )}
      </Paper>
    </Grid>
  )
}
