
const backendDomain = "http://localhost:8080";

const SummaryApi = {
    register :{
        url: `${backendDomain}/api/Register`,
        method : "post"
    },
    login :{
        url: `${backendDomain}/api/Login`,
        method : "post"
    },
    current_user :{
        url: `${backendDomain}/api/user-details`,
        method : "get"
    },
    logout_user :{
        url: `${backendDomain}/api/userLogout`,
        method : "get"
    },
    allUser :{
        url: `${backendDomain}/api/AllUser`,
        method : "get"
    },
    updateUser :{
        url: `${backendDomain}/api/UpdateUser`,
        method : "post"
    },
    roleLogin :{
        url: `${backendDomain}/api/rolelogin`,
        method : "post"
    },
    aboutusDetail :{
        url: `${backendDomain}/api/aboutusdetail`,
        method : "post"
    },
}


export default SummaryApi;
