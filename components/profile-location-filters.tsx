'use client'

import type { DirectoryProfile } from '@/lib/directory-data'

export type DirectoryLocation = { neighbourhood: string; city: string }

type Props = {
  profiles: DirectoryProfile[]
  value: DirectoryLocation
  onChange: (value: DirectoryLocation) => void
}

function uniqueSorted(values: string[]) {
  return Array.from(new Set(values.filter(Boolean))).sort((left, right) => left.localeCompare(right))
}

export function ProfileLocationFilters({ profiles, value, onChange }: Props) {
  const neighbourhoods = uniqueSorted(profiles.map((profile) => profile.location))
  const cities = uniqueSorted(profiles.map((profile) => profile.city))

  return (
    <div className="location-filter-panel">
      <div className="location-filter-heading">
        <span className="eyebrow">FIND COMPANIONS BY NEIGHBOURHOOD</span>
        <p>Select a Lucknow neighbourhood to discover companions nearby.</p>
      </div>
      <div className="location-filter-grid" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))' }}>
        <label className="location-filter-field">
          <span>NEIGHBOURHOOD</span>
          <select
            value={value.neighbourhood}
            onChange={(event) => onChange({ neighbourhood: event.target.value, city: value.city })}
          >
            <option value="">All neighbourhoods</option>
            {neighbourhoods.map((neighbourhood) => (
              <option key={neighbourhood} value={neighbourhood}>{neighbourhood}</option>
            ))}
          </select>
        </label>
        <label className="location-filter-field">
          <span>CITY</span>
          <select
            value={value.city}
            onChange={(event) => onChange({ neighbourhood: value.neighbourhood, city: event.target.value })}
          >
            <option value="">All cities</option>
            {cities.map((city) => (
              <option key={city} value={city}>{city}</option>
            ))}
          </select>
        </label>
      </div>
    </div>
  )
}