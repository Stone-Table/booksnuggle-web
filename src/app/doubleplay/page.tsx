'use client';

import { useState, useEffect } from 'react';
import ProtectedRoute from '@/components/ProtectedRoute';

export default function DoublePage() {
  const [videoUrl1, setVideoUrl1] = useState('');
  const [videoUrl2, setVideoUrl2] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);
  const [editingVideo, setEditingVideo] = useState<1 | 2 | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsPlaying(true);
  };

  // Convert YouTube URL to embed URL
  const getEmbedUrl = (url: string) => {
    try {
      const videoId = url.split('v=')[1]?.split('&')[0];
      if (videoId) {
        return `https://www.youtube.com/embed/${videoId}`;
      }
      return url;
    } catch {
      return url;
    }
  };

  const handleUpdateVideo = (e: React.FormEvent) => {
    e.preventDefault();
    setEditingVideo(null);
  };

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setEditingVideo(null);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <ProtectedRoute>
      <main className="h-screen w-screen flex flex-col bg-[#0a0a0a] p-6">
        <header className="mb-8">
          <h1 className="text-white text-xl mb-4">Double Play</h1>
          <p className="text-gray-400 text-sm">Watch two videos side by side</p>
        </header>

        {!isPlaying ? (
          <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto w-full">
            <div>
              <label className="text-gray-400 block mb-2">First Video URL</label>
              <input
                type="url"
                value={videoUrl1}
                onChange={(e) => setVideoUrl1(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white p-3 rounded border border-[#333333]"
                placeholder="Enter YouTube URL..."
                required
              />
            </div>

            <div>
              <label className="text-gray-400 block mb-2">Second Video URL</label>
              <input
                type="url"
                value={videoUrl2}
                onChange={(e) => setVideoUrl2(e.target.value)}
                className="w-full bg-[#1a1a1a] text-white p-3 rounded border border-[#333333]"
                placeholder="Enter YouTube URL..."
                required
              />
            </div>

            <button
              type="submit"
              className="w-full p-3 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
            >
              Play Videos
            </button>
          </form>
        ) : (
          <div className="flex-1 grid grid-cols-2 gap-4 relative">
            <div className="relative aspect-video bg-black rounded overflow-hidden">
              <iframe
                src={getEmbedUrl(videoUrl1)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {editingVideo === 1 && (
                <form onSubmit={handleUpdateVideo} className="absolute inset-0 bg-black/80 p-4 flex items-center">
                  <input
                    type="url"
                    value={videoUrl1}
                    onChange={(e) => setVideoUrl1(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] text-white p-3 rounded-l border border-[#333333]"
                    placeholder="Enter new YouTube URL..."
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors"
                  >
                    Update
                  </button>
                </form>
              )}
            </div>
            
            <div className="relative aspect-video bg-black rounded overflow-hidden">
              <iframe
                src={getEmbedUrl(videoUrl2)}
                className="absolute inset-0 w-full h-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
              {editingVideo === 2 && (
                <form onSubmit={handleUpdateVideo} className="absolute inset-0 bg-black/80 p-4 flex items-center">
                  <input
                    type="url"
                    value={videoUrl2}
                    onChange={(e) => setVideoUrl2(e.target.value)}
                    className="flex-1 bg-[#1a1a1a] text-white p-3 rounded-l border border-[#333333]"
                    placeholder="Enter new YouTube URL..."
                    required
                  />
                  <button
                    type="submit"
                    className="px-4 py-3 bg-purple-600 text-white rounded-r hover:bg-purple-700 transition-colors"
                  >
                    Update
                  </button>
                </form>
              )}
            </div>

            <div className="absolute top-4 right-4">
              <button
                onClick={() => setIsPlaying(false)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors"
              >
                New Videos
              </button>
            </div>

            <div className="col-span-2 flex justify-center gap-4 mt-4">
              <button
                onClick={() => setEditingVideo(1)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors w-[140px]"
              >
                Change Video
              </button>
              <button
                onClick={() => setEditingVideo(2)}
                className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 transition-colors w-[140px]"
              >
                Change Video
              </button>
            </div>
          </div>
        )}
      </main>
    </ProtectedRoute>
  );
}
