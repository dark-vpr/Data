import { useState } from "react";
import {
  Database,
  Code2,
  BarChart3,
  Layout,
  BookOpen,
  FolderTree,
  Download,
  ChevronRight,
  Copy,
  Check,
  Menu,
  X,
} from "lucide-react";
import { dataset, COLUMNS } from "./data/dataset";
import {
  pythonSetupCode,
  loadDataCode,
  numpyCode,
  pandasCode,
  visualizationCode,
  exportCode,
  powerBIGuide,
  tableauGuide,
  projectStructure,
} from "./data/guideContent";
import { DashboardPreview } from "./components/DashboardPreview";

type TabId = "overview" | "dataset" | "python" | "powerbi" | "tableau" | "structure";

const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
  { id: "overview", label: "Overview", icon: <BookOpen size={18} /> },
  { id: "dataset", label: "Dataset", icon: <Database size={18} /> },
  { id: "python", label: "Python Code", icon: <Code2 size={18} /> },
  { id: "powerbi", label: "Power BI", icon: <BarChart3 size={18} /> },
  { id: "tableau", label: "Tableau", icon: <Layout size={18} /> },
  { id: "structure", label: "Project Files", icon: <FolderTree size={18} /> },
];

function CodeBlock({ code, title }: { code: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };
  return (
    <div className="mb-6 rounded-xl overflow-hidden border border-gray-700 bg-gray-900">
      <div className="flex items-center justify-between px-4 py-2 bg-gray-800 border-b border-gray-700">
        <span className="text-sm font-medium text-gray-300">{title}</span>
        <button
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-lg bg-gray-700 hover:bg-gray-600 text-gray-300 transition-colors cursor-pointer"
        >
          {copied ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
          {copied ? "Copied!" : "Copy"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto text-sm leading-relaxed">
        <code className="text-green-300 font-mono whitespace-pre">{code}</code>
      </pre>
    </div>
  );
}

function OverviewTab() {
  return (
    <div className="space-y-8">
      <div className="text-center py-8">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10 text-indigo-400 px-4 py-2 rounded-full text-sm font-medium mb-4">
          <BarChart3 size={16} /> College Project Guide
        </div>
        <h2 className="text-4xl font-bold text-white mb-4">
          Data Analytics Complete Project
        </h2>
        <p className="text-gray-400 max-w-2xl mx-auto text-lg">
          A comprehensive guide covering Python (NumPy & Pandas), Power BI, and Tableau
          with a ready-to-use 15-column sales dataset of 200 records.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          {
            icon: <Code2 size={28} className="text-blue-400" />,
            title: "Python Analysis",
            desc: "Complete NumPy & Pandas code for statistical analysis, data manipulation, and visualization with Matplotlib & Seaborn.",
            color: "from-blue-500/20 to-blue-600/5",
          },
          {
            icon: <BarChart3 size={28} className="text-yellow-400" />,
            title: "Power BI Dashboard",
            desc: "Step-by-step guide to build an interactive Power BI dashboard with KPI cards, charts, slicers, and DAX measures.",
            color: "from-yellow-500/20 to-yellow-600/5",
          },
          {
            icon: <Layout size={28} className="text-green-400" />,
            title: "Tableau Dashboard",
            desc: "Detailed Tableau guide with treemaps, scatter plots, geographic maps, and cross-filtering interactivity.",
            color: "from-green-500/20 to-green-600/5",
          },
        ].map((item, i) => (
          <div
            key={i}
            className={`bg-gradient-to-br ${item.color} border border-gray-700/50 rounded-2xl p-6`}
          >
            <div className="mb-4">{item.icon}</div>
            <h3 className="text-lg font-semibold text-white mb-2">{item.title}</h3>
            <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Dataset Overview</h3>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
          {[
            { label: "Rows", value: "200", color: "text-blue-400" },
            { label: "Columns", value: "15", color: "text-green-400" },
            { label: "Regions", value: "4", color: "text-yellow-400" },
            { label: "Categories", value: "5", color: "text-purple-400" },
            { label: "Products", value: "25", color: "text-pink-400" },
          ].map((stat, i) => (
            <div key={i} className="text-center p-4 bg-gray-900/50 rounded-xl">
              <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
              <div className="text-sm text-gray-400 mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Project Workflow</h3>
        <div className="grid grid-cols-1 md:grid-cols-6 gap-3">
          {[
            { step: "1", label: "Generate Dataset", sub: "15-col CSV" },
            { step: "2", label: "Load & Inspect", sub: "Python/Pandas" },
            { step: "3", label: "NumPy Analysis", sub: "Statistics" },
            { step: "4", label: "Pandas Analysis", sub: "GroupBy/Pivot" },
            { step: "5", label: "Power BI", sub: "Dashboard" },
            { step: "6", label: "Tableau", sub: "Dashboard" },
          ].map((s, i) => (
            <div key={i} className="flex items-center gap-2">
              <div className="flex-1 bg-gray-900/50 rounded-xl p-3 text-center">
                <div className="w-8 h-8 rounded-full bg-indigo-500 text-white flex items-center justify-center text-sm font-bold mx-auto mb-2">
                  {s.step}
                </div>
                <div className="text-sm font-medium text-white">{s.label}</div>
                <div className="text-xs text-gray-500">{s.sub}</div>
              </div>
              {i < 5 && (
                <ChevronRight size={16} className="text-gray-600 hidden md:block shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>

      <DashboardPreview />

      <div className="bg-gradient-to-r from-indigo-500/10 to-purple-500/10 border border-indigo-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-3">Quick Start Instructions</h3>
        <ol className="space-y-2 text-gray-300 text-sm">
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">1</span>
            Go to the <strong>Dataset</strong> tab and download the CSV file
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">2</span>
            Go to <strong>Python Code</strong> tab, copy each code block and run in Jupyter Notebook or VS Code
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">3</span>
            Follow the <strong>Power BI</strong> tab for building your Power BI dashboard
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">4</span>
            Follow the <strong>Tableau</strong> tab for building your Tableau dashboard
          </li>
          <li className="flex gap-3">
            <span className="w-6 h-6 rounded-full bg-indigo-500 text-white flex items-center justify-center text-xs font-bold shrink-0">5</span>
            Use the <strong>Project Files</strong> tab for proper folder organization
          </li>
        </ol>
      </div>
    </div>
  );
}

function DatasetTab() {
  const [page, setPage] = useState(0);
  const perPage = 20;
  const totalPages = Math.ceil(dataset.length / perPage);
  const pageData = dataset.slice(page * perPage, (page + 1) * perPage);

  const csvContent =
    COLUMNS.map((c) => c.name).join(",") +
    "\n" +
    dataset
      .map((row) =>
        COLUMNS.map((c) => {
          const val = row[c.name as keyof typeof row];
          return typeof val === "string" && val.includes(",") ? `"${val}"` : val;
        }).join(",")
      )
      .join("\n");

  const handleDownload = () => {
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "sales_data.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold text-white">Sales Dataset</h2>
          <p className="text-gray-400 text-sm mt-1">200 records × 15 columns — Ready for analysis</p>
        </div>
        <button
          onClick={handleDownload}
          className="flex items-center gap-2 px-5 py-2.5 bg-indigo-600 hover:bg-indigo-500 text-white rounded-xl font-medium transition-colors cursor-pointer"
        >
          <Download size={18} /> Download CSV
        </button>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white mb-4">Column Definitions</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
          {COLUMNS.map((col, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-gray-900/50 rounded-xl">
              <span className="w-6 h-6 rounded bg-indigo-500/20 text-indigo-400 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                {i + 1}
              </span>
              <div>
                <div className="text-sm font-medium text-white font-mono">{col.name}</div>
                <div className="text-xs text-gray-500">
                  <span className="text-indigo-400">{col.type}</span> — {col.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-gray-700">
                {COLUMNS.map((col, i) => (
                  <th
                    key={i}
                    className="px-3 py-3 text-left text-xs font-semibold text-gray-400 uppercase tracking-wider whitespace-nowrap bg-gray-800"
                  >
                    {col.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {pageData.map((row, ri) => (
                <tr key={ri} className="border-b border-gray-800 hover:bg-gray-800/50 transition-colors">
                  {COLUMNS.map((col, ci) => (
                    <td key={ci} className="px-3 py-2.5 text-gray-300 whitespace-nowrap font-mono text-xs">
                      {typeof row[col.name as keyof typeof row] === "number"
                        ? (row[col.name as keyof typeof row] as number).toLocaleString()
                        : String(row[col.name as keyof typeof row])}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex items-center justify-between px-4 py-3 bg-gray-800 border-t border-gray-700">
          <span className="text-sm text-gray-400">
            Showing {page * perPage + 1}-{Math.min((page + 1) * perPage, dataset.length)} of{" "}
            {dataset.length}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage(Math.max(0, page - 1))}
              disabled={page === 0}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Previous
            </button>
            <button
              onClick={() => setPage(Math.min(totalPages - 1, page + 1))}
              disabled={page >= totalPages - 1}
              className="px-3 py-1.5 text-sm rounded-lg bg-gray-700 text-gray-300 hover:bg-gray-600 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function PythonTab() {
  const [activeSection, setActiveSection] = useState(0);
  const sections = [
    { title: "1. Setup & Install", code: pythonSetupCode },
    { title: "2. Load & Inspect", code: loadDataCode },
    { title: "3. NumPy Analysis", code: numpyCode },
    { title: "4. Pandas Analysis", code: pandasCode },
    { title: "5. Visualizations", code: visualizationCode },
    { title: "6. Export Data", code: exportCode },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Python Analysis Code</h2>
        <p className="text-gray-400 text-sm mt-1">
          Complete Python code using NumPy, Pandas, Matplotlib & Seaborn — Copy and run in Jupyter Notebook
        </p>
      </div>

      <div className="flex flex-wrap gap-2">
        {sections.map((s, i) => (
          <button
            key={i}
            onClick={() => setActiveSection(i)}
            className={`px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
              activeSection === i
                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                : "bg-gray-800 text-gray-400 hover:text-white hover:bg-gray-700"
            }`}
          >
            {s.title}
          </button>
        ))}
      </div>

      <CodeBlock code={sections[activeSection].code} title={sections[activeSection].title} />

      <div className="bg-gradient-to-r from-blue-500/10 to-cyan-500/10 border border-blue-500/20 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white mb-3">Key Concepts Covered</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 className="text-sm font-semibold text-blue-400 mb-2">NumPy Operations</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• Array creation from DataFrame columns</li>
              <li>• Statistical functions (mean, median, std, percentile)</li>
              <li>• Correlation coefficient calculation</li>
              <li>• Boolean indexing and filtering</li>
              <li>• Histogram binning with np.histogram</li>
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-green-400 mb-2">Pandas Operations</h4>
            <ul className="space-y-1 text-sm text-gray-400">
              <li>• DataFrame loading and inspection</li>
              <li>• GroupBy with multiple aggregations</li>
              <li>• Pivot tables (Region x Category)</li>
              <li>• Date parsing and feature extraction</li>
              <li>• Correlation matrix and data export</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

function BIGuideTab({
  title,
  subtitle,
  color,
  steps,
}: {
  title: string;
  subtitle: string;
  color: string;
  steps: { step: number; title: string; instructions: string[] }[];
}) {
  const [openStep, setOpenStep] = useState<number | null>(0);
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">{title}</h2>
        <p className="text-gray-400 text-sm mt-1">{subtitle}</p>
      </div>

      <div className="space-y-3">
        {steps.map((s, i) => (
          <div
            key={i}
            className="bg-gray-800/50 border border-gray-700/50 rounded-2xl overflow-hidden"
          >
            <button
              onClick={() => setOpenStep(openStep === i ? null : i)}
              className="w-full flex items-center gap-4 p-4 text-left hover:bg-gray-800/80 transition-colors cursor-pointer"
            >
              <span
                className={`w-10 h-10 rounded-xl ${color} text-white flex items-center justify-center text-sm font-bold shrink-0`}
              >
                {s.step}
              </span>
              <span className="text-white font-medium flex-1">{s.title}</span>
              <ChevronRight
                size={18}
                className={`text-gray-500 transition-transform ${openStep === i ? "rotate-90" : ""}`}
              />
            </button>
            {openStep === i && (
              <div className="px-4 pb-4 pl-18">
                <div className="ml-14 space-y-2">
                  {s.instructions.map((inst, j) => (
                    <div key={j} className="flex items-start gap-3 text-sm">
                      <span className="w-5 h-5 rounded-full bg-gray-700 text-gray-400 flex items-center justify-center text-xs shrink-0 mt-0.5">
                        {j + 1}
                      </span>
                      <span className="text-gray-300">{inst}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white mb-3">Pro Tips</h3>
        <ul className="space-y-2 text-sm text-gray-400">
          <li>• Always check data types after importing — incorrect types cause errors in charts</li>
          <li>• Use consistent color schemes across all visuals for a professional look</li>
          <li>• Add tooltips with extra details (hover info) on every chart</li>
          <li>• Test all filters/slicers to ensure they interact correctly with all visuals</li>
          <li>• Take screenshots of your dashboard for the project report</li>
        </ul>
      </div>
    </div>
  );
}

function StructureTab() {
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-white">Project Folder Structure</h2>
        <p className="text-gray-400 text-sm mt-1">
          Organize your project files professionally for submission
        </p>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-2xl p-6 overflow-x-auto">
        <pre className="text-green-300 font-mono text-sm leading-relaxed whitespace-pre">
          {projectStructure}
        </pre>
      </div>

      <div className="bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Report Outline (Suggested)</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            {
              chapter: "Chapter 1",
              title: "Introduction",
              items: ["Background of Data Analytics", "Problem Statement", "Objectives of Study", "Scope & Limitations"],
            },
            {
              chapter: "Chapter 2",
              title: "Literature Review",
              items: ["Overview of Python in Analytics", "NumPy & Pandas Libraries", "Business Intelligence Tools", "Power BI vs Tableau Comparison"],
            },
            {
              chapter: "Chapter 3",
              title: "Methodology",
              items: ["Dataset Description (15 columns)", "Data Collection Process", "Tools & Technologies Used", "Data Cleaning Steps"],
            },
            {
              chapter: "Chapter 4",
              title: "Python Analysis",
              items: ["NumPy Statistical Analysis", "Pandas Data Manipulation", "Visualization with Matplotlib", "Key Findings from Python"],
            },
            {
              chapter: "Chapter 5",
              title: "Dashboard Development",
              items: ["Power BI Dashboard Design", "Tableau Dashboard Design", "Interactive Features", "Dashboard Screenshots"],
            },
            {
              chapter: "Chapter 6",
              title: "Conclusion",
              items: ["Summary of Findings", "Insights & Recommendations", "Future Scope", "References"],
            },
          ].map((ch, i) => (
            <div key={i} className="bg-gray-900/50 rounded-xl p-4">
              <div className="text-xs text-indigo-400 font-semibold mb-1">{ch.chapter}</div>
              <div className="text-white font-medium mb-2">{ch.title}</div>
              <ul className="space-y-1">
                {ch.items.map((item, j) => (
                  <li key={j} className="text-sm text-gray-400 flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-gray-600" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gradient-to-r from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-2xl p-6">
        <h3 className="text-xl font-semibold text-white mb-3">Submission Checklist</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {[
            "CSV dataset file (sales_data.csv)",
            "Python notebooks/scripts (all 5 steps)",
            "Matplotlib output images (3+ charts)",
            "Power BI .pbix file",
            "Power BI dashboard screenshots",
            "Tableau .twbx workbook file",
            "Tableau dashboard screenshots",
            "Project report (PDF format)",
            "Presentation slides (PPT)",
            "README.md with instructions",
          ].map((item, i) => (
            <label key={i} className="flex items-center gap-3 text-sm text-gray-300 p-2 rounded-lg hover:bg-white/5 transition-colors cursor-pointer">
              <input type="checkbox" className="w-4 h-4 rounded border-gray-600 text-indigo-500 focus:ring-indigo-500 bg-gray-700 cursor-pointer" />
              {item}
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [mobileMenu, setMobileMenu] = useState(false);

  const renderTab = () => {
    switch (activeTab) {
      case "overview":
        return <OverviewTab />;
      case "dataset":
        return <DatasetTab />;
      case "python":
        return <PythonTab />;
      case "powerbi":
        return (
          <BIGuideTab
            title="Power BI Dashboard Guide"
            subtitle="10 steps to build a professional Power BI dashboard from your dataset"
            color="bg-yellow-500"
            steps={powerBIGuide}
          />
        );
      case "tableau":
        return (
          <BIGuideTab
            title="Tableau Dashboard Guide"
            subtitle="10 steps to create an interactive Tableau dashboard with cross-filtering"
            color="bg-blue-600"
            steps={tableauGuide}
          />
        );
      case "structure":
        return <StructureTab />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-xl bg-gray-950/80 border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-indigo-500 to-purple-600 flex items-center justify-center">
              <BarChart3 size={20} className="text-white" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-white leading-tight">Data Analytics Project</h1>
              <p className="text-xs text-gray-500 hidden sm:block">Python • Power BI • Tableau</p>
            </div>
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/20"
                    : "text-gray-400 hover:text-white hover:bg-gray-800"
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>

          {/* Mobile menu button */}
          <button
            onClick={() => setMobileMenu(!mobileMenu)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-800 text-gray-400 cursor-pointer"
          >
            {mobileMenu ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>

        {/* Mobile Nav */}
        {mobileMenu && (
          <div className="md:hidden border-t border-gray-800 bg-gray-900 p-3">
            <div className="grid grid-cols-2 gap-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setMobileMenu(false);
                  }}
                  className={`flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-indigo-600 text-white"
                      : "text-gray-400 bg-gray-800 hover:text-white"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">{renderTab()}</main>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-6 mt-12">
        <div className="max-w-7xl mx-auto px-4 text-center text-sm text-gray-500">
          Data Analytics College Project Guide — Built with React • Dataset: 200 records × 15 columns
        </div>
      </footer>
    </div>
  );
}
