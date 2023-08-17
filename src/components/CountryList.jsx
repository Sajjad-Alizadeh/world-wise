import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";
import {useCitiesContext} from "../contexts/CitiesProvider.jsx";

export default function CountryList() {
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


    const country = cities.reduce((arr, city) => {
        if (!arr.map(el => el.country).includes(city.country)) {
            return [...arr, {country: city.country, emoji: city.emoji}]
        } else {
            return arr
        }
    }, [])

    return (
        <ul className={styles.countryList}>
            {
                country.map((country, index) =>
                    <CountryItem country={country} key={index}/>
                )
            }
        </ul>
    )
}