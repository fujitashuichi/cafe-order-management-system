export type LoaderResult<T> =
        | { status: "idle" }
        | { status: "loading" }
        | { status: "error", error: Error }
        | { status: "success", value: T };

export type Status = "idle" | "loading" | "error" | "success"
