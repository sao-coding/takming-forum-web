import {
  Icon,
  IconBadges,
  IconBooks,
  IconHome,
  IconProps,
  IconSchool,
  IconUser
} from "@tabler/icons-react"

type NavLinks = {
  herf: string
  icon: React.ForwardRefExoticComponent<Omit<IconProps, "ref"> & React.RefAttributes<Icon>>
  text: string
}
export const NAV_LINKS: NavLinks[] = [
  {
    herf: "/",
    icon: IconHome,
    text: "首頁"
  },
  {
    herf: "/course",
    icon: IconSchool,
    text: "課程評論"
  },
  {
    herf: "/book",
    icon: IconBooks,
    text: "二手書"
  },
  {
    herf: "/rank",
    icon: IconBadges,
    text: "排行榜"
  },
  {
    herf: "/user",
    icon: IconUser,
    text: "個人資訊"
  }
]
