import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {
    faArrowUp,
    faArrowDown,
} from "@fortawesome/free-solid-svg-icons";
import "../css/home.scss";

function SortButton({sortKey, icon, activeSort, activeOrder, onSortChange}) {
    const isActive = activeSort === sortKey;
    const nextOrder = activeOrder === "asc" ? "desc" : "asc";

    return (
        <div className="main-content-navigation__sort-item">
            <button onClick={() => onSortChange(sortKey, isActive ? nextOrder : "asc")}>
                <FontAwesomeIcon icon={icon}
                                 className={"main-content-navigation__sort-item-button-icon" + (isActive ? "-active" : "")}/>
            </button>
            <button className={"main-content-navigation__sort-item-button" + (isActive ? "" : "-invisible")}
                    onClick={() => onSortChange(sortKey, nextOrder)}>
                <FontAwesomeIcon
                    className={"main-content-navigation__sort-item-button-icon" + (isActive ? "-active" : "")}
                    icon={activeOrder === "asc" ? faArrowUp : faArrowDown}/>
            </button>
        </div>
    );
}

export default SortButton;
