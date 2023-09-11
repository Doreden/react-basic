import { utilService } from "../services/util.service";
import { watcherService } from "../services/watcher.service"
import { useEffect, useState } from "react"

export function Watcher(props) {
    const [watchers, setWatchers] = useState([]);
    const [selectedWatcher, setSelectedWatcher] = useState(null);
    const [isAddModalOpen, setAddModal] = useState(false);
    const [newWatcher, setNewWatcher] = useState({});

    useEffect(async () => {
        watcherService.getWatchers()
            .then(setWatchers)
            .catch("had issue loading watchers")
    }, []);

    async function onRemoveWatcher(watcher) {
        try {
            await watcherService.removeWatcher(watcher.id);
            setWatchers((prevWatchers) => {
                return prevWatchers.filter((currWatcher) => watcher.id !== currWatcher.id);
            });
        } catch (error) {
            console.error(error);
        }
    }

    async function onAddWatcher(newWatcher) {
        try {
            const watcher = await watcherService.addWatcher(newWatcher);
        } catch (error) {
            console.error(error);
        }
        setWatchers((prevWatchers) => [...prevWatchers, watcher]);
        setAddModal(false);
    }

    async function loadWatchers() {
        try {
            const watchers = await watcherService.getWatchers()
            setWatchers(watchers)
        } catch (err) {
            console.error('Had issues loading watchers', err)
        }
    }

    async function onUpdateWatchers() {
        try {
            await watcherService.updateWatcher(selectedWatcher)
        } catch (error) {
            console.error(error);
        }

        setWatchers((prevWatchers) => {
            return prevWatchers.map((item) => {
                if (selectedWatcher.id === item.id) return selectedWatcher;
                else return item;

            });
        });

        setSelectedWatcher(null);
    }


    function handleNameChange(ev) {
        const { value } = ev.target;
        setNewWatcher((prevWatcher) => ({ ...prevWatcher, name: value }));
    }
    function handleMovieChange(ev) {
        const { value } = ev.target;
        setNewWatcher((prevWatcher) => ({
            ...prevWatcher,
            movies: value.split(","),
        }));
    }
    function handleUpdateNameChange(ev) {
        const { value } = ev.target;
        setSelectedWatcher((prevWatcher) => ({ ...prevWatcher, name: value }));
    }



    // Return The HTML
    // if (!watchers) return <div>Loading...</div>
    return (
        <section className="watcher-container">
            <h1>Watcher App</h1>
            <button onClick={() => setAddModal(true)}>Add Watcher</button>
            <div className="watchers-row">
                {watchers.map((watcher) => (
                    <div key={watcher.id} className="watcher-box">
                        <div style={{ backgroundColor: utilService.getRandomColor }}>
                            <img className="img-watcher" src={"/public/img/watcherimg.png"} />
                        </div>
                        <h1>{watcher.name}</h1>
                        <button onClick={() => onRemoveWatcher(watcher)}>X</button>
                        <button
                            onClick={() => {
                                setSelectedWatcher(watcher);
                            }}
                        >
                            Select
                        </button>
                    </div>
                ))}
            </div>
            {selectedWatcher && (
                <div className="modal">
                    <input
                        type="text"
                        className="fullName"
                        placeholder="Full Name"
                        onChange={handleUpdateNameChange}
                        value={selectedWatcher.name}
                    />
                    {selectedWatcher.movies.map((movie) => (
                        <li key={movie}>{movie}</li>
                    ))}
                    <button onClick={() => onUpdateWatchers()}>close</button>

                </div>
            )}

            {isAddModalOpen && (
                <div className="modal">
                    <h1>Add Watcher</h1>
                    <input
                        type="text"
                        className="name"
                        placeholder="Name"
                        onChange={handleNameChange}
                    />
                    <input
                        type="text"
                        className="movie"
                        placeholder="Movies(with comma)"
                        onChange={handleMovieChange}
                    />
                    <button onClick={() => onAddWatcher(newWatcher)}>Add Watcher</button>
                    <button onClick={() => setAddModal(false)}>close</button>
                </div>
            )}

            {/* <ul>
            {
                watchers.map(watcher => <li key={watcher.id}>
                    {watcher.name}
                </li>)
            }
        </ul> */}
        </section>)
}
