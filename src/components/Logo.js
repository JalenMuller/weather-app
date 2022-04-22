import Translate from "../functions/Translate"
import { CloudsFill } from 'react-bootstrap-icons'
import {ReactLogo} from '../assets/images/logo-react.svg'

function Logo(){
    return(
        <div className="logo"><CloudsFill className="bootstrap-icon"/> <Translate string="app-name" defaultString="React Weather App"/></div>
    )
}
export default Logo