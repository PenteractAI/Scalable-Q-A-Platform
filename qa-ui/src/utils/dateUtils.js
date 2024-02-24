/**
 * Convert a timestamp to a relative date string
 *
 * @param timestamp
 * @returns {string}
 */
export const toRelativeTime = (timestamp) => {
    const timestampDate = new Date(timestamp);
    const now = new Date();
    const secondsPast = (now.getTime() - timestampDate.getTime()) / 1000;

    if (secondsPast < 60) return `${Math.round(secondsPast)}s ago`;
    if (secondsPast < 3600) return `${Math.round(secondsPast / 60)}m ago`;
    if (secondsPast <= 86400) return `${Math.round(secondsPast / 3600)}h ago`;
    if (secondsPast > 86400) return `on ${timestampDate.getDate()}-${timestampDate.getMonth()}-${timestampDate.getFullYear()}`;
}