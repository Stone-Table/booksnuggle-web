'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white relative">
      {/* Grid overlay */}
      <div className="absolute inset-0 bg-[#0a0a0a]">
        <div 
          className="h-full w-full"
          style={{
            backgroundImage: `linear-gradient(#333333 1px, transparent 1px),
                             linear-gradient(90deg, #333333 1px, transparent 1px)`,
            backgroundSize: '50px 50px',
            opacity: '0.1'
          }}
        />
      </div>

      {/* Glow gradient overlay */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-purple-500/20 via-transparent to-transparent opacity-50" />
        <div className="absolute inset-0 bg-gradient-conic from-purple-500/10 via-transparent to-transparent opacity-30" />
      </div>

      <div className="container mx-auto px-4 py-20 relative">
        <div 
          className="text-center"
        >
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="animate-text bg-gradient-to-r from-teal-500 via-purple-500 to-orange-500 bg-clip-text text-transparent">
              BookSnuggle
              <span className="text-purple-500 glow"> App</span>
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-3xl mx-auto">
            Discover your next favorite book with our AI-powered reading companion. 
            Personalized recommendations, seamless library management, and a cozy reading experience.
          </p>

          <div className="flex flex-col md:flex-row gap-6 justify-center">
            <Link href="/login">
              <button 
                className="bg-purple-600 hover:bg-purple-700 text-white px-8 py-4 text-lg rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg duration-300 shadow-purple-500/50"
              >
                Get Started Free
              </button>
            </Link>
            <Link href="/features">
              <button 
                className="bg-[#111111] hover:bg-[#1a1a1a] border border-[#333333] text-white px-8 py-4 text-lg rounded-lg transition-all hover:-translate-y-1 hover:shadow-lg duration-300"
              >
                Learn More
              </button>
            </Link>
          </div>
        </div>

        <div
          className="mt-20"
        >
          <div className="relative mx-auto max-w-5xl">
            <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] to-transparent rounded-lg"></div>
            <Image
              src="/images/mybooks.png"
              alt="BookSnuggle Dashboard Preview"
              width={1920}
              height={1080}
              className="rounded-lg shadow-2xl w-full border border-[#333333]"
              priority
            />
          </div>
        </div>
      </div>

      <style jsx global>{`
        .glow {
          text-shadow: 0 0 15px rgba(168, 85, 247, 0.5);
        }
        
        @keyframes text {
          0%, 100% {
            background-size: 200% 200%;
            background-position: left center;
          }
          50% {
            background-size: 200% 200%;
            background-position: right center;
          }
        }
        
        .animate-text {
          animation: text 5s ease infinite;
        }
      `}</style>
    </div>
  );
}
