import { chakra } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import useApiQuery from 'lib/api/useApiQuery';
import { HOMEPAGE_STATS } from 'stubs/stats';
import { Image } from 'toolkit/chakra/image';
import { Skeleton } from 'toolkit/chakra/skeleton';

import TokenLogoPlaceholder from './TokenLogoPlaceholder';

type Props = {
  isLoading?: boolean;
  className?: string;
  type?: 'primary' | 'secondary';
};

const NativeTokenIcon = ({ isLoading, className, type }: Props) => {
  const statsQueryResult = useApiQuery('general:stats', {
    queryOptions: {
      refetchOnMount: false,
      placeholderData: HOMEPAGE_STATS,
    },
  });

  if (isLoading || statsQueryResult.isPlaceholderData) {
    return <Skeleton borderRadius="base" loading className={ className }/>;
  }

  const src = type === 'secondary' ? statsQueryResult.data?.secondary_coin_image : statsQueryResult.data?.coin_image;
  const fallbackSrc = type === 'secondary' ? undefined : '/static/dol-256.png';

  return (
    <Image
      className={ className }
      borderRadius="base"
      src={ src || fallbackSrc }
      alt={ `${ config.chain.currency.symbol } logo` }
      fallback={ <TokenLogoPlaceholder borderRadius="base" className={ className }/> }
    />
  );
};

export default chakra(NativeTokenIcon);
