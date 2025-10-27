// import { Refresh } from "@mui/icons-material";
import { actionTypes } from "./Action";

const initialState = {
    profileData: null,
    isLoggedIn: false,
    token: null,
    refreshToken: null,
    uniqueDeviceId: null,
    loginId: null,
};

export const reducerFunction = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.setProfileData: {
            return { ...state, profileData: action.payload };
        }
        case actionTypes.setIsLoggedIn: {
            return { ...state, isLoggedIn: action.payload };
        }
        case actionTypes.setToken: {
            return { ...state, token: action.payload };
        }
        case actionTypes.setRefreshToken: {
            return { ...state, refreshToken: action.payload };
        }
        case actionTypes.setUniqueDeviceId: {
            console.log("uniqueDeviceId: ", action.payload)
            return { ...state, uniqueDeviceId: action.payload };
        }
        case actionTypes.setLoginId: {
            return { ...state, loginId: action.payload };
        }
        default:
            return state;
    }
};
