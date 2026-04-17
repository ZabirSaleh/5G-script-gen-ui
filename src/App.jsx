import React, { useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  Upload,
  ShieldCheck,
  FileCode2,
  Download,
  Bell,
  Search,
  CheckCircle2,
  AlertTriangle,
  FileSpreadsheet,
  Server,
  FolderOpen,
  Menu,
  X,
} from "lucide-react";

const navItems = [
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "upload", label: "Upload Plan", icon: Upload },
  { id: "validation", label: "Validation", icon: ShieldCheck },
  { id: "templates", label: "Templates", icon: FileCode2 },
  { id: "downloads", label: "Downloads", icon: Download },
];

const stats = [
  { title: "Active Projects", value: "12", sub: "+2 this week", icon: FolderOpen },
  { title: "Sites in Batch", value: "148", sub: "North cluster rollout", icon: Server },
  { title: "Generated Files", value: "1,286", sub: "XML / MML / TXT / CFG", icon: FileCode2 },
  { title: "Validation Score", value: "94%", sub: "22 warnings pending", icon: ShieldCheck },
];

const uploadRows = [
  { site: "DHK001", vendor: "Huawei", node: "eNodeB", ip: "10.10.20.11", status: "Ready" },
  { site: "DHK002", vendor: "Ericsson", node: "gNodeB", ip: "10.10.20.12", status: "Warning" },
  { site: "DHK003", vendor: "Nokia", node: "eNodeB", ip: "10.10.20.13", status: "Ready" },
  { site: "DHK004", vendor: "Cisco", node: "Router", ip: "10.10.20.14", status: "Error" },
];

const validationRows = [
  { field: "Latitude", issue: "Missing value", severity: "Error", node: "DHK004" },
  { field: "CID", issue: "Duplicate cell ID found", severity: "Warning", node: "DHK002" },
  { field: "Gateway", issue: "Outside subnet range", severity: "Error", node: "DHK004" },
  { field: "Template", issue: "Release mismatch", severity: "Warning", node: "DHK006" },
];

const templateRows = [
  { name: "Huawei LTE XML", vendor: "Huawei", release: "LTE R18", type: "XML", version: "v1.4" },
  { name: "Ericsson NR MML", vendor: "Ericsson", release: "NR 21B", type: "MML", version: "v2.1" },
  { name: "Nokia LTE TXT", vendor: "Nokia", release: "LTE FP5", type: "TXT", version: "v1.8" },
  { name: "Cisco Backhaul CFG", vendor: "Cisco", release: "IOS-XE", type: "CFG", version: "v3.0" },
];

const downloadRows = [
  { batch: "Batch-APR-001", files: 124, vendor: "Mixed", date: "2026-04-08", status: "Completed" },
  { batch: "Batch-APR-002", files: 88, vendor: "Huawei", date: "2026-04-08", status: "Completed" },
  { batch: "Batch-APR-003", files: 46, vendor: "Cisco", date: "2026-04-07", status: "Archived" },
];

function cn(...classes) {
  return classes.filter(Boolean).join(" ");
}

