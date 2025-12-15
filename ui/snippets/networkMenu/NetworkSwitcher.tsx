import { Box, Text } from '@chakra-ui/react';
import React from 'react';
import { LuChevronDown } from 'react-icons/lu';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';
import { MenuContent, MenuRadioItem, MenuRadioItemGroup, MenuRoot, MenuTrigger } from 'toolkit/chakra/menu';

const TESTNET_URL = 'https://explorer-testnet.dolphinode.world/';
const MAINNET_URL = 'https://explorer.dolphinode.world/';

type NetworkKey = 'testnet' | 'mainnet';

type Props = {

  /**
   * `hero` is meant for dark/colored backgrounds (homepage hero banner).
   * `header` is meant for default light header background.
   */
  variant?: 'header' | 'hero';
};

const NetworkSwitcher: React.FC<Props> = ({ variant = 'header' }) => {
  const isHero = variant === 'hero';
  const current: NetworkKey = config.chain.isTestnet ? 'testnet' : 'mainnet';
  const currentLabel = current === 'testnet' ? 'Testnet' : 'Mainnet';
  const currentShortLabel = current === 'testnet' ? 'TN' : 'MN';
  const dotColor = current === 'testnet' ? 'orange.400' : 'green.400';

  const handleValueChange = React.useCallback((details: unknown) => {
    // Chakra v3 / Ark UI emits either string or { value }
    const nextValue = typeof details === 'string' ? details : (details as { value?: string } | undefined)?.value;
    const nextNetwork = nextValue as NetworkKey | undefined;

    if (!nextNetwork || nextNetwork === current) {
      return;
    }

    const targetUrl = nextNetwork === 'testnet' ? TESTNET_URL : MAINNET_URL;
    window.location.href = targetUrl;
  }, [ current ]);

  return (
    <MenuRoot positioning={{ placement: 'bottom-end' }}>
      <MenuTrigger asChild>
        <Button
          size="sm"
          variant="outline"
          borderRadius="md"
          px={ 2 }
          gap={ 1.5 }
          color={ isHero ? 'white' : undefined }
          borderColor={ isHero ? 'whiteAlpha.500' : undefined }
          backgroundColor={ isHero ? 'whiteAlpha.150' : undefined }
          _hover={ isHero ? { backgroundColor: 'whiteAlpha.200' } : undefined }
        >
          <Box w={ 2 } h={ 2 } borderRadius="full" bg={ dotColor }/>
          <Text display={{ base: 'none', md: 'inline' }} color="inherit">
            { currentLabel }
          </Text>
          <Text display={{ base: 'inline', md: 'none' }} color="inherit">
            { currentShortLabel }
          </Text>
          <Box as={ LuChevronDown } boxSize={ 4 } opacity={ 0.9 }/>
        </Button>
      </MenuTrigger>
      <MenuContent minW="160px">
        <MenuRadioItemGroup value={ current } onValueChange={ handleValueChange }>
          <MenuRadioItem value="testnet">Testnet</MenuRadioItem>
          <MenuRadioItem value="mainnet">Mainnet</MenuRadioItem>
        </MenuRadioItemGroup>
      </MenuContent>
    </MenuRoot>
  );
};

export default React.memo(NetworkSwitcher);
