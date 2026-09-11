import React from "react";
import { X, ChevronDown, ChevronUp, Star } from "lucide-react";
import { mentors } from "../data/mentors";

const DOMAINS = ["Engineering", "Data Science", "Product", "Design", "Business"];
const COMPANIES = [...new Set(mentors.map(m => m.company))];
const SKILLS = [...new Set(mentors.flatMap(m => m.skills))];
const LANGUAGES = ["English", "Hindi", "Telugu", "Bengali", "Marathi"];
const TOOLS = ["Git", "Postman", "Figma", "Docker", "AWS", "Jira", "VS Code", "Linux"];

export default function MentorFilterSidebar({
  filters,
  onFilter,
  onClear,
  resultCount,
  totalMentors,
}) {
  const activeCount = Object.values(filters).filter(v => v && v.length > 0).length;

  const toggleArray = (key, value) => {
    const current = filters[key] || [];
    const next = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value];
    onFilter(key, next);
  };

  const Section = ({ title, children, defaultOpen = true }) => {
    const [open, setOpen] = React.useState(defaultOpen);
    return (
      <div className="border-b border-slate-100 py-4 last:border-0">
        <button
          onClick={() => setOpen(!open)}
          className="w-full flex items-center justify-between text-sm font-semibold text-slate-800 mb-3"
        >
          <span>{title}</span>
          {open ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
        </button>
        {open && <div className="space-y-2">{children}</div>}
      </div>
    );
  };

  const CheckboxRow = ({ label, checked, onChange }) => (
    <label className="flex items-center gap-2 cursor-pointer group">
      <input
        type="checkbox"
        checked={checked}
        onChange={onChange}
        className="w-4 h-4 rounded border-slate-300 text-blue-600 focus:ring-blue-500"
      />
      <span className="text-sm text-slate-600 group-hover:text-slate-900 transition-colors">{label}</span>
    </label>
  );

  return (
    <aside className="w-full lg:w-72 flex-shrink-0">
      <div className="sticky top-20">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="font-bold text-slate-900">Filters</h3>
            <p className="text-xs text-slate-500">{resultCount} of {totalMentors} mentors</p>
          </div>
          {activeCount > 0 && (
            <button
              onClick={onClear}
              className="text-xs text-red-600 font-medium hover:underline flex items-center gap-1"
            >
              <X size={12} />Clear all
            </button>
          )}
        </div>

        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4">
          <Section title="Domain">
            {DOMAINS.map(d => (
              <CheckboxRow
                key={d}
                label={d}
                checked={(filters.domain || []).includes(d)}
                onChange={() => toggleArray("domain", d)}
              />
            ))}
          </Section>

          <Section title="Company">
            {COMPANIES.map(c => (
              <CheckboxRow
                key={c}
                label={c}
                checked={(filters.company || []).includes(c)}
                onChange={() => toggleArray("company", c)}
              />
            ))}
          </Section>

          <Section title="Skills">
            {SKILLS.slice(0, 12).map(s => (
              <CheckboxRow
                key={s}
                label={s}
                checked={(filters.skills || []).includes(s)}
                onChange={() => toggleArray("skills", s)}
              />
            ))}
          </Section>

          <Section title="Experience">
            {[
              { label: "0-3 years", value: "0-3" },
              { label: "3-6 years", value: "3-6" },
              { label: "6+ years", value: "6+" },
            ].map(r => (
              <CheckboxRow
                key={r.value}
                label={r.label}
                checked={(filters.experience || []).includes(r.value)}
                onChange={() => toggleArray("experience", r.value)}
              />
            ))}
          </Section>

          <Section title="Tools">
            {TOOLS.map(t => (
              <CheckboxRow
                key={t}
                label={t}
                checked={(filters.tools || []).includes(t)}
                onChange={() => toggleArray("tools", t)}
              />
            ))}
          </Section>

          <Section title="Languages">
            {LANGUAGES.map(l => (
              <CheckboxRow
                key={l}
                label={l}
                checked={(filters.languages || []).includes(l)}
                onChange={() => toggleArray("languages", l)}
              />
            ))}
          </Section>

          <Section title="Pricing" defaultOpen={false}>
            {["Free Trial", "Paid Mentorship", "Fixed Price"].map(p => (
              <CheckboxRow
                key={p}
                label={p}
                checked={(filters.pricing || []).includes(p)}
                onChange={() => toggleArray("pricing", p)}
              />
            ))}
          </Section>

          <Section title="Other" defaultOpen={false}>
            <CheckboxRow
              label="Star Mentors only"
              checked={filters.starOnly === true}
              onChange={() => onFilter("starOnly", !filters.starOnly)}
            />
            <CheckboxRow
              label="Verified only"
              checked={filters.verifiedOnly === true}
              onChange={() => onFilter("verifiedOnly", !filters.verifiedOnly)}
            />
            <CheckboxRow
              label="Available now"
              checked={filters.availableOnly === true}
              onChange={() => onFilter("availableOnly", !filters.availableOnly)}
            />
          </Section>
        </div>
      </div>
    </aside>
  );
}