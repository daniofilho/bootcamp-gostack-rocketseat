import Reactotron from 'reactotron-react-native';

if (__DEV__) {
  const tron = Reactotron.configure()
    .useReactNative()
    .connect();
  console.tron = tron;

  tron.clear(); //limpa a timeline a cada novo refresh
}
