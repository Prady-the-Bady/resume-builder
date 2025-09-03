import React from 'react'

export default function Editor({ data, onChange }) {
  function setField(key, value) {
    onChange({ ...data, [key]: value })
  }

  function setExperience(idx, field, value) {
    const exp = data.experience.slice()
    exp[idx] = { ...exp[idx], [field]: value }
    onChange({ ...data, experience: exp })
  }

  function addExperience() {
    onChange({ ...data, experience: [...data.experience, { company: '', role: '', period: '', details: '' }] })
  }

  function removeExperience(i) {
    const exp = data.experience.filter((_, idx) => idx !== i)
    onChange({ ...data, experience: exp })
  }

  function importJSON(e) {
    const file = e.target.files[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = () => {
      try {
        const parsed = JSON.parse(reader.result)
        onChange(parsed)
      } catch (err) {
        alert('Invalid JSON')
      }
    }
    reader.readAsText(file)
  }

  function exportJSON() {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = 'resume.json'
    a.click()
    URL.revokeObjectURL(url)
  }

  return (
    <aside className="editor">
      <h2>Editor</h2>
      <label>Template
        <select value={data.meta.template} onChange={e => onChange({ ...data, meta: { ...data.meta, template: e.target.value } })}>
          <option value="modern">Modern</option>
          <option value="classic">Classic</option>
        </select>
      </label>

      <label>Name
        <input value={data.name} onChange={e => setField('name', e.target.value)} />
      </label>

      <label>Title
        <input value={data.title} onChange={e => setField('title', e.target.value)} />
      </label>

      <label>Contact
        <input value={data.contact} onChange={e => setField('contact', e.target.value)} />
      </label>

      <label>Summary
        <textarea value={data.summary} onChange={e => setField('summary', e.target.value)} />
      </label>

      <section>
        <h3>Experience</h3>
        {data.experience.map((ex, i) => (
          <div key={i} className="exp-row">
            <input placeholder="Company" value={ex.company} onChange={e => setExperience(i, 'company', e.target.value)} />
            <input placeholder="Role" value={ex.role} onChange={e => setExperience(i, 'role', e.target.value)} />
            <input placeholder="Period" value={ex.period} onChange={e => setExperience(i, 'period', e.target.value)} />
            <textarea placeholder="Details" value={ex.details} onChange={e => setExperience(i, 'details', e.target.value)} />
            <button type="button" onClick={() => removeExperience(i)}>Remove</button>
          </div>
        ))}
        <button type="button" onClick={addExperience}>Add experience</button>
      </section>

      <label>Skills (comma-separated)
        <input value={data.skills.join(', ')} onChange={e => setField('skills', e.target.value.split(',').map(s => s.trim()).filter(Boolean))} />
      </label>

      <div className="editor-actions">
        <input type="file" accept="application/json" onChange={importJSON} />
        <button onClick={exportJSON}>Export JSON</button>
        <button onClick={() => window.print()}>Print / Save PDF</button>
      </div>

      <p className="hint">Tip: export JSON to reuse across templates or import from other tools that provide JSON resumes.</p>
    </aside>
  )
}
