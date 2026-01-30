export type FetchResult<T, E> =
    | { ok: true; value: T; }
    | { ok: false; error: E; }