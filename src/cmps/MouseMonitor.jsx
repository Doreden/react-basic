import { useEffect } from "react";
import { useState } from "react";

export function MouseMonitor() {
    const [isOn, setIsOn] = useState(true);
    const [pos, setPos] = useState({
        x: 0,
        y: 0,
    });

    useEffect(() => {
        if (isOn) document.addEventListener('mousemove', updatePos)

        return () => {
            console.log('before update');
            document.removeEventListener('mousemove', updatePos)
        }
    }, [isOn])



    function updatePos(ev) {
        setPos({ x: ev.clientX, y: ev.clientY });
    }

    return (
        <section className="mouse-monitor-container">
            <h1>Mouse Position</h1>
            <div>
                X: {pos.x},
            </div>
            <div>
                Y: {pos.y},
            </div>


            <button onClick={() => setIsOn((prevIsOn) => !prevIsOn)}>
                {isOn ? "Pause" : "Resume"}
            </button>
        </section>
    );
}