import Footer from "@/components/email/footer"
import Logo from "@/components/email/logo"
import {
  Body,
  Button,
  Column,
  Container,
  Font,
  Head,
  Html,
  Img,
  Link,
  Preview,
  Row,
  Section,
  Tailwind,
  Text
} from "@react-email/components"

type BookPurchaseRequestProps = {
  buyer: {
    name: string
    email: string
    phone: string
    image: string
    lineId?: string
    igId?: string
  }
  date: string
  id: string
  book: {
    title: string
    price: string
    image: string
    condition: string
  }
}

const BookPurchaseRequest = (props: BookPurchaseRequestProps) => {
  const { buyer, date, id, book } = props

  return (
    <Html>
      <Head>
        <Font
          fontFamily='Geist'
          fallbackFontFamily='Arial'
          webFont={{
            url: "https://fonts.googleapis.com/css2?family=Geist:wght@100..900&display=swap",
            format: "woff2"
          }}
          fontWeight={400}
          fontStyle='normal'
        />
      </Head>
      <Preview>您有一位買家對「{book.title}」有興趣</Preview>
      <Tailwind>
        <Body className='m-auto bg-white p-1'>
          <Container className='mx-auto w-full max-w-[660px] rounded-lg border border-solid border-[#e5e5e5] bg-white p-8 shadow-sm'>
            <Logo />
            <Section>
              <Text className='m-0 p-0 text-xl font-semibold text-gray-900'>
                有人想購買您的二手書
              </Text>
              <Text className='mx-0 mb-0 mt-2 p-0 text-base font-normal text-gray-500'>
                有買家對您刊登的二手書{" "}
                <Link href={`#book-${id}`} className='font-medium text-gray-900'>
                  {book.title}
                </Link>{" "}
                有興趣
              </Text>
            </Section>

            <Section className='mt-6 rounded-lg border border-solid border-[#e5e5e5] bg-gray-50 p-6'>
              <Row>
                <Column className='w-24'>
                  <Img
                    src={book.image}
                    width={80}
                    height={100}
                    className='rounded-md'
                    alt={`${book.title}的封面`}
                  />
                </Column>
                <Column>
                  <Text className='m-0 py-0 pl-3 pr-0 text-base font-medium text-gray-900'>
                    {book.title}
                  </Text>
                  <Text className='m-0 py-0 pl-3 pr-0 text-lg font-bold text-gray-900'>
                    {book.price}
                  </Text>
                  <Text className='m-0 py-0 pl-3 pr-0 text-sm font-normal text-gray-500'>
                    書況：{book.condition}
                  </Text>
                </Column>
              </Row>
            </Section>

            <Section className='mt-6 rounded-lg border border-solid border-[#e5e5e5] bg-gray-50 p-6'>
              <Row>
                <Column className='w-10'>
                  <Img
                    src={buyer.image}
                    width={40}
                    height={40}
                    className='rounded-full'
                    alt={`${buyer.name}的頭像`}
                  />
                </Column>
                <Column>
                  <Text className='m-0 py-0 pl-3 pr-0 text-base font-medium text-gray-900'>
                    {buyer.name}
                  </Text>
                  <Text className='m-0 py-0 pl-3 pr-0 text-sm font-normal text-gray-500'>
                    {date}
                  </Text>
                </Column>
              </Row>
              <Text className='mx-0 mb-0 mt-4 p-0 text-base font-normal text-gray-700'>
                您好，我對這本書很有興趣！
                <br />
                希望能盡快與您聯繫，謝謝！
              </Text>

              <Section className='mt-4 border-t border-solid border-[#e5e5e5] pt-4'>
                <Text className='m-0 p-0 text-base font-medium text-gray-900'>買家聯絡方式：</Text>
                <Text className='m-0 p-0 text-sm font-normal text-gray-700'>
                  電子郵件：{buyer.email}
                </Text>
                <Text className='m-0 p-0 text-sm font-normal text-gray-700'>
                  電話：{buyer.phone}
                </Text>
                {buyer.lineId && (
                  <Text className='m-0 p-0 text-sm font-normal text-gray-700'>
                    LINE ID：{buyer.lineId}
                  </Text>
                )}
                {buyer.igId && (
                  <Text className='m-0 p-0 text-sm font-normal text-gray-700'>
                    Instagram：
                    <Link href={`https://instagram.com/${buyer.igId.replace("@", "")}`}>
                      {buyer.igId}
                    </Link>
                  </Text>
                )}
              </Section>
            </Section>

            <Button
              className='mt-6 rounded-full px-8 py-2.5 align-middle text-sm font-medium text-white'
              href={`mailto:${buyer.email}?subject=RE: 關於二手書「${book.title}」的詢問`}
              style={{
                backgroundColor: "#f97316",
                backgroundImage: "linear-gradient(to right, #f97316, #f59e0b)"
              }}
            >
              回覆買家
            </Button>
            <Footer />
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

BookPurchaseRequest.PreviewProps = {
  buyer: {
    name: "王小明",
    email: "buyer@example.com",
    phone: "0912-345-678",
    image: "https://blog.sao-x.com/img/avatar.jpg",
    lineId: "wang_xm123",
    igId: "@wang_xiaoming"
  },
  date: "2023年11月18日",
  id: "book-1234",
  book: {
    title: "JavaScript 程式設計精解",
    price: "350",
    image:
      "https://cf-assets2.tenlong.com.tw/products/images/000/124/362/original/9789863125068_bc.jpg",
    condition: "九成新，只有輕微筆記"
  }
} satisfies BookPurchaseRequestProps

export default BookPurchaseRequest
