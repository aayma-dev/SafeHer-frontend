import { useState, useCallback } from 'react'

export function useForm(initialValues = {}, validationRules = {}) {
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [touched, setTouched] = useState({})

  const handleChange = useCallback((e) => {
    const { name, value, type, checked, files } = e.target
    const val = type === 'checkbox' ? checked : type === 'file' ? files[0] : value
    setValues((prev) => ({ ...prev, [name]: val }))
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: null }))
  }, [errors])

  const handleBlur = useCallback((e) => {
    const { name } = e.target
    setTouched((prev) => ({ ...prev, [name]: true }))
    const rule = validationRules[name]
    if (rule) {
      const rules = Array.isArray(rule) ? rule : [rule]
      for (const r of rules) {
        const err = r(values[name])
        if (err) { setErrors((prev) => ({ ...prev, [name]: err })); break }
      }
    }
  }, [values, validationRules])

  const setValue = useCallback((name, value) => {
    setValues((prev) => ({ ...prev, [name]: value }))
  }, [])

  const validate = useCallback(() => {
    const newErrors = {}
    for (const field in validationRules) {
      const rules = Array.isArray(validationRules[field]) ? validationRules[field] : [validationRules[field]]
      for (const rule of rules) {
        const err = rule(values[field])
        if (err) { newErrors[field] = err; break }
      }
    }
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }, [values, validationRules])

  const reset = useCallback(() => {
    setValues(initialValues)
    setErrors({})
    setTouched({})
  }, [initialValues])

  const isValid = Object.keys(errors).every((k) => !errors[k]) &&
    Object.keys(validationRules).every((k) => values[k])

  return { values, errors, touched, handleChange, handleBlur, setValue, validate, reset, isValid }
}