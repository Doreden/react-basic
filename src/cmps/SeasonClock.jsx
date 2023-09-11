import { useEffect, useState } from "react";
import { utilService } from "../services/util.service";

export function SeasonClock(props) {
    console.log("props", props);
    const [isDark, setIsDark] = useState(false)
    const [date, setDate] = useState(new Date())
    useEffect(() => {
        setInterval(() => {
            setDate(new Date())
        }, 1000);
    },[])

   

    function getSeason() {
        switch (date.getMonth()) {
            case 11:
            case 0:
            case 1:

                return {
                    name: 'Winter',
                    img: '/src/assets/seasons/winter.png'
                }
            case 2:
            case 3:
            case 4:
                return {
                    name: 'Spring',
                    img: '/src/assets/seasons/spring.png'
                }

            case 5:
            case 6:
            case 7:
                return {
                    name: 'Summer',
                    img: '/src/assets/seasons/summer.png'
                }

            case 8:
            case 9:
            case 10:
                return {
                    name: 'Autumn',
                    img: '/src/assets/seasons/autumn.png'
                }

        }
    }

    const seasons = getSeason()
    const dynClass = isDark ? 'dark' : 'light'

    

   return (
        <section className={"season-clock" + " " +dynClass}>
            <div onClick={() => setIsDark(!isDark)}>
                <h2>
                    {utilService.getMonthName(date)} ({(seasons.name)})
                </h2>
                <img src={seasons.img} alt="" />

                <h2>
                    {utilService.getDayName(date)}
                </h2>

                <p>
                    {date.toLocaleTimeString()}
                </p>

            </div>
        </section>
    )

}