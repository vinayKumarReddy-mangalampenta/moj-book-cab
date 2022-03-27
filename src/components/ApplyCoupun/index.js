import {Component} from 'react'

import './index.css'

class ApplyCoupun extends Component {
  state = {
    coupunNo: '',
    errMsg: '',
    showError: false,
  }

  onChangeCode = e => {
    this.setState({
      coupunNo: e.target.value,
    })
  }

  ApplyCoupun = async () => {
    const {coupunNo} = this.state
    if (coupunNo === '') {
      this.setState({showError: true, errMsg: 'Please enter a valid coupun'})
    } else {
      const url = 'https://preprod.mojoboxx.com/preprod/webapi/verifyCouponCode'
      const data = {
        CouponCode: coupunNo,
      }
      const options = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }

      const res = await fetch(url, options)
      const dbRes = await res.json()
      if (dbRes.success) {
        this.setState({showError: true, errMsg: 'Applied'})
      } else {
        this.setState({showError: true, errMsg: 'Invalid Coupuncode'})
      }
    }
  }

  render() {
    const {coupunNo, showError, errMsg} = this.state
    return (
      <>
        <div className="coupun-con">
          <input
            type="text"
            onChange={this.onChangeCode}
            placeholder="Enter Coupun code"
            className="coupun-input"
            value={coupunNo}
          />
          <button
            className="apply-btn"
            type="button"
            onClick={this.ApplyCoupun}
          >
            Apply
          </button>
        </div>
        {showError && <p className="err-msg">{errMsg}</p>}
      </>
    )
  }
}
export default ApplyCoupun
