
export function useStorage(filename?: string) {
    const baseUrl = import.meta.env.VITE_APP_URL || window.location.origin;
    const storagePath = `${baseUrl}/storage/media/`;

    if (filename) {
        return `${storagePath}${filename}`;
    }

    return storagePath;
}