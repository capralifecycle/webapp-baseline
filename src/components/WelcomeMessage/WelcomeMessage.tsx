import {Link} from 'react-router-dom'
import styles from './WelcomeMessage.module.css'
import {getConfig} from '../../utils/config-utils'

type Props = {
  appName?: string
  appBuildTime?: string
  commitHash?: string
}

export default function WelcomeMessage({
  appName,
  appBuildTime,
  commitHash,
}: Props) {
  const config = getConfig()

  return (
    <div className={styles.container}>
      <h1 id={'welcome-message'}>
        Welcome to{' '}
        <span className={styles.highlight}>
          {appName ?? __BUILD_INFO__.appName}
        </span>
      </h1>
      <p>
        Built {appBuildTime ?? __BUILD_INFO__.appBuildTime} from commit{' '}
        {commitHash ?? __BUILD_INFO__.commitHash} and is running in{' '}
        {config.environment}
      </p>
      <p>
        <Link to={'/about/details'}>Details</Link>
      </p>
    </div>
  )
}
