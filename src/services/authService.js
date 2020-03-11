const changeObject = {};
let dataStored = getUserInfo();

function getUserInfo() {
  try {
    const userInfo = JSON.parse(localStorage.getItem('userInfo'));
    return userInfo;
  } catch (e) {
    return null;
  }
}

function broadcast() {
  Object.keys(changeObject).forEach(k => changeObject[k]());
}

const AuthService = {
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

export {AuthService};
