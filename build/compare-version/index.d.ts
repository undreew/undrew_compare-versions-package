import { KeyProps, VersionComparison } from '../types';
export declare function compareVersions<T extends object | null | undefined>(current: T, previous: T, keyProps: KeyProps): VersionComparison<T>;
