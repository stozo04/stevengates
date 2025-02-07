"use client";

import { useEffect, useState } from "react";
import { Line } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from "chart.js";
import { createBrowserClient } from "@supabase/ssr";
import { format, startOfMonth, endOfMonth, parseISO } from "date-fns";
import { LogData } from "@/types";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);


const Dashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [logs, setLogs] = useState<LogData[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>(
    format(new Date(), "yyyy-MM")  // Current month in YYYY-MM format
  );
  const [selectedLog, setSelectedLog] = useState<LogData | null>(null);

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

  // Add click handler configuration to options
  const options = {
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
    onClick: (event: any, elements: any[]) => {
      if (elements.length > 0) {
        const dataIndex = elements[0].index;
        setSelectedLog(filteredLogs[dataIndex]);
      }
    },
  };

  return (
    <div className="d-flex flex-column justify-content-center align-items-center min-vh-100 text-center p-4">
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
            options={options}
          />
        </div>

        {/* Add Details Card */}
        {selectedLog && (
          <div className="card mt-4 w-100">
            <div className="card-body">
              <h5 className="card-title">Log Details for {format(new Date(selectedLog.date), 'MMMM d, yyyy')}</h5>
              <div className="card-text">
                <p><strong>Anxiety Level:</strong> {selectedLog.anxiety_level}</p>
                <p><strong>Panic Attack:</strong> {selectedLog.panic_attack ? 'Yes' : 'No'}</p>
                {selectedLog.notes && <p><strong>Notes:</strong> {selectedLog.notes}</p>}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
