(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{133:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return c})),n.d(t,"metadata",(function(){return s})),n.d(t,"rightToc",(function(){return i})),n.d(t,"default",(function(){return p}));var r=n(1),o=n(10),a=(n(0),n(165)),c={id:"cli-core-test",title:"CLI Core Test"},s={id:"api/cli-core-test",title:"CLI Core Test",description:"## CLI: PixelOven.Test",source:"@site/docs/api/cli-core-test.mdx",permalink:"/docs/api/cli-core-test",editUrl:"https://github.com/pixeloven/pixeloven/tree/master/docusaurus/docs/docs/api/cli-core-test.mdx",lastUpdatedBy:"Brian Gebel",lastUpdatedAt:1581095691,sidebar:"docs",previous:{title:"CLI Core Pretty",permalink:"/docs/api/cli-core-pretty"},next:{title:"CLI Addon Generators",permalink:"/docs/api/cli-addon-generators"}},i=[{value:"CLI: PixelOven.Test",id:"cli-pixeloventest",children:[{value:"Jest",id:"jest",children:[]}]}],l={rightToc:i};function p(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(a.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(a.b)("h2",{id:"cli-pixeloventest"},"CLI: PixelOven.Test"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"NOTICE: This feature will be removed from the core cli and become an addon in a future update.")),Object(a.b)("p",null,"Test is a simple wrapper for testing JavaScript applications. It currently acts as proxy for the Jest compiler and comes with a dependecies to make it more compatible with TypeScript."),Object(a.b)("h3",{id:"jest"},"Jest"),Object(a.b)("blockquote",null,Object(a.b)("p",{parentName:"blockquote"},"It is important to note that currently this feature expects a ",Object(a.b)("strong",{parentName:"p"},"jest.json")," file to be present at the root of the package to configure the compiler.")),Object(a.b)("p",null,"For reference on all the available configurations please review the ",Object(a.b)("a",Object(r.a)({parentName:"p"},{href:"https://jestjs.io/"}),"official documentation")," for Jest. "),Object(a.b)("h4",{id:"setup"},"Setup"),Object(a.b)("p",null,"First be sure to create a ",Object(a.b)("strong",{parentName:"p"},"jest.json")," file at the root of the project or in other words adjacent to the ",Object(a.b)("strong",{parentName:"p"},"package.json"),"."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n    "bail": true,\n    "collectCoverageFrom": [\n        "!<rootDir>/**/*.stories.{js,jsx,ts,tsx}",\n        "!<rootDir>/**/*.test.{js,jsx,ts,tsx}",\n        "<rootDir>/**/*.{js,jsx,ts,tsx}"\n    ],\n    "coverageDirectory": "<rootDir>/../coverage",\n    "coverageThreshold": {\n        "global": {\n            "branches": 0,\n            "functions": 0,\n            "lines": 0,\n            "statements": 0\n        }\n    },\n    "moduleFileExtensions": [\n        "js",\n        "json",\n        "jsx",\n        "ts",\n        "tsx"\n    ],\n    "preset": "ts-jest",\n    "rootDir": "./src",\n    "testEnvironment": "node",\n    "testMatch": [\n        "<rootDir>/**/*.test.(j|t)s?(x)"\n    ],\n    "transform": {\n        "^.+\\\\.(ts|tsx)$": "ts-jest"\n    },\n    "transformIgnorePatterns": [\n        "[/\\\\\\\\]node_modules[/\\\\\\\\].+\\\\.(js|jsx|mjs|ts|tsx)$"\n    ],\n    "verbose": true\n  }\n')),Object(a.b)("h4",{id:"usage"},"Usage"),Object(a.b)("p",null,"Once this has been confirmed all we have to do is run the following."),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"yarn run pixeloven test --watch\n")),Object(a.b)("p",null,"or perhaps as part of a CI workflow:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"yarn run pixeloven test --ci --coverage\n")),Object(a.b)("p",null,"Jest has an extensive CLI and so it is recommended to review their documentation for all the available options. Proper configuration through ",Object(a.b)("strong",{parentName:"p"},"jest.json")," is also highly recommended."))}p.isMDXComponent=!0},165:function(e,t,n){"use strict";n.d(t,"a",(function(){return u})),n.d(t,"b",(function(){return j}));var r=n(0),o=n.n(r);function a(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function c(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?c(Object(n),!0).forEach((function(t){a(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):c(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function i(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),p=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},u=function(e){var t=p(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},b={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},d=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=i(e,["components","mdxType","originalType","parentName"]),u=p(n),d=r,j=u["".concat(c,".").concat(d)]||u[d]||b[d]||a;return n?o.a.createElement(j,s({ref:t},l,{components:n})):o.a.createElement(j,s({ref:t},l))}));function j(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var a=n.length,c=new Array(a);c[0]=d;var s={};for(var i in t)hasOwnProperty.call(t,i)&&(s[i]=t[i]);s.originalType=e,s.mdxType="string"==typeof e?e:r,c[1]=s;for(var l=2;l<a;l++)c[l]=n[l];return o.a.createElement.apply(null,c)}return o.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);