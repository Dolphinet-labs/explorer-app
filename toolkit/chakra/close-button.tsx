import type { ButtonProps } from '@chakra-ui/react';
import { Icon, useRecipe, chakra } from '@chakra-ui/react';
import * as React from 'react';

import { recipe as closeButtonRecipe } from '../theme/recipes/close-button.recipe';
import { IconButton } from './icon-button';

// Use inline SVG instead of importing the file
// This avoids SSR issues with @svgr/webpack
const CloseIconSVG = chakra('svg');

export interface CloseButtonProps extends Omit<ButtonProps, 'variant' | 'size'> {
  variant?: 'plain';
  size?: 'md';
}

export const CloseButton = React.forwardRef<
  HTMLButtonElement,
  CloseButtonProps
>(function CloseButton(props, ref) {
  const recipe = useRecipe({ recipe: closeButtonRecipe });
  const [ recipeProps, restProps ] = recipe.splitVariantProps(props);
  const styles = recipe(recipeProps);

  return (
    <IconButton aria-label="Close" ref={ ref } css={ styles } { ...restProps }>
      { props.children ?? (
        <Icon boxSize={ 5 }>
          <CloseIconSVG
            viewBox="0 0 20 20"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            width="100%"
            height="100%"
          >
            <path
              d={
                'M9.44 8.035a.791.791 0 0 0 1.12 0l3.802-3.803a.791.791 0 0 1 1.119 0l.287.287a.79.79 0 0 1 0 1.119L11.965 9.44a.79.79 0 0 0 0 1.118l3.803 3.803a.791.791 0 0 1 0 1.119l-.287.287a.791.791 0 0 1-1.119 0l-3.803-3.803a.79.79 0 0 0-1.118 0l-3.803 3.803a.79.79 0 0 1-1.119 0l-.287-.287a.791.791 0 0 1 0-1.119l3.803-3.803a.791.791 0 0 0 0-1.118L4.232 5.638a.791.791 0 0 1 0-1.119l.287-.287a.791.791 0 0 1 1.119 0L9.44 8.035Z' // eslint-disable-line max-len
              }
              fill="currentColor"
            />
          </CloseIconSVG>
        </Icon>
      ) }
    </IconButton>
  );
});
