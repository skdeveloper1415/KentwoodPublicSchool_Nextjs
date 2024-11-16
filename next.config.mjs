/** @type {import('next').NextConfig} */
const nextConfig = {
    eslint: {
        ignoreDuringBuilds: true,
    },

    output: 'export',
    env: {
        //  local
        // REACT_APP_URI: 'https://localhost:8081/',

        //  GCP
        // REACT_APP_URI: 'https://kpsdashboardapi-907595010328.us-west1.run.app/',

        // GCP_new
        REACT_APP_URI: 'https://kpsdashboardapi-wckqd7o3eq-uw.a.run.app/',

        // Production
        // REACT_APP_URI: 'https://35.225.168.65:8081'
        // REACT_APP_URI: 'https://strategicplan.kentwoodps.org/'


    },

    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                pathname: '**',
            },
        ],
        unoptimized: true,
    },
    reactStrictMode: false,

};

export default nextConfig;
