import { createContext, useContext } from 'react'

interface DirectionsContextValue {
  openDirections: () => void
}

export const DirectionsContext = createContext<DirectionsContextValue>({ openDirections: () => {} })

export const useDirections = () => useContext(DirectionsContext)
