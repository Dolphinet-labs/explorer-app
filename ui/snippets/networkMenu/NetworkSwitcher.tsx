import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { Button, ButtonGroupRadio } from 'toolkit/chakra/button';

const TESTNET_URL = 'https://explorer-testnet.dolphinode.world/';
const MAINNET_URL = 'https://explorer.dolphinode.world/';

type NetworkKey = 'testnet' | 'mainnet';

const NetworkSwitcher: React.FC = () => {
  const current: NetworkKey = config.chain.isTestnet ? 'testnet' : 'mainnet';

  const handleChange = React.useCallback((next: string) => {
    const nextNetwork = next as NetworkKey;
    if (nextNetwork === current) {
      return;
    }

    const targetUrl = nextNetwork === 'testnet' ? TESTNET_URL : MAINNET_URL;
    window.location.href = targetUrl;
  }, [ current ]);

  return (
    <ButtonGroupRadio
      defaultValue={ current }
      onChange={ handleChange }
      equalWidth
      size="sm"
      w="fit-content"
    >
      <Button value="testnet" px={ 3 }>
        <Box w={ 2 } h={ 2 } borderRadius="full" bg="orange.400"/>
        <Text>Testnet</Text>
      </Button>
      <Button value="mainnet" px={ 3 }>
        <Box w={ 2 } h={ 2 } borderRadius="full" bg="green.400"/>
        <Text>Mainnet</Text>
      </Button>
    </ButtonGroupRadio>
  );
};

export default React.memo(NetworkSwitcher);
