import {useEffect, useState} from 'react';
import {Appearance, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Button, Text, Div, Box, Input} from 'react-native-magnus';
import Timer from './Timer';

function App(): JSX.Element {
  const [usage, setUsage] = useState<any[]>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddToRecord = () => {
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setUsage(prevUsage => {
        return [...prevUsage, parsedValue];
      });
      setTotalUsage(() => {
        return usage.reduce((acc, curr) => acc + curr, 0);
      });
      setInputValue(inputValue);
    }
  };

  useEffect(() => {
    setTotalUsage(() => usage.reduce((acc, curr) => acc + curr, 0));
  }, [usage]);

  const isDarkMode = Appearance.getColorScheme() === 'dark';

  return (
    <SafeAreaView>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <ScrollView>
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
            <Div
              flexDir="row"
              justifyContent="space-between"
              alignItems="center">
              <Input
                flex={1}
                mx="xl"
                mt="xl"
                mb="xl"
                py="lg"
                placeholder="0"
                borderColor="gray200"
                borderWidth={2}
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
                bg="orange400"
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

          <Div
            bg="gray100"
            alignItems="center"
            justifyContent="center"
            rounded="lg"
            mt={5}
            mx={20}
            py={10}
            pr={80}
            pl={20}
            w={350}>
            {usage.length > 0 ? (
              usage.map((usage, index) => {
                return (
                  <Div
                    row
                    mt={5}
                    w="100%"
                    key={index}
                    justifyContent="space-between"
                    alignItems="center">
                    <Div row alignItems="center" justifyContent="flex-start">
                      <Text fontSize="lg" fontWeight="400" w="75%">
                        Use for {usage} {usage > 1 ? 'hours' : 'hour'}
                      </Text>
                      <Button
                        ml={20}
                        right={0}
                        rounded="lg"
                        bg="white"
                        mt="sm"
                        px="sm"
                        py="sm"
                        borderWidth={1}
                        borderColor="red500"
                        color="red500"
                        underlayColor="red100"
                        onPress={() => {
                          setUsage(prevUsage => {
                            const updatedUsage = [...prevUsage];
                            updatedUsage.splice(index, 1);
                            return updatedUsage;
                          });
                        }}>
                        Remove
                      </Button>
                    </Div>
                  </Div>
                );
              })
            ) : (
              <Text textAlign="center" fontSize="lg">
                No usage
              </Text>
            )}
          </Div>
        </Div>

        <Div>
          <Timer />
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
