interface PayData {
  reference: string
  integrity: string
  fullname: string
  email: string
  monto: string
}

const {NEXT_PUBLIC_KEY_PUBLIC} = process.env
console.log(NEXT_PUBLIC_KEY_PUBLIC)

function FormPay({ reference, integrity, fullname, email, monto}: PayData) {

  return (
    <div>
      <form action="https://checkout.wompi.co/p/" method="GET">
        {/* OBLIGATORIOS  */}
        <input
          type="hidden"
          name="public-key"
          defaultValue={NEXT_PUBLIC_KEY_PUBLIC}
        />
        <input type="hidden" name="currency" defaultValue="COP" />
        <input type="hidden" name="amount-in-cents" defaultValue={monto} />
        <input type="hidden" name="reference" defaultValue={reference} />
        <input
          type="hidden"
          name="signature:integrity"
          defaultValue={integrity}
        />
        {/* OPCIONALES  */}
        <input
          type="hidden"
          name="redirect-url"
          //defaultValue="http://localhost:3000/redirectpay"
          defaultValue="http://gpx-play.vercel.app/redirectpay"
        />
         {/* <input type="hidden" name="expiration-time" value="FECHA_EXPIRACION" />
        <input type="hidden" name="tax-in-cents:vat" value="IVA_EN_CENTAVOS" />
        <input
          type="hidden"
          name="tax-in-cents:consumption"
          value="IMPOCONSUMO_EN_CENTAVOS"
        /> */}
        <input
          type="hidden"
          name="customer-data:email"
          defaultValue={email}
        />
        <input
          type="hidden"
          name="customer-data:full-name"
          defaultValue={fullname}
        />
        {/*<input
          type="hidden"
          name="customer-data:phone-number"
          value="NUMERO_DE_TELEFONO_DEL_PAGADOR"
        />
        <input
          type="hidden"
          name="customer-data:legal-id"
          value="DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
        />
        <input
          type="hidden"
          name="customer-data:legal-id-type"
          value="TIPO_DEL_DOCUMENTO_DE_IDENTIDAD_DEL_PAGADOR"
        />
        <input
          type="hidden"
          name="shipping-address:address-line-1"
          value="DIRECCION_DE_ENVIO"
        />
        <input
          type="hidden"
          name="shipping-address:country"
          value="PAIS_DE_ENVIO"
        />
        <input
          type="hidden"
          name="shipping-address:phone-number"
          value="NUMERO_DE_TELEFONO_DE_QUIEN_RECIBE"
        />
        <input
          type="hidden"
          name="shipping-address:city"
          value="CIUDAD_DE_ENVIO"
        />
        <input
          type="hidden"
          name="shipping-address:region"
          value="REGION_DE_ENVIO"
        /> */}
        <button type="submit" className="bg-amber-500 px-4 py-2 rounded-lg text-black font-bold hover:bg-slate-300 hover:text-xl">Pagar con Wompi</button>
      </form>
    </div>
  )
}

export default FormPay
