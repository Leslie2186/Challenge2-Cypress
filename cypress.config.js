const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'fx3ypu',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
