import { Column, Hr, Img, Link, Row, Section, Text } from "@react-email/components"

const Footer = () => {
  return (
    <>
      <Hr className='mb-3 mt-6 border-t-border' />
      <Section>
        <Row className='mt-4' align='left' width='auto'>
          <Column className='pr-6 align-middle'>
            <Link
              href='https://www.instagram.com/_xox._.xox._.xox._.xox._.xox_'
              className='text-xl text-black'
            >
              <Img
                src='https://takming-forum.sao-x.com/images/email/instagram.png'
                alt='X'
                width={22}
                height={22}
              />
            </Link>
          </Column>
          <Column className='align-middle'>
            <Link
              href='https://github.com/sao-coding/takming-forum-web'
              className='text-xl text-black'
            >
              <Img
                src='https://takming-forum.sao-x.com/images/email/github.png'
                alt='GitHub'
                width={22}
                height={22}
              />
            </Link>
          </Column>
        </Row>
      </Section>
      <Text className='mx-0 mb-0 mt-6 p-0 text-xs font-normal text-gray-500'>
        © {new Date().getFullYear()} sao-coding. All rights reserved.
      </Text>
    </>
  )
}

export default Footer
