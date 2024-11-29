function deleteCookie(name : string) {
  document.cookie = `${name}=; Max-Age=-1; path=/; SameSite=None; Secure`;
}
export default deleteCookie;
