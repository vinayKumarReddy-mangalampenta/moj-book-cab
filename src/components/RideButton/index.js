import './index.css'

const RideButton = props => {
  const {each, isActive, setActive} = props
  const btnClass = isActive ? 'button active-button' : 'button'
  const setMeActive = () => {
    setActive(each.id)
  }
  return (
    <button onClick={setMeActive} className={`${btnClass}`} type="button">
      {each.displayText}
    </button>
  )
}
export default RideButton
