import Link from 'next/link'
import React from 'react'

function ErrorTransaction() {
  return (
    <div>
        <h1>Oops, Ocurrio un error en la transaccion</h1>

        <h3>Dale click al enlace para escribir por Whatsapp con soporte</h3>

        <Link href="https://wa.me/573167925915">
            <h3>ESCRIBEME</h3>
        </Link>
    </div>
  )
}

export default ErrorTransaction