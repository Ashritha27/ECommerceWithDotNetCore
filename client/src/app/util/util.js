function getCookie(key) {
    let a = `; ${document.cookie}`.match(`;\\s*${key}=([^;]+)`);
    return a ? a[1] : '';
}

export default getCookie