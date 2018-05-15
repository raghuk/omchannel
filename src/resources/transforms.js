import {isEmpty, replace, trim, upperFirst, forEach, split, concat} from 'lodash';

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

        return {yApiKey: content.yApiKey, items: content.items, removableTitles: content.removeFromVideoTitle, updatedAt: Date.now()};
    }

    return result;
}

export function transformShowlist(data, removableTitles) {
    let result = {};

    if (!isEmpty(data)) {
        let content = data.items;

        content = content.map(i => {
            let snippet = i.snippet;
            return {
                id: i.id,
                title: upperFirst(trim(snippet.title)),
                thumbnailUrl: snippet.thumbnails.medium.url, //default, medium, high, standard, maxres
                publishedAt: snippet.publishedAt,
                channelId: snippet.channelId,
                count: i.contentDetails.itemCount
            };
        });

        return content;
    }

    return result;
}

export function transformPlaylist(data, removableTitles, title) {
    let result = {};

    if (!isEmpty(data)) {
        let content = data.items;
        title = concat(split(title, ' '), ['|', '-']);

        content = content.map(i => {
            let snippet = i.snippet;
            let videoTitle = snippet.title;

            forEach(removableTitles, (value) => { videoTitle = replace(videoTitle, new RegExp(value, 'gi'), ''); });
            forEach(title, (value) => { videoTitle = replace(videoTitle, value, ''); });

            return {
                id: i.id,
                title: upperFirst(trim(videoTitle)),
                thumbnailUrl: snippet.thumbnails.medium.url, //default, medium, high, standard, maxres
                publishedAt: snippet.publishedAt,
                channelId: snippet.channelId,
                videoId: snippet.resourceId.videoId
            };
        });

        return content;
    }

    return result;
}
