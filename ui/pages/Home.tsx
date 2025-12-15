import { Box, Flex } from '@chakra-ui/react';
import React from 'react';

import config from 'configs/app';
import HeroBanner from 'ui/home/HeroBanner';
import ChainIndicators from 'ui/home/indicators/ChainIndicators';
import LatestArbitrumL2Batches from 'ui/home/latestBatches/LatestArbitrumL2Batches';
import LatestZkEvmL2Batches from 'ui/home/latestBatches/LatestZkEvmL2Batches';
import LatestBlocks from 'ui/home/LatestBlocks';
import Stats from 'ui/home/Stats';
import Transactions from 'ui/home/Transactions';

const rollupFeature = config.features.rollup;

const Home = () => {
  const leftWidget = (() => {
    if (rollupFeature.isEnabled && !rollupFeature.homepage.showLatestBlocks) {
      switch (rollupFeature.type) {
        case 'zkEvm':
          return <LatestZkEvmL2Batches/>;
        case 'arbitrum':
          return <LatestArbitrumL2Batches/>;
      }
    }

    return <LatestBlocks/>;
  })();

  return (
    <Box as="main">
      <HeroBanner/>
      <Flex
        flexDir={{ base: 'column', lg: 'row' }}
        columnGap={{ base: 2, lg: 4 }}
        rowGap={{ base: 3, lg: 0 }}
        mt={{ base: 4, lg: 6 }}
        _empty={{ mt: 0 }}
      >
        <Stats/>
        <ChainIndicators/>
      </Flex>
      <Flex
        mt={{ base: 6, lg: 8 }}
        direction={{ base: 'column', lg: 'row' }}
        columnGap={{ base: 0, lg: 8 }}
        rowGap={{ base: 6, lg: 0 }}
        alignItems="flex-start"
      >
        <Box flex={{ base: '1', lg: '0 0 400px' }}>
          { leftWidget }
        </Box>
        <Box flexGrow={ 1 } minW={ 0 }>
          <Transactions/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
