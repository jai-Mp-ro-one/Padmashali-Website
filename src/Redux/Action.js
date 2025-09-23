export const actionTypes = {
    setProfileData: "SET_PROFILE_DATA",
    setIsLoggedIn: "SET_LOGGED_IN",
    setToken: "SET_TOKEN",
    setRefreshToken: "SET_REFRESH_TOKEN",
    setUniqueDeviceId: "SET_UNIQUE_DEVICE_ID",
    setLoginId: "SET_LOGIN_ID"
}

export const setProfileData = (data) => {
    return {
        type: actionTypes.setProfileData,
        payload: data,
    };
};



export const setIsLoggedIn = (data) => {
    return {
        type: actionTypes.setIsLoggedIn,
        payload: data,
    };
};

export const setToken = (data) => {
    return {
        type: actionTypes.setToken,
        payload: data,
    };
};

export const setRefreshToken = (data) => {
    return {
        type: actionTypes.setRefreshToken,
        payload: data,
    };
};

export const setUniqueDeviceId = (data) => {
    console.log("unique id from redux: ", data)
    return {
        type: actionTypes.setUniqueDeviceId,
        payload: data,
    };
};

export const setLoginId = (data) => {
    console.log("login id from redux: ", data)
    return {
        type: actionTypes.setLoginId,
        payload: data,
    };
};