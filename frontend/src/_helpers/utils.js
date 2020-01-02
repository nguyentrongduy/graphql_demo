export function debounce (fn, time) {
  let timeoutId
  return wrapper
  function wrapper (...args) {
    if (timeoutId) {
      clearTimeout(timeoutId)
    }
    timeoutId = setTimeout(() => {
      timeoutId = null
      fn(...args)
    }, time)
  }
}

export function getCookie (cookie, cookieName) {
  if (cookie === undefined || cookie === null) return ''
  var name = cookieName + '='
  var decodedCookie = decodeURIComponent(cookie)
  var ca = decodedCookie.split(';')
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i]
    while (c.charAt(0) === ' ') {
      c = c.substring(1)
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length)
    }
  }
  return ''
}
