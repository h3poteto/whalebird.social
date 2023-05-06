import { GetServerSideProps } from 'next'

export const getServerSideProps: GetServerSideProps = async () => {
  return {
    redirect: {
      permanent: true,
      destination: '/'
    }
  }
}

export default function Desktop() {
  return <></>
}
