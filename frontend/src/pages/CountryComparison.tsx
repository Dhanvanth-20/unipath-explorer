import { useState } from "react";
import { motion } from "framer-motion";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import PageLayout from "@/components/layout/PageLayout";
import { countries } from "@/data/mockData";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function CountryComparison() {
  const [selected, setSelected] = useState<string[]>(["usa", "canada"]);

  const toggleCountry = (id: string, index: number) => {
    const copy = [...selected];
    copy[index] = id;
    setSelected(copy);
  };

  const addSlot = () => {
    if (selected.length < 3) setSelected([...selected, ""]);
  };

  const data = selected
    .filter(Boolean)
    .map((id) => {
      const c = countries.find((x) => x.id === id)!;
      return {
        name: c.name,
        "Tuition (avg)": Math.round((c.tuitionFee.min + c.tuitionFee.max) / 2),
        "Living Cost": c.costOfLiving,
      };
    });

  const selectedCountries = selected.filter(Boolean).map((id) => countries.find((c) => c.id === id)!);

  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-10">
        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-2">
            Country <span className="text-gradient">Comparison</span>
          </h1>
          <p className="text-muted-foreground mb-8">Select up to 3 countries to compare side by side.</p>

          {/* Selectors */}
          <div className="flex flex-wrap gap-4 mb-10">
            {selected.map((val, i) => (
              <Select key={i} value={val} onValueChange={(v) => toggleCountry(v, i)}>
                <SelectTrigger className="w-52 bg-card">
                  <SelectValue placeholder={`Country ${i + 1}`} />
                </SelectTrigger>
                <SelectContent className="bg-popover">
                  {countries.map((c) => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.flag} {c.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            ))}
            {selected.length < 3 && (
              <button onClick={addSlot} className="px-4 py-2 border border-dashed border-primary/40 rounded-lg text-primary text-sm hover:bg-primary/5 transition-colors">
                + Add Country
              </button>
            )}
          </div>

          {/* Table */}
          {selectedCountries.length > 0 && (
            <div className="bg-card rounded-xl border border-border overflow-hidden shadow-card mb-10">
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted">
                      <th className="text-left px-6 py-4 font-display font-semibold text-foreground">Metric</th>
                      {selectedCountries.map((c) => (
                        <th key={c.id} className="text-left px-6 py-4 font-display font-semibold text-foreground">
                          {c.flag} {c.name}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { label: "Tuition Fees (yearly)", render: (c: typeof selectedCountries[0]) => `$${c.tuitionFee.min.toLocaleString()} - $${c.tuitionFee.max.toLocaleString()}` },
                      { label: "Cost of Living (yearly)", render: (c: typeof selectedCountries[0]) => `$${c.costOfLiving.toLocaleString()}` },
                      { label: "Part-time Work Hours / week", render: (c: typeof selectedCountries[0]) => `${c.partTimeHours} hrs` },
                      { label: "Post-study Visa", render: (c: typeof selectedCountries[0]) => c.postStudyVisa },
                      { label: "PR Opportunity", render: (c: typeof selectedCountries[0]) => c.prOpportunity },
                    ].map((row, i) => (
                      <tr key={row.label} className={i % 2 === 0 ? "" : "bg-muted/50"}>
                        <td className="px-6 py-4 font-medium text-foreground">{row.label}</td>
                        {selectedCountries.map((c) => (
                          <td key={c.id} className="px-6 py-4 text-muted-foreground">{row.render(c)}</td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Chart */}
          {data.length > 0 && (
            <div className="bg-card rounded-xl border border-border p-6 shadow-card">
              <h3 className="font-display font-semibold text-lg mb-4 text-foreground">Cost Comparison</h3>
              <ResponsiveContainer width="100%" height={320}>
                <BarChart data={data} barGap={8}>
                  <XAxis dataKey="name" tick={{ fontSize: 13 }} />
                  <YAxis tick={{ fontSize: 13 }} />
                  <Tooltip contentStyle={{ borderRadius: "0.75rem", border: "1px solid hsl(214,20%,90%)" }} />
                  <Legend />
                  <Bar dataKey="Tuition (avg)" fill="hsl(217,91%,60%)" radius={[6, 6, 0, 0]} />
                  <Bar dataKey="Living Cost" fill="hsl(199,89%,48%)" radius={[6, 6, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </motion.div>
      </div>
    </PageLayout>
  );
}
