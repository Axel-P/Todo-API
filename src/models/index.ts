import User from './users'
export interface Models {
  models: {
    User: typeof User
  }
}
export default { User }