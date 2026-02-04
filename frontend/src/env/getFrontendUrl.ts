export default function getFrontendUrl(): string {
    const url = import.meta.env.VITE_FRONTEND_URL;
    if (!url) {
        throw new Error("VITE_BACKEND_URL is not defined");
    }
    return url;
}
