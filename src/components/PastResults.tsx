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
    start.setDate(end.getDate() - days);
    setStartDate(start.toISOString().slice(0, 10));
    setEndDate(end.toISOString().slice(0, 10));
  };


 useEffect(() => {
    let on = true;
    (async () => {
      setLoading(true);
      const opts = {
        startDate: startDate ? new Date(startDate).toISOString() : undefined,
        endDate:   endDate   ? new Date(endDate).toISOString()   : undefined,
      };
      const { rows, error } = await listSurveyResults(supabase, opts);
      if (!on) return;
      if (error) setErr(error.message ?? "Failed to load results");
      else setRows(rows);
      setLoading(false);
    })();
    return () => { on = false; };
  }, [supabase, startDate, endDate]);

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
        <div style={{ display: "flex", gap: 12, alignItems: "center", marginBottom: 12, flexWrap: "wrap" }}>
          <button onClick={() => applyPreset(7)}>Last 7 days</button>
          <button onClick={() => applyPreset(30)}>Last 30 days</button>
          <button onClick={() => applyPreset("all")}>All</button>
          <span style={{ marginLeft: 8 }} />
          <label>
            Start:{" "}
            <input type="date" value={startDate} onChange={(e) => setStartDate(e.target.value)} />
          </label>
          <label>
            End:{" "}
            <input type="date" value={endDate} onChange={(e) => setEndDate(e.target.value)} />
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
                  <Area type="monotone" dataKey="overall"  name="Overall"  stroke="var(--chart-1)" fill="var(--chart-1)" fillOpacity={0.15} strokeWidth={2} dot />
                  <Area type="monotone" dataKey="phishing" name="Phishing" stroke="var(--chart-2)" fill="var(--chart-2)" fillOpacity={0.15} strokeWidth={2} dot />
                  <Area type="monotone" dataKey="hygiene"  name="Hygiene"  stroke="var(--chart-3)" fill="var(--chart-3)" fillOpacity={0.15} strokeWidth={2} dot />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </ChartContainer>
        )}
      </CardContent>
    </Card>
  );
}