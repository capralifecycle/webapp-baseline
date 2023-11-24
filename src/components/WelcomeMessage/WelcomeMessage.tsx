import * as React from "react";
import { Link } from "react-router-dom";
import { getConfig } from "../../utils/config-utils";
import styles from "./WelcomeMessage.module.css";

interface Props {
  appName?: string;
}

const WelcomeMessage: React.FC<Props> = ({
  appName = __BUILD_INFO__.appName,
}) => {
  const config = getConfig();

  const appBuildTime = __BUILD_INFO__.appBuildTime;
  const commitHash = __BUILD_INFO__.commitHash;

  return (
    <div className={styles.container}>
      <h1 id="welcome-message">
        Welco to <span className={styles.highlight}>{appName}</span>.
      </h1>
      <p data-testid="version-info">
        Built {appBuildTime} from commit {commitHash} and is running in{" "}
        {config.environment}
      </p>
      <p>
        <Link to="/about/details">Details</Link>
      </p>
    </div>
  );
};

export default WelcomeMessage;
