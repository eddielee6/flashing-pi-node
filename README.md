# flashing-pi-node

Demo app containing a collection of gulp tasks to prove remote development, deployment and execution of node.js projects on a headless Raspberry Pi.

## Parameter
All of the Gulp tasks require the following parameters
* `--host` *required*
* `--port` *defaults to 22*
* `--username` *defaults to 'root'*
* `--password`
* `--dest`

## Tasks

### gulp deploy
* Cleans the destination on the remote device
* Transfers `./src` and `./package.json` to the destination
* Installs production npm dependencies

### gulp run
* Opens a shell and runs the project on the remote device

## Example
**Deploy:** `gulp deploy --host mypi.local --username pi --password pa$$w0rd --dest my-dir`

**Run:** `gulp run --host mypi.local --username pi --password pa$$w0rd --dest my-dir`
