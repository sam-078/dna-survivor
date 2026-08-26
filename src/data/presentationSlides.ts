export interface PresentationSlideData {
  id: number;
  slideNumber: number;
  section: string;
  badge: string;
  badgeColor: string;
  title: string;
  subtitle?: string;
  bulletPoints?: string[];
  tableData?: {
    headers: string[];
    rows: (string | number)[][];
  };
  visualType: 'title' | 'toc' | 'content' | 'table' | 'diagram' | 'video' | 'comparison' | 'timeline' | 'infographic' | 'summary' | 'thankyou';
  visualMeta?: {
    videoTitle?: string;
    videoAuthor?: string;
    diagramSteps?: { title: string; desc: string; iconName?: string }[];
    pros?: string[];
    cons?: string[];
    secondaryPros?: string[];
    secondaryCons?: string[];
    timelineEvents?: { year: string; title: string; authors: string; desc: string }[];
    statsGrid?: { label: string; value: string; sub?: string }[];
    teamMembers?: { name: string; roll: string }[];
  };
  speakerNotes: string[];
  takeaways: string[];
}

export const PRESENTATION_SLIDES: PresentationSlideData[] = [
  {
    id: 1,
    slideNumber: 1,
    section: 'Title',
    badge: 'SLIDE 1 • TITLE SLIDE',
    badgeColor: 'bg-cyan-500 text-slate-950',
    title: 'NATURE INSPIRED STORAGE AND COMPUTING',
    subtitle: 'Exploring Molecular DNA Data Archiving and Evolutionary Genetic Algorithms',
    visualType: 'title',
    visualMeta: {
      teamMembers: [
        { name: 'LAVANYAMAY AGRAWAL', roll: 'C111' },
        { name: 'SAMIYA AHMED', roll: 'C114' },
        { name: 'TANAYA ATHAVLE', roll: 'C121' },
        { name: 'TANVI', roll: 'C102' }
      ]
    },
    bulletPoints: [
      'Department of Computer Engineering (BTECH CE-C)',
      'Bridging Biophysics, Synthetic Biology, and Heuristic Search Algorithms',
      'Dual Nature-Inspired Paradigm: DNA as Storage Medium + Genetic Algorithms as Optimization Engine'
    ],
    speakerNotes: [
      'Welcome everyone. Today we are presenting on "Nature Inspired Storage and Computing", prepared by Lavanyamay Agrawal (C111), Samiya Ahmed (C114), Tanaya Athavle (C121), and Tanvi (C102) from BTECH CE-C.',
      'In this seminar, we examine how humanity is turning back to nature—specifically DNA molecules and evolutionary algorithms—to overcome fundamental physical limits in silicon-based computing and digital data storage.',
      'We will walk through the entire pipeline: biological fundamentals, molecular encoding, genetic algorithm optimization, real-world applications, statistical benchmarks, and future directions.'
    ],
    takeaways: [
      'Course / Cohort: BTECH CE-C',
      'Team: Lavanyamay Agrawal (C111), Samiya Ahmed (C114), Tanaya Athavle (C121), Tanvi (C102)',
      'Core Theme: Nature-inspired storage (DNA) & computing (Genetic Algorithms)'
    ]
  },
  {
    id: 2,
    slideNumber: 2,
    section: 'Overview',
    badge: 'SLIDE 2 • AGENDA',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'TABLE OF CONTENT',
    subtitle: 'Structured outline of topics covered in this presentation',
    visualType: 'toc',
    tableData: {
      headers: ['Serial Number', 'Topic', 'Slide Number'],
      rows: [
        [1, 'Problem Statement', '3-4'],
        [2, 'What is DNA and why do we store DNA?', '5-6'],
        [3, 'What is DNA storage and How does DNA work?', '7-8'],
        [4, 'Biological Phenomenon (Genetic Algorithms)', '9-10'],
        [5, 'Applications', '11-17'],
        [6, 'Pros And Cons', '18'],
        [7, 'Research Timeline', '19-21'],
        [8, 'Statistical Data', '22-23'],
        [9, 'Summary', '24'],
        [10, 'Future Possibilities', '25-26'],
        [11, 'Thank you & Discussion', '27']
      ]
    },
    speakerNotes: [
      'Here is the complete roadmap of our 27-slide presentation.',
      'We will first establish the problem statement around conventional silicon limitations, followed by DNA biology and the synthetic storage pipeline.',
      'Next, we examine genetic algorithms as biological optimization solvers, dive into 5 major application domains, present pros/cons, chart the historical timeline from 1975 to 2023, evaluate statistical data, and summarize future horizons.'
    ],
    takeaways: [
      'Comprehensive 11-part agenda spanning theory, algorithms, empirical stats, and applications',
      'Follows a natural progression from problem definition to nature-inspired solution and future impact'
    ]
  },
  {
    id: 3,
    slideNumber: 3,
    section: 'Problem Statement',
    badge: 'SLIDE 3 • PROBLEM STATEMENT',
    badgeColor: 'bg-rose-500 text-slate-950',
    title: 'PROBLEM STATEMENT (PART 1)',
    subtitle: 'Limitations of Conventional Binary Storage Infrastructure',
    visualType: 'content',
    bulletPoints: [
      'Conventional storage systems store data in binary as zeros and ones (0s and 1s).',
      'Due to this architecture, they face severe physical and operational limitations:',
      '1. Limited physical space: Silicon wafers and magnetic disks require immense physical footprint (server farms).',
      '2. Short lifespan: Magnetic media (5-10 yrs) and flash semiconductor components wear out and suffer bit rot.',
      '3. High resource consumption: Hyperscale data centres consume massive amounts of electrical energy and active cooling.'
    ],
    speakerNotes: [
      'Slide 3 outlines the physical limits of traditional magnetic and semiconductor data storage.',
      'Magnetic disks and SSDs rely on 2D surfaces and charge states that degrade quickly over time, requiring constant data migration every 3 to 7 years.',
      'Furthermore, data centers currently consume nearly 2% of the global electricity supply, making conventional scaling unsustainable.'
    ],
    takeaways: [
      'Binary storage requires expanding physical footprint.',
      'Silicon and magnetic drives degrade in under a decade.',
      'Massive power and cooling costs in hyperscale data centers.'
    ]
  },
  {
    id: 4,
    slideNumber: 4,
    section: 'Problem Statement',
    badge: 'SLIDE 4 • PROBLEM STATEMENT',
    badgeColor: 'bg-rose-500 text-slate-950',
    title: 'PROBLEM STATEMENT (PART 2)',
    subtitle: 'Algorithmic Complexity & The Exponential Data Explosion',
    visualType: 'content',
    bulletPoints: [
      'With rising requirements to store data, there is an equal need for advanced and efficient computational algorithms.',
      'In combinatorial problems where a multitude of solutions exist, conventional systems execute sequentially one by one, making brute-force search highly inefficient on massive datasets.',
      'With the exponential growth of global digital data (projected past 175 Zettabytes) and the physical limits of Moore’s Law, bio-inspired, DNA-driven computing and information storage has emerged as a revolutionary solution.'
    ],
    speakerNotes: [
      'Continuing on the problem statement: data generation is outpacing traditional computing paradigms.',
      'When searching through astronomical solution spaces (such as designing robust molecular sequences), linear deterministic algorithms fail to scale.',
      'Bio-inspired approaches provide dual relief: DNA provides dense physical medium, while evolutionary computation provides non-linear search power.'
    ],
    takeaways: [
      'Combinatorial problem spaces require non-brute-force heuristic optimization.',
      'Global data generation is exceeding silicon manufacturing capabilities.',
      'Bio-inspired paradigms unite molecular storage density with evolutionary search.'
    ]
  },
  {
    id: 5,
    slideNumber: 5,
    section: 'Biology',
    badge: 'SLIDE 5 • BIOLOGICAL FOUNDATION',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'WHAT IS DNA?',
    subtitle: 'Deoxyribonucleic Acid Structure and Chemical Characteristics',
    visualType: 'content',
    bulletPoints: [
      'DNA is structured as a double helix, with each strand composed of repeating molecular units called nucleotides.',
      'Each nucleotide contains one of four nitrogenous chemical bases: Adenine (A), Thymine (T), Cytosine (C), and Guanine (G).',
      'The precise sequence of these bases forms a 4-letter chemical code that carries all biological genetic instructions.',
      'The DNA molecule’s double-helical phosphate backbone and thermodynamic stability allow digital information to remain preserved for millennia under suitable dark, dry, and cool conditions.'
    ],
    speakerNotes: [
      'Slide 5 introduces the biological substrate: DNA (Deoxyribonucleic Acid).',
      'Whereas digital computers operate on base-2 binary (0 and 1), DNA naturally operates on base-4 quaternary (A, C, G, T), doubling theoretical information density per character.',
      'Its hydrogen-bonded double helix provides exceptional structural stability that preserves fossil DNA for hundreds of thousands of years.'
    ],
    takeaways: [
      '4-letter quaternary alphabet: Adenine (A), Cytosine (C), Guanine (G), Thymine (T).',
      'Double helix with sugar-phosphate backbone provides natural chemical resilience.',
      'High compaction: 1 gram can store millions of gigabytes.'
    ]
  },
  {
    id: 6,
    slideNumber: 6,
    section: 'Biology',
    badge: 'SLIDE 6 • RATIONALE',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'WHY DO WE STORE IN DNA?',
    subtitle: 'Density, Longevity, and Sustainability Advantages',
    visualType: 'content',
    bulletPoints: [
      'We store digital data in DNA because it is ultra-dense, durable, and uniquely suited for long-term cold archival storage.',
      'DNA naturally encodes biological blueprints, and computer scientists can map digital data (text, images, audio, software, video) into nucleotide sequences.',
      'Key Advantages Include:',
      '• Ultra-High Storage Capacity: Theoretical capacity of ~455 Exabytes per gram.',
      '• Long-Term Stability: Half-life of 500+ years at room temperature; tens of thousands of years when desiccated.',
      '• Zero Maintenance Power: Passive storage requires zero electricity or active data rewriting.',
      '• Universal Format Compatibility: Any digital file format (PDF, JPG, MP4, ISO) maps onto binary and nucleotide strings.'
    ],
    speakerNotes: [
      'Why convert digital bits into DNA? Because all the data in the world could fit inside a shoebox of DNA molecules.',
      'Unlike tape or optical disks that require replacement every decade, DNA stored in silica capsules requires no energy, eliminating cooling emissions.',
      'Furthermore, humanity will never lose the technology to read DNA, as long as biology and medicine exist.'
    ],
    takeaways: [
      'Ultra-dense: up to 215 PB/g demonstrated experimentally; 455 EB/g theoretical.',
      'Thousands of years of shelf life with zero standby energy.',
      'Universal format: agnostic to file types.'
    ]
  },
  {
    id: 7,
    slideNumber: 7,
    section: 'DNA Storage',
    badge: 'SLIDE 7 • ARCHITECTURE',
    badgeColor: 'bg-cyan-500 text-slate-950',
    title: 'WHAT IS DNA STORAGE?',
    subtitle: 'The End-to-End Molecular Archiving Pipeline',
    visualType: 'diagram',
    bulletPoints: [
      'DNA data storage is a methodology for storing digital information in artificially synthesized DNA molecules rather than ferromagnetic platters or flash memory cells.',
      'Standard 6-Step Working Process:',
      '1. Digital File → Binary Stream (0s and 1s)',
      '2. Binary Stream → Nucleotide Mapping (A, C, G, T)',
      '3. DNA Synthesis (Phosphoramidite or enzymatic chemistry to physically build oligonucleotides)',
      '4. Physical Preservation (Desiccated in glass vials/silica beads)',
      '5. High-Throughput Sequencing (Illumina / Nanopore reads back nucleotide order)',
      '6. Bioinformatic Decoding → Reconstructed Original File'
    ],
    visualMeta: {
      diagramSteps: [
        { title: '1. Digital File', desc: 'Text, Images, Audio, PDF' },
        { title: '2. Binary Encoding', desc: '0s and 1s binary bits' },
        { title: '3. Nucleotide Mapping', desc: 'Mapping to A, C, G, T' },
        { title: '4. DNA Synthesis', desc: 'Chemical synthesis into strands' },
        { title: '5. Sequencing', desc: 'Next-Gen Sequencing (NGS)' },
        { title: '6. Decoding', desc: 'Consensus bit reconstruction' }
      ]
    },
    speakerNotes: [
      'Slide 7 describes the complete hardware and wet-lab cycle.',
      'Notice how it forms a closed loop: we start with any digital file, serialize it to binary, map it to oligonucleotides, physically synthesize the strands, store them, sequence them back, and decode the original data.',
      'Our interactive simulator models this entire sequence from Step 1 to Step 6.'
    ],
    takeaways: [
      'Full roundtrip: Binary → DNA Oligos → Synthesis → Storage → Sequencing → Binary.',
      'Physical medium is synthetic, non-living, non-infectious DNA.',
      'Error-correction algorithms ensure 100% bit-exact recovery.'
    ]
  },
  {
    id: 8,
    slideNumber: 8,
    section: 'DNA Storage',
    badge: 'SLIDE 8 • MECHANISM',
    badgeColor: 'bg-cyan-500 text-slate-950',
    title: 'HOW DOES DNA WORK?',
    subtitle: 'Translating Cellular Information Flow to Computational Systems',
    visualType: 'content',
    bulletPoints: [
      'In nature, biological cells retrieve and express genetic information through transcription (DNA → mRNA) and translation (mRNA → functional proteins).',
      'Bio-inspired computing mimics this cellular information architecture for synthetic digital data:',
      '• Flow: Information is encoded into a designed sequence → the sequence is synthesized & physically stored → the sequence is duplicated via PCR or preserved in inert media.',
      '• Readout: Synthetic DNA is read back via sequencing flow cells, and computational consensus algorithms decode the nucleotide sequence back into the exact original digital file.'
    ],
    speakerNotes: [
      'In Slide 8, we compare biological information transfer with computational DNA storage.',
      'Just as nature copies DNA into RNA and translates it into proteins, our system encodes binary into DNA sequences, stores them in stable pools, and reads them back via computational decoding.',
      'Synthetic biology leverages billions of years of nature’s perfected data mechanisms.'
    ],
    takeaways: [
      'Inspired by the central dogma of molecular biology.',
      'PCR (Polymerase Chain Reaction) enables effortless, ultra-cheap duplication of entire data pools.',
      'Decoding algorithms handle biological read errors seamlessly.'
    ]
  },
  {
    id: 9,
    slideNumber: 9,
    section: 'Industry Showcase',
    badge: 'SLIDE 9 • CASE STUDY',
    badgeColor: 'bg-amber-500 text-slate-950',
    title: 'DNA DATA STORAGE BY TWIST BIOSCIENCE',
    subtitle: 'Silicon Microplate Synthesis vs Traditional USB Flash Media',
    visualType: 'video',
    visualMeta: {
      videoTitle: 'DNA Data Storage: The Future of Digital Data Storage',
      videoAuthor: 'Twist Bioscience'
    },
    bulletPoints: [
      'Industry benchmark comparison: A standard 64 GB thumb drive vs a single miniature microtube of synthetic DNA.',
      'Twist Bioscience utilizes semiconductor silicon platforms to synthesize up to 1 million unique DNA oligonucleotides simultaneously on a single silicon plate.',
      'Eliminates the material and electronic waste associated with periodic data center hardware refreshes.',
      'Key milestone demonstrating scalable commercial silicon-to-DNA manufacturing.'
    ],
    speakerNotes: [
      'Slide 9 highlights commercial work from Twist Bioscience, a pioneer in silicon-based DNA synthesis.',
      'Their technology writes millions of distinct DNA strands on silicon microplates, reducing synthesis volume and cost by orders of magnitude compared to traditional column-based synthesis.'
    ],
    takeaways: [
      'High-throughput silicon synthesis platforms replace single-tube chemistry.',
      'Demonstrates real commercial viability in commercial archival markets.',
      'DNA Data Storage Alliance member alongside Microsoft, Western Digital, and Illumina.'
    ]
  },
  {
    id: 10,
    slideNumber: 10,
    section: 'Genetic Algorithms',
    badge: 'SLIDE 10 • ALGORITHM',
    badgeColor: 'bg-purple-500 text-white',
    title: 'BIOLOGICAL PHENOMENON: GENETIC ALGORITHMS',
    subtitle: 'Natural Selection and Heuristic Optimization in DNA Encoding',
    visualType: 'content',
    bulletPoints: [
      'Genetic Algorithms (GAs) are search heuristics inspired by Darwinian natural selection and biological evolution.',
      'Core Mechanics:',
      '• Population: A collection of candidate solution chromosomes (encoding scrambler keys).',
      '• Fitness Function: Evaluates each chromosome against biochemical constraints (GC balance 40-60%, homopolymer penalty, Shannon entropy).',
      '• Selection & Crossover: High-fitness chromosomes survive and exchange sub-sequences to produce offspring.',
      '• Mutation: Random bit flips introduce novel diversity and prevent premature convergence in local optima.'
    ],
    speakerNotes: [
      'Slide 10 details our second nature-inspired pillar: Genetic Algorithms.',
      'Direct binary-to-DNA translation produces biochemical flaws like repeating homopolymers (e.g. AAAAA) that cause sequencing enzymes to slip.',
      'Our GA explores astronomical scrambler permutations to evolve the ideal sequence that minimizes synthesis and sequencing error rates.'
    ],
    takeaways: [
      'Darwinian principles: Selection, Crossover, and Mutation.',
      'Solves high-dimensional non-linear optimization without brute-force search.',
      'Guarantees compliant GC ratios (40-60%) and zero repeating homopolymers.'
    ]
  },
  {
    id: 11,
    slideNumber: 11,
    section: 'Applications',
    badge: 'SLIDE 11 • APPLICATION 1',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'APPLICATIONS: 1. LONG-TERM DIGITAL ARCHIVING',
    subtitle: 'Preserving Cultural, Historical, and Scientific Heritage for Centuries',
    visualType: 'content',
    bulletPoints: [
      'DNA can preserve massive volumes of historical, scientific, and cultural information for centuries with zero degradation.',
      'Ideal for "Cold Data": Archival data that must be stored permanently but does not require sub-millisecond retrieval.',
      'Target Stakeholders: National libraries, historic museums, astronomical observatories, medical registries, and government archives.',
      'Key Benefit: Eliminates perpetual data migration cycles (moving data from tape to tape every 5-7 years).'
    ],
    speakerNotes: [
      'Application 1 is cold digital archiving.',
      'Modern archives like national libraries and UNESCO projects spend millions refreshing magnetic tapes.',
      'DNA is the ultimate write-once-read-forever medium for humanity’s collective knowledge.'
    ],
    takeaways: [
      'Perfect fit for cold, unalterable archival data.',
      'Preserves data for thousands of years in inert capsules.',
      'Drastically lowers total cost of ownership over 50+ year horizons.'
    ]
  },
  {
    id: 12,
    slideNumber: 12,
    section: 'Applications',
    badge: 'SLIDE 12 • APPLICATION 2',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'APPLICATIONS: 2. STORING MASSIVE DIGITAL DATASETS',
    subtitle: 'Big Data, Multi-Megabyte Storage, and Random Access Retrieval',
    visualType: 'content',
    bulletPoints: [
      'DNA accommodates all digital file formats: text files, high-resolution imagery, compressed audio, full-length 4K video, and operating systems.',
      'Leading researchers (Microsoft, University of Washington, ETH Zurich) have demonstrated storing hundreds of megabytes of diverse files in single test tubes.',
      'Random-Access Architecture: By designing unique forward and reverse PCR primer sequences at the ends of each strand, specific target files can be retrieved independently without sequencing the entire data pool.',
      'Crucial foundation for future hyperscale molecular data centers.'
    ],
    speakerNotes: [
      'Application 2 focuses on big data storage and random access.',
      'A common misconception is that you must sequence everything to read one file. By using PCR primer addressing, we can selectively amplify and read only the requested document from a pool of millions.'
    ],
    takeaways: [
      'Stores any digital format: media, code, database dumps.',
      'PCR primer addressing enables granular random access without full pool sequencing.',
      'Over 200 MB stored and verified in single experiments by academic teams.'
    ]
  },
  {
    id: 13,
    slideNumber: 13,
    section: 'Applications',
    badge: 'SLIDE 13 • APPLICATION 3',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'APPLICATIONS: 3. SEARCHABLE & DYNAMIC DNA DATA STORAGE',
    subtitle: 'Molecular Indexing, In-Memory Chemical Search, and Embedded DNA',
    visualType: 'content',
    bulletPoints: [
      'DNA storage is progressing beyond passive read-write storage toward dynamic molecular search operations.',
      'Molecular Indexing: Researchers use complementary hybridization probes to search through billions of files in parallel in solution without digital computation.',
      'Physical "DNA of Things": Synthetic DNA can be embedded directly into everyday materials (3D-printed plastic objects, medical implants, paint coatings) to store manufacturing blueprints and authenticity certificates.',
      'Enables tamper-proof provenance and searchable molecular databases.'
    ],
    speakerNotes: [
      'Application 3 demonstrates searchable DNA and "DNA of Things".',
      'Because DNA strands naturally hybridize with matching sequences, chemical search can query billions of records simultaneously using molecular affinity.',
      'Additionally, embedding DNA into physical manufactured products creates permanent, invisible authentication tags.'
    ],
    takeaways: [
      'Massively parallel molecular search via strand hybridization.',
      'DNA of Things: Embedding data directly into physical manufactured items.',
      'Tamper-proof physical provenance and counterfeit protection.'
    ]
  },
  {
    id: 14,
    slideNumber: 14,
    section: 'Applications',
    badge: 'SLIDE 14 • APPLICATION 4',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'APPLICATIONS: 4. OPTIMIZING DNA STORAGE USING GAs',
    subtitle: 'Evolutionary Optimization for Biochemical Constraint Satisfaction',
    visualType: 'content',
    bulletPoints: [
      'Genetic Algorithms (GAs) serve as powerful optimization engines for designing DNA storage codewords:',
      '• Biological Constraint Satisfaction: Enforces 40%–60% GC content to maintain consistent melting temperatures across all oligos.',
      '• Homopolymer Suppression: Eliminates runs of 4+ identical bases (e.g. AAAA, GGGG) that trigger synthesis dropouts and sequencing frame shifts.',
      '• Shannon Entropy Maximization: Produces balanced nucleotide distributions that resist physical degradation.',
      '• Non-Brute-Force Search: Quickly converges on optimal scrambler seeds within 2^64+ permutation spaces.'
    ],
    speakerNotes: [
      'Application 4 is directly aligned with our project architecture.',
      'Genetic Algorithms evolve the optimal scrambler mask to ensure all encoded strands obey physical biology rules—avoiding homopolymers and balancing GC content.',
      'This bridges nature-inspired computation with nature-inspired storage.'
    ],
    takeaways: [
      'Eliminates enzymatic sequencing errors by design.',
      'Enforces strict 40-60% GC ratio and max homopolymer length <= 3.',
      'Proven in literature (Rasool et al., 2023) to increase recovery fidelity.'
    ]
  },
  {
    id: 15,
    slideNumber: 15,
    section: 'Applications',
    badge: 'SLIDE 15 • APPLICATION 5',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'APPLICATIONS: 5. BIOINFORMATICS & BIOLOGICAL DATA ANALYSIS',
    subtitle: 'Solving Complex Multi-Dimensional Bioinformatics Challenges',
    visualType: 'content',
    bulletPoints: [
      'Genetic algorithms solve high-dimensional optimization problems throughout computational biology:',
      '• Multiple Sequence Alignment (MSA): Aligning homologous DNA and protein sequences to detect evolutionary relationships.',
      '• Protein Secondary & Tertiary Structure Prediction: Navigating immense conformational energy landscapes.',
      '• Primer Design & Codon Optimization: Designing optimal PCR primers with minimal secondary hairpins and cross-dimerization.',
      '• Large Solution Spaces: Discovers high-fitness configurations where exhaustive mathematical search is computationally intractable.'
    ],
    speakerNotes: [
      'Application 5 shows how Genetic Algorithms empower broader bioinformatics tasks.',
      'From aligning genomes to predicting protein folding, GAs handle the astronomical combinatorial complexity of biological systems.'
    ],
    takeaways: [
      'Powers multiple sequence alignment (MSA) and phylogenetic tree building.',
      'Optimizes primer design, codon usage, and molecular folding simulations.',
      'Demonstrates universal versatility of evolutionary computing in genomics.'
    ]
  },
  {
    id: 16,
    slideNumber: 16,
    section: 'Wet-Lab Workflow',
    badge: 'SLIDE 16 • SYSTEM ARCHITECTURE',
    badgeColor: 'bg-cyan-500 text-slate-950',
    title: 'APPLICATIONS ENHANCED BY DNA-BASED DATA STORAGE',
    subtitle: 'Detailed Wet-Lab and Computational Hardware Pipeline',
    visualType: 'diagram',
    bulletPoints: [
      '1. Input Data Processing: File chunks converted into binary matrices.',
      '2. In Silico Oligo Design: Addition of address headers, parity symbols, and primer tags.',
      '3. Synthesis & Register Preparation: High-density microplate synthesis produces single-stranded DNA (ssDNA) pool.',
      '4. Double-Stranded DNA (dsDNA) Library: PCR amplification produces resilient dsDNA storage vials.',
      '5. High-Throughput Sequencing: Flow cells generate millions of sequencing reads.',
      '6. Read Analysis & Output Reconstruction: Statistical alignment and consensus decoding regenerate the original file with zero bit errors.'
    ],
    speakerNotes: [
      'Slide 16 details the full biochemical pipeline.',
      'Note the physical transition from digital bits in software to chemical synthesis in microplates, storage in inert vials, next-gen sequencing, and final bioinformatic reconstruction.'
    ],
    takeaways: [
      'Hardware-integrated pipeline: Software Design → Wet-Lab Chemistry → Sequencing Readout.',
      'Incorporates redundancy and address headers to handle physical droplet loss.',
      'Proven by academic and industrial consortia.'
    ]
  },
  {
    id: 17,
    slideNumber: 17,
    section: 'Automation Milestone',
    badge: 'SLIDE 17 • AUTOMATION',
    badgeColor: 'bg-amber-500 text-slate-950',
    title: 'MICROSOFT & UW FIRST AUTOMATED DNA STORAGE SYSTEM',
    subtitle: 'Purple Drop Microfluidic Benchtop Automation (Nature Scientific Reports)',
    visualType: 'video',
    visualMeta: {
      videoTitle: 'Microsoft & UW MISL: Purple Drop Automated DNA Storage',
      videoAuthor: 'Microsoft Research & UW MISL'
    },
    bulletPoints: [
      'Landmark 2019 breakthrough: Microsoft Research and University of Washington demonstrated the world’s first fully automated, end-to-end DNA data storage device.',
      'Purple Drop Digital Microfluidics: Custom circuit board manipulates liquid droplets using electrical voltage (electrowetting) without human pipetting.',
      'Encoded and recovered the word "HELLO" (5 bytes = 40 bits = 1 mg synthetic DNA) completely autonomously.',
      'Demonstrates the transition from manual wet-labs to self-contained data-center rack units.'
    ],
    speakerNotes: [
      'Slide 17 showcases the famous Microsoft and UW Purple Drop system.',
      'This benchtop unit automated the entire pipeline—from software encoding and chemical synthesis to droplet movement, sequencing, and decoding—without human touch.'
    ],
    takeaways: [
      'First fully automated end-to-end benchtop DNA storage system.',
      'Used digital microfluidics (electrowetting) to eliminate manual pipetting.',
      'Published in Nature Scientific Reports; milestone for data center integration.'
    ]
  },
  {
    id: 18,
    slideNumber: 18,
    section: 'Tradeoffs',
    badge: 'SLIDE 18 • PROS & CONS',
    badgeColor: 'bg-purple-500 text-white',
    title: 'PROS AND CONS ANALYSIS',
    subtitle: 'Comprehensive Evaluation of DNA Storage and Genetic Algorithms',
    visualType: 'comparison',
    visualMeta: {
      pros: [
        'High density: Stores massive data in microscopic physical space (215 PB/g).',
        'Long-lasting: Preserves information for thousands of years without decay.',
        'Low maintenance: Zero standby power or active refreshing needed for archives.',
        'Random access: Address primers allow specific file retrieval from large pools.'
      ],
      cons: [
        'High cost: Chemical synthesis and sequencing remain expensive per gigabyte.',
        'Slow latency: Chemical writing and sequencing take hours/days (unfit for RAM/SSDs).',
        'Biochemical noise: Susceptible to substitutions, insertions, and deletions.',
        'Complex infrastructure: Requires specialized sequencing flow cells and wet-lab tools.'
      ],
      secondaryPros: [
        'Complex optimization: Solves multi-objective, non-linear problems efficiently.',
        'Flexible: Adaptable to diverse constraints (GC balance, homopolymers, entropy).'
      ],
      secondaryCons: [
        'Premature convergence: Stochastic search may settle in local fitness optima.',
        'Computationally intensive: Requires multiple generation cycles to evolve candidates.'
      ]
    },
    speakerNotes: [
      'Slide 18 provides an objective engineering comparison.',
      'DNA storage excels in density and longevity with zero maintenance, but currently suffers from high synthesis cost and slow write latency.',
      'Genetic algorithms effectively optimize constraints, though they require parameter tuning to prevent premature convergence.'
    ],
    takeaways: [
      'DNA Storage: Ultra-dense & durable vs high initial synthesis cost.',
      'Genetic Algorithms: Robust global search vs computational evaluation overhead.',
      'DNA is currently ideal for write-once cold archival rather than real-time transactional storage.'
    ]
  },
  {
    id: 19,
    slideNumber: 19,
    section: 'History',
    badge: 'SLIDE 19 • TIMELINE (1975–2001)',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'RESEARCH TIMELINE: FOUNDATIONAL ERA (1975–2001)',
    subtitle: 'Origins of Evolutionary Algorithms and Molecular Computing',
    visualType: 'timeline',
    visualMeta: {
      timelineEvents: [
        {
          year: '1975',
          title: 'Genetic Algorithms Established',
          authors: 'John Holland (Univ. of Michigan)',
          desc: 'Published "Adaptation in Natural and Artificial Systems", formulating Genetic Algorithms (GA) based on Darwinian natural selection, crossover, and schema theorem.'
        },
        {
          year: '1994',
          title: 'DNA Molecular Computing',
          authors: 'Leonard Adleman (Science)',
          desc: 'Demonstrated that DNA molecules in a test tube can solve the NP-complete Directed Hamiltonian Path Problem (Traveling Salesman), initiating biomolecular computing.'
        },
        {
          year: '2001',
          title: 'Long-Term Storage in DNA',
          authors: 'Bancroft, Clelland et al. (Science)',
          desc: 'Demonstrated storing encrypted microdots in DNA oligonucleotides, proving synthetic DNA as a viable physical medium for archival preservation.'
        }
      ]
    },
    speakerNotes: [
      'Timeline Part 1 highlights the early foundations.',
      'In 1975, John Holland formalized Genetic Algorithms. In 1994, Leonard Adleman demonstrated DNA computing in Science, and by 2001 Bancroft demonstrated microdot data storage in DNA.'
    ],
    takeaways: [
      '1975: Holland introduces Genetic Algorithms.',
      '1994: Adleman uses DNA to solve Hamiltonian Path Problem in Science.',
      '2001: Bancroft et al. demonstrate initial long-term data preservation in DNA.'
    ]
  },
  {
    id: 20,
    slideNumber: 20,
    section: 'History',
    badge: 'SLIDE 20 • TIMELINE (2012–2017)',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'RESEARCH TIMELINE: MODERN BREAKTHROUGHS (2012–2017)',
    subtitle: 'From Megabit Books to Information-Theoretical DNA Fountain Codes',
    visualType: 'timeline',
    visualMeta: {
      timelineEvents: [
        {
          year: '2012',
          title: 'Next-Gen DNA Data Storage',
          authors: 'George Church, Yuan Gao & Sriram Kosuri (Science)',
          desc: 'Encoded a 5.27-megabit book (HTML, images, text) into 54,898 DNA oligos at Harvard, achieving 700 TB/gram density.'
        },
        {
          year: '2013',
          title: 'Practical Rotating Ternary Coding',
          authors: 'Nick Goldman et al. (Nature)',
          desc: 'Introduced 3-base rotating ternary Huffman encoding to eliminate repeating homopolymers, storing audio and text with 99.99% fidelity.'
        },
        {
          year: '2017',
          title: 'DNA Fountain Architecture',
          authors: 'Yaniv Erlich & Dina Zielinski (Science)',
          desc: 'Achieved 215 PB/gram (85% of theoretical Shannon limit) by coupling Luby Transform Fountain codes with Reed-Solomon protection.'
        }
      ]
    },
    speakerNotes: [
      'Timeline Part 2 covers the modern breakthrough decade.',
      'George Church’s 2012 landmark paper in Science stored a full book in DNA. Nick Goldman in Nature introduced homopolymer-free rotating codes, and Erlich & Zielinski in 2017 achieved 215 PB/g with DNA Fountain.'
    ],
    takeaways: [
      '2012: Church et al. store 5.27 Mb in Harvard lab (Science).',
      '2013: Goldman et al. introduce ternary rotation to avoid homopolymers (Nature).',
      '2017: Erlich & Zielinski hit 215 PB/g using DNA Fountain codes (Science).'
    ]
  },
  {
    id: 21,
    slideNumber: 21,
    section: 'History',
    badge: 'SLIDE 21 • TIMELINE (2018–2023)',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'RESEARCH TIMELINE: SCALING & EVOLUTIONARY AI (2018–2023)',
    subtitle: 'Random Access File Systems to Evolutionary Code Optimization',
    visualType: 'timeline',
    visualMeta: {
      timelineEvents: [
        {
          year: '2018',
          title: 'Random-Access DNA Storage Filesystem',
          authors: 'Lee Organick et al. (Nature Biotechnology)',
          desc: 'Stored 35 distinct files (>200 MB) and demonstrated selective random-access retrieval of individual files using PCR primer indexing.'
        },
        {
          year: '2023',
          title: 'Evolutionary Optimization for DNA Storage',
          authors: 'Rasool, Wang, Chen et al. (IEEE/ACM Transactions)',
          desc: 'Applied Multi-Objective Genetic Algorithms to evolve error-resilient DNA storage codes, directly merging evolutionary computation with molecular data storage.'
        }
      ]
    },
    speakerNotes: [
      'Timeline Part 3 brings us to modern cutting-edge research.',
      'In 2018, Organick et al. proved random access over 200 MB in Nature Biotechnology.',
      'In 2023, Rasool et al. applied evolutionary algorithms to optimize DNA storage codes, which is the exact foundational science modeled in our simulator.'
    ],
    takeaways: [
      '2018: Organick et al. achieve 200+ MB random-access storage (Nature Biotech).',
      '2023: Rasool et al. link Genetic Algorithms with DNA storage code construction.',
      'Directly validates our dual-nature-inspired simulation architecture.'
    ]
  },
  {
    id: 22,
    slideNumber: 22,
    section: 'Statistics',
    badge: 'SLIDE 22 • STATISTICAL DATA',
    badgeColor: 'bg-amber-500 text-slate-950',
    title: 'STATISTICAL DATA: DNA VS CONVENTIONAL STORAGE',
    subtitle: 'Head-to-Head Quantitative Media Comparison',
    visualType: 'table',
    tableData: {
      headers: ['Parameter', 'DNA-Based Data Storage', 'Conventional Data Storage (Magnetic/Silicon)'],
      rows: [
        ['Experimental Storage Density', '215 PB/g (Erlich et al.)', 'Typically ~10-100 TB/kg on mass basis'],
        ['Advanced Experimental Density', '17 EB/g demonstrated in micro-droplets', 'Much lower volumetric mass density'],
        ['Theoretical Maximum Density', 'Up to ~455 Exabytes/gram (2 bits/nt)', 'Far below molecular atomic density limits'],
        ['Data Retention / Longevity', 'Thousands of years under suitable dry preservation', '5–10 years before bit rot & hardware failure'],
        ['Error-Free Recovery', '100% bit recovery demonstrated experimentally', 'Requires active RAID & continuous scrubbing'],
        ['Storage Maintenance & Power', 'Zero power required during passive storage', 'Massive electricity for continuous server cooling'],
        ['Access / Read Speed', 'Currently slower (minutes to hours)', 'Very fast (nanoseconds for RAM to ms for SSD)'],
        ['Best Application Domain', 'Cold archival data stored for centuries', 'Hot, frequently accessed everyday data']
      ]
    },
    speakerNotes: [
      'Slide 22 provides the direct quantitative comparison between DNA and conventional media.',
      'Notice the dramatic contrast: DNA offers 215 Petabytes per gram and millennia of longevity with zero power, whereas silicon offers sub-millisecond access speed.',
      'This highlights why DNA is the optimal medium for archival tiers.'
    ],
    takeaways: [
      'Density: 215 PB/g demonstrated; 455 EB/g theoretical ceiling.',
      'Durability: Millennia vs 5-10 years for conventional hard drives.',
      'Zero maintenance: Passive dry storage consumes 0 Watts.'
    ]
  },
  {
    id: 23,
    slideNumber: 23,
    section: 'Statistics',
    badge: 'SLIDE 23 • KEY METRICS',
    badgeColor: 'bg-amber-500 text-slate-950',
    title: 'STATISTICAL DATA: EMPIRICAL BENCHMARKS',
    subtitle: 'Proven Experimental Metrics in Peer-Reviewed Literature',
    visualType: 'table',
    tableData: {
      headers: ['Parameter', 'Demonstrated Benchmark Value'],
      rows: [
        ['Maximum Information per DNA Base', '2 bits / nucleotide (quaternary A, C, G, T)'],
        ['Demonstrated Single-Pool Storage', '200+ Megabytes (Organick et al., 2018)'],
        ['Total DNA Strands Synthesized & Decoded', '13+ Million distinct oligonucleotides'],
        ['Random-Access Individual Files Stored', '35 files retrieved without full pool sequencing'],
        ['Physical Measured Storage Density', '215–295 Petabytes / gram'],
        ['Theoretical Molecular Storage Ceiling', 'Up to 17–455 Exabytes / gram'],
        ['Estimated Molecular Half-Life Lifetime', '~20,000 years at 9.4°C (Grass et al., ETH Zurich)']
      ]
    },
    speakerNotes: [
      'Slide 23 details specific benchmark metrics achieved in peer-reviewed literature.',
      'Highlights include 13+ million strands synthesized, 200+ MB decoded in a single pool, and an estimated shelf-life exceeding 20,000 years under mild refrigeration.'
    ],
    takeaways: [
      '2 bits/base capacity.',
      '200+ MB in 13M strands with 100% fidelity.',
      '20,000+ years shelf life at 9.4°C.'
    ]
  },
  {
    id: 24,
    slideNumber: 24,
    section: 'Summary',
    badge: 'SLIDE 24 • INFOGRAPHIC SUMMARY',
    badgeColor: 'bg-cyan-500 text-slate-950',
    title: 'DNA-BASED STORAGE SYSTEMS: COMPREHENSIVE SUMMARY',
    subtitle: 'Storing Data in the Code of Life for a Sustainable Future',
    visualType: 'infographic',
    bulletPoints: [
      'How It Works: Digital Data → Binary Conversion (0/1) → Mapping (A/C/G/T) → Chemical Synthesis → Physical Vials → Next-Gen Sequencing → Bioinformatic Consensus Decoding → 100% Original File Recovery.',
      'Why DNA Storage: Ultra-high density (1g = ~215 PB = ~215 Million GB), Long Durability (thousands of years), Low Energy (passive ambient storage), Environmentally Sustainable (biodegradable, non-toxic).',
      'Density Scale: 1 TB Hard Drive (heavy metal) vs 64 GB USB Drive vs 1 gram DNA (~215 Million GB of data!).',
      'Applications: Long-term archival, space exploration missions, medical & genomic databases, cultural heritage preservation, tamper-proof manufacturing.',
      '"DNA is nature\'s hard drive. We\'re just learning how to write to it."'
    ],
    speakerNotes: [
      'Slide 24 provides the comprehensive summary infographic.',
      'It unites all four pillars: how it works, why we use it, relative density comparisons, and diverse application domains.',
      'As the famous quote reminds us: DNA is nature\'s hard drive, perfected over 3.8 billion years of evolution.'
    ],
    takeaways: [
      'Complete end-to-end infographic summary of the nature-inspired storage paradigm.',
      '1 gram of DNA replaces 215,000 one-terabyte hard drives.',
      'Sustainable, green, and biologically proven.'
    ]
  },
  {
    id: 25,
    slideNumber: 25,
    section: 'Future Possibilities',
    badge: 'SLIDE 25 • FUTURE HORIZONS',
    badgeColor: 'bg-indigo-500 text-white',
    title: 'FUTURE POSSIBILITIES: DNA-BASED DATA STORAGE',
    subtitle: 'Emerging Technological Frontiers in Molecular Data Architecture',
    visualType: 'content',
    bulletPoints: [
      'Massive Archival Expansion: Commercial data centers deploying cold DNA storage racks for global cloud providers.',
      'Ultra-Long-Term Preservation: Preserving human knowledge for deep space exploration and geological epochs.',
      'Lower-Energy Green Computing: Slashing data center cooling emissions and silicon electronic waste.',
      'Faster & Cheaper Enzymatic Synthesis: Transitioning from harsh organic chemistry to clean, high-speed enzymatic synthesis (TdT enzymes).',
      'Integration with Biotechnology: In vivo living memory (storing operational logs inside living cell genomes that duplicate automatically).'
    ],
    speakerNotes: [
      'Slide 25 explores the future of DNA storage.',
      'The emergence of enzymatic DNA synthesis and living cellular memory will reduce synthesis costs by 99% over the coming decade.',
      'This will enable green data centers with zero cooling power consumption.'
    ],
    takeaways: [
      'Enzymatic synthesis will dramatically reduce writing costs and synthesis time.',
      'Green data centers with zero ongoing electricity consumption.',
      'In vivo biological memory inside living organisms.'
    ]
  },
  {
    id: 26,
    slideNumber: 26,
    section: 'Future Possibilities',
    badge: 'SLIDE 26 • FUTURE HORIZONS',
    badgeColor: 'bg-purple-500 text-white',
    title: 'FUTURE POSSIBILITIES: GENETIC ALGORITHMS',
    subtitle: 'Evolutionary AI and Heuristic Optimization Frontiers',
    visualType: 'content',
    bulletPoints: [
      'Smarter Autonomous Optimization: Multi-objective GAs coupled with deep reinforcement learning for adaptive encoding.',
      'Bioinformatics & De Novo Sequence Design: Automated generation of synthetic genomes and therapeutic mRNA payloads.',
      'Hybrid AI Systems: Combining evolutionary search with Large Language Models (LLMs) and graph neural networks.',
      'Complex Engineering & Architecture: Optimizing aerospace aerodynamics, quantum circuits, and logistics supply chains via nature-inspired heuristics.'
    ],
    speakerNotes: [
      'Slide 26 covers the future of Genetic Algorithms.',
      'Hybrid AI systems that combine evolutionary optimization with deep neural networks are becoming the gold standard for complex engineering and bioinformatics challenges.'
    ],
    takeaways: [
      'Hybrid neuro-evolutionary systems combining GAs with deep learning.',
      'Automated synthetic genome and mRNA drug design.',
      'Cross-disciplinary engineering optimization across quantum and molecular systems.'
    ]
  },
  {
    id: 27,
    slideNumber: 27,
    section: 'Conclusion',
    badge: 'SLIDE 27 • CONCLUSION',
    badgeColor: 'bg-emerald-500 text-slate-950',
    title: 'THANK YOU & DISCUSSION',
    subtitle: 'Questions, Demonstrations & Academic Discussion',
    visualType: 'thankyou',
    visualMeta: {
      teamMembers: [
        { name: 'LAVANYAMAY AGRAWAL', roll: 'C111' },
        { name: 'SAMIYA AHMED', roll: 'C114' },
        { name: 'TANAYA ATHAVLE', roll: 'C121' },
        { name: 'TANVI', roll: 'C102' }
      ]
    },
    bulletPoints: [
      'Nature-Inspired Storage and Computing Seminar Presentation',
      'Cohort: BTECH CE-C',
      'Team Members: Lavanyamay Agrawal (C111), Samiya Ahmed (C114), Tanaya Athavle (C121), Tanvi (C102)',
      'We welcome questions, comments, and interactive live demonstration of the DNA Data Survivor Simulator!'
    ],
    speakerNotes: [
      'Thank you to our professors, evaluators, and colleagues for your time and attention.',
      'We are Lavanyamay, Samiya, Tanaya, and Tanvi from BTECH CE-C.',
      'We would now like to open the floor to questions and proceed to the live interactive demonstration of our simulator!'
    ],
    takeaways: [
      'Seminar Presentation Completed: 27 Comprehensive Slides.',
      'Interactive simulator available for live interactive encoding, damage injection, and GA recovery demo.'
    ]
  }
];
