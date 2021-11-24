export default function isClient(): boolean {
    return typeof document !== "undefined"
}