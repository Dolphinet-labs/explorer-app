import React from 'react';

const TopBar = () => {
  // Hidden: TopBar with green gear icon is now hidden
  return null;

  // Original code (commented out):
  // const bgColor = useColorModeValue('gray.50', 'whiteAlpha.100');
  //
  // return (
  //   <Box bgColor={ bgColor }>
  //     <Flex
  //       py={ 2 }
  //       px={{ base: 3, lg: 6 }}
  //       maxW={ `${ CONTENT_MAX_WIDTH }px` }
  //       m="0 auto"
  //       justifyContent="space-between"
  //       alignItems="center"
  //     >
  //       <TopBarStats/>
  //       <Flex alignItems="center">
  //         { config.features.deFiDropdown.isEnabled && (
  //           <>
  //             <DeFiDropdown/>
  //             <Separator mr={ 3 } ml={{ base: 2, sm: 3 }} height={ 4 } orientation="vertical"/>
  //           </>
  //         ) }
  //         <Settings/>
  //         { Boolean(config.UI.navigation.featuredNetworks) && (
  //           <Box display={{ base: 'none', lg: 'flex' }} alignItems="center">
  //             <Separator mx={ 3 } height={ 4 } orientation="vertical"/>
  //             <NetworkMenu/>
  //           </Box>
  //         ) }
  //       </Flex>
  //     </Flex>
  //   </Box>
  // );
};

export default React.memo(TopBar);
