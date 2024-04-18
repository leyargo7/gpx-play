import React from 'react'

function Occupated() {
  return (
    <div className='flex flex-col gap-8 justify-center items-center h-screen w-screen'>
        <h1 className='font-bold text-lg'>Su Session se encuentra ocupada!</h1>

        <p>Por favor, cierre la sesión en el otro dispositivo para poder iniciar sesión en este.</p>
    </div>
  )
}

export default Occupated