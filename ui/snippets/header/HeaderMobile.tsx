import { Box, Flex } from '@chakra-ui/react';
import React from 'react';
import { useInView } from 'react-intersection-observer';

import config from 'configs/app';
import { useScrollDirection } from 'lib/contexts/scrollDirection';
import RewardsButton from 'ui/rewards/RewardsButton';
import SearchBar from 'ui/snippets/searchBar/SearchBar';
import UserProfileMobile from 'ui/snippets/user/profile/UserProfileMobile';

import Burger from './Burger';

type Props = {
  hideSearchBar?: boolean;
  renderSearchBar?: () => React.ReactNode;
};

const HeaderMobile = ({ hideSearchBar, renderSearchBar }: Props) => {
  const scrollDirection = useScrollDirection();
  const { ref, inView } = useInView({ threshold: 1 });

  const searchBar = renderSearchBar ? renderSearchBar() : <SearchBar/>;

  return (
    <Box
      ref={ ref }
      bgColor={{ _light: 'white', _dark: 'black' }}
      display={{ base: 'block', lg: 'none' }}
      position="sticky"
      top="-1px"
      left={ 0 }
      zIndex="sticky2"
      pt="1px"
      minH="auto"
    >
      <Flex
        as="header"
        paddingX={ 3 }
        paddingY={ 0 }
        bgColor={{ _light: 'white', _dark: 'black' }}
        width="100%"
        alignItems="center"
        transitionProperty="box-shadow"
        transitionDuration="slow"
        boxShadow={ !inView && scrollDirection === 'down' ? 'md' : 'none' }
      >
        <Burger/>
        <Flex columnGap={ 2 } ml="auto">
          { config.features.rewards.isEnabled && <RewardsButton/> }
          {
            (config.features.account.isEnabled && <UserProfileMobile/>) ||
            <Box boxSize={ 10 }/>
          }
        </Flex>
      </Flex>
      { !hideSearchBar && searchBar }
    </Box>
  );
};

export default React.memo(HeaderMobile);
