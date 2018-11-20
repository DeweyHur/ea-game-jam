import React from "react";
import { Avatar } from 'react-md';

const suffixes = Avatar.defaultProps.suffixes;

export function getAvatar(alias) {
  return <Avatar suffix={getAvatarColor(alias)}>{alias.charAt(0).toUpperCase()}</Avatar>
}

export function getAvatarColor(name) {
  return suffixes[Array.from(name).reduce((sum, char) => sum += char.charCodeAt(0), 0) % suffixes.length];  
}