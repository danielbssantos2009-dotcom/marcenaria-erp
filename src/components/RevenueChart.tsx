'use client';

import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts'

export default function RevenueChart({ data }: { data: any[] }) {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart data={data}>
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 10, fill: '#71717a' }} />
        <YAxis hide />
        <Tooltip />
        <Line type="monotone" dataKey="val" stroke="#e11d48" strokeWidth={3} dot={{ r: 4, fill: '#e11d48' }} />
      </LineChart>
    </ResponsiveContainer>
  )
}
