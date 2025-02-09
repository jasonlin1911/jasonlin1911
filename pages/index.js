import Auth from '../components/Auth'
import { createClient } from '../lib/supabase'

export default function Home({ user }) {
  const supabase = createClient()
  
  const handleSignOut = async () => {
    const { error } = await supabase.auth.signOut()
    if (error) alert(error.message)
  }

  if (!user) {
    return <Auth />
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>歡迎回來，{user.email}</h1>
      <button
        onClick={handleSignOut}
        className="mt-4 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
      >
        登出
      </button>
    </div>
  )
}