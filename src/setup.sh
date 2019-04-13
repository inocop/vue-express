#!/usr/bin/env bash


########## node ##########

# === already run
# npm install -g express-generator
# express /opt/myapp/src/node --view=ejs

cd /opt/myapp/src/node
npm install
npm install --prefix /opt/myapp/src/public/static



########## vue ##########

# === already run
# cd /opt/myapp/src/vue
# vue create .

# Vue CLI v3.4.0
# ? Generate project in current directory? Yes
#
# Vue CLI v3.4.0
# ? Please pick a preset: Manually select features
# ? Check the features needed for your project: Babel, Router, Vuex, Linter
# ? Use history mode for router? (Requires proper server setup for index fallback in production) No
# ? Pick a linter / formatter config: Prettier
# ? Pick additional lint features: (Press <space> to select, <a> to toggle all, <i> to invert selection)Lint on save
# ? Where do you prefer placing config for Babel, PostCSS, ESLint, etc.? In dedicated config files
# ? Save this as a preset for future projects? No

cd /opt/myapp/src/vue
npm install
npm run build
