import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'
import type { Contribution, Category } from '../types'

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

const CATEGORY_COLORS: Record<Category, string> = {
  Speaking:     '#3b82f6',
  Mentoring:    '#ec4899',
  Writing:      '#10b981',
  Training:     '#f59e0b',
  'Open Source':'#8b5cf6',
  Community:    '#06b6d4',
}

interface HoursChartProps {
  contributions: Contribution[]
}

export function HoursChart({ contributions }: HoursChartProps) {
  // Build month buckets for current year's months that have data, plus fill gaps
  const buckets: Record<string, number> = {}
  contributions.forEach(c => {
    const key = c.date.slice(0, 7) // "YYYY-MM"
    buckets[key] = (buckets[key] ?? 0) + c.hoursContributed
  })

  const currentYear = new Date().getFullYear()
  const data = MONTHS.map((label, idx) => {
    const key = `${currentYear}-${String(idx + 1).padStart(2, '0')}`
    return { month: label, hours: buckets[key] ?? 0 }
  }).filter((_, idx) => {
    // Show up to and including the current month
    return idx <= new Date().getMonth()
  })

  // If no data, show all months with 0
  const chartData = data.length > 0 ? data : MONTHS.map(m => ({ month: m, hours: 0 }))

  return (
    <div className="chart-container">
      <div className="chart-title">Hours by Month</div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={chartData} margin={{ top: 4, right: 8, left: -20, bottom: 0 }}>
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} allowDecimals={false} />
          <Tooltip
            formatter={(value) => [`${value}h`, 'Hours']}
            contentStyle={{ fontSize: 13, borderRadius: 6 }}
          />
          <Bar dataKey="hours" fill="#3b82f6" radius={[3, 3, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  )
}

interface CategoryChartProps {
  contributions: Contribution[]
}

export function CategoryChart({ contributions }: CategoryChartProps) {
  const counts: Partial<Record<Category, number>> = {}
  contributions.forEach(c => {
    counts[c.category] = (counts[c.category] ?? 0) + 1
  })

  const data = (Object.keys(counts) as Category[]).map(cat => ({
    name: cat,
    value: counts[cat]!,
  }))

  if (data.length === 0) {
    return (
      <div className="chart-container">
        <div className="chart-title">Contributions by Category</div>
        <p className="chart-empty">No contributions in this period yet.</p>
      </div>
    )
  }

  return (
    <div className="chart-container">
      <div className="chart-title">Contributions by Category</div>
      <ResponsiveContainer width="100%" height={220}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            cx="50%"
            cy="50%"
            outerRadius={80}
            label={({ name, percent }) => `${name} ${Math.round((percent ?? 0) * 100)}%`}
            labelLine={true}
          >
            {data.map(entry => (
              <Cell key={entry.name} fill={CATEGORY_COLORS[entry.name as Category] ?? '#94a3b8'} />
            ))}
          </Pie>
          <Tooltip formatter={(v) => [v, 'Contributions']} contentStyle={{ fontSize: 13, borderRadius: 6 }} />
          <Legend iconSize={10} iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  )
}
