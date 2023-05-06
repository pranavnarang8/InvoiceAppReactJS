import React, { useEffect, useState } from 'react'
import TableBody from './TableBody'


const Body = () => {
  
    const [date, setDate] = useState()
    const [billing, setBilling] = useState({name:"", company:"", gstNo:"", mobile:"", email:"", address1:"", address2:"", address3:""})
    const [rows, setRows] = useState([])
    const [total, setTotal] = useState(0)
    const [taxable, setTaxable] = useState(0)
    const [discount, setDiscount] = useState(0)
    const [gst, setGst] = useState(0)
    const [body, setBody] = useState(true)
    const [btn, setBtn] = useState(false)
    let tableRows = document.getElementsByTagName('tr')

    const calculateTotal = ()=>{
      const finalCol = document.getElementsByName("total")
      const finalPay = document.getElementsByName("price")
      const quant = document.getElementsByName("quantity")
      const finalDisc = document.getElementsByName("amount")
      const select = document.getElementsByName("select")
      let totalAmt = 0
      let totalPrice = 0
      let totalDisc = 0
      let totalGst = 0
      for (let index = 0; index < finalCol.length; index++) {
        if(quant[index].value==="0" || select[index].value==="Select Room"){
          alert("Please ensure room type and quantity have been set")
          break; 
        }else{
        let element = parseFloat(finalCol[index].innerHTML);
        totalAmt = totalAmt + element
        let taxable = parseFloat(finalPay[index].innerHTML)
        let totalTaxable = taxable*parseFloat(quant[index].value)
        totalPrice = totalPrice + totalTaxable;
        let discount = parseFloat(finalDisc[index].value)*parseFloat(quant[index].value)
        totalDisc = totalDisc + discount
        let taxes = parseFloat(taxable*6/100)*parseFloat(quant[index].value)
        totalGst = totalGst + taxes
        setBtn(true)
        }
      }

      setTotal(totalAmt.toFixed(2))
      setTaxable(totalPrice.toFixed(2))
      setDiscount(totalDisc.toFixed(2))
      setGst(totalGst.toFixed(2))
      
    }

    useEffect(()=>{
        const newDate = new Date()
        const year = newDate.getFullYear()
        const month = newDate.getMonth() + 1
        const dateNum = newDate.getDate()
        setDate(dateNum + "/" + month + "/" + year)
    },[])

    const onChange = (e)=>{
      setBilling({...billing,[e.target.name] : e.target.value})
    }

    const onAdd = async()=>{
      const select = document.getElementsByName("select");
      // debugger
      // const selectArray = select.map((select)=>{
      //   return select.value
      // })
      let selectedArray = []
      for (let index = 0; index < select.length; index++) {
        let element = select[index].value;
        selectedArray.push(element)
      }
      if(selectedArray.includes("Select Room")){
        alert("Please select room for previous product before adding another")
      }else{
      const data = [{
        prod:"",
        category:"",
        price:"",
        afterTax:""
      }]
      // setCount(count + 1)
      setRows(rows.concat(data))
      
      // setRows([...rows, data])
    }
    }

    const onSave = (e)=>{
      let parameter = e.target.textContent
      let border = document.getElementsByClassName("invoiceFields")
      if(parameter==="Save"){
        if(billing.name !== "" && billing.mobile !== "" && billing.address1 !== "" && billing.company !=="" && billing.address2 !== ""){
          e.target.textContent="Edit"
          setBody(false)
          for (let index = 0; index < border.length; index++) {
            border[index].style = "border:none;"
          }
        }else{
          alert("Please fill out the billing address")
        }
      }else{
        e.target.textContent="Save"
        for (let index = 0; index < border.length; index++) {
          border[index].style = "border:silver 0.25px solid;"
        }
        setBody(true)
        setBtn(false)
    }
  }

  const onPrint = ()=>{
    document.getElementById('header1').style = "width:1000px;"
    document.getElementById('body1').style = "width:1000px;"
    document.getElementById('footer').style = "width:1000px;"
    document.getElementById('terms').style = "width:1000px;"
    document.getElementById('pBtn').style = "display:none"
    document.getElementById('iBtn').style = "display:none"
    window.print()
    setTimeout(() => {
    document.getElementById('header1').style = "width:1500px;"
    document.getElementById('body1').style = "width:1500px;"
    document.getElementById('footer').style = "width:1500px;"
    document.getElementById('terms').style = "width:1500px;"
    document.getElementById('pBtn').style = "display:block"
    document.getElementById('iBtn').style = "display:block"
    }, 500);
  }
  return (
    <div className="body1" id="body1">
    <div className="billHeader">
      <div className="bill">
        <h6>Bill To:</h6>
        {!body ? <p className="billing-address" style={{lineHeight:"70%"}}><strong><p style={{marginBottom:"0px"}}>{billing.name}</p><br/><p style={{marginBottom:"0px"}}>{billing.company}</p><br/>{billing.gstNo && <><p style={{marginBottom:"0px"}}>{billing.gstNo}</p><br/></>}</strong><p style={{marginBottom:"0px"}}>{billing.mobile}</p><br/>{billing.email && <><p style={{marginBottom:"0px"}}>{billing.email}</p><br/></>}<p style={{marginBottom:"0px"}}>{billing.address1}</p><br/><p style={{marginBottom:"0px"}}>{billing.address2}</p><br/>{billing.address3 && <p style={{marginBottom:"0px"}}>{billing.address3}</p>}</p>
        :
        <div className="bill-address">
        <input type="text" className="inputFields required" placeholder="Name *" onChange={onChange} name="name" value={billing.name} />
        <input type="email" className="inputFields" placeholder="Email" onChange={onChange} name="email" value={billing.email}/>
        <input type="text" className="inputFields required" placeholder="Company *" onChange={onChange} name="company" value={billing.company}/>
        <input type="text" className="inputFields required" placeholder="Address 1 *" onChange={onChange} name="address1" value={billing.address1}/>
        <input type="text" className="inputFields" placeholder="GST No." onChange={onChange} name="gstNo" value={billing.gstNo}/>
        <input type="text" className="inputFields required" placeholder='City *' onChange={onChange} name="address2" value={billing.address2}/>
        <input type="tel" className="inputFields required" placeholder="Mobile No. *" onChange={onChange} name="mobile" value={billing.mobile}/>
        <input type="text" className="inputFields" placeholder='Landmark' onChange={onChange} name="address3" value={billing.address3}/>
        </div>}
      </div>
      <div className="invoice">
      <label for="number" className="form-label">Invoice #:</label>
      <input type="text" className="invoiceFields" id="number" />
      <br/>
      <label for="date" className="form-label">Invoice Date:</label>
      <input type="text" className="invoiceFields" id="date" value={date} />
      <br/>
      <label for="place" className="form-label">Place of Supply:</label>
      <input type="text" className="invoiceFields" id="place" value="18-ASSAM"/>
      <br/>
      <label for="number" className="form-label">Reference:</label>
      <input type="text" className="invoiceFields" id="number" />
      </div>
      </div>
      <div className="table">
        <div className="addBtn">
        {body && <><button className="addproduct" onClick={onAdd}>Add Product</button>
        <button className="addproduct" onClick={calculateTotal}>Get Total</button></>}
        {btn ?<button className="addproduct" id="pBtn" onClick={onSave}>Save</button> : <></>}
        {!body && <button className="addproduct" id="iBtn" onClick={onPrint}>Print Invoice</button>}
        </div>
        <table id="table">
        {body ?
        <>
        <col style={{width:"80px"}}/>
        <col style={{width:"320px"}}/>
        <col style={{width:"150px"}}/>
        <col style={{width:"150px"}}/>
        <col style={{width:"80px"}}/>
        <col style={{width:"140px"}}/>
        <col style={{width:"140px"}}/>
        <col style={{width:"140px"}}/>
        <col style={{width:"140px"}}/>
        <col style={{width:"140px"}}/>
        </>:
        <>
        {/* <col style={{width:"80px"}}/> */}
        <col style={{width:"880px"}}/>
        <col style={{width:"300px"}}/>
        <col style={{width:"300px"}}/>
        </>}
        <thead>
          {body ? <tr>
            <th className="sno" >Remove</th>
            <th className="product" >Product</th>
            <th className="product" >Check-In</th>
            <th className="product" >Check-Out</th>
            <th className="category" >Quantity</th>
            <th className="amounts" >Price</th>
            <th className='amounts' >After Tax</th>
            <th className="amounts" >Discount %</th>
            <th className="amounts" >Disc. Amount/Room</th>
            <th className="amounts" >Final Amount</th> 
          </tr> :
          <tr>
            {/* <th className="sno"> Serial No.</th> */}
            <th className="printscreen" >Description</th>
            <th className="printscreen" >HSN/SAC</th>
            <th className="printscreen" >Amount</th>
            </tr>}
        </thead>
        <tbody id="tableBody">
          {rows.map((rows, index)=>{
            return (
              <TableBody id="tableRow" rows={rows} tableRows={tableRows} key={Number(index.count)} body={body}/>
            )
          })}
          
        </tbody>
        </table>

      </div>
      <div className="summary">
        <ul className="sumList">
        <li className="sumDetails">Taxable Amount<p className="figures">{taxable}</p></li>
        <li className="sumDetails">CGST 6.0%<p className="figures">{gst}</p></li>
        <li className="sumDetails">SGST 6.0%<p className="figures">{gst}</p></li>
        <li className="sumDetails">Total Discount<p className="figures">{discount}</p></li>
        {/* <hr style={{width:"20%", textAlign:"right"}}/> */}
        <li className="sumDetails">Total <p className="figures">{total}</p></li>
        </ul>
      </div>
    </div>
  )
}

export default Body
