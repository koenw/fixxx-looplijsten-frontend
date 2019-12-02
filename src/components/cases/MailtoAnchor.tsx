import React, { FC } from "react"
import { email, subject, body } from "../../config/basisinformatie"

type Props = {
  address: string,
  postalCode: string,
  gebruiksdoel?: string,
  etage?: number,
  aantalKamers?: number,
  oppervlak?: number
}

const MailtoAnchor: FC<Props> = ({ address, postalCode, gebruiksdoel, etage, aantalKamers, oppervlak }) => {
  const href = `mailto:${ email }?subject=${ subject }&body=${ body(address, postalCode, gebruiksdoel, etage, aantalKamers, oppervlak) }`
  const text = "Meld afwijkingen"
  return <p><a href={ href }>{ text }</a></p>
}
export default MailtoAnchor
