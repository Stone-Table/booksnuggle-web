'use client';

import { signIn } from 'next-auth/react';

export default function Home() {
  return (
    <main className="h-screen w-screen flex items-center justify-center bg-[#0a0a0a]">
      <div className="w-[360px] bg-[#111111] p-6 rounded">
        <h1 className="text-white text-xl mb-4">Booksnuggle Beta</h1>
        <p className="text-gray-400 text-sm mb-6">Please sign in to continue.</p>
        <div className="flex flex-col gap-4">
          <button
            onClick={() => signIn('google', { callbackUrl: '/mybooks' })}
            className="flex items-center justify-center gap-2 bg-white text-gray-800 py-2 px-4 rounded hover:bg-gray-100 transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
              />
              <path
                fill="currentColor"
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
              />
              <path
                fill="currentColor"
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
              />
              <path
                fill="currentColor"
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
              />
            </svg>
            Continue with Google
          </button>

          <button
            onClick={() => signIn('github', { callbackUrl: '/mybooks' })}
            className="flex items-center justify-center gap-2 bg-[#24292e] text-white py-2 px-4 rounded hover:bg-[#2f363d] transition-colors"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"
              />
            </svg>
            Continue with GitHub
          </button>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#333333]"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 text-gray-400 bg-[#111111]">Or continue with email</span>
            </div>
          </div>

          <form className="flex flex-col gap-4" onSubmit={(e) => {
            e.preventDefault();
            signIn('credentials', {
              username: e.currentTarget.username.value,
              password: e.currentTarget.password.value,
              callbackUrl: '/mybooks'
            });
          }}>
            <input 
              name="username"
              type="text"
              placeholder="Username"
              className="bg-[#1a1a1a] text-white p-2 rounded border border-[#333333] focus:outline-none focus:border-purple-500"
            />
            <input
              name="password"
              type="password" 
              placeholder="Password"
              className="bg-[#1a1a1a] text-white p-2 rounded border border-[#333333] focus:outline-none focus:border-purple-500"
            />
            <button 
              type="submit"
              className="bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition-colors"
            >
              Sign In
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
