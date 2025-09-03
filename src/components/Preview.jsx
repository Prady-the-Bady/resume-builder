import React from 'react'

function Modern({ data }) {
  return (
    <div className="resume modern">
      <div className="modern-header">
        <div>
          <h1>{data.name}</h1>
          <h2>{data.title}</h2>
        </div>
        <div className="contact">{data.contact}</div>
      </div>
      <section className="summary">{data.summary}</section>
      <section>
        <h3>Experience</h3>
        {data.experience.map((ex, i) => (
          <div key={i} className="exp">
            <div className="exp-left">
              <div className="company">{ex.company}</div>
              <div className="period">{ex.period}</div>
            </div>
            <div className="exp-right">
              <div className="role">{ex.role}</div>
              <div className="details">{ex.details}</div>
            </div>
          </div>
        ))}
      </section>
      <section>
        <h3>Skills</h3>
        <div className="skills">{data.skills.join(' · ')}</div>
      </section>
    </div>
  )
}

function Classic({ data }) {
  return (
    <div className="resume classic">
      <header>
        <h1>{data.name}</h1>
        <p className="title">{data.title} — {data.contact}</p>
      </header>
      <hr />
      <section className="summary">{data.summary}</section>
      <section>
        <h3>Experience</h3>
        {data.experience.map((ex, i) => (
          <div key={i} className="exp classic-exp">
            <strong>{ex.role}</strong> — {ex.company} <span className="period">{ex.period}</span>
            <div className="details">{ex.details}</div>
          </div>
        ))}
      </section>
      <section>
        <h3>Skills</h3>
        <ul className="skills-list">{data.skills.map((s, i) => <li key={i}>{s}</li>)}</ul>
      </section>
    </div>
  )
}

export default function Preview({ data }) {
  return (
    <main className="preview">
      <h2>Preview</h2>
      <div id="preview">
        {data.meta.template === 'modern' ? <Modern data={data} /> : <Classic data={data} />}
      </div>
    </main>
  )
}
