const TTL_MS = 15 * 60 * 1000; // 15 minutes

/**
 * Wraps an async fetchFn with a localStorage cache keyed by `key`.
 * Returns cached data if it exists and is younger than TTL_MS.
 * Stores the result after a fresh fetch.
 */
export function cachedFetch(key, fetchFn) {
  try {
    const stored = localStorage.getItem(key);
    if (stored) {
      const { data, ts } = JSON.parse(stored);
      if (Date.now() - ts < TTL_MS) {
        return Promise.resolve(data);
      }
    }
  } catch (_) {
    // Corrupted entry or storage not available — fall through to fetch
  }

  return fetchFn().then((data) => {
    try {
      localStorage.setItem(key, JSON.stringify({ data, ts: Date.now() }));
    } catch (_) {
      // Storage quota exceeded — silently ignore
    }
    return data;
  });
}

/** Invalidate all cache entries whose keys start with the given prefix. */
export function bustCache(prefix = "cache:") {
  try {
    Object.keys(localStorage)
      .filter((k) => k.startsWith(prefix))
      .forEach((k) => localStorage.removeItem(k));
  } catch (_) {
    /* ignore */
  }
}
