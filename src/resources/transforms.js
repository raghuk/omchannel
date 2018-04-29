import {isEmpty, replace, trim} from 'lodash';

const base64 = require('base-64');
const utf8 = require('utf8');
const json = require('comment-json');

export function transformInfo(data) {
    let result = {};

    if (!isEmpty(data)) {
        let content = data.content;

        content = replace(content, /<(.|\n)*?>/g, '');
        content = base64.decode(content);
        content = utf8.decode(content);
        content = json.parse(content, null, true);

        return {yApiKey: content.yApiKey, items: content.items};
    }

    return result;
}

export function transformShowlist(data) {
    let result = {};

    if (!isEmpty(data)) {
        let content = data.items;

        content = content.map(i => {
            let snippet = i.snippet;
            return {
                id: i.id,
                title: trim(snippet.title),
                thumbnailUrl: snippet.thumbnails.high.url, //medium, high, standard, maxres
                publishedAt: snippet.publishedAt,
                channelId: snippet.channelId,
                count: i.contentDetails.itemCount
            };
        });

        return content;
    }

    return result;
}

export function transformPlaylist(data) {
    let result = {};

    if (!isEmpty(data)) {
        let content = data.items;

        content = content.map(i => {
            let snippet = i.snippet;
            return {
                id: i.id,
                title: trim(snippet.title),
                thumbnailUrl: snippet.thumbnails.high.url, //medium, high, standard, maxres
                publishedAt: snippet.publishedAt,
                channelId: snippet.channelId,
                videoId: snippet.resourceId.videoId
            };
        });

        return content;
    }

    return result;
}
