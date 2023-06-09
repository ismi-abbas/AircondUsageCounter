import React, {useEffect, useState} from 'react';
import {Button, Div, Input, Text} from 'react-native-magnus';
import {ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {format} from 'date-fns';

const Counter = () => {
  const [usage, setUsage] = useState<any[]>([]);
  const [totalUsage, setTotalUsage] = useState<number>(0);
  const [inputValue, setInputValue] = useState<string>('');

  const handleAddToRecord = async () => {
    const time = format(new Date(Date.now()), 'dd-MM HH:mm:ss');
    const parsedValue = parseInt(inputValue, 10);
    if (!isNaN(parsedValue)) {
      setUsage(prevUsage => {
        return [...prevUsage, {value: parsedValue, time}];
      });
      setTotalUsage(() => {
        return usage.reduce((a, b) => a + b.value, 0);
      });
      setInputValue(inputValue);
    }
  };

  const removeFromRecord = async (index: number) => {
    setUsage(prevUsage => {
      const updatedUsage = [...prevUsage];
      updatedUsage.splice(index, 1);
      return updatedUsage;
    });
  };

  const getData = async () => {
    try {
      let usageData = await AsyncStorage.getItem('usage');
      let totalUsageData = await AsyncStorage.getItem('totalUsage');
      setUsage(JSON.parse(usageData || '[]'));
      setTotalUsage(parseInt(totalUsageData || '0', 10));
    } catch (e) {
      console.log(e);
    }
  };

  const setData = async () => {
    try {
      await AsyncStorage.setItem('totalUsage', JSON.stringify(totalUsage));
      await AsyncStorage.setItem('usage', JSON.stringify(usage));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    setData();
  }, [usage, totalUsage]);

  useEffect(() => {
    setTotalUsage(usage.reduce((a, b) => a + b.value, 0));
  }, [usage]);

  return (
    <ScrollView>
      <Div flexDir="column">
        <Text color="gray800" mx="xl" mt="2xl" fontSize="lg">
          Usage Hour
        </Text>
        <Div flexDir="row" justifyContent="space-between" alignItems="center">
          <Input
            mx="xl"
            mt="xl"
            mb="xl"
            py="sm"
            placeholder="Usage"
            borderColor="gray400"
            borderWidth={2}
            keyboardType="number-pad"
            value={inputValue}
            w={200}
            onChangeText={text => setInputValue(text)}
          />
          <Button
            flex={1}
            mt="xl"
            mr={10}
            mb="xl"
            py="sm"
            h={40}
            bg="orange400"
            rounded="circle"
            onPress={handleAddToRecord}
            textAlign="center">
            Add To Record
          </Button>
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
            usage.map(({value, time}, index) => {
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
                      {value} {value > 1 ? 'hours' : 'hour'} usage at{' '}
                      <Text fontWeight="bold">{time}</Text>
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
                      onPress={() => removeFromRecord(index)}>
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
    </ScrollView>
  );
};

export default Counter;
