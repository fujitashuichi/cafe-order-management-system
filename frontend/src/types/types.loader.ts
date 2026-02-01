export type ProductLoaderType = {
    load: () => Promise<unknown | Error>
}

export type CategoryLoaderType = {
    load: () => Promise<unknown | Error>
}
