const buildRequest = ({ url, ...params }) => {
  return Object.keys(params).reduce(
    (accumulator, currentParam) =>
      `${accumulator}${currentParam}=${params[currentParam]}&`,
    url
  )
}

export { buildRequest }
