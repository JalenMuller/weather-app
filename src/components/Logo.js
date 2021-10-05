import Translate from "../functions/Translate"

function Logo(){
    return(
        <h1 className="logo"><Translate string="app-name" defaultString="React Weather App"/></h1>
    )
}
export default Logo