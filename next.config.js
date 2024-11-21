module.exports = {
    async redirects() {
      return [
        {
          source: '/',
          destination: '/home',
          permanent: true, // Set to false for temporary redirects
        },
      ];
    },
  };
  