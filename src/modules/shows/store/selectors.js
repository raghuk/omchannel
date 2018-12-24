export function getApiKey(state) {
  return state.shows.info.yApiKey || '';
}

export function getRemovableTitles(state) {
  return state.shows.info.removableTitles || [];
}

export function getUpdatedAt(state) {
  return state.shows.info.updatedAt || 0;
}

export function getShows(state) {
  return state.shows.info.items || [];
}

export function getShowList(state) {
  return state.shows.showlist || [];
}

export function getPlayList(state) {
  return state.shows.playlist || [];
}

export function getErrorStatus(state) {
  return state.shows.error;
}
