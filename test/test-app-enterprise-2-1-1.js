'use strict';
/* eslint-env node, mocha */
const path = require('path');
const assert = require('yeoman-assert');
const helpers = require('yeoman-test');
const os = require('os');

describe('generator-alfresco:app-enterprise-2-1-1', function () {
  this.timeout(60000);

  before(function () {
    return helpers.run(path.join(__dirname, '../generators/app'))
      .inDir(path.join(os.tmpdir(), './temp-test'))
      .withOptions({ 'skip-install': true })
      .withPrompts({
        sdkVersion: '2.1.1',
        projectStructure: 'basic',
        communityOrEnterprise: 'Enterprise',
        removeDefaultSourceAmps: false,
        removeDefaultSourceSamples: false,
      })
      .toPromise();
  });

  it('creates files', function () {
    assert.file([
      'repo/src/main/resources/alfresco/extension/license/README.md',
    ]);
  });

  it('updates run.sh and debug.sh with -Penterprise flag', function () {
    assert.fileContent([
      ['debug.sh', /-Penterprise/],
      ['run.sh', /-Penterprise/],
      ['run.bat', /-Penterprise/],
      ['run-without-springloaded.sh', /-Penterprise/],
      ['scripts/debug.sh', /-Penterprise/],
      ['scripts/run.sh', /-Penterprise/],
      ['scripts/run.bat', /-Penterprise/],
      ['scripts/run-without-springloaded.sh', /-Penterprise/],
    ]);
  });
});

// vim: autoindent expandtab tabstop=2 shiftwidth=2 softtabstop=2
