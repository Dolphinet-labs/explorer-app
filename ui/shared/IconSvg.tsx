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
    // Icon ids inside sprite.svg use the slash-separated path
    const spriteId = name;
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
