const determineResponse = ({ statusString, statusCode, data = {}, res }) =>
  res.status(statusCode).json({
    status: statusString,
    data,
  })

export const success = ({ statusCode, data, res }) =>
  determineResponse({ statusString: 'success', statusCode, data, res })
export const failure = ({ statusCode, data, res }) => determineResponse({ statusString: 'fail', statusCode, data, res })
