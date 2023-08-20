import styles from "./CityItem.module.css"
import {Link} from "react-router-dom";
import {useCitiesContext} from "../contexts/CitiesProvider.jsx";

const formatDate = (date) =>
    new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric",
    }).format(new Date(date));
export default function CityItem({city}) {
    const {emoji, cityName, date, id, position} = city
    const {lat, lng} = position
    const {currentCity, deleteCity} = useCitiesContext()

    function handleDeleteBtn(e) {
        e.preventDefault()
        deleteCity(id)
    }
    return (
        <li>
            <Link to={`${id}?lat=${lat}&lng=${lng}`}
                  className={`${styles.cityItem} ${id === currentCity.id ? styles['cityItem--active'] : ""}`}>
                <span className={styles.emoji}>{emoji}</span>
                <h3 className={styles.name}>{cityName}</h3>
                <time className={styles.date}>
                    ({formatDate(date)})
                </time>
                <button className={styles.deleteBtn} onClick={handleDeleteBtn}>
                    &times;
                </button>
            </Link>
        </li>
    )
}