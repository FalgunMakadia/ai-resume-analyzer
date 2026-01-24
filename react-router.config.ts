import type { Config } from "@react-router/dev/config";

export default {
  // Config options...
  // Server-side render by default, to enable SPA mode set this to `false`
  // ssr must be set to "false" before creating a production build using "npm run build"
  ssr: false,
} satisfies Config;
