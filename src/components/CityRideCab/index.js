import {Component} from 'react'

import {BiPencil, BiCurrentLocation, BiSearchAlt2} from 'react-icons/bi'
import {MdArrowDropDown} from 'react-icons/md'

import RideButton from '../RideButton'
import ApplyCoupun from '../ApplyCoupun'

import './index.css'

const places = [
  {
    placename: 'Bengaluru(BLR)',
    id: 'BLR',
  },
  {
    placename: 'Chennai(MAA)',
    id: 'MAA',
  },
  {
    placename: 'Delhi(DEL)',
    id: 'DEL',
  },
  {
    placename: 'Hyderabad(HYD)',
    id: 'HYD',
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
class CityRideCab extends Component {
  state = {
    activeRideType: rideType[0].id,
    mobileNum: '',
    pickLocation: '',
    dropLocation: '',
    selectCityValue: places[0].id,
    showError: false,
  }

  onChangeUsername = event => {
    this.setState({mobileNum: event.target.value})
  }

  displayMobileNumInputCon = () => {
    const {mobileNum} = this.state
    return (
      <div className="mobile-num-con">
        <input
          type="text"
          value={mobileNum}
          onChange={this.onChangeUsername}
          placeholder="Enter ur Number"
          className="mobile-input"
        />
        <BiPencil className="icon" />
      </div>
    )
  }

  onSubmitForm = () => {
    const {
      pickLocation,
      dropLocation,
      mobileNum,
      selectCityValue,
      activeRideType,
    } = this.state
    if (pickLocation !== '' && dropLocation !== '' && mobileNum !== '') {
      const path = `/confirm-pickup/${activeRideType}/?number=${mobileNum}&city=${selectCityValue}&from=${pickLocation}&to=${dropLocation}`
      const {history} = this.props
      this.setState({showError: false})
      history.push(path)
    } else {
      this.setState({showError: true})
    }
  }

  onChangeDropLocation = e => {
    this.setState({dropLocation: e.target.value})
  }

  onChangeActiveCity = event => {
    this.setState({selectCityValue: event.target.value})
  }

  setAsActiveRideType = id => {
    this.setState({activeRideType: id})
  }

  onChangePickLocation = e => {
    this.setState({pickLocation: e.target.value})
  }

  displayCityRideForm = () => {
    const {dropLocation, pickLocation, selectCityValue} = this.state
    return (
      <div className="from-port-con">
        {this.displayMobileNumInputCon()}

        <div className="pick-city-con">
          <select
            onChange={this.onChangeActiveCity}
            value={selectCityValue}
            className="dropdown-terminal"
          >
            <option selected disabled>
              Select City
            </option>
            {places.map(each => (
              <option key={each.id} value={each.id}>
                {each.placename}
              </option>
            ))}
          </select>
          <MdArrowDropDown />
        </div>

        <div className="location-con">
          <input
            type="text"
            value={pickLocation}
            onChange={this.onChangePickLocation}
            placeholder="Pick location"
            className="mobile-input"
          />
          <BiCurrentLocation className="icon" />
        </div>
        <div className="location-con">
          <input
            type="text"
            value={dropLocation}
            onChange={this.onChangeDropLocation}
            placeholder="Drop location"
            className="mobile-input"
          />
          <BiSearchAlt2 className="icon" />
        </div>
        <img
          src="https://res.cloudinary.com/vinayreddy/image/upload/v1648301329/image_17_j4k0vb.png"
          className="image"
          alt="book cab"
        />
        <ApplyCoupun />
        <button
          onClick={this.onSubmitForm}
          className="confirm-pickup-btn"
          type="button"
        >
          Confirm pickup{' '}
        </button>
      </div>
    )
  }

  render() {
    const {activeRideType, showError} = this.state
    return (
      <div className="airport-cab-con">
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
        {this.displayCityRideForm()}
        {showError && (
          <p className="error-msg">Please fill all required contents</p>
        )}
      </div>
    )
  }
}

export default CityRideCab
