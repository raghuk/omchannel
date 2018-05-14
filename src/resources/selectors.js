
// Channel
export function getApiKey(state) {
    return state.channel.info.yApiKey || '';
}

export function getRemovableTitles(state) {
    return state.channel.info.removableTitles || [];
}

export function getUpdatedAt(state) {
    return state.channel.info.updatedAt || 0;
}

export function getShows(state) {
    return state.channel.info.items || [];
}

export function getShowList(state) {
    return state.channel.showlist || [];
}

export function getPlayList(state) {
    return state.channel.playlist || [];
}
