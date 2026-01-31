import React from 'react'
import type { UrlContextType } from '../types/types.context'
import { UrlContext } from './urlContext'


function UrlProvider({ children }: { children: React.ReactNode }) {
    const urlConfig: UrlContextType = {
        backend: {
            dev: "http://localhost:5107"
        },
        frontend: {
            dev: "http://localhost:5173"
        }
    }

    return (
        <UrlContext.Provider value={urlConfig}>{children}</UrlContext.Provider>
    )
}

export default UrlProvider
