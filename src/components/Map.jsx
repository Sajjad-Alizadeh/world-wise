import style from "./Map.module.css"
import {useSearchParams} from "react-router-dom";
export default function Map() {
    const [searchParam, setSearchParam] = useSearchParams()
    const lat = searchParam.get('lat')
    const lng = searchParam.get('lng')

    return(
        <div className={style.mapContainer}>
            <h1>
                Map
            </h1>
            <h1>lat: {lat}</h1>
            <h1>lng: {lng}</h1>
            <button onClick={()=>{
                setSearchParam({
                    lat: 23,
                    lng: 100
                })
            }}>
                update position
            </button>
        </div>
    )
}