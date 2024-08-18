import {KeyProps, VersionComparison} from '../types';
import {CompareResult, CompareResultType} from '../types';

import {find, forEach, get, isArray, isEqual} from 'lodash';

function compareValues<T extends object | null | undefined>(
	keyData: T | T[],
	comparisonKeyData: T | T[],
	keyProp: string | undefined,
	isPrevious: boolean
): T[] | CompareResult<T> {
	if (isArray(keyData)) {
		return keyData.map((keyDataItem) => {
			const comparisonDataItem = find(
				comparisonKeyData as T[],
				(item) => get(item, keyProp!) === get(keyDataItem, keyProp!)
			);

			if (comparisonDataItem) {
				const isSame = isEqual(comparisonDataItem, keyDataItem);
				return isSame
					? {...keyDataItem, type: 'equal' as CompareResultType}
					: {...mapKeys(keyDataItem, comparisonDataItem)};
			} else {
				return {
					...keyDataItem,
					type: (isPrevious ? 'removed' : 'added') as CompareResultType,
				};
			}
		});
	} else {
		return {
			value: keyData,
			type: (isEqual(keyData, comparisonKeyData)
				? 'equal'
				: 'modified') as CompareResultType,
		};
	}
}

function mapKeys<T extends object | null | undefined>(
	data: T,
	comparison: T,
	keyProps?: KeyProps,
	isPrevious = false
): T {
	const result: any = {};

	forEach(data, (keyData, key) => {
		const comparisonKeyData = get(comparison, key);
		const keyProp = get(keyProps, key);

		result[key] = compareValues(
			keyData,
			comparisonKeyData,
			keyProp,
			isPrevious
		);
	});

	return result;
}

export function compareVersions<T extends object | null | undefined>(
	current: T,
	previous: T,
	keyProps: KeyProps
): VersionComparison<T> {
	const currentVersion = mapKeys(current, previous, keyProps);
	const previousVersion = mapKeys(previous, current, keyProps, true);

	return {currentVersion, previousVersion};
}
