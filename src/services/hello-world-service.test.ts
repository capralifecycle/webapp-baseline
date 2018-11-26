import getHelloWorldMessage from './hello-world-service';

describe('hello-world-service', () => {
  it('should return a message containing app name and app version', () => {
    expect(getHelloWorldMessage('testApp', '1.0.0')).toMatch('testApp-1.0.0');
  });
});
