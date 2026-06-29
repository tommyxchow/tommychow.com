'use client'

import { type PointerEvent, type ReactNode, useState } from 'react'
import { twJoin } from 'tailwind-merge'

const DOT_LEADER_LENGTH = 512
const DOTS = '.'.repeat(DOT_LEADER_LENGTH)

const statSheetListClassName =
  'flex flex-col font-mono text-xs font-normal leading-none uppercase'

const rowTextTransition =
  'transition-colors duration-200 ease-out motion-reduce:transition-none'

type RowTone = 'default' | 'focused' | 'dimmed'

function rowToneClasses(tone: RowTone) {
  switch (tone) {
    case 'focused':
      return {
        label: 'text-foreground',
        value: 'text-foreground',
        dots: 'text-foreground/45',
      }
    case 'dimmed':
      return {
        label: 'text-muted-foreground',
        value: 'text-muted-foreground',
        dots: 'text-muted-foreground/25',
      }
    case 'default':
      return {
        label: 'text-foreground',
        value: 'text-muted-foreground',
        dots: 'text-muted-foreground/45',
      }
  }
}

function DotLeader({ tone }: { tone: RowTone }) {
  const { dots } = rowToneClasses(tone)

  return (
    <span
      aria-hidden='true'
      className={twJoin(
        'min-w-0 cursor-default overflow-hidden whitespace-nowrap select-none',
        rowTextTransition,
        dots,
      )}
    >
      {DOTS}
    </span>
  )
}

interface MetaRowProps {
  label: string
  value: ReactNode
  tone: RowTone
}

function MetaRow({ label, value, tone }: MetaRowProps) {
  const { label: labelClass, value: valueClass } = rowToneClasses(tone)

  return (
    <div className='grid grid-cols-[auto_1fr_auto] items-center gap-x-2'>
      <dt className={twJoin(labelClass, rowTextTransition)}>{label}</dt>
      <DotLeader tone={tone} />
      <dd
        className={twJoin('flex items-center', valueClass, rowTextTransition)}
      >
        {value}
      </dd>
    </div>
  )
}

interface StatSheetListProps {
  rows: { label: string; value: ReactNode }[]
}

export function StatSheetList({ rows }: StatSheetListProps) {
  const [hoveredLabel, setHoveredLabel] = useState<string | null>(null)

  const handleRowLeave = (event: PointerEvent<HTMLDivElement>) => {
    const related = event.relatedTarget
    const list = event.currentTarget.closest('dl')
    if (related instanceof Node && list?.contains(related)) return
    setHoveredLabel(null)
  }

  return (
    <dl className={statSheetListClassName}>
      {rows.map(({ label, value }) => {
        const tone: RowTone =
          hoveredLabel === null
            ? 'default'
            : hoveredLabel === label
              ? 'focused'
              : 'dimmed'

        return (
          <div
            key={label}
            className='py-[3px]'
            onPointerEnter={() => setHoveredLabel(label)}
            onPointerLeave={handleRowLeave}
          >
            <MetaRow label={label} value={value} tone={tone} />
          </div>
        )
      })}
    </dl>
  )
}
