## Development

### To install locally

`script/bootstrap`

### Running tests

`script/cibuild`

### Running a test server with a dummy site

`script/test-server`

### The environment flag

When developing locally, it can be helpful to see error backtraces, disable template caching, have expanded request logs, and to allow cross-origin requests between the Ruby server and the Node server. By default, however, JekyllAdmin runs in `production` mode, meaning these development features are disabled.

To enabled the development features, set the environmental variable `RACK_ENV` to `development`. When enabled, the `/_api/` endpoint will add `Access-Control-Allow-Origin: any` headers, and respond to `OPTIONS` pre-flight checks. This flag is set automatically when using the `script/test-server` command.
