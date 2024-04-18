/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'vz-2ccce63c-c5a.b-cdn.net',
            
          },
        ],
      },
};

export default nextConfig;
