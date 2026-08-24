import React, { useState } from 'react';
import {
  BookOpen,
  ExternalLink,
  Copy,
  Check,
  Search,
  Filter,
  Download,
  Dna,
  FileText,
  Building,
  Code,
  Video,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Bookmark
} from 'lucide-react';

interface ReferencesStepProps {
  onNavigateToPresentation: () => void;
  onNavigateToSimulation: () => void;
}

type ReferenceCategory = 'all' | 'papers' | 'genetic_algorithms' | 'consortiums' | 'tools' | 'media';

interface ReferenceItem {
  id: string;
  category: 'papers' | 'genetic_algorithms' | 'consortiums' | 'tools' | 'media';
  categoryLabel: string;
  title: string;
  authors: string;
  venue: string;
  year: string;
  doiOrUrl: string;
  abstract: string;
  keyContributions: string[];
  citationApa: string;
  citationBibtex: string;
  isSeminal?: boolean;
}

const REFERENCES: ReferenceItem[] = [
  // 1. Peer-Reviewed Academic Papers
  {
    id: 'church-2012',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'Next-Generation Digital Information Storage in DNA',
    authors: 'George M. Church, Yuan Gao, Sriram Kosuri',
    venue: 'Science, Vol 337, Issue 6102, pp. 1628',
    year: '2012',
    doiOrUrl: 'https://www.science.org/doi/10.1126/science.1226355',
    abstract: 'Demonstrated the encoding of a 5.27-megabit HTML book (including 53,426 words, 11 JPG images, and a JavaScript program) into oligonucleotide DNA with a theoretical information density of 5.5 petabits/mm³.',
    keyContributions: [
      'Pioneered 1-bit per base encoding using 96-nucleotide oligonucleotides.',
      'Established 19-bit address blocks to maintain packet ordering without physical continuity.',
      'Achieved a raw bit error rate of only 2 errors per 5.27 million bits after Illumina sequencing.'
    ],
    citationApa: 'Church, G. M., Gao, Y., & Kosuri, S. (2012). Next-generation digital information storage in DNA. Science, 337(6102), 1628-1628.',
    citationBibtex: `@article{church2012next,
  title={Next-generation digital information storage in DNA},
  author={Church, George M and Gao, Yuan and Kosuri, Sriram},
  journal={Science},
  volume={337},
  number={6102},
  pages={1628--1628},
  year={2012},
  publisher={American Association for the Advancement of Science}
}`,
    isSeminal: true
  },
  {
    id: 'goldman-2013',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'Towards practical, high-capacity, low-maintenance information storage in synthesized DNA',
    authors: 'Nick Goldman, Paul Bertone, Siying Chen, Christophe Dessimoz, Emily M. LeProust, Botond Sipos, Ewan Birney',
    venue: 'Nature, Vol 494, pp. 77–80',
    year: '2013',
    doiOrUrl: 'https://www.nature.com/articles/nature11875',
    abstract: 'Invented a base-3 Huffman differential encoding scheme that completely prohibits identical base repeats, effectively eliminating homopolymer synthesis errors in wet-lab sequencing.',
    keyContributions: [
      'Introduced ternary Huffman rotating coding: no base is ever followed by itself.',
      'Encoded Shakespeare’s 154 sonnets (ASCII), Watson & Crick’s 1953 PDF paper, and Martin Luther King’s MP3 audio.',
      'Implemented four-fold overlapping strand redundancy with parity checks to guarantee 100% loss-free reconstruction.'
    ],
    citationApa: 'Goldman, N., Bertone, P., Chen, S., Dessimoz, C., LeProust, E. M., Sipos, B., & Birney, E. (2013). Towards practical, high-capacity, low-maintenance information storage in synthesized DNA. Nature, 494(7435), 77-80.',
    citationBibtex: `@article{goldman2013towards,
  title={Towards practical, high-capacity, low-maintenance information storage in synthesized DNA},
  author={Goldman, Nick and Bertone, Paul and Chen, Siying and Dessimoz, Christophe and LeProust, Emily M and Sipos, Botond and Birney, Ewan},
  journal={Nature},
  volume={494},
  number={7435},
  pages={77--80},
  year={2013},
  publisher={Nature Publishing Group}
}`,
    isSeminal: true
  },
  {
    id: 'erlich-2017',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'DNA Fountain enables a robust and efficient storage architecture',
    authors: 'Yaniv Erlich, Dina Zielinski',
    venue: 'Science, Vol 355, Issue 6328, pp. 950–954',
    year: '2017',
    doiOrUrl: 'https://www.science.org/doi/10.1126/science.aaj2038',
    abstract: 'Created a revolutionary DNA Fountain coding architecture using Luby Transform (LT) erasure codes and pseudo-random seed screening to attain 1.98 bits per nucleotide (86% of theoretical capacity limit).',
    keyContributions: [
      'Screened candidate droplets on the fly for GC balance (45–55%) and homopolymers (max run ≤ 3).',
      'Stored a full operating system (KolibriOS), a 1895 French movie ("Arrival of a Train"), and a $50 Amazon gift card.',
      'Achieved recursive PCR copying with perfect data recovery over 2,000,000 deep generational copies.'
    ],
    citationApa: 'Erlich, Y., & Zielinski, D. (2017). DNA Fountain enables a robust and efficient storage architecture. Science, 355(6328), 950-954.',
    citationBibtex: `@article{erlich2017dna,
  title={DNA Fountain enables a robust and efficient storage architecture},
  author={Erlich, Yaniv and Zielinski, Dina},
  journal={Science},
  volume={355},
  number={6328},
  pages={950--954},
  year={2017},
  publisher={American Association for the Advancement of Science}
}`,
    isSeminal: true
  },
  {
    id: 'organick-2018',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'Random access in large-scale DNA data storage',
    authors: 'Lee Organick, Siena Dumas Ang, Yuan-Jyue Chen, Randolph Lopez, Sergey Yekhanin, Konstantin Makarychev, Miklos Z. Racz, Govinda Kamath, Parikshit Gopalan, Bichlien Nguyen, Christopher N. Takahashi, Sharon Newman, Hsing-Yeh Parker, Cyrus Rashtchian, Kendall Stewart, Gagan Gupta, Robert Carlson, John Mulligan, Douglas Carmean, Georg Seelig, Luis Ceze, Karin Strauss',
    venue: 'Nature Biotechnology, Vol 36, pp. 242–248',
    year: '2018',
    doiOrUrl: 'https://www.nature.com/articles/nbt.4079',
    abstract: 'Demonstrated random-access retrieval of specific files from a 200 MB DNA pool containing over 13 million DNA strands using custom PCR primer binding targets without sequencing the entire pool.',
    keyContributions: [
      'Engineered orthogonal primer libraries enabling selective file extraction.',
      'Developed clustering and consensus algorithms to handle insertion/deletion substitution errors in Nanopore reads.',
      'Successfully encoded and retrieved 35 distinct digital files without a single bit error.'
    ],
    citationApa: 'Organick, L., Ang, S. D., Chen, Y. J., Lopez, R., Yekhanin, S., Makarychev, K., ... & Strauss, K. (2018). Random access in large-scale DNA data storage. Nature Biotechnology, 36(3), 242-248.',
    citationBibtex: `@article{organick2018random,
  title={Random access in large-scale DNA data storage},
  author={Organick, Lee and Ang, Siena Dumas and Chen, Yuan-Jyue and Lopez, Randolph and Yekhanin, Sergey and Makarychev, Konstantin and Ceze, Luis and Strauss, Karin and others},
  journal={Nature biotechnology},
  volume={36},
  number={3},
  pages={242--248},
  year={2018},
  publisher={Nature Publishing Group}
}`,
    isSeminal: true
  },
  {
    id: 'ceze-2019',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'Molecular digital data storage using DNA',
    authors: 'Luis Ceze, Jeff Nivala, Karin Strauss',
    venue: 'Nature Reviews Genetics, Vol 20, pp. 456–466',
    year: '2019',
    doiOrUrl: 'https://www.nature.com/articles/s41576-019-0125-3',
    abstract: 'Comprehensive state-of-the-art review paper analyzing the end-to-end pipeline: write (chemical & enzymatic synthesis), store (in vitro encapsulation), and read (next-generation sequencing and basecalling).',
    keyContributions: [
      'Comparative evaluation of phosphoramidite vs enzymatic synthesis.',
      'Detailed quantitative taxonomy of DNA error rates (deletions, substitutions, insertions).',
      'System design guidelines for hybrid silicon-molecular cloud data architectures.'
    ],
    citationApa: 'Ceze, L., Nivala, J., & Strauss, K. (2019). Molecular digital data storage using DNA. Nature Reviews Genetics, 20(8), 456-466.',
    citationBibtex: `@article{ceze2019molecular,
  title={Molecular digital data storage using DNA},
  author={Ceze, Luis and Nivala, Jeff and Strauss, Karin},
  journal={Nature Reviews Genetics},
  volume={20},
  number={8},
  pages={456--466},
  year={2019},
  publisher={Nature Publishing Group}
}`
  },
  {
    id: 'heckel-2019',
    category: 'papers',
    categoryLabel: 'Academic Paper',
    title: 'A characterization of DNA storage errors and error-correcting codes',
    authors: 'Reinhard Heckel, Gediminas Mikutis, Robert N. Grass',
    venue: 'Nature Protocols / Scientific Data, Vol 6, Article 214',
    year: '2019',
    doiOrUrl: 'https://www.nature.com/articles/s41597-019-0219-5',
    abstract: 'Empirical statistical measurement of error distributions across synthesis, decay, PCR amplification, and sequencing channels with Reed-Solomon and LDPC codes.',
    keyContributions: [
      'Quantified that base deletions represent ~70% of raw synthesis errors.',
      'Formulated majority voting mathematical bounds as a function of strand redundancy depth.',
      'Demonstrated thermal aging kinetics up to equivalent of 2,000 years in silica spheres.'
    ],
    citationApa: 'Heckel, R., Mikutis, G., & Grass, R. N. (2019). A characterization of DNA storage errors. Scientific Data, 6(1), 214.',
    citationBibtex: `@article{heckel2019characterization,
  title={A characterization of DNA storage errors},
  author={Heckel, Reinhard and Mikutis, Gediminas and Grass, Robert N},
  journal={Scientific Data},
  volume={6},
  number={1},
  pages={214},
  year={2019},
  publisher={Nature Publishing Group}
}`
  },

  // 2. Nature-Inspired & Genetic Algorithms
  {
    id: 'holland-1975',
    category: 'genetic_algorithms',
    categoryLabel: 'Evolutionary Computing',
    title: 'Adaptation in Natural and Artificial Systems',
    authors: 'John H. Holland',
    venue: 'University of Michigan Press (Reprinted MIT Press, 1992)',
    year: '1975',
    doiOrUrl: 'https://mitpress.mit.edu/9780262581110/adaptation-in-natural-and-artificial-systems/',
    abstract: 'Foundational seminal book that introduced the Genetic Algorithm, Schemata Theorem, and mathematical formulation of fitness-proportionate selection in adaptive systems.',
    keyContributions: [
      'Formulated the Schema Theorem: building blocks of above-average fitness grow exponentially.',
      'Introduced mathematical foundations of crossover, mutation, and reproduction operators.',
      'Established evolutionary heuristics as universal global function optimizers.'
    ],
    citationApa: 'Holland, J. H. (1975). Adaptation in natural and artificial systems. University of Michigan Press.',
    citationBibtex: `@book{holland1975adaptation,
  title={Adaptation in natural and artificial systems},
  author={Holland, John H},
  year={1975},
  publisher={University of Michigan Press}
}`,
    isSeminal: true
  },
  {
    id: 'goldberg-1989',
    category: 'genetic_algorithms',
    categoryLabel: 'Evolutionary Computing',
    title: 'Genetic Algorithms in Search, Optimization, and Machine Learning',
    authors: 'David E. Goldberg',
    venue: 'Addison-Wesley Professional, Reading, MA',
    year: '1989',
    doiOrUrl: 'https://www.pearson.com/en-us/subject-catalog/p/genetic-algorithms-in-search-optimization-and-machine-learning/P200000003507',
    abstract: 'The definitive textbook outlining practical implementation of genetic algorithms, elitism, multi-objective fitness evaluation, and constraint satisfaction problems.',
    keyContributions: [
      'Comprehensive guide to elitism selection and population sizing heuristics.',
      'Techniques for handling constrained combinatorial optimization spaces.',
      'Foundation for modern metaheuristic search in bioinformatics and computer science.'
    ],
    citationApa: 'Goldberg, D. E. (1989). Genetic algorithms in search, optimization, and machine learning. Addison-Wesley.',
    citationBibtex: `@book{goldberg1989genetic,
  title={Genetic algorithms in search, optimization, and machine learning},
  author={Goldberg, David E},
  year={1989},
  publisher={Addison-Wesley}
}`
  },

  // 3. Industry Consortia & Pioneer Organizations
  {
    id: 'dna-alliance',
    category: 'consortiums',
    categoryLabel: 'Industry Alliance',
    title: 'DNA Data Storage Alliance (SNIA Working Group)',
    authors: 'Founding Members: Illumina, Microsoft, Twist Bioscience, Western Digital',
    venue: 'Global Technology Standards Consortium',
    year: '2020–Present',
    doiOrUrl: 'https://dnastoragealliance.org/',
    abstract: 'An international consortium of over 50 technology companies and academic institutions creating an interoperable ecosystem for DNA data storage, publishing standard specifications and technology roadmaps.',
    keyContributions: [
      'Published the "Preservation of Digital Information in DNA" technology whitepaper.',
      'Establishing standard file format metadata (Rosetta stone headers) for synthetic DNA.',
      'Targeting commercial $1/TB/year cold-storage DNA archives by 2030.'
    ],
    citationApa: 'DNA Data Storage Alliance. (2022). Technology Roadmap and Systems Guidelines for Molecular Data Storage. SNIA Consortium.',
    citationBibtex: `@misc{dnastoragealliance2022,
  title={Technology Roadmap and Systems Guidelines for Molecular Data Storage},
  author={{DNA Data Storage Alliance}},
  year={2022},
  howpublished={\\url{https://dnastoragealliance.org/}}
}`
  },
  {
    id: 'ms-research-dna',
    category: 'consortiums',
    categoryLabel: 'Research Laboratory',
    title: 'Microsoft Research & UW Molecular Information Systems Lab (MISL)',
    authors: 'Karin Strauss, Luis Ceze, Bichlien Nguyen',
    venue: 'Microsoft Research / University of Washington',
    year: 'Ongoing',
    doiOrUrl: 'https://www.microsoft.com/en-us/research/project/dna-storage/',
    abstract: 'Joint industry-academic laboratory that demonstrated the world’s first fully automated, end-to-end electronic DNA data storage system (writing, storing, and reading the word "HELLO" automatically in a robotic benchtop appliance).',
    keyContributions: [
      'Built automated benchtop DNA write/read robot combining microfluidics and synthesizer.',
      'Achieved 1 GB storage demonstration with random access and error recovery.',
      'Invented spatial addressing and clustering algorithms for Nanopore sequencing.'
    ],
    citationApa: 'Microsoft Research. (2023). Project DNA Storage: End-to-End Molecular Data Archiving. Microsoft Corporation.',
    citationBibtex: `@misc{microsoft2023dnastorage,
  title={Project DNA Storage: End-to-End Molecular Data Archiving},
  author={{Microsoft Research}},
  year={2023},
  howpublished={\\url{https://www.microsoft.com/en-us/research/project/dna-storage/}}
}`
  },
  {
    id: 'catalog-dna',
    category: 'consortiums',
    categoryLabel: 'BioTech Pioneer',
    title: 'Catalog DNA — Automated Enzymatic Molecular Computing',
    authors: 'Catalog Technologies, Boston MA',
    venue: 'Enterprise DNA Computing Platform',
    year: 'Ongoing',
    doiOrUrl: 'https://www.catalogdna.com/',
    abstract: 'Pioneered combinatorial enzymatic DNA printing, moving away from slow chemical phosphoramidite synthesis to achieve terabit-per-day data encoding speeds for archival enterprise clients.',
    keyContributions: [
      'Developed "Shannon" — an industrial-scale enzymatic DNA writing machine.',
      'Encoded English Wikipedia (16 GB) into synthetic oligonucleotides.',
      'Introduced combinatorial prefabricated DNA piece assembly.'
    ],
    citationApa: 'Catalog Technologies. (2023). Combinatorial Enzymatic DNA Storage and Computing. Boston, MA.',
    citationBibtex: `@misc{catalog2023shannon,
  title={Combinatorial Enzymatic DNA Storage and Computing Platform},
  author={{Catalog Technologies}},
  year={2023},
  howpublished={\\url{https://www.catalogdna.com/}}
}`
  },

  // 4. Open-Source Toolkits & Repositories
  {
    id: 'dna-fountain-github',
    category: 'tools',
    categoryLabel: 'Open Source Software',
    title: 'DNA Fountain (Erlich Lab GitHub)',
    authors: 'Yaniv Erlich, Dina Zielinski (Columbia University / NYGC)',
    venue: 'Open-Source Python Toolkit',
    year: '2017–Present',
    doiOrUrl: 'https://github.com/TeamErlich/dna-fountain',
    abstract: 'Official open-source Python implementation of Luby Transform fountain codes for generating homopolymer-free, GC-balanced DNA droplets from arbitrary digital files.',
    keyContributions: [
      'Includes robust droplet generator, seed screeners, and belief-propagation decoder.',
      'Supports Reed-Solomon inner error correction and byte-level packetization.',
      'Widely used as academic baseline for synthetic biology encoding benchmarks.'
    ],
    citationApa: 'Erlich, Y., & Zielinski, D. (2017). DNA-Fountain: Python toolkit for robust DNA data storage. GitHub Repository.',
    citationBibtex: `@misc{erlich2017fountainrepo,
  title={DNA-Fountain: Python toolkit for robust DNA data storage},
  author={Erlich, Yaniv and Zielinski, Dina},
  year={2017},
  publisher={GitHub},
  howpublished={\\url{https://github.com/TeamErlich/dna-fountain}}
}`
  },
  {
    id: 'biopython',
    category: 'tools',
    categoryLabel: 'Open Source Software',
    title: 'Biopython: Freely available Python tools for computational molecular biology',
    authors: 'Peter J. A. Cock, Tiago Antao, Jeffrey T. Chang, et al.',
    venue: 'Bioinformatics, Vol 25, Issue 11, pp. 1422–1423',
    year: '2009–Present',
    doiOrUrl: 'https://biopython.org/',
    abstract: 'The international standard Python library for biological computation, sequence manipulation, FASTA/FASTQ parsing, alignment, and GC content calculation.',
    keyContributions: [
      'Standardized `Seq` objects and codon translation tables.',
      'High-performance sequence matching and motif discovery algorithms.',
      'Integration with NCBI GenBank and BLAST APIs.'
    ],
    citationApa: 'Cock, P. J., Antao, T., Chang, J. T., Chapman, B. A., Cox, C. J., Dalke, A., ... & de Hoon, M. J. (2009). Biopython: freely available Python tools for computational molecular biology and bioinformatics. Bioinformatics, 25(11), 1422-1423.',
    citationBibtex: `@article{cock2009biopython,
  title={Biopython: freely available Python tools for computational molecular biology and bioinformatics},
  author={Cock, Peter JA and Antao, Tiago and Chang, Jeffrey T and Chapman, Brad A and Cox, Cymon J and Dalke, Andrew and Friedberg, Iddo and Hamelryck, Thomas and Kauff, Frank and Wilczynski, Bartek and others},
  journal={Bioinformatics},
  volume={25},
  number={11},
  pages={1422--1423},
  year={2009},
  publisher={Oxford University Press}
}`
  },

  // 5. Multimedia, Lectures & Videos
  {
    id: 'ted-talk-strauss',
    category: 'media',
    categoryLabel: 'Keynote & Video',
    title: 'TED Talk: How We Can Store Digital Data in DNA',
    authors: 'Karin Strauss (Microsoft Research)',
    venue: 'TED Conferences',
    year: '2018',
    doiOrUrl: 'https://www.ted.com/talks/karin_strauss_how_we_can_store_digital_data_in_dna',
    abstract: 'Captivating public keynote presentation explaining the physics, information theory, and future impact of storing the world’s knowledge into DNA vials.',
    keyContributions: [
      'Visual demonstration comparing data center acreage to a pencil eraser of DNA.',
      'Step-by-step walkthrough of encoding, physical synthesis, and sequencing.',
      'Discussion of preservation ethics for human civilization archival records.'
    ],
    citationApa: 'Strauss, K. (2018). How we can store digital data in DNA [Video]. TED Conferences.',
    citationBibtex: `@misc{strauss2018ted,
  title={How we can store digital data in DNA},
  author={Strauss, Karin},
  year={2018},
  howpublished={TED Talk, \\url{https://www.ted.com/talks/karin_strauss_how_we_can_store_digital_data_in_dna}}
}`
  },
  {
    id: 'nature-video-dna',
    category: 'media',
    categoryLabel: 'Documentary',
    title: 'Nature Video: Storing Data in DNA — The Molecular Hard Drive',
    authors: 'Nature Publishing Group & EMBL-EBI',
    venue: 'Nature Journal Multimedia',
    year: '2015',
    doiOrUrl: 'https://www.youtube.com/watch?v=Xh0mGz-fV_A',
    abstract: 'Official Nature scientific animation and laboratory documentary featuring Nick Goldman and Ewan Birney detailing how nucleotides store binary bits.',
    keyContributions: [
      'Microscopic animation of DNA synthesis phosphoramidite cycles.',
      'Explanation of why homopolymers cause sequencer basecall errors.',
      'Comparison of DNA molecular half-life vs tape decay rates.'
    ],
    citationApa: 'Nature Video. (2015). Storing data in DNA: The molecular hard drive [Video]. Nature Publishing Group.',
    citationBibtex: `@misc{nature2015dnavideo,
  title={Storing data in DNA: The molecular hard drive},
  author={{Nature Publishing Group}},
  year={2015},
  howpublished={YouTube Documentary, \\url{https://www.youtube.com/watch?v=Xh0mGz-fV_A}}
}`
  }
];

