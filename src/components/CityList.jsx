import styles from "./CityList.module.css"
import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import CityItem from "./CityItem.jsx";
import {useCitiesContext} from "../contexts/CitiesProvider.jsx";

export default function CityList() {
    const {cities, isLoading} = useCitiesContext()

    if (isLoading) {
        return (
            <Spinner/>
        )
    }

    if (!cities.length) {
        return (
            <Message message={"Please add your first city"}/>
        )
    }

    return (
        <ul className={styles.cityList}>
            {
                cities.map(city =>
                    <CityItem city={city} key={city.id}/>
                )
            }
        </ul>
    )
}