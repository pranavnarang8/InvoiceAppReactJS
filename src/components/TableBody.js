import React, { useEffect, useState } from 'react'
import format from 'date-fns/format'
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";


const TableBody = (props) => {
    // const{count, rows, key} = props
    const { body, tableRows } = props
    const [option, setOption] = useState([])
    const [dates, setDates] = useState({checkin:"", checkout:""})
    const [dateFormat, setDateFormat] = useState({checkin:"", checkout:""})
    let i = 0;
    const rooms = [{
        product: "Select Room",
        category: "",
        price: null,
        afterTax: null,
    },{
        product: "201",
        category: "NDLX",
        price: 1400,
        afterTax: 1568,
    },{
        product: "202",
        category: "NDLX",
        price: 1400,
        afterTax: 1568,
    },{
        product: "301",
        category: "DLX",
        price: 1800,
        afterTax: 2016,
    },{
        product: "302",
        category: "DLX",
        price: 1800,
        afterTax: 2016,
    },{
        product: "401",
        category: "SDLX",
        price: 2200,
        afterTax: 2464,
    },{
        product: "402",
        category: "SDLX",
        price: 2200,
        afterTax: 2464,
    }]

    const [prod, setProd] = useState({product:"", category:"", price:"", afterTax:""})
    const [discount, setDiscount] = useState({percent:"", amount:""})
    const [quantity, setQuantity] = useState(0)
    let dataRows = document.getElementsByTagName('tr')


    const products=[]
    for (let index = 0; index < rooms.length; index++) {
        const element = rooms[index].product;
        products.push(element);
    }
    const onOptionChange = (e)=>{
        const prod = e.target.value
        const select = document.getElementsByName("select")
        let selectArr = []
        for (let index = 0; index < select.length; index++) {
                    const element = select[index].value;
                    selectArr.push(element) 
                }
        if(selectArr.indexOf(prod) !== selectArr.lastIndexOf(prod)){
            alert("Room Already Selected")
        }else{
        let selectedProd = rooms.filter((rooms)=>{return rooms.product===prod})
        setProd({product:selectedProd[0].product, category:selectedProd[0].category , price:selectedProd[0].price , afterTax:selectedProd[0].afterTax})
        setOption([selectArr])
        }
    }
    
    const onChangePer = (e)=>{
        let per = e.target.value
        let amt = (prod.afterTax - prod.afterTax*(100-per)/100)
        setDiscount({percent:per, amount:amt.toFixed(2) }) 
    }
    const onChangeAmt = (e)=>{
        let amt = e.target.value
        // let totalAmt = amt/quantity
        let percent = (amt/prod.afterTax)*100
        let per = percent.toFixed(2)
        setDiscount({percent:per, amount:amt})
    }

    const onChangeQty = (e)=>{
        setQuantity(e.target.value)
    }

    const onDelete = (e)=>{
        const cell = e.target.parentElement;
        const row = cell.parentElement;
        row.remove()
    }
    const onChangeDate = async(e)=>{
        let newDate = e.target.value
        let year = parseInt(newDate.slice(0,4))
        let month = parseInt(newDate.slice(5,7)) - 1
        let date = parseInt(newDate.slice(8,10)) 
        let formattedDate = await format(await new Date(year, month, date),'dd-MM-yyyy')
        setDates({...dates, [e.target.name]: newDate})
        setDateFormat({...dateFormat,[e.target.name]: formattedDate})
    }

    // const onChangeEDate = (e)=>{
    //     let formattedDate = format(e, 'dd-MM-yyyy')
    //     setDates({...dates, checkout: formattedDate})
    // }

    useEffect(()=>{
        // eslint-disable-next-line
        i = tableRows.length - 1
        console.log(dates)
    },[])
  return (
    <>
      {body && <tr id="newRow">
        <td className="table-input"><button className="deleteBtn" onClick={onDelete}>Delete</button></td>
        <td className="table-input select"><select onChange={onOptionChange} name="select" id="select" value={prod.product}>
            {products.map((product)=>{
            return(
                <option className="option" name="option" value={product}>{product}</option>
            )
            })}
        </select><p className="pcategory">{prod.category}</p></td>
        <td className="table-input"><input type="date" name="checkin" id="checkin" onChange={onChangeDate} value={dates.checkin}/></td>
        <td className="table-input"><input type="date" name="checkout" id="checkout" onChange={onChangeDate} value={dates.checkout}/></td>
        <td className="table-input" ><input style={{width:"80px"}} type="number" name="quantity" id="quantity" onChange={onChangeQty} value={quantity}/></td>
        <td className="table-input" name="price" >{prod.price}</td>
        <td className="table-input" >{prod.afterTax}</td>
        <td className="table-input"><input type="number" className="discount-field" name="percent" id="percent" value={discount.percent} onChange={onChangePer}/></td>
        <td className="table-input"><input type="number" className="discount-field" name="amount" id="amount" value={discount.amount} onChange={onChangeAmt}/></td>
        <td className="table-input" id="total" name="total">{(prod.afterTax-discount.amount)*quantity}</td>
      </tr>}
      {!body && <tr id="print">
        {/* <td></td> */}
        <td>{prod.product} - {prod.category} ({dateFormat.checkin} - {dateFormat.checkout})</td>
        <td>996311</td>
        <td>{prod.price*quantity}</td>
        </tr>}
      </>
  )
}





export default TableBody
