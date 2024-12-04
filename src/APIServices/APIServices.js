import axios from "axios";
import apiconfig from "../Components/Config/Config";

const avdurl1 = apiconfig.develpoment.apiBaseUrl;

const api = axios.create({
    baseURL: avdurl1,
});


const setAuthToken = (token, uniqueDeviceId, loginId) => {
    console.log(token)
    if (token) {
        api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    if (uniqueDeviceId) {
        api.defaults.headers.common["unq_d_id"] = uniqueDeviceId;
    }
    if (loginId) {
        api.defaults.headers.common["login_id"] = loginId;
    }
};


const getProfileById = (profileId) => {
    return api.get(`user/get-user?profile_id=${profileId}`);
};

const getAllEvents = () => {
    return api.get(`event-routes/events`)
}

const getAllLatestNews = () => {
    return api.get(`news-routes/news`)
}

const verifyMobileNumber = (body) => {
    return api.post('log/verify-mobile', body)
}

const login = (body) => {
    return api.post('log/login', body)
}

const generateNewToken = (body) => {
    return api.post("log/refresh-token", body);
};

const handleLogut = () => {
    return api.post("log/logout");
}


const getAllLatestEvents = () => {
    return api.get(`event-routes/events`)
}

const getNewsById = (newsId) => {
    return api.get(`news-routes/news-by-id?news_id=${newsId}`)
}

const getEventById = (eventId) => {
    return api.get(`event-routes/event?event_id=${eventId}`)
}
const postDonationDataOfPerson = (body) => {
    return api.post(`pay/create-payment`, body)
}

const APIServices = {
    getProfileById,
    getAllEvents,
    getAllLatestNews,
    setAuthToken,
    verifyMobileNumber,
    login,
    generateNewToken,
    handleLogut,
    getAllLatestEvents,
    getNewsById,
    getEventById,
    postDonationDataOfPerson
}


export default APIServices;