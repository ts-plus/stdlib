const { execSync } = require("node:child_process");

execSync("yarn changeset version");
execSync("yarn");
