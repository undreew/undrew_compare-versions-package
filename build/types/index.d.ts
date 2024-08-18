declare enum ECompareResultType {
    EQUAL = "equal",
    ADDED = "added",
    REMOVED = "removed",
    MODIFIED = "modified"
}
export type KeyProps = {
    [key: string]: string;
};
export type CompareResultType = ECompareResultType.EQUAL | ECompareResultType.ADDED | ECompareResultType.REMOVED | ECompareResultType.MODIFIED;
export type CompareResult<T> = {
    value: T;
    type: CompareResultType;
};
export type VersionComparison<T> = {
    currentVersion: T;
    previousVersion: T;
};
export {};
