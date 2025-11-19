// we use custom heading size for hero banner
// eslint-disable-next-line no-restricted-imports
import { Box, Flex, Heading, Text } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import RewardsButton from 'ui/rewards/RewardsButton';
import SearchBar from 'ui/snippets/searchBar/SearchBar';
import UserProfileDesktop from 'ui/snippets/user/profile/UserProfileDesktop';
import UserWalletDesktop from 'ui/snippets/user/wallet/UserWalletDesktop';

// Modern gradient background with better contrast
export const BACKGROUND_DEFAULT =
  'linear-gradient(135deg, #667eea 0%, #764ba2 100%)';
const TEXT_COLOR_DEFAULT = 'white';
const BORDER_DEFAULT = 'none';

const HeroBanner = () => {
  const background = {
    _light:
      config.UI.homepage.heroBanner?.background?.[0] ||
      config.UI.homepage.plate.background ||
      BACKGROUND_DEFAULT,
    _dark:
      config.UI.homepage.heroBanner?.background?.[1] ||
      config.UI.homepage.heroBanner?.background?.[0] ||
      config.UI.homepage.plate.background ||
      BACKGROUND_DEFAULT,
  };

  const textColor = {
    _light:
      // light mode
      config.UI.homepage.heroBanner?.text_color?.[0] ||
      config.UI.homepage.plate.textColor ||
      TEXT_COLOR_DEFAULT,
    // dark mode
    _dark:
      config.UI.homepage.heroBanner?.text_color?.[1] ||
      config.UI.homepage.heroBanner?.text_color?.[0] ||
      config.UI.homepage.plate.textColor ||
      TEXT_COLOR_DEFAULT,
  };

  const border = {
    _light:
      config.UI.homepage.heroBanner?.border?.[0] || BORDER_DEFAULT,
    _dark:
      config.UI.homepage.heroBanner?.border?.[1] || config.UI.homepage.heroBanner?.border?.[0] || BORDER_DEFAULT,
  };

  return (
    <Box
      w="100%"
      background={ background }
      border={ border }
      borderRadius={{ base: 'lg', lg: 'xl' }}
      p={{ base: 6, lg: 12 }}
      position="relative"
      overflow="hidden"
      _before={{
        content: '""',
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        background: 'rgba(255, 255, 255, 0.1)',
        borderRadius: 'inherit',
      }}
    >
      { /* Background decoration */ }
      <Box
        position="absolute"
        top="-50%"
        right="-10%"
        w="300px"
        h="300px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.1)"
        filter="blur(40px)"
      />
      <Box
        position="absolute"
        bottom="-30%"
        left="-5%"
        w="200px"
        h="200px"
        borderRadius="full"
        bg="rgba(255, 255, 255, 0.05)"
        filter="blur(30px)"
      />

      <Flex
        position="relative"
        zIndex={ 1 }
        direction="column"
        alignItems="center"
        textAlign="center"
        maxW="800px"
        mx="auto"
      >
        { /* Logo and Title Section */ }
        <Box mb={{ base: 6, lg: 8 }}>
          <Heading
            as="h1"
            fontSize={{ base: '24px', md: '32px', lg: '48px' }}
            lineHeight={{ base: '32px', md: '40px', lg: '56px' }}
            fontWeight={ 700 }
            color={ textColor }
            mb={ 2 }
          >
            { config.chain.name }
          </Heading>
          <Text
            fontSize={{ base: '16px', lg: '20px' }}
            color="rgba(255, 255, 255, 0.9)"
            fontWeight={ 400 }
          >
            Blockchain Explorer
          </Text>
        </Box>

        { /* Search Bar Section */ }
        <Box w="100%" maxW="600px" mb={{ base: 6, lg: 8 }}>
          <SearchBar/>
        </Box>

        { /* Action Buttons */ }
        { config.UI.navigation.layout === 'vertical' && (
          <Box display={{ base: 'none', lg: 'flex' }} gap={ 3 }>
            { config.features.rewards.isEnabled && <RewardsButton variant="hero"/> }
            {
              (config.features.account.isEnabled && <UserProfileDesktop buttonVariant="hero"/>) ||
              (config.features.blockchainInteraction.isEnabled && <UserWalletDesktop buttonVariant="hero"/>)
            }
          </Box>
        ) }
      </Flex>
    </Box>
  );
};

export default React.memo(HeroBanner);
