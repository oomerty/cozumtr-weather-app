export const swrGlobalConfig = {
  refreshInterval: 15000,
  fetcher: (resource: RequestInfo, init?: RequestInit) =>
    fetch(resource, init).then((res) => res.json()),
};
