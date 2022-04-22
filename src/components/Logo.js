import Translate from "../functions/Translate"
import { CloudsFill } from 'react-bootstrap-icons'

function Logo(){
    return(
        <div className="logo"><CloudsFill className="bootstrap-icon"/> <Translate string="app-name" defaultString="React Weather App"/></div>
    )
}
export default Logo