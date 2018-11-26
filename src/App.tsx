import * as React from 'react';

import getHelloWorldMessage from './services/hello-world-service';

const App = () => <h1>{getHelloWorldMessage(APP_NAME, APP_VERSION)}</h1>;

export default App;
