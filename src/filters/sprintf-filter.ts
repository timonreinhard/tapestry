import sprintf from 'sprintf-js'

export default function (value, format) {
  const isNumeric = value !== null && !isNaN(value)
  return isNumeric ? sprintf.sprintf(format, value) : ''
}
