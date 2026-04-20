import React from 'react';
import Link from 'next/link';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';

// Mock data for blog posts to demonstrate the layout
const blogPosts = [
  {
    id: 1,
    title: "Understanding A786 Charts: A Comprehensive Guide",
    excerpt: "Learn how to effectively read and analyze old and new record charts displayed in a clear and organized way to track historical patterns.",
    date: "April 19, 2026",
    author: "a786satta",
    category: "Guides",
  },
  {
    id: 2,
    title: "The Evolution of Number-Based Lottery Games in India",
    excerpt: "From pre-independence traditional setups to modern digital platforms, explore how games like Disawar, Faridabad, and Gali have evolved.",
    date: "April 15, 2026",
    author: "a786satta",
    category: "History",
  },
  {
    id: 3,
    title: "Why Transparency Matters in Live Results",
    excerpt: "A deep dive into how real-time, transparent result updates keep the ecosystem trustworthy for players across Delhi, UP, and Rajasthan.",
    date: "April 10, 2026",
    author: "a786satta",
    category: "Platform Updates",
  },
    {
    id: 4,
    title: "The Evolution of Number-Based Lottery Games in India",
    excerpt: "From pre-independence traditional setups to modern digital platforms, explore how games like Disawar, Faridabad, and Gali have evolved.",
    date: "April 15, 2026",
    author: "a786satta",
    category: "History",
  },
    {
    id: 5,
    title: "The Evolution of Number-Based Lottery Games in India",
    excerpt: "From pre-independence traditional setups to modern digital platforms, explore how games like Disawar, Faridabad, and Gali have evolved.",
    date: "April 15, 2026",
    author: "a786satta",
    category: "History",
  },
    {
    id: 6,
    title: "The Evolution of Number-Based Lottery Games in India",
    excerpt: "From pre-independence traditional setups to modern digital platforms, explore how games like Disawar, Faridabad, and Gali have evolved.",
    date: "April 15, 2026",
    author: "a786satta",
    category: "History",
  }
];

export default function BlogPage() {
  return (
    <>
    <Header />
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans selection:bg-yellow-400 selection:text-black">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-yellow-50 to-white py-12 md:py-20 border-b border-gray-200">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 mb-4 tracking-tight">
            A786 <span className="text-yellow-500 drop-shadow-sm">Insights & Updates</span>
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg font-medium">
            Stay updated with the latest strategies, historical pattern analysis, and platform news regarding Disawar, Faridabad, Ghaziabad, and more.
          </p>
        </div>
      </section>

      {/* Blog Feed */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogPosts.map((post) => (
            <article 
              key={post.id} 
              className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:border-yellow-400 hover:shadow-md transition-all duration-300 flex flex-col shadow-sm"
            >
              <div className="p-6 flex-grow flex flex-col">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-xs font-bold uppercase tracking-wider text-red-600 bg-red-50 px-2 py-1 rounded border border-red-100">
                    {post.category}
                  </span>
                  <span className="text-xs text-gray-500 font-mono font-medium">{post.date}</span>
                </div>
                <h2 className="text-xl font-bold text-gray-900 mb-3 leading-tight hover:text-yellow-600 cursor-pointer transition-colors">
                  {post.title}
                </h2>
                <p className="text-gray-600 text-sm mb-6 flex-grow leading-relaxed">
                  {post.excerpt}
                </p>
                <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
                  <span className="text-sm font-semibold text-gray-700 flex items-center gap-2">
                    👑 {post.author}
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>
      </main>

      {/* Telegram/WhatsApp Promo Banner */}
      <section className="max-w-5xl mx-auto px-4 pb-12">
        <div className="bg-gradient-to-r from-yellow-100 to-yellow-50 border border-yellow-200 shadow-sm rounded-xl p-8 text-center flex flex-col md:flex-row items-center justify-between">
          <div className="text-left mb-6 md:mb-0">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Get Superfast Results</h3>
            <p className="text-gray-700 text-sm font-medium">Join our official channels for lightning-fast updates.</p>
          </div>
          <div className="flex gap-4">
            <button className="bg-[#0088cc] hover:bg-[#0077b5] shadow-sm text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              Telegram
            </button>
            <button className="bg-[#25D366] hover:bg-[#1ebd57] shadow-sm text-white font-bold py-2 px-6 rounded-lg transition-colors flex items-center gap-2">
              WhatsApp
            </button>
          </div>
        </div>
      </section>
    </div>
    <Footer />
    </>
  );
}
