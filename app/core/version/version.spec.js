'use strict';

describe('dealer.version module', function() {
  beforeEach(module('dealer.version'));

  describe('version service', function() {
    it('should return current version', inject(function(version) {
      expect(version).toEqual('0.1');
    }));
  });
});
