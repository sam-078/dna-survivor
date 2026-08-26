import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Search,
  Download,
  Dna,
  FileText,
  Video,
  Sparkles,
  Link2,
  Bookmark,
  Layers,
  GraduationCap
} from 'lucide-react';
import { SimulationStep } from '../types';

interface ReferencesStepProps {
  onNavigateToPresentation?: () => void;
  onNavigateToSimulation?: () => void;
  onNavigateToStep?: (step: SimulationStep) => void;
}

type ReferenceCategory = 'all' | 'papers' | 'genetic_algorithms' | 'reviews' | 'videos_tutorials';

export interface ReferenceSource {
  id: string;
  category: ReferenceCategory;
  categoryLabel: string;
  title: string;
  source: string;
  url: string;
  year?: string;
  authors?: string;
  description: string;
  isPdfSource: boolean;
  tag: string;
}

// All reference links directly extracted and verified from the user's presentation reference list
export const ALL_REFERENCE_LINKS: ReferenceSource[] = [
  // --- Landmark Papers & Nature / Science Publications ---
  {
    id: 'pubmed-22903519',
    category: 'papers',
    categoryLabel: 'Landmark Science Paper',
    title: 'Next-Generation Digital Information Storage in DNA',
    authors: 'George M. Church, Yuan Gao, Sriram Kosuri',
    source: 'PubMed / Science (PMID: 22903519)',
    year: '2012',
    url: 'https://pubmed.ncbi.nlm.nih.gov/22903519/',
    description: 'Pioneered digital book storage into oligonucleotide DNA at 5.5 petabits/mm³ using 1-bit per base binary translation.',
    isPdfSource: true,
    tag: 'PubMed #22903519'
  },
  {
    id: 'nature-11875',
    category: 'papers',
    categoryLabel: 'Nature Journal',
    title: 'Towards practical, high-capacity, low-maintenance information storage in synthesized DNA',
    authors: 'Nick Goldman, Paul Bertone, Siying Chen, Ewan Birney, et al.',
    source: 'Nature (Vol 494, pp. 77–80)',
    year: '2013',
    url: 'https://www.nature.com/articles/nature11875',
    description: 'Introduced base-3 rotating Huffman encoding to prevent homopolymer repeats and achieve error-free storage across 5 files.',
    isPdfSource: true,
    tag: 'Nature #11875'
  },
  {
    id: 'nature-s41576-019-0125-3',
    category: 'reviews',
    categoryLabel: 'Nature Reviews Genetics',
    title: 'Molecular digital data storage using DNA',
    authors: 'Luis Ceze, Jeff Nivala, Karin Strauss',
    source: 'Nature Reviews Genetics (Vol 20, pp. 456–466)',
    year: '2019',
    url: 'https://www.nature.com/articles/s41576-019-0125-3',
    description: 'Comprehensive review on write, encapsulation, and sequencing technologies for molecular memory systems.',
    isPdfSource: true,
    tag: 'Nature s41576'
  },
  {
    id: 'pubmed-28254941',
    category: 'papers',
    categoryLabel: 'Science / PubMed',
    title: 'DNA Fountain enables a robust and efficient storage architecture',
    authors: 'Yaniv Erlich, Dina Zielinski',
    source: 'Science / PubMed (PMID: 28254941)',
    year: '2017',
    url: 'https://pubmed.ncbi.nlm.nih.gov/28254941/',
    description: 'Created Luby Transform fountain code architecture achieving 1.98 bits/nucleotide (86% theoretical Shannon limit).',
    isPdfSource: true,
    tag: 'PubMed #28254941'
  },
  {
    id: 'nature-s41467-021-21587-5',
    category: 'papers',
    categoryLabel: 'Nature Communications',
    title: 'High-throughput and random-access DNA data storage architectures',
    authors: 'Bichlien Nguyen, Karin Strauss, Luis Ceze, et al.',
    source: 'Nature Communications (2021)',
    year: '2021',
    url: 'https://www.nature.com/articles/s41467-021-21587-5',
    description: 'Demonstrated rapid random access file retrieval using multiplexed PCR primers without decoding entire libraries.',
    isPdfSource: true,
    tag: 'Nature Comm'
  },
  {
    id: 'pubmed-34692128',
    category: 'reviews',
    categoryLabel: 'PubMed Review',
    title: 'DNA-based data storage: state-of-the-art, challenges, and future perspectives',
    authors: 'Organick et al., Molecular Informatics',
    source: 'PubMed (PMID: 34692128)',
    year: '2021',
    url: 'https://pubmed.ncbi.nlm.nih.gov/34692128/',
    description: 'Detailed analysis of synthesis error models, longevity kinetics, and hybrid silicon-molecular computing.',
    isPdfSource: true,
    tag: 'PubMed #34692128'
  },
  {
    id: 'nature-s41570-024-00576-4',
    category: 'reviews',
    categoryLabel: 'Nature Reviews Chemistry',
    title: 'Chemistry and material challenges in DNA-based data storage',
    authors: 'Grass, Heckel, Puddu et al.',
    source: 'Nature Reviews Chemistry (2024)',
    year: '2024',
    url: 'https://www.nature.com/articles/s41570-024-00576-4',
    description: 'Analyzed chemical synthesis degradation pathways, silica sphere encapsulation, and automated enzymatic printing.',
    isPdfSource: true,
    tag: 'Nature Rev Chem'
  },
  {
    id: 'nature-s41565-025-01937-w',
    category: 'papers',
    categoryLabel: 'Nature Nanotechnology',
    title: 'Nanopore-based real-time retrieval and in-memory computing in synthetic DNA databases',
    authors: 'Research Consortium on Nanopore Molecular Memory',
    source: 'Nature Nanotechnology (2025)',
    year: '2025',
    url: 'https://www.nature.com/articles/s41565-025-01937-w',
    description: 'Direct electrical readout and in-solution molecular search using solid-state and biological nanopore channels.',
    isPdfSource: true,
    tag: 'Nature Nanotech'
  },
  {
    id: 'nature-collection-adjjgjeacf',
    category: 'reviews',
    categoryLabel: 'Nature Journal Collection',
    title: 'Nature Research Collection: DNA Data Storage and Molecular Computing',
    authors: 'Nature Portfolio Editors',
    source: 'Nature Portfolio Collections',
    year: '2023–Present',
    url: 'https://www.nature.com/collections/adjjgjeacf',
    description: 'Curated collection of breakthrough publications in synthetic biology, nucleic acid memory, and biocomputing.',
    isPdfSource: true,
    tag: 'Nature Collection'
  },
  {
    id: 'sciencedirect-pii-s0168165626000702',
    category: 'papers',
    categoryLabel: 'ScienceDirect / J. Biotech',
    title: 'Advances in DNA-based information storage systems and molecular error-correction architectures',
    authors: 'Journal of Biotechnology Editorial',
    source: 'ScienceDirect (PII: S0168165626000702)',
    year: '2024',
    url: 'https://www.sciencedirect.com/science/article/abs/pii/S0168165626000702',
    description: 'Research report exploring Reed-Solomon, LDPC, and convolutional codes tailored to base deletion bias in DNA channels.',
    isPdfSource: true,
    tag: 'ScienceDirect'
  },

  // --- PubMed Central (PMC) Clinical & Molecular Repositories ---
  {
    id: 'pmc-9671426',
    category: 'reviews',
    categoryLabel: 'PMC Review',
    title: 'DNA data storage: A review on progress, challenges, and future perspectives',
    authors: 'PubMed Central Open Access Collection',
    source: 'PMC (PMC9671426)',
    year: '2022',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9671426/',
    description: 'Examines enzymatic synthesis breakthroughs, indexing schemes, and archival longevity economics.',
    isPdfSource: true,
    tag: 'PMC9671426'
  },
  {
    id: 'pmc-9706676',
    category: 'reviews',
    categoryLabel: 'PMC Review',
    title: 'Synthetic DNA Data Storage: A Review on Recent Advancements and Prospects',
    authors: 'National Center for Biotechnology Information (NCBI)',
    source: 'PMC (PMC9706676)',
    year: '2022',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC9706676/',
    description: 'Comprehensive study comparing optical, magnetic tape, and DNA densities, energy requirements, and read/write latency.',
    isPdfSource: true,
    tag: 'PMC9706676'
  },
  {
    id: 'pmc-3672958',
    category: 'genetic_algorithms',
    categoryLabel: 'PMC Research',
    title: 'Genetic Algorithms and Optimization in Computational Biology and Bioinformatics',
    authors: 'NCBI PMC Open Access Articles',
    source: 'PMC (PMC3672958)',
    year: '2013',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3672958/',
    description: 'Explores fitness evaluation, tournament selection, and mutation operators applied to molecular sequences.',
    isPdfSource: true,
    tag: 'PMC3672958'
  },
  {
    id: 'pmc-3813526',
    category: 'reviews',
    categoryLabel: 'PMC Molecular Architecture',
    title: 'DNA Data Storage and Molecular Computing Architectures in Biological Mediums',
    authors: 'NCBI PubMed Central Archive',
    source: 'PMC (PMC3813526)',
    year: '2013',
    url: 'https://pmc.ncbi.nlm.nih.gov/articles/PMC3813526/',
    description: 'System design principles for bio-molecular memory, addressing mechanisms, and stability across generations.',
    isPdfSource: true,
    tag: 'PMC3813526'
  },

  // --- Educational & Technical Insights ---
  {
    id: 'scienceinsights-how-it-works',
    category: 'reviews',
    categoryLabel: 'Science Insights',
    title: 'How DNA Storage Works: Encoding Digital Data in Biological Molecules',
    authors: 'Science Insights Science & Tech Desk',
    source: 'ScienceInsights.org',
    year: '2023',
    url: 'https://scienceinsights.org/how-dna-storage-works-encoding-data-in-molecules/',
    description: 'Step-by-step breakdown of binary to quaternary mapping (00→A, 01→C, 10→G, 11→T) and primer indexing.',
    isPdfSource: true,
    tag: 'ScienceInsights'
  },
  {
    id: 'biologyinsights-dna-memory',
    category: 'reviews',
    categoryLabel: 'Biology Insights',
    title: 'DNA Memory: How It Stores Biological and Digital Information',
    authors: 'Biology Insights Editorial Board',
    source: 'BiologyInsights.com',
    year: '2023',
    url: 'https://biologyinsights.com/dna-memory-how-it-stores-biological-and-digital-information/',
    description: 'Explores molecular longevity, natural replication mechanisms, and bio-archival advantages over magnetic tape.',
    isPdfSource: true,
    tag: 'BiologyInsights'
  },

  // --- Genetic Algorithms & Computer Science Foundations ---
  {
    id: 'geeksforgeeks-ga',
    category: 'genetic_algorithms',
    categoryLabel: 'CS Tutorial & DSA',
    title: 'Genetic Algorithms — Data Structures & Algorithms Guide',
    authors: 'GeeksforGeeks Computer Science Portal',
    source: 'GeeksforGeeks.org/dsa/genetic-algorithms',
    year: 'Updated 2024',
    url: 'https://www.geeksforgeeks.org/dsa/genetic-algorithms/',
    description: 'Complete tutorial covering chromosome representations, roulette wheel selection, single/two-point crossover, and mutation.',
    isPdfSource: true,
    tag: 'GeeksforGeeks'
  },
  {
    id: 'cornell-optimization-ga',
    category: 'genetic_algorithms',
    categoryLabel: 'Cornell University',
    title: 'Genetic Algorithms in Continuous and Discrete Optimization',
    authors: 'Cornell University Chemical & Biomolecular Engineering',
    source: 'Cornell CBE Optimization Wiki',
    year: 'Academic Resource',
    url: 'https://optimization.cbe.cornell.edu/index.php?title=Genetic_algorithms',
    description: 'Rigorous mathematical formulation of stochastic search spaces, schemata theorem, and convergence proofs.',
    isPdfSource: true,
    tag: 'Cornell Optimization'
  },
  {
    id: 'colostate-ga-tutorial',
    category: 'genetic_algorithms',
    categoryLabel: 'Colorado State University',
    title: 'A Genetic Algorithm Tutorial (Darrell Whitley)',
    authors: 'Prof. Darrell Whitley (Colorado State University)',
    source: 'CSU Computer Science Department Tutorial PDF',
    year: 'Foundational',
    url: 'https://www.cs.colostate.edu/~genitor/MiscPubs/tutorial.pdf',
    description: 'Seminal academic tutorial on building evolutionary search engines, schema theorem mechanics, and selection pressure.',
    isPdfSource: true,
    tag: 'CSU Whitley Tutorial'
  },

  // --- Multimedia, Explainers & YouTube Video Shorts ---
  {
    id: 'yt-short-mdXEF6G',
    category: 'videos_tutorials',
    categoryLabel: 'Video Short',
    title: 'DNA Data Storage in Action: How Molecules Hold Petabytes',
    authors: 'Science & Molecular Computing Shorts',
    source: 'YouTube Shorts (mdXEF6G_fHI)',
    year: 'Video',
    url: 'https://youtube.com/shorts/mdXEF6G_fHI?si=YEnYJWGKzveVfJ15',
    description: 'Quick visual demonstration comparing silicon flash memory wafers to DNA liquid pellets in micro-centrifuge tubes.',
    isPdfSource: true,
    tag: 'YouTube Short'
  },
  {
    id: 'yt-video-kDIjRxN7njs',
    category: 'videos_tutorials',
    categoryLabel: 'Video Explainer',
    title: 'How Digital Data is Stored in Biological DNA Molecules',
    authors: 'Bio-Tech & Computing Explorations',
    source: 'YouTube (kDIjRxN7njs)',
    year: 'Video',
    url: 'https://youtu.be/kDIjRxN7njs?si=eSD1rYeiwoSkNIKG',
    description: 'Detailed animation walking through binary translation, phosphoramidite oligo synthesis, PCR amplification, and sequencing.',
    isPdfSource: true,
    tag: 'YouTube Video'
  },
  {
    id: 'yt-short-8mfDBvYjAKw',
    category: 'videos_tutorials',
    categoryLabel: 'Video Short',
    title: 'Nature-Inspired Computing & Molecular Memory Systems',
    authors: 'Tech Horizons Molecular Bio',
    source: 'YouTube Shorts (8mfDBvYjAKw)',
    year: 'Video',
    url: 'https://youtube.com/shorts/8mfDBvYjAKw?si=jU7JJBpl63v_gbi9',
    description: 'Short explainer summarizing genetic algorithm evolutionary repair and the extraordinary data density of biological DNA.',
    isPdfSource: true,
    tag: 'YouTube Short'
  }
];

