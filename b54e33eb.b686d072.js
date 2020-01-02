(window.webpackJsonp=window.webpackJsonp||[]).push([[17],{151:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return c})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return p}));var a=n(1),r=n(10),o=(n(0),n(159)),i={id:"intro",title:"Intro"},c={id:"contribution/intro",title:"Intro",description:"This document is meant to highlight best practices for contributing to the general PixelOven project. If you are looking for specifics on how to setup this project for development of `apps` or `packages` please review the [quick start guide](./quick-start-guide.md). Otherwise for ideas on how to go about working within our best practices please review our [integration docs](./integrating/index.md).",source:"@site/../docs/contribution/intro.md",permalink:"/docs/contribution/intro",editUrl:"https://github.com/pixeloven/pixeloven/tree/master/docusaurus/docs/../docs/contribution/intro.md",lastUpdatedBy:"Brian Gebel",lastUpdatedAt:1573758796,sidebar:"docs",previous:{title:"CLI Addon Webpack",permalink:"/docs/api/cli-addon-webpack"},next:{title:"Quick Start Guide",permalink:"/docs/contribution/quick-start-guide"}},l=[{value:"Table of Contents",id:"table-of-contents",children:[]},{value:"Requirements",id:"requirements",children:[{value:"Manually checking requirements",id:"manually-checking-requirements",children:[]}]},{value:"Recommended Development Approach",id:"recommended-development-approach",children:[{value:"Using shortcuts",id:"using-shortcuts",children:[]},{value:"Using Lerna",id:"using-lerna",children:[]}]},{value:"Committing",id:"committing",children:[{value:"Commit Linting",id:"commit-linting",children:[]},{value:"Commit Console",id:"commit-console",children:[]}]},{value:"Pull Requests",id:"pull-requests",children:[]}],s={rightToc:l},b="wrapper";function p(e){var t=e.components,n=Object(r.a)(e,["components"]);return Object(o.b)(b,Object(a.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"This document is meant to highlight best practices for contributing to the general PixelOven project. If you are looking for specifics on how to setup this project for development of ",Object(o.b)("inlineCode",{parentName:"p"},"apps")," or ",Object(o.b)("inlineCode",{parentName:"p"},"packages")," please review the ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/contribution/quick-start-guide"}),"quick start guide"),". Otherwise for ideas on how to go about working within our best practices please review our ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"./integrating/index.md"}),"integration docs"),"."),Object(o.b)("h2",{id:"table-of-contents"},"Table of Contents"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"#requirements"}),"Requirements")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"#recommended-development-approach"}),"Recommended Development Approach")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"#package-development"}),"Package Development")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"#committing"}),"Committing")),Object(o.b)("li",{parentName:"ul"},Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"#pull-requests"}),"Pull Requests"))),Object(o.b)("h2",{id:"requirements"},"Requirements"),Object(o.b)("p",null,"These steps will guide you through contributing to this project:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Ensure Node >= ",Object(o.b)("inlineCode",{parentName:"li"},"10.0.0")," and yarn >= ",Object(o.b)("inlineCode",{parentName:"li"},"1.0.0")),Object(o.b)("li",{parentName:"ul"},"Ensure ",Object(o.b)("a",Object(a.a)({parentName:"li"},{href:"https://yarnpkg.com/docs/install/"}),"yarn")," is installed"),Object(o.b)("li",{parentName:"ul"},"Clone repository and install dependencies")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note please ensure system has these minimum requirements or greater.")),Object(o.b)("h3",{id:"manually-checking-requirements"},"Manually checking requirements"),Object(o.b)("p",null,'Check "engine" requirements:'),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"node -v\n# v10.16.3\n")),Object(o.b)("p",null,"Please follow these official instructions to install ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://yarnpkg.com/docs/install/"}),"yarn")," for your specific system. "),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn -v\n# 1.17.3\n")),Object(o.b)("p",null,"Please follow these official instructions to install ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/lerna/lerna"}),"lerna")," globally."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"lerna -v\n# 3.16.4\n")),Object(o.b)("h2",{id:"recommended-development-approach"},"Recommended Development Approach"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note it is recommended to periodically re-install deps to ensure latest version during development.")),Object(o.b)("p",null,"When developing component(s) the recommended development workflow is as follows."),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"Build component in isolation using StoryBook"),Object(o.b)("li",{parentName:"ul"},"Write/Modify co-located unit tests for component(s)."),Object(o.b)("li",{parentName:"ul"},"Integrate component into application"),Object(o.b)("li",{parentName:"ul"},"Write/Modify integration tests that might utilize component(s)."),Object(o.b)("li",{parentName:"ul"},"Finally spin up ",Object(o.b)("strong",{parentName:"li"},"docker")," to verify application with back-end services.")),Object(o.b)("h3",{id:"using-shortcuts"},"Using shortcuts"),Object(o.b)("p",null,"The main project contains a few shortcuts for working with all packages. These ",Object(o.b)("em",{parentName:"p"},"scripts")," are helpful when making sweeping changes or testing the entire project but generally are not meant for an iterative workflow."),Object(o.b)("p",null,"In the root project directory run the following to compile packages."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"yarn packages:compile\n")),Object(o.b)("p",null,"Once compiled sym-links will need to be updated."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"yarn packages:link\n")),Object(o.b)("p",null,"For code quality checks and formatting the following ",Object(o.b)("em",{parentName:"p"},"scripts")," can be run."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"yarn packages:lint\nyarn packages:pretty\nyarn packages:test\n")),Object(o.b)("p",null,"Other variations of these ",Object(o.b)("em",{parentName:"p"},"scripts")," exist. Generally speaking all packages will follow a very similar pattern but it is possible that specialty packages may have other requirements. "),Object(o.b)("h3",{id:"using-lerna"},"Using Lerna"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"For the examples below ",Object(o.b)("inlineCode",{parentName:"p"},"{NAME}")," refers to the value found in each packages ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," under the key ",Object(o.b)("inlineCode",{parentName:"p"},"name"),".")),Object(o.b)("p",null,"When working with a specific package we can use ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/lerna/lerna/blob/master/README.md"}),"Lerna")," to help us manage our workflow and reduce the need from change directories often."),Object(o.b)("p",null,"From anywhere within the project you can compile a specific package with the following cmd."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'lerna run compile --scope "{NAME}"\n')),Object(o.b)("p",null,"Once compiled sym-links will need to be updated."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"lerna link\n")),Object(o.b)("p",null,"For code quality checks and formatting the following ",Object(o.b)("em",{parentName:"p"},"scripts")," can be run."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),'lerna run lint --scope "{NAME}"\nlerna run pretty --scope "{NAME}"\nlerna run test --scope "{NAME}"\n')),Object(o.b)("p",null,"Once again other variations of these ",Object(o.b)("em",{parentName:"p"},"scripts")," may exist. Please review the ",Object(o.b)("inlineCode",{parentName:"p"},"package.json")," in the root of this project for shortcuts. "),Object(o.b)("p",null,"It is highly encourage to read this ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/lerna/lerna/blob/master/README.md"}),"documentation")," for an in-depth look at how to work with lerna."),Object(o.b)("h2",{id:"committing"},"Committing"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note commit formatting is helpful for us for generating a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"CHANGELOG.md"}),"CHANGELOG")," so we know what goes into each tagged release. The actual version doesn't matter as much as tracking our changes in a highly discoverable way.")),Object(o.b)("h3",{id:"commit-linting"},"Commit Linting"),Object(o.b)("p",null,"When executing a standard commit ",Object(o.b)("inlineCode",{parentName:"p"},"git commit")," the pre-commit hook will check the format of the message ",Object(o.b)("inlineCode",{parentName:"p"},"-m"),"."),Object(o.b)("p",null,"Invalid commit might look like:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),'git commit -m "I did some work"\n')),Object(o.b)("p",null,"versus a valid commit:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),'git commit -m "chore: i did some work"\ngit commit -m "fix(XX-1000): i did some work"\n')),Object(o.b)("p",null,"Currently the linter will accept either of the above formats however knowing what starting tag to use may be more difficult. To facilitate this we can run an interactive console."),Object(o.b)("h3",{id:"commit-console"},"Commit Console"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Note this console is meant to guide your commits but is not necessary to commit code.  "),Object(o.b)("pre",{parentName:"blockquote"},Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-bash"}),"yarn commit\n"))),Object(o.b)("p",null,"To start you will be presented with a menu of commit tag types."),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{}),"feat:     A new feature \nfix:      A bug fix \ndocs:     Documentation only changes \nstyle:    Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc) \nrefactor: A code change that neither fixes a bug nor adds a feature \nperf:     A code change that improves performance \ntest:     Adding missing tests or correcting existing tests\nbuild:    Changes that affect the build system or external dependencies (example scopes: gulp, broccoli, npm) \nci:       Changes to our CI configuration files and scripts (example scopes: Travis, Circle, BrowserStack, SauceLabs) \nchore:    Other changes that don't modify src or test files \nrevert:   Reverts a previous commit \n")),Object(o.b)("p",null,"A few more options will be presented to help guide your commit."),Object(o.b)("h2",{id:"pull-requests"},"Pull Requests"),Object(o.b)("p",null,"Keep in mind that this project is a mono-repo design. If you encounter any issue when running scripts it is recommended to run ",Object(o.b)("inlineCode",{parentName:"p"},"yarn clean")," at the root of this project and re run the setup above."),Object(o.b)("p",null,'Make both your branches and commits descriptive. Ensure "lerna" commands such as ',Object(o.b)("inlineCode",{parentName:"p"},"lerna run build")," and ",Object(o.b)("inlineCode",{parentName:"p"},"lerna run test")," work properly before submitting a pull request."),Object(o.b)("p",null,"Finally send a ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://github.com/pixeloven/pixeloven/compare?expand=1"}),"GitHub Pull Request")," with a clear list of what you've done (read more ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://help.github.com/articles/about-pull-requests/"}),"about pull requests"),"). Make sure all of your commits are atomic (one feature per commit)."))}p.isMDXComponent=!0},159:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return h}));var a=n(0),r=n.n(a);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function i(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,a)}return n}function c(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?i(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,a,r=function(e,t){if(null==e)return{};var n,a,r={},o=Object.keys(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||(r[n]=e[n]);return r}(e,t);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);for(a=0;a<o.length;a++)n=o[a],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(r[n]=e[n])}return r}var s=r.a.createContext({}),b=function(e){var t=r.a.useContext(s),n=t;return e&&(n="function"==typeof e?e(t):c({},t,{},e)),n},p=function(e){var t=b(e.components);return r.a.createElement(s.Provider,{value:t},e.children)},u="mdxType",m={inlineCode:"code",wrapper:function(e){var t=e.children;return r.a.createElement(r.a.Fragment,{},t)}},d=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,i=e.parentName,s=l(e,["components","mdxType","originalType","parentName"]),p=b(n),u=a,d=p["".concat(i,".").concat(u)]||p[u]||m[u]||o;return n?r.a.createElement(d,c({ref:t},s,{components:n})):r.a.createElement(d,c({ref:t},s))}));function h(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,i=new Array(o);i[0]=d;var c={};for(var l in t)hasOwnProperty.call(t,l)&&(c[l]=t[l]);c.originalType=e,c[u]="string"==typeof e?e:a,i[1]=c;for(var s=2;s<o;s++)i[s]=n[s];return r.a.createElement.apply(null,i)}return r.a.createElement.apply(null,n)}d.displayName="MDXCreateElement"}}]);