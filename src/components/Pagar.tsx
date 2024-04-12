'use client'
import axios from 'axios'

function Pagar() {
  const handleSubmit = async () => {
    const res = await axios.get('/api/keyPayments')
    const data = res.data.json()
    return data
  }

  return <button onClick={handleSubmit}>Pagar</button>
}

export default Pagar
