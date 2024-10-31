export default class LocalStorage {
    constructor(storageName, data, id) {
        this.storageName = storageName;
        this.data = data;
        this.id = id;
    }

    #privateGetStorage(storageName) {
        return JSON.parse(localStorage.getItem(storageName));
    }

    getStorage() {
        return this.#privateGetStorage(this.storageName);
    }

    static addToStorage = (storageName, data) => {
        let storageArr = [data];
        const storageData = JSON.parse(localStorage.getItem(storageName));

        if (storageData) {

            storageArr = [...storageData, ...storageArr];
        }
        localStorage.setItem(storageName, JSON.stringify(storageArr));
    };

    static removeFromStorage = (storageName, id) => {
        const storageData = JSON.parse(localStorage.getItem(storageName));

        if (!storageData) {
            return;
        }

        storageData.splice(storageData.map(el => el.id).indexOf(id), 1);

        if (!storageData.length) {
            localStorage.removeItem(storageName);
            return;
        }

        localStorage.setItem(storageName, JSON.stringify(storageData));
    };

}