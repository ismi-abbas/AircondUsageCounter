import {AppRegistry} from 'react-native';
import App from './src/App';
import {name as appName} from './app.json';
import {ThemeProvider} from 'react-native-magnus';

export default function Main() {
  return (
    <ThemeProvider>
      <App />
    </ThemeProvider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
