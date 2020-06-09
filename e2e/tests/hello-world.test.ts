import { Selector } from 'testcafe';

fixture`Example app`.page('http://localhost:3000');

test('Check environment message', async (t) => {
  await t
    .expect(Selector('div').textContent)
    .match(new RegExp('Current environment LOCAL'));
});
