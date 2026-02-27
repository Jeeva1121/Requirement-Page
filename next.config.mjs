/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['three'],
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'images.unsplash.com',
            },
            {
                protocol: 'https',
                hostname: 'cdn3d.iconscout.com',
            },
            {
                protocol: 'https',
                hostname: 'i.pinimg.com',
            }
        ],
    },
};

export default nextConfig;
