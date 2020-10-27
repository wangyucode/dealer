/* tslint:disable */
const { deploy } = require('sftp-sync-deploy');

console.log("env", process.env);

let config = {
  host: 'wycode.cn', // Required.
  port: 22, // Optional, Default to 22.
  username: 'root', // Required.
  password: process.env.SERVER_PASSWORD, // Optional.
  //  privateKey: '/path/to/key.pem', // Optional.
  //  passphrase: 'passphrase',       // Optional.
  //  agent: '/path/to/agent.sock',   // Optional, path to the ssh-agent socket.
  localDir: 'dist', // Required, Absolute or relative to cwd.
  remoteDir: '/var/www/dealer/' // Required, Absolute path only.
};

let options = {
  dryRun: true, // Enable dry-run mode. Default to false
  excludeMode: 'remove', // Behavior for excluded files ('remove' or 'ignore'), Default to 'remove'.
  forceUpload: false // Force uploading all files, Default to false(upload only newer files).
};

deploy(config, options)
  .then(() => {
    console.log('sftp upload success!');
  });
