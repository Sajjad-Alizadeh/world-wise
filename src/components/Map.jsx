import styles from "./Map.module.css"
import {useNavigate, useSearchParams} from "react-router-dom";
import {MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents} from "react-leaflet";
import {useEffect, useState} from "react";
import {useCitiesContext} from "../contexts/CitiesProvider.jsx";

export default function Map() {
    const {cities} = useCitiesContext()
    const [searchParam, setSearchParam] = useSearchParams()
    const navigate = useNavigate()
    const lat = searchParam.get('lat')
    const lng = searchParam.get('lng')

    const [position, setPosition] = useState([35.71819988221683, 51.42617774843651])
    useEffect(() => {
        if (lat != null && lng != null) {
            console.log("position called")
            setPosition([lat, lng])
        }
    }, [lat, lng])


    return (
        <div className={styles.mapContainer}>
            <MapContainer className={styles.map} center={position} zoom={16} scrollWheelZoom={true}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
                />
                {
                    cities.map(city => (
                        <Marker key={city.id} position={[city.position.lat, city.position.lng]}>
                            <Popup>
                                <span>{city.emoji}</span> <span>{city.cityName}</span>
                            </Popup>
                        </Marker>
                    ))
                }
                <ChangeCenter position={position}/>
                <DetectClick/>
            </MapContainer>
        </div>
    )

    function ChangeCenter({position}) {
        const map = useMap()
        map.setView(position)
        return null
    }

    function DetectClick() {
        useMapEvents({
            click: (e) => {
                navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)
            }
        })
    }
}

