import {Appearance, SafeAreaView, ScrollView, StatusBar} from 'react-native';
import {Text, Div} from 'react-native-magnus';

import Timer from './Timer';
import Counter from './Counter';

function App(): JSX.Element {
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
        </Div>
        <Counter />
        <Div>
          <Timer />
        </Div>
      </ScrollView>
    </SafeAreaView>
  );
}

export default App;
