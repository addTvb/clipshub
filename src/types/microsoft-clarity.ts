declare global {
  interface Window {
    clarity?: {
      (command: string, ...args: unknown[]): void;
    };
  }
}

export interface ClarityUserProperties {
  email?: string;
  name?: string;
  surname?: string;
  type?: string;
  [key: string]: string | number | boolean | undefined;
}

export interface ClarityEventProperties {
  [key: string]: string | number | boolean | undefined;
}

export interface ClarityConfig {
  projectId: string;
  enableHeatmap?: boolean;
  enableSessionRecording?: boolean;
} 