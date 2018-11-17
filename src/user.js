import http from "./fetch";

let me;

export async function login(alias, password) {
  saveUser(await http.POST(`/user/login`, { alias, password }));
}

export async function signup(alias, password, name) {
  saveUser(await http.PUT(`/user/${alias}`, { name, password }));
}

export async function logout() {
  me = null;
  window.sessionStorage.removeItem("EAGameJamUser");
  await http.POST("/user/logout");
}

export function getMe() {
  return me;
}

export function getMyAlias() {
  if (me) {
    return me.alias;
  } else {
    return null;
  }
}

export function getName() {
  if (me) {
    return me.name;
  } else {
    return null;
  }
}

export function getChipName() {
  if (me) {
    return getName()
      .charAt(0)
      .toUpperCase();
  } else {
    return null;
  }
}

function saveUser(user) {
  me = user;
  window.sessionStorage.setItem("EAGameJamUser", JSON.stringify(user));
}
