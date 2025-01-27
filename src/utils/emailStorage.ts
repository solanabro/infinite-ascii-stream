export const saveEmail = (email: string) => {
  localStorage.setItem('userEmail', email);
};

export const getSavedEmail = () => {
  return localStorage.getItem('userEmail');
};

export const isFirstVisit = () => {
  return !getSavedEmail();
};