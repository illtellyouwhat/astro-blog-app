/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly PUBLIC_ENABLE_COMMENTS?: string;
  readonly PUBLIC_UTTERANCES_REPO?: string;
  readonly PUBLIC_UTTERANCES_LABEL?: string;
  readonly PUBLIC_UTTERANCES_THEME?: string;
  readonly PUBLIC_PLAUSIBLE_DOMAIN?: string;
  readonly PUBLIC_PLAUSIBLE_API?: string;
  readonly PUBLIC_PLAUSIBLE_SCRIPT?: string;
  readonly PUBLIC_PLAUSIBLE_DNT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
