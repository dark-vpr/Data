import { useMemo } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  ScatterChart,
  Scatter,
  Legend,
} from "recharts";
import { dataset } from "../data/dataset";
import { DollarSign, TrendingUp, ShoppingCart, Users } from "lucide-react";

const COLORS = ["#6366f1", "#10b981", "#f59e0b", "#ef4444", "#8b5cf6"];

export function DashboardPreview() {
  const stats = useMemo(() => {
    const totalRevenue = dataset.reduce((s, r) => s + r.total_revenue, 0);
    const totalProfit = dataset.reduce((s, r) => s + r.profit, 0);
    const totalUnits = dataset.reduce((s, r) => s + r.units_sold, 0);
    const avgOrderValue = totalRevenue / dataset.length;

    // Revenue by region
    const regionMap = new Map<string, number>();
    dataset.forEach((r) => regionMap.set(r.region, (regionMap.get(r.region) || 0) + r.total_revenue));
    const byRegion = Array.from(regionMap.entries())
      .map(([name, value]) => ({ name, value: Math.round(value) }))
      .sort((a, b) => b.value - a.value);

    // Revenue by category
    const catMap = new Map<string, number>();
    dataset.forEach((r) =>
      catMap.set(r.product_category, (catMap.get(r.product_category) || 0) + r.total_revenue)
    );
    const byCategory = Array.from(catMap.entries()).map(([name, value]) => ({
      name,
      value: Math.round(value),
    }));

    // Monthly trend
    const monthMap = new Map<number, { revenue: number; profit: number }>();
    dataset.forEach((r) => {
      const m = parseInt(r.date.split("-")[1]);
      const prev = monthMap.get(m) || { revenue: 0, profit: 0 };
      monthMap.set(m, {
        revenue: prev.revenue + r.total_revenue,
        profit: prev.profit + r.profit,
      });
    });
    const monthNames = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun",
      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
    ];
    const monthly = Array.from(monthMap.entries())
      .sort((a, b) => a[0] - b[0])
      .map(([m, d]) => ({
        name: monthNames[m - 1],
        revenue: Math.round(d.revenue),
        profit: Math.round(d.profit),
      }));

    // Scatter data
    const scatterData = dataset.slice(0, 80).map((r) => ({
      revenue: r.total_revenue,
      profit: r.profit,
    }));

    return {
      totalRevenue,
      totalProfit,
      totalUnits,
      avgOrderValue,
      profitMargin: (totalProfit / totalRevenue) * 100,
      byRegion,
      byCategory,
      monthly,
      scatterData,
    };
  }, []);

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h3 className="text-xl font-bold text-white mb-1">Live Dashboard Preview</h3>
        <p className="text-sm text-gray-400">
          Interactive charts from your dataset — This is what your Power BI / Tableau dashboard should look like
        </p>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          {
            label: "Total Revenue",
            value: `$${(stats.totalRevenue / 1000).toFixed(1)}K`,
            icon: <DollarSign size={20} />,
            color: "from-indigo-500 to-indigo-600",
          },
          {
            label: "Total Profit",
            value: `$${(stats.totalProfit / 1000).toFixed(1)}K`,
            icon: <TrendingUp size={20} />,
            color: "from-green-500 to-green-600",
          },
          {
            label: "Units Sold",
            value: stats.totalUnits.toLocaleString(),
            icon: <ShoppingCart size={20} />,
            color: "from-yellow-500 to-orange-500",
          },
          {
            label: "Avg Order Value",
            value: `$${stats.avgOrderValue.toFixed(0)}`,
            icon: <Users size={20} />,
            color: "from-purple-500 to-pink-500",
          },
        ].map((kpi, i) => (
          <div key={i} className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-4">
            <div className="flex items-center gap-3 mb-3">
              <div
                className={`w-10 h-10 rounded-xl bg-gradient-to-br ${kpi.color} flex items-center justify-center text-white`}
              >
                {kpi.icon}
              </div>
              <span className="text-xs text-gray-400 font-medium">{kpi.label}</span>
            </div>
            <div className="text-2xl font-bold text-white">{kpi.value}</div>
          </div>
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Chart - Revenue by Region */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Revenue by Region</h4>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={stats.byRegion}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Bar dataKey="value" radius={[8, 8, 0, 0]}>
                {stats.byRegion.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart - Category Distribution */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Revenue by Product Category</h4>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={stats.byCategory}
                cx="50%"
                cy="50%"
                outerRadius={90}
                innerRadius={40}
                dataKey="value"
                label={({ name, percent }: any) =>
                  `${name || ''} ${((percent || 0) * 100).toFixed(0)}%`
                }
                labelLine={false}
              >
                {stats.byCategory.map((_entry, index) => (
                  <Cell key={index} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Line Chart - Monthly Trend */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Monthly Revenue & Profit Trend</h4>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={stats.monthly}>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis dataKey="name" tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <YAxis tick={{ fill: "#9ca3af", fontSize: 12 }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Legend />
              <Line
                type="monotone"
                dataKey="revenue"
                stroke="#6366f1"
                strokeWidth={2}
                dot={{ fill: "#6366f1", r: 4 }}
                name="Revenue"
              />
              <Line
                type="monotone"
                dataKey="profit"
                stroke="#10b981"
                strokeWidth={2}
                dot={{ fill: "#10b981", r: 4 }}
                name="Profit"
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Scatter Plot - Revenue vs Profit */}
        <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
          <h4 className="text-sm font-semibold text-white mb-4">Revenue vs Profit Correlation</h4>
          <ResponsiveContainer width="100%" height={250}>
            <ScatterChart>
              <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
              <XAxis
                dataKey="revenue"
                name="Revenue"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <YAxis
                dataKey="profit"
                name="Profit"
                tick={{ fill: "#9ca3af", fontSize: 12 }}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#1f2937",
                  border: "1px solid #374151",
                  borderRadius: "12px",
                  color: "#fff",
                }}
              />
              <Scatter data={stats.scatterData} fill="#8b5cf6" opacity={0.7} />
            </ScatterChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
