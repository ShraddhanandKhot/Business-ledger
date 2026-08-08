import type { NextConfig } from "next";
import withPWA from 'next-pwa'

const pwaConfig = {
  dest: 'public',
  disable: process.env.NODE_ENV === 'development',
  register: false,
}

const nextConfig: NextConfig = {
  turbopack: {},
};

export default withPWA(pwaConfig)(nextConfig as any);