export const ReferencesStep: React.FC<ReferencesStepProps> = ({
  onNavigateToPresentation,
  onNavigateToSimulation,
}) => {
  const [selectedCategory, setSelectedCategory] = useState<ReferenceCategory>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [citationFormat, setCitationFormat] = useState<'apa' | 'bibtex'>('apa');

  const filteredReferences = REFERENCES.filter((item) => {
    const matchesCategory =
      selectedCategory === 'all' || item.category === selectedCategory;
    const q = searchQuery.toLowerCase().trim();
    const matchesSearch =
      !q ||
      item.title.toLowerCase().includes(q) ||
      item.authors.toLowerCase().includes(q) ||
      item.abstract.toLowerCase().includes(q) ||
      item.venue.toLowerCase().includes(q);
    return matchesCategory && matchesSearch;
  });

  const handleCopyCitation = (item: ReferenceItem) => {
    const text = citationFormat === 'apa' ? item.citationApa : item.citationBibtex;
    navigator.clipboard.writeText(text);
    setCopiedId(item.id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleExportAllCitations = () => {
    const content = REFERENCES.map((r) => (
      citationFormat === 'apa'
        ? `${r.citationApa}\nURL: ${r.doiOrUrl}\n`
        : `${r.citationBibtex}\n`
    )).join('\n');

    const filename = citationFormat === 'apa' ? 'DNA_Data_References_APA.txt' : 'DNA_Data_References.bib';
    const blob = new Blob([content], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
  };

  const categories: { id: ReferenceCategory; label: string; count: number; icon: React.ComponentType<{ className?: string }> }[] = [
    { id: 'all', label: 'All References', count: REFERENCES.length, icon: BookOpen },
    { id: 'papers', label: 'Academic Papers', count: REFERENCES.filter(r => r.category === 'papers').length, icon: FileText },
    { id: 'genetic_algorithms', label: 'Genetic Algorithms', count: REFERENCES.filter(r => r.category === 'genetic_algorithms').length, icon: Dna },
    { id: 'consortiums', label: 'Industry & Consortia', count: REFERENCES.filter(r => r.category === 'consortiums').length, icon: Building },
    { id: 'tools', label: 'Open-Source Tools', count: REFERENCES.filter(r => r.category === 'tools').length, icon: Code },
    { id: 'media', label: 'Keynotes & Media', count: REFERENCES.filter(r => r.category === 'media').length, icon: Video },
  ];

  return (
    <div className="space-y-6" id="references-library-container">
      {/* Banner */}
      <div className="bg-slate-900 border-2 border-purple-400 rounded-3xl p-5 sm:p-6 shadow-xl relative overflow-hidden">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-purple-400 text-xs font-bold uppercase tracking-widest mb-1">
              <BookOpen className="w-4 h-4 text-purple-400" />
              <span>Step 8: Scientific References & Research Hub</span>
            </div>
            <h2 className="text-xl sm:text-2xl font-black text-white tracking-tight">
              Curated Academic Literature & Direct Links
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-2xl font-medium">
              Explore peer-reviewed publications from Nature and Science, foundational genetic algorithm textbooks, industrial consortia roadmaps, and open-source simulators.
            </p>
          </div>

          <div className="flex items-center gap-2 flex-wrap flex-shrink-0">
            <button
              id="ref-export-all-btn"
              onClick={handleExportAllCitations}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-slate-800 hover:bg-slate-700 text-purple-300 font-bold text-xs border border-slate-700 transition cursor-pointer shadow-sm"
              title="Download all citations formatted in current citation style"
            >
              <Download className="w-4 h-4 text-purple-400" />
              <span>Export Citations ({citationFormat.toUpperCase()})</span>
            </button>

            <button
              id="ref-go-to-ppt-btn"
              onClick={onNavigateToPresentation}
              className="flex items-center gap-1.5 px-4 py-3 rounded-2xl bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs shadow-md transition cursor-pointer"
            >
              <Sparkles className="w-4 h-4" />
              <span>View PPT Slides</span>
            </button>
          </div>
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
              placeholder="Search by author (e.g. Church, Erlich), title, keyword, or journal..."
              className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 focus:border-purple-400 rounded-2xl text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none transition font-medium"
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

          {/* Citation Format Switcher */}
          <div className="flex items-center gap-1.5 bg-slate-950 p-1 rounded-2xl border border-slate-800 flex-shrink-0">
            <span className="text-[10px] font-mono text-slate-400 px-2 font-bold uppercase">Format:</span>
            <button
              onClick={() => setCitationFormat('apa')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                citationFormat === 'apa'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              APA Style
            </button>
            <button
              onClick={() => setCitationFormat('bibtex')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold font-mono transition cursor-pointer ${
                citationFormat === 'bibtex'
                  ? 'bg-purple-600 text-white shadow'
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              BibTeX (.bib)
            </button>
          </div>
        </div>

        {/* Category Pills */}
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
                    ? 'bg-purple-600 text-white shadow-md'
                    : 'bg-slate-950 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{cat.label}</span>
                <span
                  className={`text-[10px] px-1.5 py-0.2 rounded-full font-mono font-black ${
                    isSelected ? 'bg-purple-900 text-purple-200' : 'bg-slate-900 text-slate-400'
                  }`}
                >
                  {cat.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* References Grid List */}
      <div className="space-y-4">
        {filteredReferences.length === 0 ? (
          <div className="p-12 text-center bg-slate-900 border-2 border-dashed border-slate-800 rounded-3xl space-y-3">
            <BookOpen className="w-10 h-10 text-slate-600 mx-auto" />
            <h3 className="text-base font-bold text-slate-300">No references matched your search</h3>
            <p className="text-xs text-slate-500">Try clearing your search query or selecting a different category filter.</p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('all');
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-300 rounded-xl transition"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          filteredReferences.map((ref) => {
            const isCopied = copiedId === ref.id;

            return (
              <div
                key={ref.id}
                id={`ref-card-${ref.id}`}
                className="bg-slate-900 border-2 border-slate-800 hover:border-purple-500/60 rounded-3xl p-5 sm:p-6 space-y-4 shadow-lg transition-all"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-[10px] font-mono font-bold uppercase px-2.5 py-0.5 rounded-full bg-purple-950 text-purple-300 border border-purple-800">
                        {ref.categoryLabel}
                      </span>
                      {ref.isSeminal && (
                        <span className="text-[10px] font-mono font-black uppercase px-2.5 py-0.5 rounded-full bg-amber-950 text-amber-300 border border-amber-800 flex items-center gap-1">
                          <Sparkles className="w-3 h-3 text-amber-400" />
                          Seminal Milestone
                        </span>
                      )}
                      <span className="text-xs font-mono text-slate-400 font-bold">{ref.year}</span>
                    </div>

                    <h3 className="text-base sm:text-lg font-black text-white leading-snug pt-1">
                      {ref.title}
                    </h3>
                    <p className="text-xs text-purple-300 font-semibold">{ref.authors}</p>
                    <p className="text-xs text-slate-400 italic font-mono">{ref.venue}</p>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0 pt-1">
                    <button
                      id={`ref-copy-${ref.id}`}
                      onClick={() => handleCopyCitation(ref)}
                      className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-slate-300 font-bold text-xs border border-slate-800 transition cursor-pointer"
                      title={`Copy ${citationFormat.toUpperCase()} citation to clipboard`}
                    >
                      {isCopied ? (
                        <>
                          <Check className="w-3.5 h-3.5 text-emerald-400" />
                          <span className="text-emerald-400">Copied!</span>
                        </>
                      ) : (
                        <>
                          <Copy className="w-3.5 h-3.5 text-slate-400" />
                          <span>Copy {citationFormat.toUpperCase()}</span>
                        </>
                      )}
                    </button>

                    <a
                      href={ref.doiOrUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs shadow transition cursor-pointer"
                    >
                      <span>Open Link</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                {/* Abstract */}
                <div className="space-y-1 text-xs text-slate-300 font-medium leading-relaxed">
                  <span className="text-[10px] text-slate-500 uppercase font-mono font-bold block">
                    Abstract & Overview:
                  </span>
                  <p>{ref.abstract}</p>
                </div>

                {/* Key Contributions List */}
                <div className="bg-slate-950 p-4 rounded-2xl border border-slate-800 space-y-2">
                  <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider block">
                    Key Innovations & Impact on Molecular Computing:
                  </span>
                  <ul className="space-y-1.5 text-xs text-slate-300 font-medium">
                    {ref.keyContributions.map((kc, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-purple-400 font-black">•</span>
                        <span>{kc}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Citation Preview Box */}
                <div className="p-3 bg-slate-950/70 rounded-xl border border-slate-800 text-[11px] font-mono text-slate-400 overflow-x-auto whitespace-pre-wrap">
                  <span className="text-[9px] text-purple-400 font-bold uppercase block mb-1">
                    {citationFormat === 'apa' ? 'APA Citation Text:' : 'BibTeX Entry:'}
                  </span>
                  {citationFormat === 'apa' ? ref.citationApa : ref.citationBibtex}
                </div>
              </div>
            );
          })
        )}
      </div>

      {/* Suggested Reading Roadmap / Guide */}
      <div className="bg-slate-900 border-2 border-slate-800 rounded-3xl p-6 space-y-4 shadow-lg">
        <div className="flex items-center gap-2 text-cyan-400 font-black text-sm uppercase">
          <Sparkles className="w-5 h-5" />
          <span>Recommended Academic Reading Order for Students & Researchers</span>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3 text-xs">
          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-black text-cyan-400">Step 1 • Conceptual</span>
            <h4 className="font-bold text-white">TED Talk by Karin Strauss</h4>
            <p className="text-[11px] text-slate-400 leading-snug font-medium">
              15-minute high-level visual intro to DNA data density and archival motivations.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-black text-emerald-400">Step 2 • Foundations</span>
            <h4 className="font-bold text-white">Church et al. (Science 2012)</h4>
            <p className="text-[11px] text-slate-400 leading-snug font-medium">
              First modern demonstration of 5.27 MB digital book encoded into synthetic oligonucleotides.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-black text-purple-400">Step 3 • Coding Theory</span>
            <h4 className="font-bold text-white">Erlich & Zielinski (Science 2017)</h4>
            <p className="text-[11px] text-slate-400 leading-snug font-medium">
              DNA Fountain architecture for achieving maximal Shannon capacity density.
            </p>
          </div>

          <div className="p-3.5 bg-slate-950 rounded-2xl border border-slate-800 space-y-1">
            <span className="text-[10px] font-mono font-black text-amber-400">Step 4 • System Design</span>
            <h4 className="font-bold text-white">Ceze et al. (Nature Reviews 2019)</h4>
            <p className="text-[11px] text-slate-400 leading-snug font-medium">
              Comprehensive blueprint of reading, writing, and random access addressing systems.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
