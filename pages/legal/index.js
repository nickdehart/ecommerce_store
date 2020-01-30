import Head from 'next/head'
import Privacy from './privacy'
import Returns from './returns'
import Terms from './terms'

export const Legal = ({config}) => (
  <>
    <Head>
      <title>{`${config.title} - Legal`}</title>
      <meta name="description" content={`${config.title} - Terms of Service; Privacy Policy; Return Policy`}></meta>
    </Head>
    <Terms />
    <br />
    <hr />
    <Privacy />
    <br />
    <hr />
    <Returns />
  </>
)

export default Legal
