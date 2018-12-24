export function getApiKey(state) {
  return state.songs.info.yApiKey || '';
}

export function getRemovableTitles(state) {
  return state.songs.info.removableTitles || [];
}

export function getUpdatedAt(state) {
  return state.songs.info.updatedAt || 0;
}

export function getSongs(state) {
  return state.songs.info.items || [];
}

export function getSongList(state) {
  return state.songs.songlist || [];
}

export function getPlayList(state) {
  return state.songs.playlist || [];
}

export function getErrorStatus(state) {
  return state.songs.error;
}
