import {Component} from 'react'
import {withRouter} from 'react-router-dom'
import {ImArrowLeft2} from 'react-icons/im'

import RideButton from '../RideButton'
import './index.css'

const rideButtons = [
  {
    displayText: 'AIRPORT CAB',
    id: 'airportcab',
  },
  {
    displayText: 'CITY RIDE',
    id: 'cityride',
  },
]

class Home extends Component {
  state = {activeRideId: rideButtons[0].id}

  componentDidMount() {
    const {history} = this.props
    const {location} = history
    const {pathname} = location
    const activeID = pathname.replace('/', '')
    this.setState({activeRideId: activeID})
  }

  setAsActiveRide = id => {
    const {history} = this.props
    this.setState({
      activeRideId: id,
    })
    console.log(history)
    history.push(`/${id}`)
  }

  render() {
    const {activeRideId} = this.state

    return (
      <div className="home-container">
        <div className="nav-bar-con">
          <div className="brand-con">
            <div className="arrow">
              <ImArrowLeft2 className="arrow" />
            </div>
            <img
              alt="Spice screen "
              className="brand-image"
              src="https://res.cloudinary.com/vinayreddy/image/upload/v1648227880/1cc37d68205754733bafa9afa54cc83a1f7e1079_jsptm4.png"
            />
          </div>
          <div className="ride-selector-con">
            {rideButtons.map(each => (
              <RideButton
                isActive={each.id === activeRideId}
                key={each.id}
                each={each}
                setActive={this.setAsActiveRide}
              />
            ))}
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Home)
