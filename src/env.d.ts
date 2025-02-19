/// <reference path="../.astro/types.d.ts" />

interface ImportMetaEnv {
  readonly PUBLIC_API_BASE_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}