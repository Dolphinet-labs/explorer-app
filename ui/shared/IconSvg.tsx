import type { HTMLChakraProps } from '@chakra-ui/react';
import { chakra } from '@chakra-ui/react';
import { type IconName } from 'public/icons/name';
import React from 'react';

import config from 'configs/app';
import { Skeleton } from 'toolkit/chakra/skeleton';

export const href = config.app.spriteHash ? `/icons/sprite.${ config.app.spriteHash }.svg` : '/icons/sprite.svg';

export { IconName };

export interface Props extends HTMLChakraProps<'div'> {
  name: IconName;
  isLoading?: boolean;
}

const IconSvg = React.forwardRef(
  function IconSvg({ name, isLoading = false, ...props }: Props, ref: React.ForwardedRef<HTMLDivElement>) {
    // Convert icon name with slashes to sprite ID format (remove slashes)
    // e.g., "arrows/east-mini" -> "arrowseast-mini"
    const spriteId = name.replace(/\//g, '');
    return (
      <Skeleton loading={ isLoading } display="inline-block" asChild { ...props } ref={ ref }>
        <chakra.svg w="100%" h="100%">
          <use href={ `${ href }#${ spriteId }` }/>
        </chakra.svg>
      </Skeleton>
    );
  },
);

IconSvg.displayName = 'IconSvg';

export default IconSvg;
