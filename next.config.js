/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oyeavwuqlbhrqjkmxyly.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/article-images/**',
      },
    ],
  },
}

module.exports = nextConfig
