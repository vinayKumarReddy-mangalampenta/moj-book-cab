import {BrowserRouter, Route, Switch, Redirect} from 'react-router-dom'
import Home from './components/Home'
import AirportCab from './components/AirportCab'
import ConfirmPickUp from './components/ConfirmPickUp'
import CityRideCab from './components/CityRideCab'

import './App.css'

const App = () => (
  <BrowserRouter>
    <Home />
    <Switch>
      <Route exact path="/airportcab/" component={AirportCab} />
      <Route exact path="/cityride" component={CityRideCab} />
      <Route exact path="/confirm-pickup/:id" component={ConfirmPickUp} />

      <Redirect to="/airportcab" />
    </Switch>
  </BrowserRouter>
)
export default App
