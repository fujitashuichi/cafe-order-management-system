export type FetchResult<T> =
    | { ok: true; value: T }
    | { ok: false; error: Error }

export type PostResult =
    | { ok: true }
    | { ok: false, error: Error }

export type DeleteResult =
    | { ok: true }
    | { ok: false, error: Error }
