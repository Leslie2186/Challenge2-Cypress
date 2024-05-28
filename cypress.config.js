const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fx3ypu',
  env: {
      MAILSLURP_API_KEY:
      "09b4d1795367d63c6e249085a55da3e2db56dcbba10a3fd882527ae8c347d458"
    },
    e2e: {
      defaultCommandTimeout: 40000,
      responseTimeout: 40000,
      requestTimeout: 40000
    },
  videos: true  
});
