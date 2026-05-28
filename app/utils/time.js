export function formatToUserTime(dateString) {

  const date = new Date(dateString);

  return date.toLocaleString(undefined, {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false
  });
}

export function getCountdown(dateStr) {
  const now = new Date();
  const target = new Date(dateStr);

  const diff = target - now;

  if (diff <= 0) return '';

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const mins = Math.floor((diff / (1000 * 60)) % 60);

  return `${days}d ${hours}h ${mins}m`;
}