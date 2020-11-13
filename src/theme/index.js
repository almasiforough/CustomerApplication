import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles'
import palette from './palette'

const theme = createMuiTheme({
  palette,
  typography: {
    fontFamily: 'Nunito',
    button: {
      lineHeight: 2.75
    }
  }
})
export default responsiveFontSizes(theme)