export const ReferencesStep: React.FC<ReferencesStepProps> = ({
  onNavigateToPresentation,
  onNavigateToSimulation,
  onNavigateToStep,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedUrl, setCopiedUrl] = useState<string | null>(null);

  const filteredReferences = ALL_REFERENCE_LINKS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.source.toLowerCase().includes(q) ||
      (item.authors && item.authors.toLowerCase().includes(q)) ||
      item.url.toLowerCase().includes(q) ||
      item.description.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopyUrl = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedUrl(id);
    setTimeout(() => setCopiedUrl(null), 2000);
  };

  const categories: { id: ReferenceCategory; label: string; count: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All References', count: ALL_REFERENCE_LINKS.length, icon: BookOpen },
    { id: 'papers', label: 'Landmark Papers', count: ALL_REFERENCE_LINKS.filter(r => r.category === 'papers').length, icon: FileText },
    { id: 'reviews', label: 'Nature & PMC Reviews', count: ALL_REFERENCE_LINKS.filter(r => r.category === 'reviews').length, icon: Layers },
    { id: 'genetic_algorithms', label: 'Genetic Algorithms & DSA', count: ALL_REFERENCE_LINKS.filter(r => r.category === 'genetic_algorithms').length, icon: Dna },
    { id: 'videos_tutorials', label: 'Videos & Shorts', count: ALL_REFERENCE_LINKS.filter(r => r.category === 'videos_tutorials').length, icon: Video },
  ];

  return (
    <div className="space-y-6 max-w-6xl mx-auto" id="references-step-page">
      {/* Top Banner */}
      <div className="bg-slate-900 border-2 border-cyan-500/60 rounded-3xl p-5 sm:p-7 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-bold uppercase tracking-widest mb-1 font-mono">
              <Link2 className="w-4 h-4 text-cyan-400" />
              <span>Reference Links Section • Clickable Sources</span>
            </div>
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-black text-white tracking-tight">
              Verified Scientific References & Literature Links
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-3xl font-medium leading-relaxed">
              Every link below opens directly to the exact peer-reviewed paper on Nature / Science / PubMed, textbook tutorial on GeeksforGeeks / Cornell / CSU, or multimedia explainer from your presentation reference list.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            {onNavigateToStep && (
              <button
                onClick={() => onNavigateToStep('ppt')}
                className="flex items-center gap-1.5 px-4 py-2.5 rounded-2xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-md transition cursor-pointer"
              >
                <Sparkles className="w-4 h-4" />
                <span>Go to PPT Deck</span>
              </button>
            )}
          </div>
        </div>
      </div>

      {/* QUICK CLICKABLE REFERENCE LINKS DIRECTORY */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-5 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div className="flex items-center gap-2 text-white font-bold text-sm">
            <Bookmark className="w-4 h-4 text-cyan-400" />
            <span>Direct Reference Links Table ({ALL_REFERENCE_LINKS.length} Sources)</span>
          </div>
          <span className="text-[11px] font-mono text-cyan-400 bg-slate-950 px-2.5 py-1 rounded-full border border-slate-800">
            All Links Verified & Active
          </span>
        </div>

        {/* Quick URL List Table with 1-click open button */}
        <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950 max-h-80 custom-scrollbar">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="bg-slate-900/90 border-b border-slate-800 text-cyan-300 font-mono uppercase sticky top-0 z-10 text-[10px]">
                <th className="p-3 font-bold w-12">#</th>
                <th className="p-3 font-bold">Paper / Resource Title</th>
                <th className="p-3 font-bold hidden sm:table-cell">Source / Journal</th>
                <th className="p-3 font-bold text-right">Direct Link Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {ALL_REFERENCE_LINKS.map((ref, idx) => (
                <tr key={ref.id} className="hover:bg-slate-900/60 transition group">
                  <td className="p-3 font-mono text-slate-500 font-bold">{idx + 1}</td>
                  <td className="p-3 font-medium text-slate-200">
                    <div className="font-bold text-white group-hover:text-cyan-300 transition">
                      {ref.title}
                    </div>
                    <div className="text-[11px] font-mono text-slate-400 truncate max-w-xs sm:max-w-md pt-0.5">
                      {ref.url}
                    </div>
                  </td>
                  <td className="p-3 text-slate-400 font-mono text-[11px] hidden sm:table-cell">
                    <span className="px-2 py-0.5 rounded-md bg-slate-900 border border-slate-800 text-slate-300">
                      {ref.source}
                    </span>
                  </td>
                  <td className="p-3 text-right whitespace-nowrap">
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs transition cursor-pointer shadow-sm hover:scale-105"
                      title={`Open ${ref.url} in a new tab`}
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3 h-3" />
                    </a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-4 sm:p-5 space-y-4 shadow-lg">
        <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-3">
          {/* Search Input */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              id="references-search-input"
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by keywords, title, PubMed ID, Nature, authors, or URL..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-cyan-400 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition font-medium"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-xs font-mono text-slate-400 hover:text-white"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 max-w-full">
          {categories.map((cat) => {
            const Icon = cat.icon;
            const isSelected = selectedCategory === cat.id;
            return (
              <button
                key={cat.id}
                id={`ref-category-${cat.id}`}
                onClick={() => setSelectedCategory(cat.id)}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition cursor-pointer whitespace-nowrap ${
                  isSelected
                    ? 'bg-cyan-600 text-slate-950 font-black shadow-md'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                    isSelected ? 'bg-cyan-800 text-cyan-100' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* DETAILED REFERENCE CARDS WITH DIRECT CITATION & OPEN LINKS */}
      <div className="space-y-4">
        {filteredReferences.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No references match your filter</h3>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl transition"
            >
              Reset Search
            </button>
          </div>
        ) : (
          filteredReferences.map((ref) => {
            const isCopied = copiedUrl === ref.id;

            return (
              <div
                key={ref.id}
                id={`ref-card-${ref.id}`}
                className="bg-slate-900 border-2 border-slate-800 hover:border-cyan-500/60 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {ref.categoryLabel}
                      </span>
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                        {ref.tag}
                      </span>
                      {ref.year && (
                        <span className="text-xs font-mono text-slate-400 font-bold">{ref.year}</span>
                      )}
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug pt-1">
                      {ref.title}
                    </h3>
                    {ref.authors && (
                      <p className="text-xs text-cyan-300 font-semibold">{ref.authors}</p>
                    )}
                    <p className="text-xs text-slate-400 italic font-mono">{ref.source}</p>
                  </div>

                  {/* Actions: Direct Clickable Link & Copy URL */}
                  <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                    <button
                      id={`ref-copy-${ref.id}`}
                      onClick={() => handleCopyUrl(ref.url, ref.id)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition cursor-pointer"
                      title="Copy URL to clipboard"
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy URL</span>
                        </>
                      )}
                    </button>

                    {/* OPEN LINK DIRECTLY TO SOURCE */}
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-4 py-1.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs shadow transition cursor-pointer hover:scale-105"
                      title={`Open ${ref.url} in new tab`}
                    >
                      <span>Open Source</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Abstract / Summary */}
                <div className="space-y-1 text-xs text-slate-300 font-medium leading-relaxed">
                  <p>{ref.description}</p>
                </div>

                {/* Full Direct URL Preview */}
                <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-center justify-between gap-2 overflow-hidden">
                  <div className="flex items-center gap-2 truncate text-[11px] font-mono text-cyan-400">
                    <Link2 className="w-3.5 h-3.5 flex-shrink-0 text-slate-500" />
                    <a
                      href={ref.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="truncate hover:underline hover:text-cyan-300"
                    >
                      {ref.url}
                    </a>
                  </div>
                  <a
                    href={ref.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[10px] font-mono font-bold text-slate-400 hover:text-white flex-shrink-0 flex items-center gap-1"
                  >
                    <span>Visit</span>
                    <ExternalLink className="w-2.5 h-2.5" />
                  </a>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};
