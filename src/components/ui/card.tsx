import * as React from "react";
import { cn } from "../../lib/utils"

export function Card(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      {...props}
      className={`rounded-xl border bg-background text-foreground shadow ${props.className ?? ""}`}
    />
  );
}

export function CardHeader(props: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div {...props} className={`flex flex-col space-y-1.5 p-6 ${props.className ?? ""}`} />
  );
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return (
    <h3
      {...props}
      className={`text-2xl font-semibold leading-none tracking-tight ${props.className ?? ""}`}
    />
  );
}

export function CardContent(props: React.HTMLAttributes<HTMLDivElement>) {
  return <div {...props} className={`p-6 pt-0 ${props.className ?? ""}`} />;
}
