import Reactotron from 'reactotron';
// import AsyncStorage from '@react-community/async-storage';
import { reactotronRedux } from 'reactotron-redux';
import sagaPlugin from 'reactotron-redux-saga';

let reactotron: Reactotron<Reactotron> | undefined;

__DEV__ &&
  (function reactotronSetup() {
    reactotron = Reactotron.configure() //
      // .useReact().setAsyncStorageHandler!(AsyncStorage)
      .use(reactotronRedux())
      .use(sagaPlugin({}))
      .connect();

    console.tron = reactotron;
  })();

declare global {
  interface Console {
    tron?: Reactotron<Reactotron>;
  }
}

export default reactotron;
