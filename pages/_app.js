import '../styles/globals.css'
import Layout from '../components/layout/layout.jsx'
import { AuthProvider } from '../context/AuthContext'

function MyApp({ Component, pageProps }) {
  return (

    <AuthProvider>
    
    <Layout >
      <Component {...pageProps} />

    </Layout>
    </AuthProvider>
  )
}

export default MyApp
