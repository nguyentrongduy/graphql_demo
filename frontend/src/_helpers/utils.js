import React from 'react'
import { Redirect } from 'react-router-dom'

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

export function handleResponseError (resp) {
  if (Object.prototype.toString.call(resp) === '[object Array]') {
    resp.forEach(i => {
      if (i && i.error && i.error.length > 0) {
        if (i.error.find(f => f.statusCode === 401)) {
          return <Redirect to='/login' />
        }
      }
    })
  } else if (Object.prototype.toString.call(resp) === '[object Object]') {
    if (resp && resp.error && resp.error.length > 0) {
      if (resp.error.find(f => f.statusCode === 401)) {
        return <Redirect to='/login' />
      }
    }
  }
}
