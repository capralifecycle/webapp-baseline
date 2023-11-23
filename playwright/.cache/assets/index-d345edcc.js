import { r as reactExports, g as getDefaultExportFromCjs } from './index-ed91c96d.js';
import { Link } from './index-eb6da4ca.js';

var jsxRuntime$2 = {exports: {}};

var reactJsxRuntime_production_min = {};

/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

'use strict';var f=reactExports,k=Symbol.for("react.element"),l=Symbol.for("react.fragment"),m=Object.prototype.hasOwnProperty,n=f.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,p={key:!0,ref:!0,__self:!0,__source:!0};
function q(c,a,g){var b,d={},e=null,h=null;void 0!==g&&(e=""+g);void 0!==a.key&&(e=""+a.key);void 0!==a.ref&&(h=a.ref);for(b in a)m.call(a,b)&&!p.hasOwnProperty(b)&&(d[b]=a[b]);if(c&&c.defaultProps)for(b in a=c.defaultProps,a)void 0===d[b]&&(d[b]=a[b]);return {$$typeof:k,type:c,key:e,ref:h,props:d,_owner:n.current}}var Fragment = reactJsxRuntime_production_min.Fragment=l;var jsx = reactJsxRuntime_production_min.jsx=q;var jsxs = reactJsxRuntime_production_min.jsxs=q;

var jsxRuntime = jsxRuntime$2.exports;

'use strict';

if ("production" === 'production') {
  jsxRuntime$2.exports = reactJsxRuntime_production_min;
} else {
  module.exports = require('./cjs/react-jsx-runtime.development.js');
}

var jsxRuntimeExports = jsxRuntime$2.exports;
const jsxRuntime$1 = /*@__PURE__*/getDefaultExportFromCjs(jsxRuntimeExports);

const container = "_container_1oq48_1";
const highlight = "_highlight_1oq48_10";
const styles = {
	container: container,
	highlight: highlight
};

var Environment = /* @__PURE__ */ ((Environment2) => {
  Environment2["LOCAL"] = "LOCAL";
  Environment2["DEV"] = "DEV";
  Environment2["STAGING"] = "STAGING";
  Environment2["PROD"] = "PROD";
  return Environment2;
})(Environment || {});
const envToConfigMap = {
  ["LOCAL" /* LOCAL */]: {
    apiUrl: "http://localhost:8080",
    environment: "LOCAL" /* LOCAL */
  },
  ["DEV" /* DEV */]: {
    apiUrl: "",
    environment: "DEV" /* DEV */
  },
  ["STAGING" /* STAGING */]: {
    apiUrl: "",
    environment: "STAGING" /* STAGING */
  },
  ["PROD" /* PROD */]: {
    apiUrl: "",
    environment: "PROD" /* PROD */
  }
};
const getEnvironment = (origin) => {
  if (/^https:\/\/(www\.){0,1}dev/.test(origin)) {
    return "DEV" /* DEV */;
  } else if (/^https:\/\/(www\.){0,1}staging/.test(origin)) {
    return "STAGING" /* STAGING */;
  } else if (/^https:\/\//.test(origin)) {
    return "PROD" /* PROD */;
  }
  return "LOCAL" /* LOCAL */;
};
const getConfig = (origin = window.origin) => {
  const environment = getEnvironment(origin);
  return envToConfigMap[environment];
};

const WelcomeMessage = ({
  appName = __BUILD_INFO__.appName,
  appBuildTime = __BUILD_INFO__.appBuildTime,
  commitHash = __BUILD_INFO__.commitHash
}) => {
  const config = getConfig();
  return /* @__PURE__ */ jsxRuntimeExports.jsxs("div", { className: styles.container, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsxs("h1", { id: "welcome-message", children: [
      "Welcome to ",
      /* @__PURE__ */ jsxRuntimeExports.jsx("span", { className: styles.highlight, children: appName }),
      "."
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsxs("p", { "data-testid": "version-info", children: [
      "Built ",
      appBuildTime,
      " from commit ",
      commitHash,
      " and is running in",
      " ",
      config.environment
    ] }),
    /* @__PURE__ */ jsxRuntimeExports.jsx("p", { children: /* @__PURE__ */ jsxRuntimeExports.jsx(Link, { to: "/about/details", children: "Details" }) })
  ] });
};
const WelcomeMessage$1 = WelcomeMessage;

export { WelcomeMessage$1 as default };
//# sourceMappingURL=index-d345edcc.js.map
