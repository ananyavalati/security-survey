import React, { useEffect, useMemo, useState } from "react";
import { createClient } from "../lib/supabase/client";
import { listSurveyResults } from "../db/surveyResults/crud";
import type { SurveyResultRow } from "../db/surveyResults/crud";
import { Card, CardHeader, CardTitle, CardContent } from "./ui/card";
import { ChartContainer } from "./ui/chart";
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
  overallNum: number;
  phishingNum: number;
  hygieneNum: number;
};

function endOfDayIso(localDateYYYYMMDD: string) {
  const d = new Date(localDateYYYYMMDD);
  d.setHours(23, 59, 59, 999);
  return d.toISOString();
}
function startOfDayIso(localDateYYYYMMDD: string) {
  const d = new Date(localDateYYYYMMDD);
  d.setHours(0, 0, 0, 0);
  return d.toISOString();
}

export default function PastResults() {
  const supabase = useMemo(() => createClient(), []);

  const [loggedIn, setLoggedIn] = useState<boolean | null>(null); // null = checking
  const [rows, setRows] = useState<SurveyResultRow[]>([]);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState<string | null>(null);

  // date filter state
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const applyPreset = (days: number | "all") => {
    if (days === "all") {
      setStartDate("");
      setEndDate("");
      return;
    }
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - days + 1);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };

  // 1) Check auth once
  useEffect(() => {
    let on = true;
    (async () => {
      const { data, error } = await supabase.auth.getUser();
      if (!on) return;
      if (error || !data?.user) {
        setLoggedIn(false);
        setLoading(false);
        setRows([]);
        setErr(null);
      } else {
        setLoggedIn(true);
      }
    })();
    return () => {
      on = false;
    };
  }, [supabase]);

  // 2) Fetch only if logged in
  useEffect(() => {
    if (loggedIn !== true) return; // skip when logged out or still checking

    let on = true;
    (async () => {
      setLoading(true);

      const opts =
        startDate || endDate
          ? {
              startDate: startDate ? startOfDayIso(startDate) : undefined,
              endDate: endDate ? endOfDayIso(endDate) : undefined,
            }
          : undefined;

      const { rows, error } = await listSurveyResults(supabase, opts);
      if (!on) return;

      setErr(error ? (error as any).message ?? "Failed to load results" : null);
      setRows(rows);
      setLoading(false);
    })();

    return () => {
      on = false;
    };
  }, [supabase, loggedIn, startDate, endDate]);

  const data: ChartPoint[] = useMemo(
    () =>
      rows.map((r, i) => {
        const d = new Date(r.created_at);
        const label = isNaN(d.getTime()) ? `Try ${i + 1}` : d.toLocaleDateString();
        return {
          label,
          overallNum: Number(r.overall_score ?? 0),
          phishingNum: Number(r.phishing_awareness ?? 0),
          hygieneNum: Number(r.basic_hygiene ?? 0),
        };
      }),
    [rows]
  );

  const config = {
    overall: { label: "Overall", color: "var(--chart-1)" },
    phishing: { label: "Phishing", color: "var(--chart-2)" },
    hygiene: { label: "Hygiene", color: "var(--chart-3)" },
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Past Results</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Show nothing while checking auth */}
        {loggedIn === null ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : loggedIn === false ? (
          // Logged out: hide filters and chart, show a gentle nudge
          <div className="text-sm text-muted-foreground">
            Log in to view your past submissions.
          </div>
        ) : (
          // Logged in: show filters + chart
          <>
            <div
              style={{
                display: "flex",
                gap: 12,
                alignItems: "center",
                marginBottom: 12,
                flexWrap: "wrap",
              }}
            >
              <button onClick={() => applyPreset(7)}>Last 7 days</button>
              <button onClick={() => applyPreset(30)}>Last 30 days</button>
              <button onClick={() => applyPreset("all")}>All</button>

              <span style={{ marginLeft: 8 }} />
              <label>
                Start:{" "}
                <input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </label>
              <label>
                End:{" "}
                <input
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </label>
            </div>

            {loading ? (
              <div className="text-sm text-muted-foreground">Loading…</div>
            ) : err ? (
              <div className="text-sm text-red-500">{err}</div>
            ) : data.length === 0 ? (
              <div className="text-sm text-muted-foreground">No results in this range.</div>
            ) : (
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
                        dataKey="overallNum"
                        name="Overall"
                        stroke="var(--chart-1)"
                        fill="var(--chart-1)"
                        fillOpacity={0.15}
                        strokeWidth={2}
                        dot
                      />
                      <Area
                        type="monotone"
                        dataKey="phishingNum"
                        name="Phishing"
                        stroke="var(--chart-2)"
                        fill="var(--chart-2)"
                        fillOpacity={0.15}
                        strokeWidth={2}
                        dot
                      />
                      <Area
                        type="monotone"
                        dataKey="hygieneNum"
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
          </>
        )}
      </CardContent>
    </Card>
  );
}
