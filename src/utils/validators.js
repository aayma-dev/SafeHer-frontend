export const validators = {
  required: (v) => (v && String(v).trim() ? null : 'This field is required'),

  email: (v) => {
    if (!v) return 'Email is required'
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(v) ? null : 'Enter a valid email address'
  },

  password: (v) => {
    if (!v) return 'Password is required'
    if (v.length < 8) return 'Password must be at least 8 characters'
    return null
  },

  username: (v) => {
    if (!v) return 'Username is required'
    if (v.length < 3) return 'Username must be at least 3 characters'
    if (!/^[a-zA-Z0-9_]+$/.test(v)) return 'Only letters, numbers and underscores'
    return null
  },

  minLength: (min) => (v) =>
    v && v.length >= min ? null : `Minimum ${min} characters required`,

  maxLength: (max) => (v) =>
    !v || v.length <= max ? null : `Maximum ${max} characters allowed`,

  confirmPassword: (original) => (v) =>
    v === original ? null : 'Passwords do not match',
}

export const validateForm = (values, rules) => {
  const errors = {}
  for (const field in rules) {
    const fieldRules = Array.isArray(rules[field]) ? rules[field] : [rules[field]]
    for (const rule of fieldRules) {
      const error = rule(values[field])
      if (error) { errors[field] = error; break }
    }
  }
  return errors
}