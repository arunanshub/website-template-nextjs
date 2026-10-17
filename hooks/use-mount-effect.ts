import { type EffectCallback, useEffect } from 'react'

/**
 * Runs `effect` once after mount and its cleanup on unmount. This is the one
 * sanctioned useEffect; .oxlintrc.json bans the import everywhere else.
 */
export function useMountEffect(effect: EffectCallback): void {
  useEffect(effect, [])
}
