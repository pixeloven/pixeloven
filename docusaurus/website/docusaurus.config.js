/**
 * @todo Setup prettier and what not... would be nice to use some of our own CLI to manage this
 */
const siteConfig = {
  title: 'PixelOven',
  tagline: 'A modern CLI for production ready JavaScript applications.',
  url: 'https://pixeloven.com',
  baseUrl: '/',
  projectName: 'pixeloven',
  organizationName: 'pixeloven',
  favicon: 'img/favicon/favicon.ico',
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          path: '../docs',
          sidebarPath: require.resolve('./sidebars.json'),
          editUrl:
            'https://github.com/pixeloven/pixeloven/tree/master/docusaurus/docs',
          showLastUpdateAuthor: true,
          showLastUpdateTime: true,
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
  themeConfig: {
    // image: 'img/logo-og.png', // What is this for ?
    navbar: {
      title: 'PixelOven',
      logo: {
        alt: 'PixelOven Logo',
        src: 'img/logo.svg',
      },
      links: [
        { 
          to: 'docs/getting-started', 
          label: 'Docs', 
          position: 'right'
        },
        {
          href: 'https://github.com/pixeloven/pixeloven',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Docs',
          items: [
            {
              label: 'Get Started',
              to: 'docs/getting-started',
            },
            {
              label: 'Learn React',
              href: 'https://reactjs.org/',
            },
          ],
        },
        {
          // Add links for typescript, jest, webpack etc
          title: 'Community',
          items: [
            {
              label: 'Stack Overflow',
              href:
                'https://stackoverflow.com/questions/tagged/pixeloven',
            },
            {
              label: 'Twitter',
              href: 'https://twitter.com/pixeloven',
            },
            {
              label: 'Contributor Covenant',
              href:
                'https://www.contributor-covenant.org/version/1/4/code-of-conduct',
            },
          ],
        },
        {
          title: 'Social',
          items: [
            {
              label: 'GitHub',
              href: 'https://github.com/pixeloven/pixeloven',
            },
          ],
        },
      ],
    },
  },
};

module.exports = siteConfig;
