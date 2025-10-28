// src/utils/auth.ts
export interface CampusUser {
  id: string;
  name: string;
}

export const getCurrentUser = (): CampusUser | null => {
  const raw = localStorage.getItem('campusMarketUser');
  return raw ? JSON.parse(raw) : null;
};

export const isAuthenticated = (): boolean => !!getCurrentUser();