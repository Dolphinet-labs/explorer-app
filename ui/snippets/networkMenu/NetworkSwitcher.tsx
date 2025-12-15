import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { Button, ButtonGroupRadio } from 'toolkit/chakra/button';

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
  const current: NetworkKey = config.chain.isTestnet ? 'testnet' : 'mainnet';

  const handleChange = React.useCallback((next: string) => {
    const nextNetwork = next as NetworkKey;
    if (nextNetwork === current) {
      return;
    }

    const targetUrl = nextNetwork === 'testnet' ? TESTNET_URL : MAINNET_URL;
    window.location.href = targetUrl;
  }, [ current ]);

  const isHero = variant === 'hero';

  return (
    <ButtonGroupRadio
      defaultValue={ current }
      onChange={ handleChange }
      equalWidth
      size="sm"
      w="fit-content"
      borderRadius="md"
      backgroundColor={ isHero ? 'whiteAlpha.200' : undefined }
      borderWidth={ isHero ? '1px' : undefined }
      borderColor={ isHero ? 'whiteAlpha.400' : undefined }
      overflow="hidden"
    >
      <Button
        value="testnet"
        px={ 3 }
        color={ isHero ? 'white' : undefined }
        _hover={ isHero ? { backgroundColor: 'whiteAlpha.250' } : undefined }
        sx={ isHero ? { '&[data-selected]': { backgroundColor: 'whiteAlpha.300' } } : undefined }
      >
        <Box w={ 2 } h={ 2 } borderRadius="full" bg="orange.400"/>
        <Text color="inherit">Testnet</Text>
      </Button>
      <Button
        value="mainnet"
        px={ 3 }
        color={ isHero ? 'white' : undefined }
        _hover={ isHero ? { backgroundColor: 'whiteAlpha.250' } : undefined }
        sx={ isHero ? { '&[data-selected]': { backgroundColor: 'whiteAlpha.300' } } : undefined }
      >
        <Box w={ 2 } h={ 2 } borderRadius="full" bg="green.400"/>
        <Text color="inherit">Mainnet</Text>
      </Button>
    </ButtonGroupRadio>
  );
};

export default React.memo(NetworkSwitcher);
