(window.webpackJsonp=window.webpackJsonp||[]).push([[10],{144:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return b}));var r=n(1),a=n(10),o=(n(0),n(165)),i={id:"cli-core-compile",title:"CLI Core Compile"},c={id:"api/cli-core-compile",title:"CLI Core Compile",description:"## CLI: PixelOven.Compile",source:"@site/docs/api/cli-core-compile.mdx",permalink:"/docs/api/cli-core-compile",editUrl:"https://github.com/pixeloven/pixeloven/tree/master/docusaurus/docs/docs/api/cli-core-compile.mdx",lastUpdatedBy:"Brian Gebel",lastUpdatedAt:1581098494,sidebar:"docs",previous:{title:"Intro",permalink:"/docs/getting-started/intro"},next:{title:"CLI Core Copy",permalink:"/docs/api/cli-core-copy"}},p=[{value:"CLI: PixelOven.Compile",id:"cli-pixelovencompile",children:[{value:"TypeScript",id:"typescript",children:[]}]}],l={rightToc:p};function b(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)("wrapper",Object(r.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"cli-pixelovencompile"},"CLI: PixelOven.Compile"),Object(o.b)("p",null,"Compile is a simple wrapper for standard JavaScript/TypeScript compilation. It currently acts as proxy for the TypeScript compiler."),Object(o.b)("h3",{id:"typescript"},"TypeScript"),Object(o.b)("table",null,Object(o.b)("thead",{parentName:"table"},Object(o.b)("tr",{parentName:"thead"},Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Argument"),Object(o.b)("th",Object(r.a)({parentName:"tr"},{align:null}),"Description"))),Object(o.b)("tbody",{parentName:"table"},Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"ts")),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"A proxy for the TypeScript compiler with a few opinionated defaults for easier setup.")),Object(o.b)("tr",{parentName:"tbody"},Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),Object(o.b)("inlineCode",{parentName:"td"},"tsx")),Object(o.b)("td",Object(r.a)({parentName:"tr"},{align:null}),"An alias for ",Object(o.b)("inlineCode",{parentName:"td"},"ts"),". Implemented to help differentiate JSX based projects.")))),Object(o.b)("h4",{id:"options"},"Options"),Object(o.b)("p",null,"For reference on all the available options please review the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/home.html"}),"official documentation")," for TypeScript. "),Object(o.b)("h4",{id:"setup"},"Setup"),Object(o.b)("p",null,"Be sure to create a ",Object(o.b)("strong",{parentName:"p"},"tsconfig.json")," file at the root of the project or in other words adjacent to the ",Object(o.b)("strong",{parentName:"p"},"package.json"),". "),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-json"}),'{\n    "compilerOptions": {\n        "rootDir": "./src",\n        "declarationDir": "./dist/types",\n        "outDir": "./dist/lib",\n    }\n}\n')),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"It is important to note that PixelOven makes a few assumptions for ease integration and will default to TypeScript's own default values if a config is not provided. The CLI will warn if this configuration is missing.")),Object(o.b)("p",null,"The above configuration file is not an exhaustive example but instead represents our recommendation for getting started. Please review the ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://www.typescriptlang.org/docs/handbook/tsconfig-json.html"}),"official documentation")," for more advanced configurations."),Object(o.b)("h4",{id:"usage"},"Usage"),Object(o.b)("p",null,"Once configured we can compile our source using a cmd similar what you see below."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"yarn runpixeloven compile ts\n")),Object(o.b)("p",null,"We can also target specific files."),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-bash"}),"yarn run pixeloven compile ts ./src/index.ts\n")),Object(o.b)("p",null,"TypeScript options can be passed through the CLI but it is highly recommended that this behavior be managed with in a ",Object(o.b)("strong",{parentName:"p"},"tsconfig.json")," file."))}b.isMDXComponent=!0},165:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return m}));var r=n(0),a=n.n(r);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function p(e,t){if(null==e)return{};var n,r,a=function(e,t){if(null==e)return{};var n,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||(a[n]=e[n]);return a}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(r=0;r<o.length;r++)n=o[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(a[n]=e[n])}return a}var l=a.a.createContext({}),b=function(e){var t=a.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},s=function(e){var t=b(e.components);return a.a.createElement(l.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},d=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,o=e.originalType,i=e.parentName,l=p(e,["components","mdxType","originalType","parentName"]),s=b(n),d=r,m=s["".concat(i,".").concat(d)]||s[d]||u[d]||o;return n?a.a.createElement(m,c({ref:t},l,{components:n})):a.a.createElement(m,c({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var p in t)hasOwnProperty.call(t,p)&&(c[p]=t[p]);c.originalType=e,c.mdxType="string"==typeof e?e:r,i[1]=c;for(var l=2;l<o;l++)i[l]=n[l];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);