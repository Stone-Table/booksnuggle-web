'use client';

import { useState } from "react";
import { useRouter } from 'next/navigation';
import { Storage } from '@google-cloud/storage';

export default function MyBooks() {
  const router = useRouter();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [bookTitle, setBookTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [readingPartner, setReadingPartner] = useState('');
  const [showMessage, setShowMessage] = useState(false);
  const [uploadMode, setUploadMode] = useState<'pdf' | 'request' | null>(null);
  const [pdfFile, setPdfFile] = useState<File | null>(null);
  const [uploadError, setUploadError] = useState<string | null>(null);

  const uploadToGCS = async (file: File) => {
    try {
      if (!file) {
        throw new Error('No file selected');
      }

      const formData = new FormData();
      // Match the field name expected by the API
      formData.append('file', file);
      formData.append('filename', file.name);
      formData.append('bucket', 'booksnuggle');
      formData.append('serviceAccount', 'terraform-cdk');
      formData.append('key', '9ec7f287f9cb4517f4b63c1c0ee8cbbc51d79bc3');

      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || `Upload failed with status ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error uploading file:', error);
      throw error;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setUploadError(null);
    
    try {
      if (uploadMode === 'pdf') {
        if (!pdfFile) {
          setUploadError('Please select a PDF file');
          return;
        }

        try {
          await uploadToGCS(pdfFile);
        } catch (error) {
          const errorMessage = error instanceof Error ? error.message : 'Failed to upload PDF. Please try again later.';
          setUploadError(errorMessage);
          return;
        }
      }
      
      setShowMessage(true);
      setTimeout(() => {
        setShowMessage(false);
        setIsPopupOpen(false);
        setBookTitle('');
        setAuthor('');
        setReadingPartner('');
        setPdfFile(null);
        setUploadMode(null);
        setUploadError(null);
      }, 3000);
    } catch (error) {
      console.error('Error in form submission:', error);
      setUploadError('Something went wrong. Please try again.');
    }
  };

  const handleBookClick = () => {
    router.push('/playbook');
  };

  return (
    <main className="h-screen w-screen flex flex-col bg-[#0a0a0a] p-6">
      <header className="mb-8">
        <h1 className="text-white text-xl mb-4">Booksnuggle Beta</h1>
        <p className="text-gray-400 text-sm">Your personal library</p>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {/* Book Card */}
        <div 
          onClick={handleBookClick}
          className="group relative aspect-[2/3] rounded bg-[#111111] hover:ring-2 hover:ring-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer"
        >
          <img
            src="https://m.media-amazon.com/images/I/81m1s4wIPML._AC_UF1000,1000_QL80_.jpg"
            alt="Harry Potter Book Cover"
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b">
            <h2 className="text-white text-sm font-medium">Harry Potter and the Philosopher's Stone</h2>
            <p className="text-gray-400 text-xs">J.K. Rowling</p>
          </div>
        </div>

        {/* Book Card */}
        <div 
          onClick={handleBookClick}
          className="group relative aspect-[2/3] rounded bg-[#111111] hover:ring-2 hover:ring-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer"
        >
          <img
            src="https://m.media-amazon.com/images/I/71uAI28kJuL._AC_UF1000,1000_QL80_.jpg"
            alt="Zero to One Book Cover"
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b">
            <h2 className="text-white text-sm font-medium">Zero to One</h2>
            <p className="text-gray-400 text-xs">Peter Thiel</p>
          </div>
        </div>

        {/* Book Card */}
        <div 
          onClick={handleBookClick}
          className="group relative aspect-[2/3] rounded bg-[#111111] hover:ring-2 hover:ring-purple-500 transition-all hover:-translate-y-1 hover:shadow-lg duration-300 cursor-pointer"
        >
          <img
            src="https://m.media-amazon.com/images/I/71QcX1PUTRL._AC_UF1000,1000_QL80_.jpg"
            alt="Darkly Dreaming Dexter Book Cover"
            className="w-full h-full object-cover rounded"
          />
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 rounded-b">
            <h2 className="text-white text-sm font-medium">Darkly Dreaming Dexter</h2>
            <p className="text-gray-400 text-xs">Jeff Lindsay</p>
          </div>
        </div>

        {/* Add New Book Button */}
        <button 
          onClick={() => setIsPopupOpen(true)}
          className="aspect-[2/3] rounded bg-[#111111] hover:bg-[#1a1a1a] border border-[#333333] transition-all hover:-translate-y-1 hover:shadow-lg duration-300 flex items-center justify-center"
        >
          <svg className="w-8 h-8 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
        </button>
      </div>

      {/* Popup Modal */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-[#111111] p-6 rounded-lg w-full max-w-md">
            <h2 className="text-white text-xl mb-4">Add New Book</h2>
            
            {uploadError && (
              <div className="mb-4 p-3 bg-red-500/20 border border-red-500 rounded text-red-500">
                {uploadError}
              </div>
            )}
            
            {!uploadMode ? (
              <div className="space-y-4">
                <button
                  onClick={() => setUploadMode('pdf')}
                  className="w-full p-4 bg-[#1a1a1a] text-white rounded border border-[#333333] hover:bg-[#222222]"
                >
                  Upload PDF
                </button>
                <button
                  onClick={() => setUploadMode('request')}
                  className="w-full p-4 bg-[#1a1a1a] text-white rounded border border-[#333333] hover:bg-[#222222]"
                >
                  Make a Request
                </button>
                <div className="flex justify-end">
                  <button
                    onClick={() => setIsPopupOpen(false)}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4" encType="multipart/form-data">
                <div>
                  <label className="text-gray-400 block mb-1">Book Title</label>
                  <input
                    type="text"
                    value={bookTitle}
                    onChange={(e) => setBookTitle(e.target.value)}
                    className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-[#333333]"
                    required
                  />
                </div>
                <div>
                  <label className="text-gray-400 block mb-1">Author</label>
                  <input
                    type="text"
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)}
                    className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-[#333333]"
                    required
                  />
                </div>
                
                {uploadMode === 'pdf' ? (
                  <div>
                    <label className="text-gray-400 block mb-1">Upload PDF</label>
                    <input
                      type="file"
                      name="file"
                      accept=".pdf"
                      onChange={(e) => setPdfFile(e.target.files?.[0] || null)}
                      className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-[#333333]"
                      required
                    />
                  </div>
                ) : (
                  <div>
                    <label className="text-gray-400 block mb-1">Requested Voice</label>
                    <input
                      type="text"
                      value={readingPartner}
                      onChange={(e) => setReadingPartner(e.target.value)}
                      className="w-full bg-[#1a1a1a] text-white p-2 rounded border border-[#333333]"
                      required
                    />
                  </div>
                )}
                
                <div className="flex justify-end space-x-3">
                  <button
                    type="button"
                    onClick={() => {
                      setUploadMode(null);
                      setBookTitle('');
                      setAuthor('');
                      setReadingPartner('');
                      setPdfFile(null);
                      setUploadError(null);
                    }}
                    className="px-4 py-2 text-gray-400 hover:text-white"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700"
                  >
                    Add Book
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}

      {/* Success Message */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 bg-green-600 text-white px-6 py-3 rounded-lg shadow-lg">
          Book will populate in dashboard once complete
        </div>
      )}
    </main>
  );
}
