import React, { FC } from "react"
import { email, subject, body } from "../../config/basisinformatie"

type Props = {
  address: string,
  postalCode: string,
  gebruiksdoel?: string,
  gebruik?: string,
  aantalBouwlagen?: number
  etage?: number,
  aantalKamers?: number,
  oppervlak?: number
}

const MailtoAnchor: FC<Props> = ({ address, postalCode, gebruiksdoel, gebruik, aantalBouwlagen, etage, aantalKamers, oppervlak }) => {
  const href = `mailto:${ email }?subject=${ subject }&body=${ body(address, postalCode, gebruiksdoel, gebruik, aantalBouwlagen, etage, aantalKamers, oppervlak) }`
  const text = "Meld BAG afwijkingen"
  return <p><a href={ href }>{ text }</a></p>
}
export default MailtoAnchor
