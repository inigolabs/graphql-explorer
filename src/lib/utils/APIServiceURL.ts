export const getAPIServiceURL = () => {
  const queryParam = localStorage.getItem('apiUrl');

  if (queryParam) {
    return queryParam;
  }

  return (import.meta.env.VITE_API_SERVICE_URL as string) ?? 'https://app.inigo.io/api/query';
};
