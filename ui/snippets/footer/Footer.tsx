import type { GridProps, HTMLChakraProps } from '@chakra-ui/react';
import { Box, Grid, Flex, Text, VStack } from '@chakra-ui/react';
import { useQuery } from '@tanstack/react-query';
import React from 'react';

import type { CustomLinksGroup } from 'types/footerLinks';

import config from 'configs/app';
import type { ResourceError } from 'lib/api/resources';
import useApiQuery from 'lib/api/useApiQuery';
import useFetch from 'lib/hooks/useFetch';
import useIssueUrl from 'lib/hooks/useIssueUrl';
import { Link } from 'toolkit/chakra/link';
import { Skeleton } from 'toolkit/chakra/skeleton';
import { copy } from 'toolkit/utils/htmlEntities';
import { CONTENT_MAX_WIDTH } from 'ui/shared/layout/utils';
// Hidden: NetworkAddToWallet component
// import NetworkAddToWallet from 'ui/shared/NetworkAddToWallet';

import FooterLinkItem from './FooterLinkItem';
import IntTxsIndexingStatus from './IntTxsIndexingStatus';
import getApiVersionUrl from './utils/getApiVersionUrl';

const MAX_LINKS_COLUMNS = 4;

const FRONT_VERSION_URL = `https://github.com/blockscout/frontend/tree/${ config.UI.footer.frontendVersion }`;
const FRONT_COMMIT_URL = `https://github.com/blockscout/frontend/commit/${ config.UI.footer.frontendCommit }`;

