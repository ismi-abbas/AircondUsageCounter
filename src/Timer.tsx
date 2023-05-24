import React, {useEffect, useMemo, useState} from 'react';
import {Button, Div, Text} from 'react-native-magnus';

const SECOND = 1000;
const MINUTE = SECOND * 60;
const HOUR = MINUTE * 60;
const DAY = HOUR * 24;

const Timer = ({deadline}: {deadline: any}) => {
  const parsedDeadline = useMemo(() => Date.parse(deadline), [deadline]);
  const [time, setTime] = useState(parsedDeadline - Date.now());

  useEffect(() => {
    const interval = setInterval(
      () => setTime(parsedDeadline - Date.now()),
      1000,
    );

    return () => clearInterval(interval);
  }, [parsedDeadline]);

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

      <Div row>
        {Object.entries({
          Days: time / DAY,
          Hours: (time / HOUR) % 24,
          Minutes: (time / MINUTE) % 60,
          Seconds: (time / SECOND) % 60,
        }).map(([label, value]) => (
          <Div key={label}>
            <Div row mx={2}>
              <Text>{`${Math.floor(value)}`.padStart(2, '0')}</Text>
              <Text>{label}</Text>
            </Div>
          </Div>
        ))}
      </Div>

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
