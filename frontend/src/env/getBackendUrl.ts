export default function getBackendUrl(): string {
    const url = import.meta.env.VITE_API_URL;
    if (!url) {
        throw new Error("VITE_BACKEND_URL is not defined");
    }
    return url;
}
