import React from 'react'
import { create, act } from 'react-test-renderer'
import { ThemeProvider } from '@material-ui/core'
import { BrowserRouter } from 'react-router-dom'
import Home from '../Home'
import theme from '../../theme'
import { customersListMock } from '../../mockData/customersList'

describe('Homepage contains list of all customers', () => {
  test('take a snapshot from Home Component', async () => {
    const mockJsonPromise = Promise.resolve(customersListMock)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    let homeComponent
    await act(async () => {
      homeComponent = create(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </BrowserRouter>
      )
    })

    expect(homeComponent.toJSON()).toMatchSnapshot()
  })

  test('every customers must be shown at first', async () => {
    const mockJsonPromise = Promise.resolve(customersListMock)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    let homeComponent
    await act(async () => {
      homeComponent = create(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </BrowserRouter>
      )
    })

    const tableRows = homeComponent.root.findAllByType('tr')

    // There are three customers in mockData, plus on `tr` in table Header would be 4 `tr`s
    expect(tableRows.length).toBe(4)
  })

  test('check to see if searching by a typo still works.', async () => {
    const mockJsonPromise = Promise.resolve(customersListMock)
    const mockFetchPromise = Promise.resolve({
      json: () => mockJsonPromise,
      status: 200
    })
    jest.spyOn(global, 'fetch').mockImplementation(() => mockFetchPromise)
    let homeComponent
    await act(async () => {
      homeComponent = create(
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Home />
          </ThemeProvider>
        </BrowserRouter>
      )
    })

    const searchInput = homeComponent.root.findByType('input')
    act(() => {
      // there's a customer named `forough`
      searchInput.props.onChange({ target: { value: 'frough' } })
    })

    const tableRows = homeComponent.root.findAllByType('tr')

    expect(tableRows.length).toBe(2)
  })
})
