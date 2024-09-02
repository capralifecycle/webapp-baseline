import { Link } from 'react-router-dom'

export default function AboutMessage() {
  return (
    <div>
      <h1>About</h1>
      <p>
        <Link to={'/'}>Back</Link>
      </p>
      <p>
        GitHub repository:
        {' '}
        <a href={'https://github.com/capraconsulting/webapp-baseline'}>
          https://github.com/capraconsulting/webapp-baseline
        </a>
      </p>
      <pre>{JSON.stringify(__BUILD_INFO__, undefined, '  ')}</pre>
    </div>
  )
}
