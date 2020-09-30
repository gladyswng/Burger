import React, { useEffect, useState } from 'react'
import Order from '../../components/Order/Order'
import axios from '../../axios-orders'
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'


const Orders = () => {
  const [ orders, setOrders ] = useState([])
  const [ loading, setLoading ] = useState(false)
  
  useEffect(() => {
    axios.get('/orders.json')
      .then(res => {
        // We get back an object with IDs as properties, there for need to turn into array
        const fetchedOrders =[]
        for (let key in res.data) {
          fetchedOrders.push({
            ...res.data[key],
            id: key
          })
        }

        setLoading(false)
        setOrders(fetchedOrders)
        console.log(fetchedOrders)
      })
      .catch(err => {
        setLoading(false)
      })
  }, [])
  return (
    <div>
      {orders.map(order => {
        return <Order 
        key={order.id}
        ingredients={order.ingredients}
        price={+order.price}
        />
      })}
      
    
    </div>
  )
}

export default withErrorHandler(Orders, axios)