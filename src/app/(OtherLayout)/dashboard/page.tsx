"use client";

import { useEffect, useState } from "react";
import { createBrowserClient } from "@supabase/ssr";
import { format } from 'date-fns';

interface DailyLog {
  id: number;
  date: string; // Supabase returns dates as strings
  anxiety_level: string | null;
  panic_attack: boolean | null;
  used_medication: boolean | null;
  went_to_gym: boolean | null;
  had_sex: boolean | null;
  mood: string | null;
  notes: string | null;
}

const DailyLogPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<DailyLog[]>([]);

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from<string, DailyLog[]>("daily_logs") // Specify both type arguments
          .select("*")
          .order("date", { ascending: false });

        if (error) throw error;

        setLogs(data || []);
      } catch (error) {
        console.error("Error fetching logs:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [supabase]);

  if (isLoading) return <div>Loading...</div>;

  return (
    <div>
      {/* Logs Table */}
      <div className="p-4">
        <form className="max-w-lg mx-auto bg-white dark:bg-gray-800 shadow-lg rounded-lg p-6 space-y-6 mt-8">
          <h1 className="text-2xl font-bold">Daily Logs</h1>
          <table className="w-full border-collapse border border-gray-300">
            <thead>
              <tr>
                <th className="border px-4 py-2">Date</th>
                <th className="border px-4 py-2">Anxiety Level</th>
              </tr>
            </thead>
            <tbody>
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="border px-4 py-2">  {format(new Date(`${log.date}T00:00:00`), 'MM-dd-yyyy')}</td>
                  <td className="border px-4 py-2">{log.anxiety_level || "N/A"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </form>
      </div>
    </div>
  );
};

export default DailyLogPage;
