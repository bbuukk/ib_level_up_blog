export function formatDate(
  dateString: string,
  locale: string = 'en-US',
  options: Intl.DateTimeFormatOptions = {}
): string {
  const date = new Date(dateString);

  const defaultOptions: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };

  const mergedOptions = { ...defaultOptions, ...options };

  return date.toLocaleDateString(locale, mergedOptions);
}
