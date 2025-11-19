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
      { /* Hero Section */ }
      <Box mb={{ base: 8, lg: 12 }}>
        <HeroBanner/>
      </Box>

      { /* Stats Section */ }
      <Box mb={{ base: 8, lg: 12 }}>
        <Flex
          flexDir={{ base: 'column', lg: 'row' }}
          columnGap={{ base: 4, lg: 6 }}
          rowGap={{ base: 4, lg: 0 }}
          alignItems={{ base: 'stretch', lg: 'flex-start' }}
        >
          <Box flex={{ base: '1', lg: '0 0 320px' }}>
            <Stats/>
          </Box>
          <Box flex={{ base: '1', lg: '0 0 280px' }}>
            <ChainIndicators/>
          </Box>
        </Flex>
      </Box>

      { /* Main Content Section */ }
      <Flex
        direction={{ base: 'column', lg: 'row' }}
        columnGap={{ base: 0, lg: 8 }}
        rowGap={{ base: 8, lg: 0 }}
        alignItems="flex-start"
      >
        <Box
          flex={{ base: '1', lg: '0 0 420px' }}
          order={{ base: 2, lg: 1 }}
        >
          { leftWidget }
        </Box>
        <Box
          flexGrow={ 1 }
          minW={ 0 }
          order={{ base: 1, lg: 2 }}
        >
          <Transactions/>
        </Box>
      </Flex>
    </Box>
  );
};

export default Home;
