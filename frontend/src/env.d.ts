// src/env.d.ts
/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_FRONTEND_URL: string
    readonly VITE_API_URL: string
    readonly VITE_USE_MOCKS: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}
