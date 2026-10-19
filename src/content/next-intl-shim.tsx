import React, { type ReactNode } from "react";
import en from "src/messages/en.json";

type Messages = typeof en;
type Values = Record<string, string | number | Date>;
type RichComponents = Record<
  string,
  (chunks: ReactNode) => ReactNode
>;

function getByPath(obj: unknown, path: string): unknown {
  return path.split(".").reduce<unknown>((acc, key) => {
    if (acc && typeof acc === "object" && key in acc) {
      return (acc as Record<string, unknown>)[key];
    }
    return undefined;
  }, obj);
}

function interpolate(template: string, values?: Values): string {
  if (!values) return template;
  return template.replace(/\{(\w+)\}/g, (_, key: string) => {
    const value = values[key];
    return value == null ? "" : String(value);
  });
}

function renderRich(
  template: string,
  components: RichComponents,
  values?: Values
): ReactNode {
  const text = interpolate(template, values);
  const tagRegex = /<(\w+)>([\s\S]*?)<\/\1>/g;
  const nodes: ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;
  let key = 0;

  while ((match = tagRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      nodes.push(text.slice(lastIndex, match.index));
    }
    const [, tag, inner] = match;
    const render = components[tag];
    nodes.push(
      <React.Fragment key={key++}>
        {render ? render(inner) : inner}
      </React.Fragment>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    nodes.push(text.slice(lastIndex));
  }

  return nodes.length === 1 ? nodes[0] : <>{nodes}</>;
}

export type Translator = ((key: string, values?: Values) => string) & {
  rich: (key: string, components: RichComponents & { [key: string]: unknown }) => ReactNode;
  raw: (key: string) => unknown;
};

export function useTranslations(namespace?: string): Translator {
  const translate = ((key: string, values?: Values) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const value = getByPath(en, fullKey);
    if (typeof value !== "string") {
      return fullKey;
    }
    return interpolate(value, values);
  }) as Translator;

  translate.rich = (key, components) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    const value = getByPath(en, fullKey);
    if (typeof value !== "string") {
      return fullKey;
    }
    const { ...tags } = components as RichComponents;
    return renderRich(value, tags);
  };

  translate.raw = (key: string) => {
    const fullKey = namespace ? `${namespace}.${key}` : key;
    return getByPath(en, fullKey);
  };

  return translate;
}

export function useLocale(): string {
  return "en";
}

export function NextIntlClientProvider({
  children,
}: {
  children: ReactNode;
  locale?: string;
  messages?: Messages;
  timeZone?: string;
  onError?: (error: unknown) => void;
  getMessageFallback?: (info: unknown) => string;
}) {
  return <>{children}</>;
}

export const IntlErrorCode = {
  MISSING_MESSAGE: "MISSING_MESSAGE",
} as const;
