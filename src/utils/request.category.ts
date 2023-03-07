const RequestMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
} as const
export type RequestMethod = (typeof RequestMethod)[keyof typeof RequestMethod]
