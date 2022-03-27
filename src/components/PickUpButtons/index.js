import './index.css'

const PickUpButtons = props => {
  const {each, isActive, setAsActivePickUpPoint} = props

  const btnClass = isActive ? 'pick-up-btn active-btn' : 'pick-up-btn'
  const activePickUpPoint = () => {
    setAsActivePickUpPoint(each.id)
  }
  return (
    <li className="btn-con">
      <button
        onClick={activePickUpPoint}
        className={`${btnClass}`}
        type="button"
      >
        {each.displayText}
      </button>
    </li>
  )
}

export default PickUpButtons
