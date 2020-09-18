'use strict';

angular.module('dealer.version', [
  'dealer.version.interpolate-filter',
  'dealer.version.version-directive'
])

.value('version', '0.1');
