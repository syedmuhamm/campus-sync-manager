// ** Next Imports
import Head from 'next/head'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

// ** Loader Import
import NProgress from 'nprogress'

// ** Emotion Imports
import { CacheProvider } from '@emotion/react'

// ** Config Imports
import themeConfig from 'src/configs/themeConfig'

// ** Component Imports
import UserLayout from 'src/layouts/UserLayout'
import ThemeComponent from 'src/@core/theme/ThemeComponent'

// ** Contexts
import { SettingsConsumer, SettingsProvider } from 'src/@core/context/settingsContext'

// ** Utils Imports
import { createEmotionCache } from 'src/@core/utils/create-emotion-cache'

// ** React Perfect Scrollbar Style
import 'react-perfect-scrollbar/dist/css/styles.css'

// ** Global css styles
import '../../styles/globals.css'
import SkeletonMainLoader from 'src/skeletons/SkeletonMainLoader'

// ** Create Emotion Cache
const clientSideEmotionCache = createEmotionCache()

// ** Loader Component
const Loader = () => (
  // Display Loading... text centered on the screen
  <div style={{
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    fontSize: '1.5rem',
  }}>
    Loading...
  </div>
)

const App = props => {
  const { Component, emotionCache = clientSideEmotionCache, pageProps } = props

  // Variables
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  // ** Loading State
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // ** Check authentication token on initial load
  useEffect(() => {
    const token = localStorage.getItem('auth-token')
    // If token is missing and the current route is not the login page, redirect to login
    if (!token && router.pathname !== '/pages/login') {
      router.replace('/pages/login')
    } else {
      setLoading(false) // Set loading to false if token is present or on login page
    }
  }, [router])

  // ** Handle route change events
  useEffect(() => {
    const handleStart = () => {
      setLoading(true) // Set loading to true when route change starts
      NProgress.start() // Start NProgress loading indicator
    }
    const handleComplete = () => {
      setLoading(false) // Set loading to false when route change completes
      NProgress.done() // Complete NProgress loading indicator
    }

    // Attach route change event listeners
    router.events.on('routeChangeStart', handleStart)
    router.events.on('routeChangeComplete', handleComplete)
    router.events.on('routeChangeError', handleComplete)

    // Detach route change event listeners when component unmounts
    return () => {
      router.events.off('routeChangeStart', handleStart)
      router.events.off('routeChangeComplete', handleComplete)
      router.events.off('routeChangeError', handleComplete)
    }
  }, [router])

  return (
    // Emotion Cache Provider
    <CacheProvider value={emotionCache}>
      <Head>
        {/* Set document head properties */}
        <title>{`${themeConfig.templateName} - Material Design React Admin Template`}</title>
        <meta
          name='description'
          content={`${themeConfig.templateName} – Material Design React Admin Dashboard Template – is the most developer friendly & highly customizable Admin Dashboard Template based on MUI v5.`}
        />
        <meta name='keywords' content='Material Design, MUI, Admin Template, React Admin Template' />
        <meta name='viewport' content='initial-scale=1, width=device-width' />
      </Head>

      {/* Settings Provider */}
      <SettingsProvider>
        {/* Settings Consumer */}
        <SettingsConsumer>
          {({ settings }) => (
            // Theme Component with settings
            <ThemeComponent settings={settings}>
              {/* Render loader or layout based on loading state */}
              {loading ? <SkeletonMainLoader /> : getLayout(<Component {...pageProps} />)}
            </ThemeComponent>
          )}
        </SettingsConsumer>
      </SettingsProvider>
    </CacheProvider>
  )
}

export default App
