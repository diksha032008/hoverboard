import { GoogleAuthProvider, OAuthProvider } from 'firebase/auth';

export enum PROVIDER {
  'https://accounts.google.com' = 'https://accounts.google.com',
  'google.com' = 'google.com',
  'https://login.microsoftonline.com' = 'https://login.microsoftonline.com',
  'microsoftonline.com' = 'microsoftonline.com',
}

export const getFederatedProvider = (provider: PROVIDER) => {
  switch (provider) {
    case 'https://accounts.google.com':
    case 'google.com': {
      const provider = new GoogleAuthProvider();
      provider.addScope('profile');
      provider.addScope('email');
      return provider;
    }

    case 'https://login.microsoftonline.com':
    case 'microsoftonline.com': {
      const provider = new OAuthProvider('microsoft.com');
      provider.addScope('email');
      provider.addScope('profile');
      provider.setCustomParameters({
        tenant: 'adidasgroup.onmicrosoft.com'
      })
      return provider;
    }


    default:
      throw new Error('Unsupported provider');
  }
};

export const getFederatedProviderClass = (provider: PROVIDER) => {
  switch (provider) {
    case 'https://accounts.google.com':
    case 'google.com':
      return GoogleAuthProvider;

    case 'https://login.microsoftonline.com':
    case 'microsoftonline.com':
      return OAuthProvider;

    default:
      throw new Error('Unsupported provider');
  }
};

export const getProviderCompanyName = (provider: PROVIDER) => {
  switch (provider) {
    case 'https://accounts.google.com':
    case 'google.com':
      return 'Google';

    case 'https://login.microsoftonline.com':
    case 'microsoftonline.com':
      return 'Microsoft';

    default:
      throw new Error('Unsupported provider');
  }
};
