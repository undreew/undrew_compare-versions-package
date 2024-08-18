"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.compareVersions = compareVersions;
const lodash_1 = require("lodash");
function compareValues(keyData, comparisonKeyData, keyProp, isPrevious) {
    if ((0, lodash_1.isArray)(keyData)) {
        return keyData.map((keyDataItem) => {
            const comparisonDataItem = (0, lodash_1.find)(comparisonKeyData, (item) => (0, lodash_1.get)(item, keyProp) === (0, lodash_1.get)(keyDataItem, keyProp));
            if (comparisonDataItem) {
                const isSame = (0, lodash_1.isEqual)(comparisonDataItem, keyDataItem);
                return isSame
                    ? Object.assign(Object.assign({}, keyDataItem), { type: 'equal' }) : Object.assign({}, mapKeys(keyDataItem, comparisonDataItem));
            }
            else {
                return Object.assign(Object.assign({}, keyDataItem), { type: (isPrevious ? 'removed' : 'added') });
            }
        });
    }
    else {
        return {
            value: keyData,
            type: ((0, lodash_1.isEqual)(keyData, comparisonKeyData)
                ? 'equal'
                : 'modified'),
        };
    }
}
function mapKeys(data, comparison, keyProps, isPrevious = false) {
    const result = {};
    (0, lodash_1.forEach)(data, (keyData, key) => {
        const comparisonKeyData = (0, lodash_1.get)(comparison, key);
        const keyProp = (0, lodash_1.get)(keyProps, key);
        result[key] = compareValues(keyData, comparisonKeyData, keyProp, isPrevious);
    });
    return result;
}
function compareVersions(current, previous, keyProps) {
    const currentVersion = mapKeys(current, previous, keyProps);
    const previousVersion = mapKeys(previous, current, keyProps, true);
    return { currentVersion, previousVersion };
}
