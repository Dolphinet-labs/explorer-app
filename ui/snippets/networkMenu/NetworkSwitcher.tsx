import { Box, Text } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import { Button } from 'toolkit/chakra/button';

const TESTNET_URL = 'https://explorer-testnet.dolphinode.world/';
const MAINNET_URL = 'https://explorer.dolphinode.world/';

const NetworkSwitcher: React.FC = () => {
  const isTestnet = config.chain.isTestnet;
  const currentNetwork = isTestnet ? 'Testnet' : 'Mainnet';
  const targetUrl = isTestnet ? MAINNET_URL : TESTNET_URL;

  const handleSwitch = React.useCallback(() => {
    window.location.href = targetUrl;
  }, [ targetUrl ]);

  return (
    <Button
      size="sm"
      variant="outline"
      colorScheme="blue"
      borderRadius="md"
      px={ 3 }
      py={ 2 }
      fontSize="sm"
      fontWeight="medium"
      display="flex"
      alignItems="center"
      gap={ 2 }
      onClick={ handleSwitch }
    >
      <Box
        w={ 2 }
        h={ 2 }
        borderRadius="full"
        bg={ isTestnet ? 'orange.400' : 'green.400' }
      />
      <Text>{ currentNetwork }</Text>
    </Button>
  );
};

export default NetworkSwitcher;
