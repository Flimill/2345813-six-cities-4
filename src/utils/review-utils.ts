export const formatDate = (isoString:string) => {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat('en-US', { month: 'long', year: 'numeric' }).format(date);
};
