export function getCookie(key) {
    let cookie = localStorage.getItem(key);
    if(cookie){
    cookie.split(":")
    return cookie.split(":")[0];
}
}

export function setCookie(key, value) {
    localStorage.setItem(key, value)

    return null;
}

export function deleteCookie(key) {
    localStorage.removeItem(key)
    return null;
}

export function checkCookie(key) {
    let cookie = localStorage.getItem(key)

    return cookie !== null;
}

export function getRole(key) {
    let cookie = localStorage.getItem(key)
    if(cookie){
    let arr = cookie.split(":");
    arr = arr.reverse();
     let resti =  arr[0].replace('0z54x3','');
     let role =  resti.replace('y9kv638','');
    return role
    }
}

export function getToken(key) {
    let cookie = localStorage.getItem(key)
    if(cookie){
    let arr = cookie.split(":");
    return arr[0]
    }
}