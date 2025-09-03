import React, { useState } from 'react'
import Editor from './components/Editor'
import Preview from './components/Preview'

const defaultData = {
  meta: { template: 'modern' },
  name: 'Jane Developer',
  title: 'Frontend Engineer',
  contact: 'jane@example.com | (555) 123-4567 | github.com/janedev',
  summary: 'Product-minded frontend engineer building delightful user experiences.',
  experience: [
    { company: 'Acme Co', role: 'Senior Engineer', period: '2021 - Present', details: 'Led frontend re-architecture and component library.' }
  ],
  skills: ['React', 'JavaScript', 'CSS']
}

export default function App() {
  const [data, setData] = useState(defaultData)

  const update = (partial) => setData(prev => ({ ...prev, ...partial }))

  return (
    <div className="app">
      <header className="app-header">
        <h1>Resume Builder Prototype</h1>
      </header>
      <div className="app-grid">
        <Editor data={data} onChange={setData} />
        <Preview data={data} onChange={update} />
      </div>
      <footer className="app-footer">Templates and assets should be free & open-source (use OSS fonts and icon sets in production).</footer>
    </div>
  )
}
