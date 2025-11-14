import type { LinkProps as ChakraLinkProps } from '@chakra-ui/react';
import { Link as ChakraLink, LinkBox as ChakraLinkBox, LinkOverlay as ChakraLinkOverlay, chakra } from '@chakra-ui/react';
import NextLink from 'next/link';
import type { LinkProps as NextLinkProps } from 'next/link';
import React from 'react';

import { Skeleton } from './skeleton';

// Use inline SVG instead of importing the file
// This avoids SSR issues with @svgr/webpack
const LinkExternalIconSVG = chakra('svg');

export const LinkExternalIcon = ({ color }: { color?: ChakraLinkProps['color'] }) => (
  <LinkExternalIconSVG
    viewBox="0 0 12 12"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    boxSize={ 3 }
    verticalAlign="middle"
    color={ color ?? 'icon.externalLink' }
    _groupHover={{
      color: 'inherit',
    }}
    flexShrink={ 0 }
    display="inline-block"
  >
    <path
      d="M10.621 4.353 5.176 9.798a.69.69 0 1 1-.974-.974l5.444-5.446H5.108a.69.69 0 0 1 0-1.378H12v6.892a.69.69 0 1 1-1.379 0V4.353Z"
      fill="currentColor"
    />
  </LinkExternalIconSVG>
);

interface LinkPropsChakra extends ChakraLinkProps {
  loading?: boolean;
  external?: boolean;
  iconColor?: ChakraLinkProps['color'];
  noIcon?: boolean;
  disabled?: boolean;
}

interface LinkPropsNext extends Partial<Pick<NextLinkProps, 'shallow' | 'prefetch' | 'scroll'>> {}

export interface LinkProps extends LinkPropsChakra, LinkPropsNext {}

const splitProps = (props: LinkProps): { chakra: LinkPropsChakra; next: NextLinkProps } => {
  const { scroll = true, shallow = false, prefetch = false, ...rest } = props;

  return {
    chakra: rest,
    next: {
      href: rest.href as NextLinkProps['href'],
      scroll,
      shallow,
      prefetch,
    },
  };
};

export const Link = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function Link(props, ref) {
    const { chakra, next } = splitProps(props);
    const { external, loading, href, children, disabled, noIcon, iconColor, ...rest } = chakra;

    if (external) {
      return (
        <Skeleton loading={ loading } ref={ ref as React.ForwardedRef<HTMLDivElement> } asChild>
          <ChakraLink
            href={ href }
            className="group"
            target="_blank"
            rel="noopener noreferrer"
            { ...(disabled ? { 'data-disabled': true } : {}) }
            { ...rest }
          >
            { children }
            { !noIcon && <LinkExternalIcon color={ iconColor }/> }
          </ChakraLink>
        </Skeleton>
      );
    }

    return (
      <Skeleton loading={ loading } ref={ ref as React.ForwardedRef<HTMLDivElement> } asChild>
        <ChakraLink
          asChild
          { ...(disabled ? { 'data-disabled': true } : {}) }
          { ...rest }
        >
          { next.href ? (
            <NextLink { ...next }>
              { children }
            </NextLink>
          ) :
            <span>{ children }</span>
          }
        </ChakraLink>
      </Skeleton>
    );
  },
);

export const LinkBox = ChakraLinkBox;

export const LinkOverlay = React.forwardRef<HTMLAnchorElement, LinkProps>(
  function LinkOverlay(props, ref) {
    const { chakra, next } = splitProps(props);
    const { children, external, ...rest } = chakra;

    if (external) {
      return (
        <ChakraLinkOverlay ref={ ref } target="_blank" rel="noopener noreferrer" { ...rest }>
          { children }
        </ChakraLinkOverlay>
      );
    }

    return (
      <ChakraLinkOverlay ref={ ref } asChild={ Boolean(next.href) } { ...rest }>
        { next.href ? <NextLink { ...next }>{ children }</NextLink> : children }
      </ChakraLinkOverlay>
    );
  },
);
