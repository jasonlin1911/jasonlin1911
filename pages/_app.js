import { useState, useEffect } from 'react'
import { supabase } from '../lib/supabase'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  const [user, setUser] = useState(null)

  useEffect(() => {
    // 檢查當前的認證狀態
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null)
    })

    // 設置認證狀態的監聽器
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null)
    })

    return () => subscription.unsubscribe()
  }, [])

  return <Component {...pageProps} user={user} />
}

export default MyApp