function ShellCard({ title, subtitle, children, className = "" }) {
  return (
    <div className={cn("rounded-[28px] border border-slate-200 bg-white shadow-sm", className)}>
      {(title || subtitle) && (
        <div className="border-b border-slate-100 px-6 py-5">
          {title && <h3 className="text-lg font-semibold tracking-tight">{title}</h3>}
          {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
        </div>
      )}
      <div className="p-6">{children}</div>
    </div>
  );
}

function PrimaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={cn(
        "rounded-2xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-800",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function SecondaryButton({ children, className = "", ...props }) {
  return (
    <button
      className={cn(
        "rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}

function TextInput({ className = "", ...props }) {
  return (
    <input
      className={cn(
        "w-full rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-sm text-slate-800 outline-none transition placeholder:text-slate-400 focus:border-slate-400",
        className
      )}
      {...props}
    />
  );
}

function Badge({ children, tone = "neutral" }) {
  const tones = {
    neutral: "bg-slate-100 text-slate-700",
    success: "bg-emerald-100 text-emerald-700",
    warning: "bg-amber-100 text-amber-700",
    danger: "bg-red-100 text-red-700",
  };
  return <span className={cn("inline-flex rounded-full px-2.5 py-1 text-xs font-medium", tones[tone])}>{children}</span>;
}

function ProgressBar({ value }) {
  return (
    <div className="h-3 w-full overflow-hidden rounded-full bg-slate-200">
      <div className="h-full rounded-full bg-slate-900" style={{ width: `${value}%` }} />
    </div>
  );
}

function DataTable({ headers, rows, renderRow }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200">
      <div className="overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead className="bg-slate-50">
            <tr>
              {headers.map((header) => (
                <th key={header} className="px-4 py-3 text-left font-semibold text-slate-600">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, index) => (
              <tr key={index} className="border-t border-slate-100">
                {renderRow(row)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Sidebar({ page, setPage, mobileOpen, setMobileOpen }) {
  return (
    <>
      <div className="hidden lg:flex lg:w-72 lg:flex-col lg:border-r lg:border-slate-200 lg:bg-white/80 lg:backdrop-blur">
        <div className="flex items-center gap-3 border-b border-slate-200 px-6 py-5">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white">
            <Server className="h-5 w-5" />
          </div>
          <div>
            <h1 className="text-lg font-semibold tracking-tight">LazyAutoZero</h1>
            <p className="text-sm text-slate-500">Multi-vendor automation demo</p>
          </div>
        </div>
        <nav className="flex-1 space-y-2 p-4">
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = page === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setPage(item.id)}
                className={cn(
                  "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition",
                  active ? "bg-slate-900 text-white shadow-lg" : "text-slate-600 hover:bg-slate-100"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="font-medium">{item.label}</span>
              </button>
            );
          })}
        </nav>
      </div>

      {mobileOpen && (
        <div className="fixed inset-0 z-40 bg-black/40 lg:hidden" onClick={() => setMobileOpen(false)}>
          <div className="h-full w-72 bg-white p-4" onClick={(e) => e.stopPropagation()}>
            <div className="mb-4 flex items-center justify-between">
              <div>
                <h1 className="text-lg font-semibold">LazyAutoZero</h1>
                <p className="text-sm text-slate-500">Demo frontend</p>
              </div>
              <button className="rounded-xl p-2 hover:bg-slate-100" onClick={() => setMobileOpen(false)}>
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const active = page === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => {
                      setPage(item.id);
                      setMobileOpen(false);
                    }}
                    className={cn(
                      "flex w-full items-center gap-3 rounded-2xl px-4 py-3 text-left transition",
                      active ? "bg-slate-900 text-white" : "text-slate-600 hover:bg-slate-100"
                    )}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </>
  );
}

function Topbar({ title, subtitle, setMobileOpen }) {
  return (
    <div className="sticky top-0 z-30 border-b border-slate-200 bg-white/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <button className="rounded-2xl border border-slate-200 p-2 lg:hidden" onClick={() => setMobileOpen(true)}>
            <Menu className="h-5 w-5" />
          </button>
          <div>
            <h2 className="text-xl font-semibold tracking-tight sm:text-2xl">{title}</h2>
            <p className="text-sm text-slate-500">{subtitle}</p>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="hidden items-center gap-2 rounded-2xl border border-slate-200 bg-white px-3 py-2 md:flex">
            <Search className="h-4 w-4 text-slate-400" />
            <input className="w-52 border-none bg-transparent text-sm outline-none" placeholder="Search project, site, template..." />
          </div>
          <button className="rounded-2xl border border-slate-200 bg-white p-2.5">
            <Bell className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3 rounded-2xl border border-slate-200 bg-white px-3 py-2">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">ZS</div>
            <div className="hidden sm:block">
              <p className="text-sm font-medium">Zabir Saleh</p>
              <p className="text-xs text-slate-500">Integration Engineer</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function StatCards() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {stats.map((item, i) => {
        const Icon = item.icon;
        return (
          <motion.div
            key={item.title}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35, delay: i * 0.06 }}
          >
            <div className="rounded-[28px] border border-slate-200 bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-slate-500">{item.title}</p>
                  <h3 className="mt-2 text-3xl font-semibold tracking-tight">{item.value}</h3>
                  <p className="mt-1 text-sm text-slate-500">{item.sub}</p>
                </div>
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-100">
                  <Icon className="h-6 w-6 text-slate-700" />
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}

function DashboardPage() {
  return (
    <div className="space-y-6">
      <StatCards />

      <div className="grid gap-6 xl:grid-cols-3">
        <ShellCard title="Today’s Integration Overview" subtitle="Current activity across RAN, IP, and transmission nodes" className="xl:col-span-2">
          <div className="space-y-5">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Huawei / Nokia / Ericsson</p>
                <h4 className="mt-2 text-2xl font-semibold">76</h4>
                <p className="text-xs text-slate-500">RAN nodes loaded</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Cisco / Juniper / MikroTik</p>
                <h4 className="mt-2 text-2xl font-semibold">22</h4>
                <p className="text-xs text-slate-500">IP nodes prepared</p>
              </div>
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Validation pass rate</p>
                <h4 className="mt-2 text-2xl font-semibold">94%</h4>
                <p className="text-xs text-slate-500">Before script generation</p>
              </div>
            </div>
            <div>
              <div className="mb-2 flex items-center justify-between text-sm">
                <span>Batch generation progress</span>
                <span className="text-slate-500">72%</span>
              </div>
              <ProgressBar value={72} />
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm font-medium">Workflow</p>
              <div className="mt-4 grid gap-3 md:grid-cols-5">
                {["Upload Excel", "Map Columns", "Validate Data", "Generate Scripts", "Download Package"].map((step, idx) => (
                  <div key={step} className="rounded-2xl bg-slate-50 p-4 text-sm">
                    <p className="mb-2 text-xs text-slate-400">Step {idx + 1}</p>
                    <p className="font-medium">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </ShellCard>

        <ShellCard title="Recent Alerts" subtitle="Items that need engineer attention">
          <div className="space-y-3">
            {[
              ["CID duplication detected", "DHK002 - Nokia LTE", "warning"],
              ["Gateway mismatch", "DHK004 - Cisco Router", "danger"],
              ["Template release mismatch", "DHK006 - Ericsson NR", "warning"],
              ["ZIP package generated", "Batch-APR-001", "success"],
            ].map(([title, sub, type]) => (
              <div key={title} className="flex items-start gap-3 rounded-2xl border border-slate-200 p-4">
                <div className={cn("mt-0.5 rounded-full p-1", type === "success" ? "bg-emerald-100" : type === "danger" ? "bg-red-100" : "bg-amber-100")}>
                  {type === "success" ? <CheckCircle2 className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </div>
                <div>
                  <p className="font-medium">{title}</p>
                  <p className="text-sm text-slate-500">{sub}</p>
                </div>
              </div>
            ))}
          </div>
        </ShellCard>
      </div>
    </div>
  );
}

function UploadPage() {
  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <ShellCard title="Upload Planning / LLD Excel" subtitle="Import site and node data to generate vendor-specific scripts" className="xl:col-span-2">
          <div className="space-y-5">
            <div className="rounded-[28px] border border-dashed border-slate-300 p-10 text-center">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-slate-100">
                <FileSpreadsheet className="h-8 w-8 text-slate-700" />
              </div>
              <h3 className="mt-4 text-xl font-semibold">Drag & drop your Excel file here</h3>
              <p className="mt-2 text-sm text-slate-500">Supports .xlsx with long, lat, IP, LAC, RAC, CID, TAC, NET ID, and vendor-specific fields</p>
              <div className="mt-5 flex justify-center gap-3">
                <PrimaryButton>Select File</PrimaryButton>
                <SecondaryButton>Download Sample</SecondaryButton>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <label className="mb-2 block text-sm font-medium">Project</label>
                <TextInput placeholder="North Cluster LTE" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Vendor</label>
                <TextInput placeholder="Mixed / Huawei / Ericsson" />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium">Technology</label>
                <TextInput placeholder="2G / 3G / LTE / 5G / IP" />
              </div>
            </div>
          </div>
        </ShellCard>

        <ShellCard title="Upload Summary" subtitle="Quick view before parsing">
          <div className="space-y-4 text-sm">
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-slate-500">Detected worksheets</p>
              <p className="mt-1 font-medium">RAN_PLAN, IP_BACKHAUL, SITE_MASTER</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-slate-500">Estimated rows</p>
              <p className="mt-1 font-medium">532 site records</p>
            </div>
            <div className="rounded-2xl bg-slate-50 p-4">
              <p className="text-slate-500">Output types</p>
              <p className="mt-1 font-medium">XML, TXT, MML, CFG, ZIP</p>
            </div>
            <PrimaryButton className="w-full">Parse & Preview</PrimaryButton>
          </div>
        </ShellCard>
      </div>

      <ShellCard title="Preview Rows" subtitle="Sample of parsed plan data">
        <DataTable
          headers={["Site", "Vendor", "Node Type", "IP Address", "Status"]}
          rows={uploadRows}
          renderRow={(row) => (
            <>
              <td className="px-4 py-3 font-medium">{row.site}</td>
              <td className="px-4 py-3">{row.vendor}</td>
              <td className="px-4 py-3">{row.node}</td>
              <td className="px-4 py-3">{row.ip}</td>
              <td className="px-4 py-3">
                <Badge tone={row.status === "Error" ? "danger" : row.status === "Warning" ? "warning" : "success"}>{row.status}</Badge>
              </td>
            </>
          )}
        />
      </ShellCard>
    </div>
  );
}

function ValidationPage() {
  const [tab, setTab] = useState("issues");
  return (
    <div className="space-y-6">
      <ShellCard title="Validation Center" subtitle="Check mandatory fields, IP ranges, duplicate IDs, and release compatibility">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-4">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Rows checked</p>
              <p className="mt-2 text-2xl font-semibold">532</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Errors</p>
              <p className="mt-2 text-2xl font-semibold text-red-600">8</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Warnings</p>
              <p className="mt-2 text-2xl font-semibold text-amber-600">14</p>
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="text-sm text-slate-500">Ready to generate</p>
              <p className="mt-2 text-2xl font-semibold text-emerald-600">510</p>
            </div>
          </div>

          <div className="flex max-w-md rounded-2xl border border-slate-200 bg-slate-50 p-1">
            <button
              onClick={() => setTab("issues")}
              className={cn("flex-1 rounded-2xl px-4 py-2 text-sm font-medium", tab === "issues" ? "bg-white shadow-sm" : "text-slate-500")}
            >
              Validation Issues
            </button>
            <button
              onClick={() => setTab("mapping")}
              className={cn("flex-1 rounded-2xl px-4 py-2 text-sm font-medium", tab === "mapping" ? "bg-white shadow-sm" : "text-slate-500")}
            >
              Mapped Fields
            </button>
          </div>

          {tab === "issues" ? (
            <DataTable
              headers={["Node", "Field", "Issue", "Severity"]}
              rows={validationRows}
              renderRow={(row) => (
                <>
                  <td className="px-4 py-3 font-medium">{row.node}</td>
                  <td className="px-4 py-3">{row.field}</td>
                  <td className="px-4 py-3">{row.issue}</td>
                  <td className="px-4 py-3">
                    <Badge tone={row.severity === "Error" ? "danger" : "warning"}>{row.severity}</Badge>
                  </td>
                </>
              )}
            />
          ) : (
            <div className="grid gap-4 md:grid-cols-3">
              {[
                ["Longitude", "longitude"],
                ["Latitude", "latitude"],
                ["IP Add", "ip_address"],
                ["Cell ID", "cid"],
                ["LAC Code", "lac"],
                ["NET_ID", "net_id"],
              ].map(([source, target]) => (
                <div key={source} className="rounded-2xl border border-slate-200 p-4">
                  <p className="text-xs uppercase tracking-wide text-slate-400">Source Column</p>
                  <p className="mt-1 font-medium">{source}</p>
                  <p className="mt-3 text-xs uppercase tracking-wide text-slate-400">Mapped Field</p>
                  <p className="mt-1 font-medium text-slate-700">{target}</p>
                </div>
              ))}
            </div>
          )}

          <div className="flex flex-wrap gap-3">
            <PrimaryButton>Run Validation Again</PrimaryButton>
            <SecondaryButton>Export Validation Report</SecondaryButton>
          </div>
        </div>
      </ShellCard>
    </div>
  );
}

function TemplatesPage() {
  return (
    <div className="space-y-6">
      <ShellCard title="Template Library" subtitle="Manage vendor-specific script templates and releases">
        <div className="space-y-5">
          <div className="grid gap-4 md:grid-cols-4">
            {["Huawei", "Ericsson", "Nokia", "Cisco / Juniper / MikroTik"].map((vendor) => (
              <div key={vendor} className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Vendor</p>
                <p className="mt-2 font-semibold">{vendor}</p>
              </div>
            ))}
          </div>
          <DataTable
            headers={["Template Name", "Vendor", "Release", "Type", "Version"]}
            rows={templateRows}
            renderRow={(row) => (
              <>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3">{row.vendor}</td>
                <td className="px-4 py-3">{row.release}</td>
                <td className="px-4 py-3">{row.type}</td>
                <td className="px-4 py-3">{row.version}</td>
              </>
            )}
          />
          <div className="flex flex-wrap gap-3">
            <PrimaryButton>Add New Template</PrimaryButton>
            <SecondaryButton>Preview Render</SecondaryButton>
          </div>
        </div>
      </ShellCard>
    </div>
  );
}

function DownloadsPage() {
  return (
    <div className="space-y-6">
      <ShellCard title="Generated Packages" subtitle="Download site-wise or batch-wise output packages">
        <DataTable
          headers={["Batch", "Vendor", "Files", "Date", "Status", "Action"]}
          rows={downloadRows}
          renderRow={(row) => (
            <>
              <td className="px-4 py-3 font-medium">{row.batch}</td>
              <td className="px-4 py-3">{row.vendor}</td>
              <td className="px-4 py-3">{row.files}</td>
              <td className="px-4 py-3">{row.date}</td>
              <td className="px-4 py-3">
                <Badge tone="neutral">{row.status}</Badge>
              </td>
              <td className="px-4 py-3">
                <PrimaryButton className="px-3 py-2 text-xs">Download ZIP</PrimaryButton>
              </td>
            </>
          )}
        />
      </ShellCard>

      <div className="grid gap-6 lg:grid-cols-2">
        <ShellCard title="Output Structure" subtitle="Example export folder layout">
          <pre className="overflow-auto rounded-2xl bg-slate-950 p-5 text-sm text-slate-100">{`generated/
├── by_project/
│   └── North_Cluster_LTE/
│       ├── Huawei/
│       ├── Ericsson/
│       └── Cisco/
├── by_vendor/
│   ├── Nokia/
│   └── Juniper/
└── zip/
    ├── Batch-APR-001.zip
    └── Batch-APR-002.zip`}</pre>
        </ShellCard>

        <ShellCard title="Generation Actions" subtitle="Typical operations after validation is complete">
          <div className="space-y-3">
            {[
              "Generate XML for Huawei LTE",
              "Generate MML for Ericsson NR",
              "Generate TXT for Nokia LTE",
              "Generate CFG for Cisco Backhaul",
              "Create ZIP package with reports",
            ].map((item) => (
              <div key={item} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <p className="font-medium">{item}</p>
                <Badge tone="success">Ready</Badge>
              </div>
            ))}
            <div className="flex flex-wrap gap-3 pt-2">
              <PrimaryButton>Generate All</PrimaryButton>
              <SecondaryButton>Download Summary</SecondaryButton>
            </div>
          </div>
        </ShellCard>
      </div>
    </div>
  );
}

export default function NetworkScriptAutomationDemo() {
  const [page, setPage] = useState("dashboard");
  const [mobileOpen, setMobileOpen] = useState(false);

  const pageMeta = useMemo(() => {
    const map = {
      dashboard: {
        title: "Operations Dashboard",
        subtitle: "Monitor uploads, validation status, and multi-vendor script generation.",
        component: <DashboardPage />,
      },
      upload: {
        title: "Upload Plan Data",
        subtitle: "Import LLD and planning data from Excel files.",
        component: <UploadPage />,
      },
      validation: {
        title: "Validation Workspace",
        subtitle: "Review data quality before generating scripts.",
        component: <ValidationPage />,
      },
      templates: {
        title: "Template Management",
        subtitle: "Maintain XML, MML, TXT, and CFG templates by vendor and release.",
        component: <TemplatesPage />,
      },
      downloads: {
        title: "Downloads & Packages",
        subtitle: "Access generated files, ZIP bundles, and output reports.",
        component: <DownloadsPage />,
      },
    };
    return map[page];
  }, [page]);

  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <div className="flex min-h-screen">
        <Sidebar page={page} setPage={setPage} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        <div className="flex-1">
          <Topbar title={pageMeta.title} subtitle={pageMeta.subtitle} setMobileOpen={setMobileOpen} />
          <main className="px-4 py-6 sm:px-6 lg:px-8">
            <motion.div key={page} initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.25 }}>
              {pageMeta.component}
            </motion.div>
          </main>
        </div>
      </div>
    </div>
  );
}
