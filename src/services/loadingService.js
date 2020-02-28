const changeObject = {};
let dataStored = false


function broadcast() {
    Object.keys(changeObject).forEach(k => changeObject[k]());
}

const LoadingService = {
    get: () => dataStored,
    set: async data => {
        dataStored = data;
    },

    setAndBroadcast: async data => {
        dataStored = data;
        broadcast();
    },

    onChange: (key, cb) => {
        changeObject[key] = () => cb(dataStored);
    },

    deleteKey: key => {
        if (changeObject[key]) {
            delete changeObject[key];
        }
    },
};

export {LoadingService};
