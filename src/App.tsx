import {useState} from 'react';
import {SafeAreaView, StatusBar} from 'react-native';
import {Button, Text, Div, Box, Input} from 'react-native-magnus';

function App(): JSX.Element {
  const [usage, setUsage] = useState<Array<number>>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddToRecord = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setUsage(prevUsage => {
        return [...prevUsage, parsedValue];
      });
      setTotalUsage(() => {
        return usage.reduce((acc, curr) => acc + curr, 1);
      });
      setInputValue('');
    }
  };

  return (
    <SafeAreaView>
      <StatusBar barStyle="dark-content" />
      <Div mt="2xl">
        <Text textAlign="center" fontSize="5xl" fontWeight="bold">
          Aircond Usage Counter
        </Text>
        <Text fontSize="lg" color="gray600" mt="md" textAlign="center">
          Record daily aircond usage
        </Text>
        <Div flexDir="column">
          <Text color="gray800" mx="xl" mt="2xl" fontSize="lg">
            Usage Hour
          </Text>
          <Div flexDir="row" justifyContent="space-between" alignItems="center">
            <Input
              flex={1}
              mx="xl"
              mt="xl"
              mb="xl"
              py="lg"
              placeholder="0"
              borderColor="gray200"
              borderWidth={1}
              keyboardType="number-pad"
              h={40}
              value={inputValue}
              onChangeText={text => setInputValue(text)}
            />
            <Button
              mx="xl"
              mt="xl"
              mb="xl"
              py="lg"
              h={40}
              bg="purple500"
              rounded="circle"
              onPress={handleAddToRecord}>
              Add To Record
            </Button>
          </Div>
        </Div>
      </Div>

      <Div flexDir="column" alignItems="center" mt={10}>
        <Text fontSize="lg" fontWeight="400">
          Total Usage Today: {totalUsage ? totalUsage : 0}{' '}
          {totalUsage > 1 ? 'hours' : 'hour'}
        </Text>

        <Div bg="gray200" alignItems="center" justifyContent="center">
          {usage.map((usage, index) => {
            return (
              <Div
                mt={10}
                w="100%"
                key={index}
                flexDir="row"
                justifyContent="space-around"
                alignItems="center">
                <Text fontSize="lg" fontWeight="400">
                  Use for {usage} {usage > 1 ? 'hours' : 'hour'}
                </Text>
                <Button
                  ml={10}
                  bg="purple500"
                  rounded="circle"
                  onPress={() => {
                    setUsage(prevUsage => {
                      return [
                        ...prevUsage.slice(1, index),
                        ...prevUsage.slice(index + 1),
                      ];
                    });
                    // setTotalUsage(() => {
                    //   return usage.reduce((acc, curr) => acc + curr, 1);
                    // });
                  }}>
                  Remove
                </Button>
              </Div>
            );
          })}
        </Div>
      </Div>
    </SafeAreaView>
  );
}

export default App;
