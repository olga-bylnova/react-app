import "../css/navbar.scss";
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons'

function Navbar() {
    return (
        <div className="navbar-container">
            <div className="navbar-sections">
                <div className="navbar-sections-link navbar-sections__name">
                    @ Name Surname
                </div>
                <div className="navbar-sections-link navbar-sections__blog">
                    Blog
                </div>
                <div className="navbar-sections-link navbar-sections__user-link">
                    Login
                </div>
            </div>
            <div className="navbar-mode">
                Light mode <FontAwesomeIcon className="navbar-mode-icon" icon={faCircleHalfStroke} />
            </div>
        </div>
    );
}

export default Navbar;