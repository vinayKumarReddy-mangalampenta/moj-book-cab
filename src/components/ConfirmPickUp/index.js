import './index.css'

const ConfirmPickUp = props => {
  const {history} = props
  const {location} = history
  const {search} = location
  const fromPlace = new URLSearchParams(search).get('from')
  const toPlace = new URLSearchParams(search).get('to')
  const mobileNum = new URLSearchParams(search).get('number')
  const city = new URLSearchParams(search).get('city')
  console.log(toPlace)
  return (
    <div className="confirm-con">
      <div className="from-and-to-con">
        <h1>{fromPlace}</h1>
        <p>to</p>
        <h1>{toPlace}</h1>
      </div>
      <img
        src="https://res.cloudinary.com/vinayreddy/image/upload/v1648312515/85d52109b9f3685038f614b85b71abe4_i6arpj.png"
        className="car-img"
        alt="car"
      />
      <p>
        <b>Congratulations Your Cab is confirmed</b>
      </p>
      <h1>Meru cabs</h1>
      <p>
        <b>From:</b>
        {fromPlace}
      </p>
      <p>
        <b>To:</b>
        {toPlace}
      </p>
      <p>
        <b>City:</b>
        {city}
      </p>
      <p>
        <b>Mobile Number:</b>
        {mobileNum}
      </p>
      <p>
        Amount per Km is <b>Rs 10</b>
      </p>
      <h1>Pay amount after you Ride</h1>
      <b>Thank You.....!!</b>
    </div>
  )
}

export default ConfirmPickUp
