import React, { useEffect, useRef, useState } from 'react';
import "../../../src/App.css"
import { sendStatusToUser } from './orderstatusservice';
//import { checkOrderStatus } from '../../../server';
import { io } from 'socket.io-client'
import { useLocation } from 'react-router-dom';

const OrderStatusPage = () => {
  const tempArray = new Map()
  const [selectedStatus, setSelectedStatus] = useState(null);
  const [orderFromUser, setOrderFromUser] = useState(null)
  const state = useLocation()
  const socket = io("http://localhost:4009");
  const orderStatus = useRef(null)


  //console.log(state.state)
  const handleStatusClick = (status) => {
    setSelectedStatus(status);
    orderStatus.current = status
    console.log(orderStatus.current)
    //const knowOrderStatus = checkOrderStatus()
    //console.log(knowOrderStatus)
    socket.emit("order", orderStatus.current, state.state)
  };
  useEffect(() => {
    console.log("Component Did Mount")
    socket.on('connect', () => {
      console.log(`Connected to server with id: ${socket.id}`);
      console.log(state.state)
    });

    setTimeout(() => {
      socket.emit('join-room', state.state)
      console.log("Join room emitted")
    }, 3000)

    
  }, [])

  socket.on('recieve', (arg) => {
    console.log(arg);
    const data = JSON.parse(arg)
    console.log(data)
    data['menudetails'] = JSON.parse(data['menudetails'])
    console.log(data['menudetails'])
    if(tempArray.has(data.orderid) === false)
    {
      tempArray.set(data.orderid,data)
    }
    //tempArray.push(data)
    console.log([...tempArray])
    setOrderFromUser(tempArray)
  });

  // useEffect(() => {
  //   socket.emit("order", selectedStatus, state.state)
  // }, [selectedStatus])



  return (
    <div>
      <h1>Order Status Page</h1>
      {/* <p>Select the order status:</p> */}
      {/* {orderFromUser!==null? <div>Order id: {orderFromUser[0].orderid}</div>:<></>} */}
      {/* <div className="column-labels">
        <label className="product-details">Product</label>
        <label className="product-quantity">Quantity</label>
      </div> */}
      <br/>
      <br/>
      {orderFromUser !==null ?
        (
          
          [...orderFromUser].map(([key, value]) => (
            <div>
              <div>Order id: {key}</div>
              <div className="column-labels">
        <label className="product-detail">Product</label>
        <label className="product-quantity">Quantity</label>
      </div>
              <div className="product">
                
                {value.menudetails.map((foodData, key) => (
                  foodData.restaurantdetails.restaurantid === state.state ? (
                    <div key={key} className='product'>
                    <div className="product-details">
                      <div className="product-title">{foodData.foodheader}</div>
                      </div>
                      <div className="product-quantity">
                        <div>{foodData.quantity}</div>
                      </div>
                      
                    </div>
                  ) : null
                  
                ))}
              </div>
              <button
        onClick={() => handleStatusClick('Accepted')}
        className={orderStatus.current === 'Accepted' ? 'selected' : ''}
      >
        Accepted
      </button>

      <button
        onClick={() => handleStatusClick('In-Progress')}
        className={orderStatus.current === 'In-Progress' ? 'selected' : ''}
      >
        In-Progress
      </button>

      <button
        onClick={() => handleStatusClick('Ready for Pickup')}
        className={orderStatus.current === 'Ready for Pickup' ? 'selected' : ''}
      >
        Ready for Pickup
      </button>

      <div>
        {selectedStatus && (
          <p>
            Selected order status: <strong>{selectedStatus}</strong>
          </p>
        )}
      </div>
      <br/>
            </div>
          ))
        ) : <>No orders Yet</>
      }
      
    </div>
  );
};

export default OrderStatusPage;
