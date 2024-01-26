export const validateEmail = (email: string): boolean => {
  if(!email) {
    return true
  }

  return !!email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)
}