import Spinner from "./Spinner.jsx";
import Message from "./Message.jsx";
import styles from "./CountryList.module.css";
import CountryItem from "./CountryItem.jsx";

export default function CountryList({cities, isLoading}) {

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
    console.log(country)

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