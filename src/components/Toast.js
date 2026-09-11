import React from "react";
import { CheckCircle, Info, AlertCircle, X } from "lucide-react";
import { useApp } from "../context/AppContext";

const icons = { success: <CheckCircle size={18} className="text-green-600" />, info: <Info size={18} className="text-blue-600" />, error: <AlertCircle size={18} className="text-red-600" /> };
const colors = { success: "bg-green-50 border-green-200", info: "bg-blue-50 border-blue-200", error: "bg-red-50 border-red-200" };

export default function Toast() {
  const { toast, setToast } = useApp();
  if (!toast) return null;
  return (
    <div className={`fixed bottom-6 right-6 z-50 flex items-center gap-3 px-4 py-3 rounded-xl border shadow-lg max-w-sm ${colors[toast.type || "success"]}`}>
      {icons[toast.type || "success"]}
      <p className="text-sm font-medium text-slate-800 flex-1">{toast.message}</p>
      <button onClick={() => setToast(null)} className="text-slate-400 hover:text-slate-600"><X size={16} /></button>
    </div>
  );
}
