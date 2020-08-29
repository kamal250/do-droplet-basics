module.exports = {
  title: 'DO Droplet Basics',
  tagline: 'Basics to prepare secure droplet for production ready environment',
  url: 'https://do-droplet-basics.netlify.app',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  favicon: 'img/favicon.ico',
  organizationName: 'iFlair Web Technologies', // Usually your GitHub org/user name.
  projectName: 'do-droplet-basics', // Usually your repo name.
  themeConfig: {
    navbar: {
      title: 'DO Droplet Basics',
      logo: {
        alt: 'Basics to prepare secure droplet for production ready environment',
        src: 'img/logo.svg',
      },
      items: [
        {
          to: 'docs/',
          activeBasePath: 'docs',
          label: 'Home',
          position: 'left',
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
              label: '1. Web Server (Apache/Nginx)',
              to: 'docs/web-server',
            },
            {
              label: '2. Server Script (PHP 7.2)',
              to: 'docs/server-script/',
            },
			{
              label: '3. Database (MariaDB)',
              to: 'docs/database/',
            },
			{
              label: '4. Firewall, Security & non-default SSH port',
              to: 'docs/firewall-security-and-non-default-ssh-port',
            },
          ],
        },
		{
          title: 'Docs',
          items: [
            {
              label: '5. Server timezone',
              to: 'docs/server-timezone',
            },
            {
              label: '6. SSL certificate (LetsEncrypt)',
              to: 'docs/ssl-certificate-letsencrypt/',
            },
			{
              label: '7. Swap memory',
              to: 'docs/swap-memory/',
            },
			{
              label: '8. sFTP (VSFTPD)',
              to: 'docs/sftp-vsftpd',
            },
          ],
        },
		{
          title: 'Docs',
          items: [
            {
              label: '9. SMTP (SendGrid)',
              to: 'docs/smtp-sendgrid',
            },
            {
              label: '10. HTTP2',
              to: 'docs/http2/',
            },
			{
              label: '11. MySQL Optimization',
              to: 'docs/mysql-optimization/',
            },
			{
              label: '12. PHP-FPM Optimization',
              to: 'docs/php-fpm-optimization',
            },
			{
              label: '13. Miscellaneous',
              to: 'docs/miscellaneous',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} do-droplet-basics - Built with Docusaurus and Love for iFlair and ilajna.`,
    },
  },
  presets: [
    [
      '@docusaurus/preset-classic',
      {
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl:
            'https://github.com/kamal250/do-droplet-basics/edit/master/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      },
    ],
  ],
};
