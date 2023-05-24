import React from 'react';
import {Box, Button, Div, Text} from 'react-native-magnus';

type Props = {};

const Timer = (props: Props) => {
  return (
    <Div
      flexDir="column"
      alignItems="center"
      justifyContent="center"
      mt="xl"
      mb="xl"
      bg="white"
      shadow="sm"
      rounded="xl"
      h={400}
      p={10}
      mx={20}>
      <Text fontSize="2xl" fontWeight="bold">
        Timer
      </Text>

      <Div row m="xl" alignItems="center" justifyContent="space-between">
        <Button
          mt="sm"
          px="lg"
          py="sm"
          bg="white"
          borderWidth={1}
          borderColor="green600"
          color="green600"
          underlayColor="red100"
          onPress={() => console.log('Start')}>
          Start
        </Button>
        <Button
          mt="sm"
          px="lg"
          py="sm"
          bg="white"
          borderWidth={1}
          borderColor="yellow600"
          color="yellow600"
          underlayColor="red100"
          onPress={() => console.log('Pause')}>
          Pause
        </Button>
        <Button
          mt="sm"
          px="lg"
          py="sm"
          bg="white"
          borderWidth={1}
          borderColor="red600"
          color="red600"
          underlayColor="red100"
          onPress={() => console.log('Stop')}>
          Stop
        </Button>
      </Div>
    </Div>
  );
};

export default Timer;
