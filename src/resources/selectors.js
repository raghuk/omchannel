
// Channel
export function getApiKey(state) {
    return state.channel.info.yApiKey || '';
}

export function getShows(state) {
    return state.channel.info.items || [];
}
