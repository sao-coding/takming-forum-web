enum Role {
  SUPER_ADMIN = "SUPER_ADMIN",
  ADMIN = "ADMIN",
  USER = "USER"
}

export type User = {
  id: string
  studentId: string
  name: string
  givenName: string
  familyName: string
  picture: string
  email: string
  role: Role
  createdAt: string
}

export type UserContact = {
  username: string
  email: string
  phone: string
  lineId: string
  igId: string
}

// lineNotifyStatus : boolean
// lineNotifyToken : string

// interface UserSettings + UserContact
export type UserSettings = UserContact & {
  lineNotifyStatus: boolean
  lineNotifyToken: boolean
}
