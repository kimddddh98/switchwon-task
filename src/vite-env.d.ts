/// <reference types="vite-plugin-svgr/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string
  readonly VITE_API_PROXY_URL: string
  readonly VITE_WEB_BASE_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
