## TODO
- display errors on add group form. return previous state on error
- migrate from actions to api

## Conventions
### Forms
`id` attributes will be named in this style: `form-feature-action--fieldname` 
### Use cases
Allowed verbs are
- get
- add
- update
- delete

## HTTP Status codes
### Success
- 200: Request succeeded
- 201: Resource created
- 204: Request succeeded and no content returned
### Errors
- 401: Unauthenticated
- 403: Unauthorized or forbidden
- 404: Resource not found
- 409: Conflict
- 422: Validation failed
- 423: Resource locked
