import {isEmpty} from 'lodash';


export function transformInfo(info) {
    let result = {};

    if (!isEmpty(info)) {
        let content = info.content;
        return content;
    }

    return result;
}
