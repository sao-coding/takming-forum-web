import { Img, Section } from "@react-email/components"

const Logo = () => {
  return (
    <Section className='mb-6'>
      <Img
        src='https://blog.sao-x.com/img/avatar.jpg'
        alt='sao-coding logo'
        width='48'
        height='48'
        className='rounded-full'
      />
    </Section>
  )
}

export default Logo
