import apiResponse from 'quick-response'

export const createUserVaidation = (req, res, next) => {
  const { fullName, phoneNumber, email, password } = req.body

  if (
    req.body.hasOwnProperty('fullName') &&
    req.body.hasOwnProperty('phoneNumber') &&
    req.body.hasOwnProperty('email') &&
    req.body.hasOwnProperty('password') &&
    req.body.hasOwnProperty('role')
  ) {
    if (
      [fullName, phoneNumber, email, password].some((field) => field === '')
    ) {
      return res
        .status(403)
        .json(apiResponse(403, 'include all required fields'))
    }
  } else {
    return res.status(400).json(apiResponse(400, 'invalid request'))
  }

  next()
}
