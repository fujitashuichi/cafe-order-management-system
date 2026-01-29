import React from 'react'
import { BaseUrlContext } from './BaseUrlContext';

function BaseUrlProvider({ children }: { children: React.ReactNode }) {
    const urlConfig = { backend: "http://localhost:", frontend: "http://localhost:" };

    return (
        <BaseUrlContext.Provider value={urlConfig}>{children}</BaseUrlContext.Provider>
    )
}

export default BaseUrlProvider
