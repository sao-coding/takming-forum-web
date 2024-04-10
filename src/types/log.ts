export type Log = {
  id: string
  ip: string
  user: User
  pathname: string
  searchParams: string
  createdAt: string
}

type User = {
  studentId: string
  name: string
  picture: string
  UserSettings: UserSettings[]
}

type UserSettings = {
  username: string
}
