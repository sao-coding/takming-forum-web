type Site = {
  url: string
  keywords: string
}

export const site: Site = {
  url:
    process.env.NODE_ENV === "production"
      ? "https://takming-forum.sao-x.com"
      : "http://localhost:3000",
  keywords:
    "德明論壇, 德明, 德明財經科技, 德明財經科技大學, 德明e學院, tip, 德明tip, 德明二手書, 德明課程評論, 德明二手書交易, 2k6au/6, 2k6au/6e"
}
