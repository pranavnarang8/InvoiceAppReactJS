import React from 'react'

const Header = () => {
  return (
    <div className="header1" id="header1">
      <div className="grid1">
        <img className="crystalLogo" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSn7Ovd6jD_hQclDOSnZ0qAPgo9MkJvrMzfR6uuIe0h&s" alt="" />
        <h5 className="taxinv">TAX INVOICE</h5>
      </div>
      <div className="grid2">
        <h4>Hotel Crystal Inn</h4>
        <p className="gstpan"><strong>GSTIN 18ANDPS2020E1ZE PAN ANDPS2020E</strong></p>
        <p className="address1">114 , Hatigaon--Bhetapara Road, Guwuhati</p>
        <p className="address2">Kamrup Metropolitan, ASSAM, 781038</p>
        <p className="mobile"><strong>Mobile</strong> 9435569790, 9650773933</p>
        <p className="email"><strong>Email</strong> saikiacrystalinn@gmail.com</p>
      </div>
    </div>
  )
}

export default Header
