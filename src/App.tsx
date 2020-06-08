import * as React from 'react';
import { getConfig } from './utils/config-utils';

const App: React.FC = () => {
  const config = getConfig();

  const appName = __BUILD_INFO__.appName;
  const appBuildTime = __BUILD_INFO__.appBuildTime;
  const commitHash = __BUILD_INFO__.commitHash;

  return (
    <div>
      <p>Welcome to {appName}</p>
      <p>Built {appBuildTime}</p>
      <p>Commit hash: {commitHash}</p>
      <p>Current environment {config.environment}</p>
    </div>
  );
};

export default App;
