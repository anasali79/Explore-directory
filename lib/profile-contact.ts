export const profilePhoneDigits = '911234567890'
export const profilePhone = `+${profilePhoneDigits.slice(0, 2)} ${profilePhoneDigits.slice(2)}`

export function whatsappProfileUrl(name: string) {
  const message = encodeURIComponent(`Hi, I’m reaching out through Commonplace about ${name}.`)
  return `https://wa.me/${profilePhoneDigits}?text=${message}`
}
