
export default class AppSdk {

    constructor(client) {
        this._client = client;
    }

    getMethods() {
        let result = {};
        result.version = 1;

        ['get', 'post', 'put', 'patch', 'del'].forEach((method) => {
            result[method] = (path, options = {}) => {
                console.warn("deprecated api call: ", method, path, options);
                return this._client[method](path, options);
            }
        });

        result.getShows = () => this._client.get('getShows');
        result.getShowList = (ids, key) => this._client.get('getShowList', {
            params: { id: ids, key: key, part: 'snippet,contentDetails', maxResults: 50 }
        });
        result.getPlayList = (id, key) => this._client.get('getPlayList', {
            params: { playlistId: id, key: key, part: 'snippet', maxResults: 50 }
        });

        return result;
    }
}
