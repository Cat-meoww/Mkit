import adapter from "@sveltejs/adapter-auto";

/** @type {import('@sveltejs/kit').Config} */

const config = {
  kit: {
    adapter: adapter(),
    alias: {
      $Components: "./src/lib/Components",
      $db: "./src/lib/server/db",
    },
  },
  csrf: {
    checkOrigin: true,
  },
};

export default config;
