import Translate from "../functions/Translate"
import { CloudsFill } from 'react-bootstrap-icons'

function Logo(){
    function reloadPage(){
        window.location.reload(true)
    }
    return(
        <div className="logo" onClick={reloadPage}><CloudsFill className="bootstrap-icon"/> <Translate string="app-name" defaultString="React Weather App"/></div>
    )
}
export default Logo