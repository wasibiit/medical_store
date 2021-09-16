import {getRole,getToken} from "./common";
const Notifications = {
    notlogin: "Not login, please check",
    loginsuccess: "Login successfully",
    regsuccess: "Register successfully",
    regerror: "Registration failded",
    addedsuccess: "Data added successfully",
    updatedsuccess: "Data updated successfully",
    notupdatedsuccess: "Not updated successfully",
    notaddfailed: "Not data added please check",
    notaligible: "You are Customer",
    deletedsuccess: "Deleted successfully",
    notdeletedsuccess: "Not deleted successfully",
    invalidcred: "Invalid Credentials",
    resetpass: "Reset password successfully",
    notpasswordsame: "Not password same",
    token:getToken("token"),
    role:getRole("token")
  }
  export default Notifications;
