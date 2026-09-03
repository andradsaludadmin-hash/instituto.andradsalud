import { defineConfig } from "vite";
import viteReact from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfigPaths from "vite-tsconfig-paths";
import { tanstackStart } from "@tanstack/react-start/plugin/vite";
import { nitro } from "nitro/vite";

// Config standalone (sin @lovable.dev/vite-tanstack-config) para poder
// targetear Vercel de forma explícita y predecible. El wrapper de Lovable
// fuerza el preset "cloudflare-module" salvo que se lo pise a mano, así que
// acá lo pisamos directamente con el preset "vercel" de Nitro.
export default defineConfig({
  plugins: [
    tailwindcss(),
    tsConfigPaths({ projects: ["./tsconfig.json"] }),
    tanstackStart({
      // Usa el server entry por defecto de TanStack Start (compatible con
      // cualquier preset de Nitro). El entry custom en src/server.ts que
      // existía antes estaba escrito específicamente para el formato de
      // Cloudflare Workers (fetch(request, env, ctx)) y no aplica acá.
      importProtection: {
        behavior: "error",
        client: {
          files: ["**/server/**"],
          specifiers: ["server-only"],
        },
      },
    }),
    nitro({
      preset: "vercel",
    }),
    viteReact(),
  ],
  css: {
    transformer: "lightningcss",
  },
  resolve: {
    dedupe: [
      "react",
      "react-dom",
      "react/jsx-runtime",
      "react/jsx-dev-runtime",
      "@tanstack/react-query",
      "@tanstack/query-core",
    ],
  },
  server: {
    host: "::",
    port: 8080,
    // Proxy solo para desarrollo local contra un WordPress corriendo en la
    // máquina del desarrollador. La URL sale de VITE_WP_API_BASE (.env),
    // nunca hardcodeada. Si no está seteada, el proxy queda inactivo.
    ...(process.env["VITE_WP_API_BASE"]
      ? {
          proxy: {
            "/wp-admin": {
              target: process.env["VITE_WP_API_BASE"],
              changeOrigin: true,
            },
            "/wp-json": {
              target: process.env["VITE_WP_API_BASE"],
              changeOrigin: true,
            },
          },
        }
      : {}),
  },
});
