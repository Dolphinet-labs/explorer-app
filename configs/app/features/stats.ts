import type { Feature } from './types';

import apis from '../apis';
import { getEnvValue } from '../utils';

const title = 'Blockchain statistics';

const config: Feature<{}> = (() => {
  // Check if stats is explicitly disabled via environment variable
  const statsEnabled = getEnvValue('NEXT_PUBLIC_STATS_API_ENABLED');
  if (statsEnabled === 'false') {
    return Object.freeze({
      title,
      isEnabled: false,
    });
  }

  // Otherwise, enable stats if the stats API is configured
  if (apis.stats) {
    return Object.freeze({
      title,
      isEnabled: true,
    });
  }

  return Object.freeze({
    title,
    isEnabled: false,
  });
})();

export default config;
