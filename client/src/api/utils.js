export const isProduction = process.env.NODE_ENV === 'production'

export const getCookie = cookieName => document.cookie.replace(
    new RegExp(`(?:(?:^|.*;\s*)${cookieName}\s*\=\s*([^;]*).*$)|^.*$`), "$1"
)

export const createUrl = url => isProduction ? `//api.portfolio.com${url}` : `//local.portfolio.com:8000${url}`
