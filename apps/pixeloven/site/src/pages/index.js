import React from "react";
import Link from "@docusaurus/Link";
import useDocusaurusContext from "@docusaurus/useDocusaurusContext";
import useBaseUrl from "@docusaurus/useBaseUrl";

import Layout from "@theme/Layout";
import CodeBlock from "@theme/CodeBlock";

import classnames from "classnames";

/**
 * Move these into the JSX and just abstract into components. I want to add some links in the text
 */
const features = [
    {
        title: "Modular Design",
        content:
            "PixelOven is split into a single core CLI with numerous addons for more specific needs. These addons include storybook, webpack and other important development tools.",
    },
    {
        title: "Production Ready",
        content:
            "Our primary focus is to provide tooling to drive scalable & production ready applications. We support SSR, TypeScript for type safety and other features to ensure build quality.",
    },
    {
        title: "Community Driven",
        content:
            "Our tooling is built on top the best the community has to offer including Babel, TypeScript, Jest, Prettier, Webpack, and many other amazing projects to power your application.",
    },
];

function Home() {
    const context = useDocusaurusContext();
    const { siteConfig = {} } = context;

    return (
        <Layout
            permalink={"/"}
            description={
                "A modern CLI for production ready JavaScript applications."
            }
        >
            <div className={classnames("hero", "hero--dark")}>
                <div className="container">
                    {/* <img
            className={classnames("logo", "margin-vert--md")}
            src={useBaseUrl("img/logo.svg")}
          /> */}
                    <h1 className="hero__title">{siteConfig.title}</h1>
                    <p className="hero__subtitle">{siteConfig.tagline}</p>
                    <div className={classnames("get-started")}>
                        <Link
                            className="button button--outline button--primary button--lg"
                            to={useBaseUrl("docs/getting-started/intro")}
                        >
                            Get Started
                        </Link>
                    </div>
                </div>
            </div>
            {features && features.length && (
                <div className={"features"}>
                    <div className="container">
                        <div className="row">
                            {features.map(({ title, content }, idx) => (
                                <div
                                    key={idx}
                                    className={classnames(
                                        "col col--4",
                                        "features",
                                    )}
                                >
                                    <h2>{title}</h2>
                                    <p>{content}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
            <div className={"section--alt"}>
                <div className="container padding-vert--xl text--left">
                    <div className="row">
                        <div className="col col--4 col--offset-1">
                            <h2>Get started in seconds</h2>
                            <p>
                                PixelOven makes it easy to focus on what
                                matters. Keep your{" "}
                                <strong>application moving forward</strong> and
                                let us handle the tooling. We provide everything
                                your team needs to build a{" "}
                                <strong>production</strong> ready{" "}
                                <strong>scalable</strong> application.
                                <br />
                                <br />
                                To create a project called <i>my-app</i>, run
                                this command:
                            </p>
                            <CodeBlock className="language-sh">
                                npx @pixeloven/cli init
                            </CodeBlock>
                            <br />
                            <p>
                                If you prefer to install pixeloven globally the
                                run the following cmd:
                            </p>
                            <CodeBlock className="language-sh">
                                npm i -g @pixeloven/cli
                            </CodeBlock>
                            <br />
                            <p>
                                Followed by our boostrapping script in your
                                desired workspace:
                            </p>
                            <CodeBlock className="language-sh">
                                pixeloven init
                            </CodeBlock>
                            <br />
                            <p>
                                For new and existing projects please review our
                                documentation for tips on{" "}
                                <Link
                                    to={useBaseUrl(
                                        "docs/getting-started/intro",
                                    )}
                                >
                                    getting started
                                </Link>
                                .
                            </p>
                        </div>
                        <div className="col col--5 col--offset-1">
                            <img
                                width="75%"
                                className={"grayscale"}
                                src={"img/rocket.svg"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className={"section"}>
                <div className="container padding-vert--xl text--left">
                    <div className="row">
                        <div className="col col--4 col--offset-1">
                            <img
                                width="100%"
                                className={"grayscale"}
                                src={"img/toolbox.svg"}
                            />
                        </div>
                        <div className="col col--5 col--offset-1">
                            <h2>Easy to Maintain</h2>
                            <p>
                                PixelOven's strength is in it's modular design.
                                The CLI is broken up into to single main package
                                and a number of addons for more specific
                                requirements.
                                <br />
                                <br />
                                Updating the core package is as easy as:
                            </p>
                            <CodeBlock className="language-sh">
                                npm install @pixeloven/cli@latest
                            </CodeBlock>
                            <br />
                            <p>
                                Addons can be upgrade in the same way and we
                                strive to version our addons, packages and
                                dependencies in a manner that is clear and
                                secure.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"section--alt"}>
                <div className="container padding-vert--xl text--left">
                    <div className="row">
                        <div className="col col--4 col--offset-1">
                            <h2>PixelOven loves modularity</h2>
                            <p>
                                PixelOven loves <strong>modularity</strong>. Our
                                core CLI is extended by some specialized{" "}
                                <strong>addons</strong> to support advanced
                                tooling needs while keeping maintainability.
                                <br />
                                <br />
                                However, we didn't stop there. PixelOven is
                                design to allow the community to write their own
                                addons to further extend PixelOven. Our hope is
                                that people will want to contribute back to this
                                project but we also understand that this is not
                                always possible.
                                <br />
                                <br />
                                Whether your addons are for other amazing{" "}
                                <strong>open source</strong> projects or private
                                enterprise we leave that to you... but really it
                                should be open ;).
                            </p>
                        </div>
                        <div className="col col--5 col--offset-1">
                            <CodeBlock className="language-json">
                                {JSON.stringify(
                                    {
                                        "@pixeloven/cli": "6.1.0",
                                        "@pixeloven/cli-addon-generators":
                                            "6.1.0",
                                        "@pixeloven/cli-addon-storybook":
                                            "6.1.0",
                                        "@pixeloven/cli-addon-webpack": "6.1.0",
                                        "@my-project/cli-pixeloven-addon-fancy":
                                            "1.0.0",
                                    },
                                    null,
                                    4,
                                )}
                            </CodeBlock>
                            <br />
                            <p>
                                Besides our CLI options PixelOven offers a
                                number of simple abstractions to help user's
                                start working with these great tools faster.
                            </p>
                            <CodeBlock className="language-json">
                                {JSON.stringify(
                                    {
                                        "@pixeloven-react/common": "6.1.0",
                                        "@pixeloven-react/routing": "6.1.0",
                                    },
                                    null,
                                    4,
                                )}
                            </CodeBlock>
                        </div>
                    </div>
                </div>
            </div>
            <div className={"section"}>
                <div className="container padding-vert--xl text--left">
                    <div className="row">
                        <div className="col col--4 col--offset-1">
                            <div className="community-stack">
                                <img
                                    width="45%"
                                    className={"community-item--one grayscale"}
                                    src={"img/storybook.svg"}
                                />
                                <img
                                    width="55%"
                                    className={"community-item--two grayscale"}
                                    src={"img/jest.svg"}
                                />
                                <img
                                    width="90%"
                                    className={
                                        "community-item--three grayscale"
                                    }
                                    src={"img/react.svg"}
                                />
                            </div>
                        </div>
                        <div className="col col--5 col--offset-1">
                            <h2>Community Driven</h2>
                            <p>
                                Our goal is to not replace these amazing
                                community tools but instead fill in the gaps to
                                make it a fun and seamless experience.
                                <br />
                                <br />
                                Besides our CLI options PixelOven offers a
                                number of simple abstractions to help user's
                                start working with these great tools faster.
                            </p>
                            <p>
                                If you are feeling really adventurous much of
                                our CLI functionality can be used in a more
                                standalone fashion. Everything from the
                                development webpack server to simple core
                                functions is all up for grabs.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    );
}

export default Home;
