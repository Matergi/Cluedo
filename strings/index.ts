import { useRouter } from 'next/router';
import internalizations from './internalizations';
import type { Dictionary } from './type';

let locale = 'it';

class Language {
  static setLocale = () => {
    const router = useRouter();
    if (router && router.locale) {
      locale = router.locale;
    }
  }

  static get = (): Dictionary => {
    // @ts-ignore
    if (internalizations[locale]) {
      // @ts-ignore
      return internalizations[locale];
    }

    return internalizations.en;
  };
}

export default Language;
