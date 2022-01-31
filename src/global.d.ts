/// <reference types="react-dom/experimental" />
/// <reference types="react/experimental" />

declare namespace Express {
  export interface Application {
    handle: (req: any, res: any) => void;
  }
}

declare module '*.module.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.svg' {
  const src: string;
  export default src;
}

interface BeforeInstallPromptEvent extends Event {
  readonly platforms: Array<string>;
  readonly userChoice: Promise<{
    outcome: 'accepted' | 'dismissed';
    platform: string;
  }>;
  prompt(): Promise<void>;
}