const Footer = () => {

  const { data: backendVersionData } = useApiQuery('general:config_backend_version', {
    queryOptions: {
      staleTime: Infinity,
    },
  });
  const apiVersionUrl = getApiVersionUrl(backendVersionData?.backend_version);
  const issueUrl = useIssueUrl(backendVersionData?.backend_version);

  const BLOCKSCOUT_LINKS = [
    {
      icon: 'edit' as const,
      iconSize: '16px',
      text: 'Submit an issue',
      url: issueUrl,
    },
    {
      icon: 'social/git' as const,
      iconSize: '18px',
      text: 'Contribute',
      url: 'https://github.com/blockscout/blockscout',
    },
    {
      icon: 'social/twitter_filled' as const,
      iconSize: '18px',
      text: 'X (ex-Twitter)',
      url: 'https://x.com/blockscout',
    },
    {
      icon: 'social/discord' as const,
      iconSize: '24px',
      text: 'Discord',
      url: 'https://discord.gg/blockscout',
    },
    {
      icon: 'brands/blockscout' as const,
      iconSize: '18px',
      text: 'All chains',
      url: 'https://www.blockscout.com/chains-and-projects',
    },
    {
      icon: 'donate' as const,
      iconSize: '20px',
      text: 'Donate',
      url: 'https://github.com/sponsors/blockscout',
    },
  ];

  const frontendLink = (() => {
    if (config.UI.footer.frontendVersion) {
      return <Link href={ FRONT_VERSION_URL } target="_blank">{ config.UI.footer.frontendVersion }</Link>;
    }

    if (config.UI.footer.frontendCommit) {
      return <Link href={ FRONT_COMMIT_URL } target="_blank">{ config.UI.footer.frontendCommit }</Link>;
    }

    return null;
  })();

  const fetch = useFetch();

  const { isPlaceholderData, data: linksData } = useQuery<unknown, ResourceError<unknown>, Array<CustomLinksGroup>>({
    queryKey: [ 'footer-links' ],
    queryFn: async() => fetch(config.UI.footer.links || '', undefined, { resource: 'footer-links' }),
    enabled: Boolean(config.UI.footer.links),
    staleTime: Infinity,
    placeholderData: [],
  });

  const colNum = isPlaceholderData ? 1 : Math.min(linksData?.length || Infinity, MAX_LINKS_COLUMNS) + 1;

  const renderNetworkInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Flex
        gridArea={ gridArea }
        flexWrap="wrap"
        columnGap={ 4 }
        rowGap={ 3 }
        mb={{ base: 4, lg: 4 }}
        _empty={{ display: 'none' }}
      >
        { !config.UI.indexingAlert.intTxs.isHidden && <IntTxsIndexingStatus/> }
        { /* Hidden: NetworkAddToWallet component */ }
        { /* <NetworkAddToWallet/> */ }
      </Flex>
    );
  }, []);

  const renderProjectInfo = React.useCallback((gridArea?: GridProps['gridArea']) => {
    return (
      <Box gridArea={ gridArea }>
        <VStack gap={ 2 } alignItems="start">
          <Box>
            <Text
              fontSize="md"
              fontWeight={ 700 }
              color="text.primary"
              mb={ 0.5 }
            >
              { config.chain.name }
            </Text>
            <Text fontSize="xs" color="text.secondary" lineHeight="1.4">
              Blockchain Explorer
            </Text>
          </Box>

          <VStack gap={ 1 } alignItems="start" textStyle="xs" color="text.secondary" mt={ 1 }>
            { apiVersionUrl && (
              <Flex gap={ 2 } alignItems="center">
                <Text as="span" fontWeight={ 500 }>Backend:</Text>
                <Link
                  href={ apiVersionUrl }
                  target="_blank"
                  color="blue.600"
                  _hover={{ color: 'blue.700', textDecoration: 'underline' }}
                  _dark={{ color: 'blue.400', _hover: { color: 'blue.300' } }}
                >
                  { backendVersionData?.backend_version }
                </Link>
              </Flex>
            ) }
            { frontendLink && (
              <Flex gap={ 2 } alignItems="center">
                <Text as="span" fontWeight={ 500 }>Frontend:</Text>
                { frontendLink }
              </Flex>
            ) }
          </VStack>
        </VStack>
      </Box>
    );
  }, [ apiVersionUrl, backendVersionData?.backend_version, frontendLink ]);

  const containerProps: HTMLChakraProps<'div'> = {
    as: 'footer',
    borderTopWidth: '1px',
    borderTopColor: 'border.divider',
    bg: {
      base: 'white',
      _dark: 'gray.900',
    },
  };

  const contentProps: GridProps = {
    px: { base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 },
    py: { base: 5, lg: 6 },
    gridTemplateColumns: { base: '1fr', lg: 'minmax(auto, 400px) 1fr' },
    columnGap: { lg: '48px', xl: '64px' },
    maxW: `${ CONTENT_MAX_WIDTH }px`,
    m: 0,
  };

  const renderRecaptcha = (gridArea?: GridProps['gridArea']) => {
    if (!config.services.reCaptchaV2.siteKey) {
      return <Box gridArea={ gridArea }/>;
    }

    return (
      <Box gridArea={ gridArea } textStyle="xs" mt={ 6 }>
        <span>This site is protected by reCAPTCHA and the Google </span>
        <Link href="https://policies.google.com/privacy" external noIcon>Privacy Policy</Link>
        <span> and </span>
        <Link href="https://policies.google.com/terms" external noIcon>Terms of Service</Link>
        <span> apply.</span>
      </Box>
    );
  };

  if (config.UI.footer.links) {
    return (
      <Box { ...containerProps }>
        <Grid { ...contentProps }>
          <div>
            { renderNetworkInfo() }
            { renderProjectInfo() }
            { renderRecaptcha() }
          </div>

          <Grid
            gap={{ base: 6, lg: colNum === MAX_LINKS_COLUMNS + 1 ? 4 : 6, xl: 8 }}
            gridTemplateColumns={{
              base: 'repeat(auto-fill, 160px)',
              lg: `repeat(${ colNum }, 140px)`,
              xl: `repeat(${ colNum }, 150px)`,
            }}
            justifyContent={{ lg: 'flex-end' }}
            mt={{ base: 6, lg: 0 }}
          >
            {
              ([
                { title: 'Resources', links: BLOCKSCOUT_LINKS },
                ...(linksData || []),
              ])
                .slice(0, colNum)
                .map(linkGroup => (
                  <Box key={ linkGroup.title }>
                    <Skeleton
                      fontWeight={ 600 }
                      fontSize="sm"
                      mb={ 3 }
                      display="inline-block"
                      loading={ isPlaceholderData }
                      color="text.primary"
                    >
                      { linkGroup.title }
                    </Skeleton>
                    <VStack gap={ 1.5 } alignItems="start">
                      { linkGroup.links.map(link => <FooterLinkItem { ...link } key={ link.text } isLoading={ isPlaceholderData }/>) }
                    </VStack>
                  </Box>
                ))
            }
          </Grid>
        </Grid>
      </Box>
    );
  }

  return (
    <Box { ...containerProps }>
      <Box>
        { renderNetworkInfo() }
        <Grid
          { ...contentProps }
          gridTemplateAreas={{
            lg: `
            "info links-bottom"
            "recaptcha links-bottom"
          `,
          }}
        >
          { renderProjectInfo({ lg: 'info' }) }
          { renderRecaptcha({ lg: 'recaptcha' }) }

          <Box gridArea={{ lg: 'links-bottom' }}>
            <Text
              fontWeight={ 600 }
              fontSize="sm"
              mb={ 3 }
              color="text.primary"
              display={{ base: 'block', lg: 'none' }}
            >
              Resources
            </Text>
            <Grid
              gap={ 1.5 }
              gridTemplateColumns={{
                base: 'repeat(auto-fill, 160px)',
                lg: 'repeat(2, 160px)',
                xl: 'repeat(3, 160px)',
              }}
              gridTemplateRows={{
                base: 'auto',
                lg: 'repeat(3, auto)',
                xl: 'repeat(2, auto)',
              }}
              gridAutoFlow={{ base: 'row', lg: 'column' }}
              alignContent="start"
              justifyContent={{ lg: 'flex-end' }}
              mt={{ base: 0, lg: 0 }}
            >
              { BLOCKSCOUT_LINKS.map(link => <FooterLinkItem { ...link } key={ link.text }/>) }
            </Grid>
          </Box>
        </Grid>

        <Box
          px={{ base: 4, lg: config.UI.navigation.layout === 'horizontal' ? 6 : 12, '2xl': 6 }}
          py={ 3 }
          borderTopWidth="1px"
          borderTopColor="border.divider"
          maxW={ `${ CONTENT_MAX_WIDTH }px` }
          m={ 0 }
        >
          <Text
            fontSize="xs"
            color="text.secondary"
            textAlign="left"
          >
            Copyright { copy } { (new Date()).getFullYear() } { config.chain.name }. All rights reserved.
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default React.memo(Footer);
