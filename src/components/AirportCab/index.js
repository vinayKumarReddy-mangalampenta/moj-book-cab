import {Component} from 'react'

import {BiPencil, BiCurrentLocation} from 'react-icons/bi'
import {MdArrowDropDown} from 'react-icons/md'
import PickUpButtons from '../PickUpButtons'
import RideButton from '../RideButton'
import ApplyCoupun from '../ApplyCoupun'

import './index.css'

const pickUpPoints = [
  {
    displayText: 'FROM AIRPORT',
    id: 'fromairport',
  },
  {
    displayText: 'TO AIRPORT',
    id: 'toairport',
  },
]
const rideType = [
  {
    displayText: 'Ride',
    id: 'ride',
  },
  {
    displayText: 'Rental',
    id: 'rent',
  },
  {
    displayText: 'Outstation',
    id: 'outstation',
  },
]
class AirportCab extends Component {
  state = {
    pickupPoint: pickUpPoints[0].id,
    activeRideType: rideType[0].id,
    mobileNum: '',
    cityList: [],
    selectCityValue: '',
    activeTerminal: '',
    terminals: [],
    dropLocation: '',
  }

  componentDidMount() {
    this.getCityList()
  }

  getTerminalData = async () => {
    const {selectCityValue} = this.state
    const url = 'https://preprod.mojoboxx.com/preprod/webapi/meruPickupPoint'
    const options = {
      method: 'GET',
      'content-type': 'application/json',
    }

    const response = await fetch(url, options)
    const fetchedData = await response.json()
    if (fetchedData[selectCityValue] !== undefined) {
      this.setState({terminals: fetchedData[selectCityValue]})
    } else {
      this.setState({terminals: []})
    }
  }

  getCityList = async () => {
    const url = 'https://preprod.mojoboxx.com/preprod/webapi/getCityList'
    const options = {
      method: 'GET',
      'content-type': 'application/json',
    }

    const res = await fetch(url, options)
    const data = await res.json()

    this.setState({cityList: data})
  }

  setAsActivePickUpPoint = id => {
    this.setState({pickupPoint: id})
  }

  setAsActiveRideType = id => {
    this.setState({activeRideType: id})
  }

  onChangeUsername = event => {
    this.setState({mobileNum: event.target.value})
  }

  displayMobileNumInputCon = () => {
    const {mobileNum} = this.state
    return (
      <div className="mobile-num-con">
        <input
          type="number"
          value={mobileNum}
          onChange={this.onChangeUsername}
          placeholder="Enter ur Number"
          className="mobile-input"
        />
        <BiPencil className="icon" />
      </div>
    )
  }

  onChangeDropLocation = e => {
    this.setState({dropLocation: e.target.value})
  }

  onChangeActiveCity = async event => {
    await this.setState({selectCityValue: event.target.value})

    this.getTerminalData()
  }

  onChangeTerminal = event => {
    this.setState({activeTerminal: event.target.value})
  }

  displayFromAirportForm = () => {
    const {cityList, terminals, activeTerminal, dropLocation} = this.state
    return (
      <div className="from-port-con">
        {this.displayMobileNumInputCon()}
        <div className="depart-points">
          <div className="select-con">
            <select
              onChange={this.onChangeActiveCity}
              className="dropdown-city"
            >
              <option selected disabled>
                Select City
              </option>
              {cityList.map(each => (
                <option key={each.id} value={each.code}>
                  {each.name}
                </option>
              ))}
            </select>
            <MdArrowDropDown />
          </div>
          <div className="select-con">
            <select
              onChange={this.onChangeTerminal}
              value={activeTerminal}
              className="dropdown-terminal"
            >
              <option selected disabled>
                Select Terminal
              </option>
              {terminals.map(each => (
                <option key={each.id} value={each.source_name}>
                  {each.source_name}
                </option>
              ))}
            </select>
            <MdArrowDropDown />
          </div>
        </div>
        <div className="location-con">
          <input
            type="text"
            value={dropLocation}
            onChange={this.onChangeDropLocation}
            placeholder="Drop location"
            className="mobile-input"
          />
          <BiCurrentLocation className="icon" />
        </div>
        <img
          src="https://res.cloudinary.com/vinayreddy/image/upload/v1648301329/image_17_j4k0vb.png"
          className="image"
          alt="book cab"
        />
        <ApplyCoupun />
        <button className="confirm-pickup-btn" type="button">
          Confirm pickup{' '}
        </button>
      </div>
    )
  }

  displayToFromAirportForm = () => (
    <div>
      <h1>I am to airport form</h1>
    </div>
  )

  render() {
    const {pickupPoint, activeRideType} = this.state
    return (
      <div className="airport-cab-con">
        <ul className="buttons-con">
          {pickUpPoints.map(each => (
            <PickUpButtons
              isActive={each.id === pickupPoint}
              key={each.id}
              each={each}
              setAsActivePickUpPoint={this.setAsActivePickUpPoint}
            />
          ))}
        </ul>
        <div className="ride-type">
          {rideType.map(each => (
            <RideButton
              each={each}
              key={each.id}
              isActive={each.id === activeRideType}
              setActive={this.setAsActiveRideType}
            />
          ))}
        </div>
        {pickupPoint === pickUpPoints[0].id
          ? this.displayFromAirportForm()
          : this.displayToFromAirportForm()}
      </div>
    )
  }
}

export default AirportCab
