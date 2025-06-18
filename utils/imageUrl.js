export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Agar tashqi URL bo'lsa
  if (imagePath.startsWith('http')) return imagePath;
  
  // Agar lokal fayl bo'lsa
  return `${import.meta.env.VITE_API_URL?.replace('/api', '') || 'http://localhost:5000'}${imagePath}`;
};