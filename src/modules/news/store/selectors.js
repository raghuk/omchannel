export function getApiKey(state) {
  return state.news.info.yApiKey || '';
}

export function getRemovableTitles(state) {
  return state.news.info.removableTitles || [];
}

export function getUpdatedAt(state) {
  return state.news.info.updatedAt || 0;
}

export function getNews(state) {
  return state.news.info.items || [];
}

export function getNewsList(state) {
  return state.news.songlist || [];
}

export function getPlayList(state) {
  return state.news.playlist || [];
}

export function getErrorStatus(state) {
  return state.news.error;
}
