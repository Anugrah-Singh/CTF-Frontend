// src/data/challenges.js
export const challenges = [
    // Web Category
    {
      id: 'web01',
      category: 'Web',
      title: 'Login Portal',
      description: 'The login seems flimsy. Can you bypass it?',
      points: 50,
      hint: 'Maybe SQL injection?',
      correctFlag: 'flag{sqli_master_123}' // For potential future validation
    },
    {
      id: 'web02',
      category: 'Web',
      title: 'Source Snoop',
      description: 'Sometimes secrets are hidden in plain sight. Check the source code.',
      points: 25,
      hint: 'Look for comments or hidden fields.',
      correctFlag: 'flag{html_comments_are_fun}'
    },
    // Crypto Category
    {
      id: 'crypto01',
      category: 'Crypto',
      title: 'Caesar Cipher',
      description: 'Decode this simple substitution cipher: "gur synt vf jnyyrl"',
      points: 25,
      hint: 'ROT13 is a common Caesar shift.',
      correctFlag: 'flag{the flag is valley}' // Note: Flags usually don't have spaces
    },
    {
      id: 'crypto02',
      category: 'Crypto',
      title: 'Base64 Decode',
      description: 'This looks like encoded data: ZmxhZ3t0aGlzX2lzX2Jhc2U2NH0=',
      points: 25,
      hint: 'Many online tools can decode Base64.',
      correctFlag: 'flag{this_is_base64}'
    },
     // Forensics Category
     {
      id: 'for01',
      category: 'Forensics',
      title: 'Image Exif',
      description: 'Analyze the metadata of the provided image file (link/download needed).',
      points: 75,
      hint: 'Tools like exiftool can reveal hidden data in images.',
      correctFlag: 'flag{exif_data_found}'
    },
  ];
  
  // Helper to get unique categories
  export const getCategories = () => {
      const categories = challenges.map(c => c.category);
      return [...new Set(categories)]; // Return unique category names
  };