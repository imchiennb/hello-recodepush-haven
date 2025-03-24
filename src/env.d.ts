/// <reference types="vite/client" />

interface ImportMetaEnv {
  // add prefix with VITE_APP_ if the env exposed on the client
  readonly PORT: number;
  // more env variables...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
