'use client'
import { useState } from 'react'
import { CourseCard, type CourseCardData } from './Cards'
import { LEVEL_LABEL } from '@/lib/site'

/** Courses grid with level filter chips (All · Beginner · Advanced · Short course). */
export function CourseList({ courses, whatsapp }: { courses: CourseCardData[]; whatsapp: string }) {
  const levels = ['all', ...new Set(courses.map((c) => c.level))]
  const [level, setLevel] = useState('all')
  return (
    <>
      <div className="filters" role="group" aria-label="Filter courses">
        {levels.map((l) => (
          <button key={l} type="button" aria-pressed={level === l} onClick={() => setLevel(l)}>
            {l === 'all' ? 'All' : LEVEL_LABEL[l] || l}
          </button>
        ))}
      </div>
      <div className="cards">
        {courses.map((c, i) => (level === 'all' || c.level === level ? <CourseCard key={c.slug} c={c} i={i} whatsapp={whatsapp} /> : null))}
      </div>
    </>
  )
}
