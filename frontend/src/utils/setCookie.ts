const setCookie = (name : string, value : string, days : number) => {
    const expires = new Date(Date.now() + days * 24 * 60 * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value};expires=${expires};path=/;secure;SameSite=None;`;
};
export default setCookie;