import type { InputHTMLAttributes, ReactNode } from 'react'

const control =
  'w-full min-h-12 rounded-xl border bg-white/5 px-4 text-base text-white placeholder:text-white/50 transition focus:border-accent focus:bg-white/10 focus:outline-none [color-scheme:dark]'

export function Field({
  label,
  error,
  id,
  children,
  ...props
}: {
  label: string
  error?: string
  id: string
  children?: ReactNode
} & InputHTMLAttributes<HTMLInputElement>) {
  return (
    <div>
      <label htmlFor={id} className="mb-2 block text-xs font-bold uppercase tracking-widest text-white/60">
        {label}
      </label>
      {children ?? (
        <input
          id={id}
          aria-invalid={!!error}
          aria-describedby={error ? `${id}-err` : undefined}
          className={`${control} ${error ? 'border-red-400' : 'border-white/15'}`}
          {...props}
        />
      )}
      {error && (
        <p id={`${id}-err`} className="mt-1.5 text-sm text-red-400">
          {error}
        </p>
      )}
    </div>
  )
}

export const selectClass = (error?: string) => `${control} ${error ? 'border-red-400' : 'border-white/15'}`

