import Translate from "../functions/Translate";
import {CloudsFill} from 'react-bootstrap-icons';

function Logo() {
    function reloadPage() {
        window.location.reload(true);
    }

    return (
        <div className="logo" onClick={reloadPage}>
            <CloudsFill color="#fff" className="bootstrap-icon"/>&nbsp; {/*todo replace*/}
            <Translate color="#fff" string="app-name" defaultString="React Weather App"/>
        </div>
    );
}

export default Logo;