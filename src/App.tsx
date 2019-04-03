import * as React from 'react';

import getHelloWorldMessage from './services/hello-world-service';

const App = () => <h1>{getHelloWorldMessage('some-app', 'some-version')}</h1>;

export default App;
