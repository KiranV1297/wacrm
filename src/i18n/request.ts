import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(async () => {
  // Read the locale from the environment, defaulting to Spanish.
  let locale = process.env.NEXT_PUBLIC_APP_LOCALE || 'es';

  let messages;
  try {
    messages = (await import(`../../messages/${locale}.json`)).default;
  } catch (error) {
    // Keep the locale and messages in sync when the requested dictionary is absent.
    locale = 'es';
    messages = (await import(`../../messages/es.json`)).default;
  }

  return {
    locale,
    messages
  };
});
