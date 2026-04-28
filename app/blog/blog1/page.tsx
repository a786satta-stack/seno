import React from 'react';
import { Calendar, Clock, User, ArrowLeft, Share2 } from 'lucide-react';
import Link from 'next/link';
import Header from '@/components/frontend/Header';
import Footer from '@/components/frontend/Footer';

const page = () => {
  return (
    <div className="min-h-dvh grid-bg">
      <Header />
      {/* Navigation Bar */}
      <nav className="sticky top-0 z-40 bg-surface/90 backdrop-blur-md border-b border-border">
        <div className="max-w-4xl mx-auto px-4 h-14 flex items-center justify-between">
          <Link 
            href="/blog" 
            className="flex items-center gap-2 text-sm font-body font-bold text-muted hover:text-primary transition-colors"
          >
            <ArrowLeft size={18} />
            BACK TO BLOG
          </Link>
          <div className="flex gap-4">
            <button className="p-2 hover:bg-surface-2 rounded-full transition-colors">
              <Share2 size={20} className="text-muted hover:text-primary" />
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-4 py-8">
        {/* Header Section */}
        <header className="mb-10">
          <div className="flex items-center gap-3 mb-4">
            <span className="px-3 py-1 bg-primary text-bg text-xs font-bold uppercase tracking-wider rounded font-mono">
              Strategy
            </span>
            <span className="text-muted text-sm flex items-center gap-1 font-mono">
              <Clock size={14} /> 6 MIN READ
            </span>
          </div>
          
          <h1 className="text-3xl md:text-5xl font-display text-text leading-tight mb-6 tracking-wide">
            MASTERING MARKET ANALYSIS: A STRATEGIC APPROACH TO DATA-DRIVEN DECISIONS
          </h1>

          <div className="flex items-center justify-between py-4 border-y border-border">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-primary">
                {/* Replace with Author Image */}
                <div className="w-full h-full flex items-center justify-center text-bg font-bold font-display text-xl" style={{ background: 'linear-gradient(135deg, #FFD700, #854d0e)' }}>
                  AK
                </div>
              </div>
              <div>
                <p className="font-bold text-primary font-body text-lg">Admin</p>
                <p className="text-sm text-muted flex items-center gap-1 font-mono">
                  <Calendar size={14} /> Oct 24, 2023
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Featured Image */}
        <div className="w-full h-[250px] md:h-[400px] bg-surface-2 rounded-xl mb-10 overflow-hidden border border-border flex items-center justify-center">
           <p className="text-muted font-mono italic">[ Featured Image Placeholder ]</p>
        </div>

        {/* Content Section */}
        <article className="prose prose-invert lg:prose-lg max-w-none font-body text-text prose-headings:font-display prose-headings:text-primary prose-headings:tracking-wide prose-a:text-primary">
          <p className="text-lg leading-relaxed text-muted mb-8 italic border-l-4 border-primary pl-4">
            In today's fast-paced environment, understanding the underlying patterns of data isn't just an advantage—it's a necessity for survival.
          </p>

          <h2 className="text-2xl mt-8 mb-4">THE IMPORTANCE OF  STATISTICAL CLARITY</h2>
          <p>
            When we look at the cards presented on the main dashboard, each represents a unique data point. To truly master the outcomes, one must look beyond the surface numbers and analyze the historical variance. This involves technical rigor and a disciplined management mindset.
          </p>

          <ul className="list-disc pl-6 space-y-2 my-6 text-text">
            <li>Identify recurring numerical patterns.</li>
            <li>Evaluate risk-to-reward ratios before commitment.</li>
            <li>Implement automated tracking for consistent results.</li>
          </ul>

          <h2 className="text-2xl mt-8 mb-4">IMPLEMENTING YOUR FRAMEWORK</h2>
          <p>
            Strategy without execution is merely a hallucination. By utilizing the tools available on this platform, you can create a systematic approach to your daily routine. Whether you are analyzing trends or looking for specific results, consistency remains the primary ROI driver.
          </p>

          <div className="my-8 p-6 bg-surface border border-primary/30 rounded-xl">
            <h3 className="text-primary text-xl font-display mb-2 tracking-wide">PRO TIP: ROI OPTIMIZATION</h3>
            <p className="text-text/90">
              Always diversify your analysis across different time slots to minimize volatility. Leveraging technical dashboards allows for a 360-degree view of the market.
            </p>
          </div>
        </article>

        {/* Footer Info */}
        <footer className="mt-12 pt-6 border-t border-border">
          <div className="flex flex-wrap gap-2">
            {['Analytics', 'Management', 'Results', 'Strategy'].map((tag) => (
              <span key={tag} className="px-3 py-1 bg-surface border border-border text-muted font-mono text-sm rounded-full hover:border-primary hover:text-primary cursor-pointer transition-colors">
                #{tag.toUpperCase()}
              </span>
            ))}
          </div>
        </footer>
      </main>
      <Footer />
    </div>
  )
}

export default page
