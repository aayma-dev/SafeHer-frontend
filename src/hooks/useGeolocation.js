import { useState, useCallback } from 'react'

export function useGeolocation(options = {}) {
  const [location, setLocation] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  const getLocation = useCallback(() => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser')
      return
    }

    setLoading(true)
    setError(null)

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setLoading(false)
      },
      (err) => {
        setError(err.message || 'Unable to retrieve location')
        setLoading(false)
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 60000,
        ...options,
      }
    )
  }, [options]) 
  const watchLocation = useCallback(() => {
    if (!navigator.geolocation) return null

    return navigator.geolocation.watchPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        })
      },
      (err) => setError(err.message),
      {
        enableHighAccuracy: true,
      }
    )
  }, []) 

  return { location, error, loading, getLocation, watchLocation }
}