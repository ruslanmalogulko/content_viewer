var testsContext = require.context('./app', true, /-test\.js[x]$/);
testsContext.keys().forEach(testsContext);

var srcContext = require.context('./app', true, /^((?!__tests__).)*.js[x]$/);
srcContext.keys().forEach(srcContext);
