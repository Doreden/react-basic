import img from './assets/react.svg'
import { AnimalList } from './cmps/AnimalList'
import { SeasonClock } from './cmps/SeasonClock'
import { CountDown } from './cmps/CountDown'
import { Watcher } from './cmps/Watcher'
import { useState } from 'react'
import { MouseMonitor } from './cmps/MouseMonitor'


export function App() {

    // define the default state
    const [page, setPage] = useState('animalList')

    // the other pages list
    const pages = [
        'animalList',
        'seasonClock',
        'countDown',
        'watcher',
        'mouseMonitor',
    ]

    const animals = [
        { type: 'Malayan Tiger', count: 787 },
        { type: 'Mountain Gorilla', count: 212 },
        { type: 'Fin Whale', count: 28 },
    ]

    function getImgUrl(url) {
        return new URL(url, import.meta.url).href
    }

    function onSetPage(ev, page) {
        ev.preventDefault()
        setPage(page)
    }

    return (
        <section className='app'>
            <header className='app-header'>
                <h1>Basic React Apps</h1>

            </header>

            <section className="home-container">
                <div className="links-container">
                    {pages.map((page) => (
                        <a 
                            key={page}
                            href=""
                            className="link"
                            onClick={(ev) => onSetPage(ev, page)}
                        >
                            {page}

                        -**-
                        </a>
                    ))}
                </div>

                <main>
                    {page === 'animalList' && <AnimalList animals={animals} />}
                    {page === 'seasonClock' && <SeasonClock />}
                    {page === "countDown" && (
                        <CountDown startFrom={10} onDone={() => alert('Times Up!')} />
                    )}
                    {page === 'watcher' && <Watcher />}
                    {page === 'mouseMonitor' && <MouseMonitor />}

                </main>

            </section>
        </section>

    )
}

