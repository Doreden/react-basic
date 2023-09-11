
import { useEffect, useRef, useState } from "react"


export function CountDown(props) {

    const [time, setTime ] = useState(props.startFrom);
    const intervalId = useRef();

    
    useEffect(() => {
        intervalId.current = setInterval(() => {
            setTime((prevTime) => prevTime - 1);
        }, 1000);

        return () => {
            clearInterval(intervalId.current);
        };
    }, []);
    


    useEffect(() => {
        if (time <= 0) {
            stop();
        }
    }, [time]);
    

    function stop() {
        clearInterval(intervalId.current);
        props.onDone();   
    }


    return (
        <section className={`count-down ${time<=6 ? 'red' : ""}`}>
        
            <div>
                {time}
            </div>

        </section>
    );
}