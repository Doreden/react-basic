import { storageService } from "./async-storage.service"
import { utilService } from "./util.service.js"

export const watcherService = {
    getWatcher,
    getWatchers,
    removeWatcher,
    addWatcher,
    updateWatcher
}

const STORAGE_KEY_WATCHER = 'watcher'

const watchers = [
    { id: "w101", name: "Puki Ba", movies: ["Rambo", "Rocky"], },
    { id: "w102", name: "Muki Da", movies: ["Titanic", "Star Wars"], },
    { id: "w103", name: "Suki Sa", movies: ["Forrest Gump", "Avatar"], },
];

createWatchers()

async function getWatcher(id) {
    const watchers = await storageService.query(STORAGE_KEY);
    return storageService.get(STORAGE_KEY_WATCHER, id)
}

async function getWatchers() {
    const watchers = storageService.query(STORAGE_KEY_WATCHER)
    return watchers
}

async function removeWatcher(id) {
    await storageService.remove(STORAGE_KEY_WATCHER, id)
}

async function addWatcher() {
    const newWatcher = await storageService.post(STORAGE_KEY_WATCHER, watcher)
    return newWatcher
}

async function updateWatcher(watcher) {
    await storageService.put(STORAGE_KEY_WATCHER, watcher)
}


function createWatcher(name) {
    return { id: utilService.makeId(), name, movies: [] }
}

function addMovie() {

}

function createWatchers() {
    const watchers = utilService.loadFromStorage(STORAGE_KEY_WATCHER) || []
    if (!watchers || !watchers.length) {
        watchers.push({ id: utilService.makeId(), name: 'Puki Ba', movies: ['Rambo', 'Rocky'] })
        watchers.push({ id: utilService.makeId(), name: 'Duki Ba', movies: ['Harry Potter', 'Terminator'] })
        utilService.saveToStorage(STORAGE_KEY_WATCHER, watchers)
    }

}
