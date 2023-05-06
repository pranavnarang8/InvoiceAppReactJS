import React from 'react'
import Capture from "../Capture.JPG"


const Footer = () => {
  return (
    <>
    <div className="footer" id="footer">
      <div className="bankdetails">
        <div className="qrcode">
          <img className="qr" src="https://media.istockphoto.com/id/828088276/vector/qr-code-illustration.jpg?s=612x612&w=0&k=20&c=FnA7agr57XpFi081ZT5sEmxhLytMBlK4vzdQxt8A70M=" alt="" />
        </div>
        <div className="bankaccount">
          <h6 className="heading">Bank Details</h6>
          <ul className="account">
            <li className="bnk">Bank:<p className="details">HDFC Bank</p></li>
            <li className="bnk">Account #:<p className="details">50200074819203</p></li>
            <li className="bnk">IFSC:<p className="details">HDFC0005671</p></li>
            <li className="bnk">Branch:<p className="details">HATIGAON</p></li>
            <li className="bnk">DD/Cheque in favour of "Hotel Crystal INN"</li>
          </ul>
        </div>
      </div>
      <div className="signature">
        <img className="sign" src={Capture} alt="" />
      </div>
    </div>
    <div className="terms" id="terms">
      <h5>Hope you had a wonderful stay with us</h5>
      <br />
      <h6>Terms and Conditions:</h6>
      <p className="t&c">I agree that my liability for this bill is not waived and agree to be held personally liable in the event that the indicated person/company/association fails to pay for any part of the full amount of these charges. I shall upon demand make immediate payment.</p>
    </div>
    </>
  )
}

export default Footer
