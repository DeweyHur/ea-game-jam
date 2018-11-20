import _ from "lodash";
import http from "./fetch";

let me;

export async function login(alias, password) {
  saveUser(await http.POST(`/user/login`, { alias, password }));
}

export async function signup(alias, password, name) {
  saveUser(await http.PUT(`/user/${alias}`, { name, password }));
  await login(alias, password);
}

export async function logout() {
  me = null;
  window.sessionStorage.removeItem("EAGameJamUser");
  await http.POST("/user/logout");
}

export function getMe() {  
  if (!_.isEmpty(me)) {
    return me;
  }
  me = JSON.parse(window.sessionStorage.getItem("EAGameJamUser"));
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

export function getMyRemainingVoteCount() {
  if (me && me.votes) {
    return 3 - me.votes.length;
  } else {
    return 0;
  }
}

export function canVote(_id) {
  return getMyRemainingVoteCount() > 0 && _.find(getMe().votes, vote => {
    return vote.postid === _id;
  }) === undefined;  
}

export async function getMyVotes() {
  if (me) {
    if (me.voteTitles) {
      return me.voteTitles;

    } else if (!_.isEmpty(me.votes)) {
      const projects = await Promise.all(me.votes.map(vote => http.GET(`/project/${vote.postid}`)));
      me.voteTitles = projects.map(project => project.title);
      return me.voteTitles;
    }
  }
  return [];
}

export function invalidateVotes() {
  if (me) {
    delete me.voteTitles;
  }
}

function saveUser(user) {
  me = user;
  window.sessionStorage.setItem("EAGameJamUser", JSON.stringify(user));
}
