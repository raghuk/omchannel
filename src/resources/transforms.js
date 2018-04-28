import {isEmpty, replace} from 'lodash';

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

        return {items: content.items, yApiKey: content.yApiKey};
    }

    return result;
}
