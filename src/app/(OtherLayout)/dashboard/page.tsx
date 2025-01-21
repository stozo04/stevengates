"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { createBrowserClient } from "@supabase/ssr";
import { format, startOfMonth, endOfMonth, parseISO } from "date-fns";
import ProtectedPage from "@/components/Shared/ProtectedPage/ProtectedPage";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

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
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")  // Current month in YYYY-MM format
  );

  const supabase = createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        const { data, error } = await supabase
          .from("daily_logs")
          .select("*")
          .order("date", { ascending: true });

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

  // Filter logs based on selected month (update to handle null/empty selection)
  const filteredLogs = selectedMonth 
    ? logs.filter(log => {
        const logDate = parseISO(log.date);
        const monthStart = startOfMonth(parseISO(`${selectedMonth}-01`));
        const monthEnd = endOfMonth(monthStart);
        return logDate >= monthStart && logDate <= monthEnd;
      })
    : logs;  // If no month selected, show all logs

  if (isLoading) return <div>Loading...</div>;

  // Prepare data for the graph
  const graphData = {
    labels: filteredLogs.map((log) => format(new Date(`${log.date}T00:00:00`), "MM-dd-yyyy")),
    datasets: [
      {
        label: "Anxiety Level",
        data: filteredLogs.map((log) => (log.anxiety_level ? parseInt(log.anxiety_level) : 0)),
        borderColor: "rgba(75, 192, 192, 1)",
        backgroundColor: "rgba(75, 192, 192, 0.2)",
        borderWidth: 2,
        pointBackgroundColor: filteredLogs.map(log => 
          log.panic_attack ? 'rgba(255, 0, 0, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        pointBorderColor: filteredLogs.map(log => 
          log.panic_attack ? 'rgba(255, 0, 0, 1)' : 'rgba(75, 192, 192, 1)'
        ),
        pointRadius: 3,
      },
    ],
  };

  return (
    <div className="d-flex justify-content-center align-items-center vh-100 text-center">
      <ProtectedPage>
        <div style={{ width: "75%", margin: "0 auto", textAlign: "center", height: "auto" }}>
          <h2 className="fs-one fw-semibold n5-color mb-2 mb-md-4">Anxiety Level</h2>
          
          {/* Month Selector with View All button */}
          <div className="mb-4 d-flex justify-content-center align-items-center gap-2">
            <input
              type="month"
              value={selectedMonth}
              onChange={(e) => setSelectedMonth(e.target.value)}
              className="form-control w-auto"
            />
            <button 
              onClick={() => setSelectedMonth('')}
              className="btn btn-outline-secondary"
            >
              View All
            </button>
          </div>

          <div style={{ height: "400px" }}>
            <Line
              data={graphData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    display: true,
                    position: "top" as const,
                  },
                  title: {
                    display: true,
                    text: "Daily Anxiety Levels (Scale 0-10)",
                  },
                },
                scales: {
                  y: {
                    min: 0,
                    max: 10,
                    beginAtZero: true,
                    ticks: {
                      stepSize: 1,
                      precision: 0,
                    },
                  },
                },
              }}
            />
          </div>
        </div>
      </ProtectedPage>
    </div>
  );
};

export default DailyLogPage;
