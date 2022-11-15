import { portalifyAssets } from './portalify-assets';
describe('portalifyAssets', () => {
  it('should work', () => {
    expect(portalifyAssets()).toEqual('portalify-assets');
  });
});
