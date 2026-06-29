/// <reference types="vite/client" />

declare module '*.jpg' {
  const src: string;
  export default src;
}

declare module '*.jpeg' {
  const src: string;
  export default src;
}

declare module '*.png' {
  const src: string;
  export default src;
}

// Cloudflare Pages Functions Global Types for tsc --noEmit compatibility
interface EventContext<Env, Params extends string, Data> {
  request: Request;
  env: Env;
  params: Record<Params, string>;
  data: Data;
  next: (input?: Request | string, init?: RequestInit) => Promise<Response>;
}

type PagesFunction<Env = any, Params extends string = any, Data extends Record<string, any> = any> = (
  context: EventContext<Env, Params, Data>
) => Response | Promise<Response>;
