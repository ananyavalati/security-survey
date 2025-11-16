//  helpers adapted from shadcn/ui charts examples

import * as React from "react"
import { cn } from "../../lib/utils"

type ChartConfig = Record<
  string,
  {
    label: string
    color?: string 
  }
>

export function ChartContainer({
  config,
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement> & { config: ChartConfig }) {
  type StyleVars = React.CSSProperties & Record<string, string>
const styleVars: StyleVars = {}

Object.entries(config).forEach(([_key, cfg], idx) => {
  const varName = cfg.color ?? `--chart-${idx + 1}`
  styleVars[varName] = `var(${varName})`
})

  return (
    <div
      className={cn("w-full h-full", className)}
      style={styleVars}
      {...props}
    >
      {children}
    </div>
  )
}

export function ChartLegend({
  className,
  children,
  ...props
}: React.HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-3 text-sm text-muted-foreground",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
}

export function ChartLegendItem({
  colorVar,
  children,
}: {
  colorVar: string 
  children: React.ReactNode
}) {
  return (
    <div className="inline-flex items-center gap-2">
      <span
        className="inline-block h-3 w-3 rounded-sm"
        style={{ background: `var(${colorVar})` }}
      />
      <span>{children}</span>
    </div>
  )
}


export function ChartTooltip({
  children,
}: {
  children: React.ReactNode
}) {
  return <>{children}</>
}
