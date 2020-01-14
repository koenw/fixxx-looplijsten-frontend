declare type Email = string
declare type Password = string
declare type AuthToken = string
declare type OAuthToken = AuthToken | undefined

declare type IsAuthenticatedResponse = {
  is_authenticated: boolean
}
