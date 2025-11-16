import React, { useEffect, useState, useMemo } from "react";
import { createClient } from "../lib/supabase/client";
import { listSurveyResults } from "../db/surveyResults/crud";
import type { SurveyResultRow } from "../db/surveyResults/crud";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ChartContainer } from "./ui/chart";
import { Link } from "react-router-dom";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";

type ChartPoint = {
  label: string;
  overall: number;
  phishing: number;
  hygiene: number;
};

export default function PastResults() {
 
  const supabase = useMemo(() => createClient(), []);
  const [rows, setRows] = useState<SurveyResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);
  const [authMissing, setAuthMissing] = useState(false);
  

 useEffect(() => {
  let on = true;

  const isAuthError = (e: unknown) => {
    const msg = String((e as any)?.message ?? "").toLowerCase();
    const status = Number((e as any)?.status ?? (e as any)?.code ?? 0);
    return (
      msg.includes("auth") ||
      msg.includes("session") ||
      msg.includes("jwt") ||
      status === 401
    );
  };

  (async () => {
    const { rows, error } = await listSurveyResults(supabase);
    if (!on) return;

    if (error) {
      if (isAuthError(error)) {
        setAuthMissing(true);
      } else {
        setErr(error.message ?? "Failed to load results");
      }
    } else {
      setRows(rows);
    }
    setLoading(false);
  })();

  return () => {
    on = false;
  };
}, [supabase]);


  const data: ChartPoint[] = useMemo(() => {
    return rows.map((r, i) => {
      const d = new Date(r.created_at);
      const label = isNaN(d.getTime()) ? `Try ${i + 1}` : d.toLocaleDateString();
      return {
        label,
        overall: Number(r.overall_score ?? 0),
        phishing: Number(r.phishing_awareness ?? 0),
        hygiene: Number(r.basic_hygiene ?? 0),
      };
    });
  }, [rows]);

  // Shadcn chart config
  const config = {
    overall:  { label: "Overall",  color: "#a855f7" }, 
    phishing: { label: "Phishing", color: "#f97316" }, 
    hygiene:  { label: "Hygiene",  color: "#3b82f6" }, 
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Past Results</CardTitle>
      </CardHeader>
     <CardContent>
  {loading ? (
    <div className="text-sm text-muted-foreground">Loading…</div>
  ) : authMissing ? (
    <div className="text-sm text-muted-foreground">
      Log in to see past survey results.{" "}
      <Link to="/login" style={{ textDecoration: "underline" }}>
        Go to Login
      </Link>
    </div>
  ) : err ? (
    <div className="text-sm text-red-500">{err}</div>
  ) : data.length === 0 ? (
    <div className="text-sm text-muted-foreground">
      No results yet. Take the survey to see your chart here.
    </div>
  ) : (
    /* your existing <ChartContainer> … unchanged */
    <ChartContainer config={config} className="w-full">
      <div style={{ width: "100%", height: 320 }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={data} margin={{ top: 8, right: 12, bottom: 8, left: 0 }}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis domain={[0, 100]} tickCount={6} />
            <Tooltip />
            <Area
              type="monotone"
              dataKey="overall"
              name="Overall"
              stroke="var(--chart-1)"
              fill="var(--chart-1)"
              fillOpacity={0.15}
              strokeWidth={2}
              dot
            />
            <Area
              type="monotone"
              dataKey="phishing"
              name="Phishing"
              stroke="var(--chart-2)"
              fill="var(--chart-2)"
              fillOpacity={0.15}
              strokeWidth={2}
              dot
            />
            <Area
              type="monotone"
              dataKey="hygiene"
              name="Hygiene"
              stroke="var(--chart-3)"
              fill="var(--chart-3)"
              fillOpacity={0.15}
              strokeWidth={2}
              dot
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartContainer>
  )}
</CardContent>

    </Card>
  );
}
