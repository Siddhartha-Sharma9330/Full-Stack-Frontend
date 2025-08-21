const API_BASE_URL = 'http://localhost:3000/api';

export interface Skill {
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
}

export interface Profile {
  _id?: string;
  user: {
    _id: string;
    email: string;
    role: string;
    createdAt: string;
  };
  bio: string;
  profilePicture: string;
  skills: Skill[];
  github: string;
  linkedin: string;
  portfolioUrl: string;
}

export interface ProfileUpdateData {
  bio?: string;
  profilePicture?: string;
  skills?: Skill[];
  github?: string;
  linkedin?: string;
  portfolioUrl?: string;
}

// Get auth token from localStorage
const getAuthToken = (): string | null => {
  return localStorage.getItem('token');
};

// Get current user's profile
export const getCurrentProfile = async (userId: string): Promise<Profile> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/profile/user/${userId}`, {
    method: 'GET',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch profile: ${response.statusText}`);
  }

  return response.json();
};

// Update profile
export const updateProfile = async (profileId: string, data: ProfileUpdateData): Promise<Profile> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/profile/${profileId}`, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update profile: ${response.statusText}`);
  }

  return response.json();
};

// Upload profile picture
export const uploadProfilePicture = async (profileId: string, file: File): Promise<Profile> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const formData = new FormData();
  formData.append('profilePicture', file);

  const response = await fetch(`${API_BASE_URL}/profile/${profileId}/upload-picture`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
    },
    body: formData,
  });

  if (!response.ok) {
    throw new Error(`Failed to upload profile picture: ${response.statusText}`);
  }

  return response.json();
};

// Create profile
export const createProfile = async (userId: string, data: ProfileUpdateData): Promise<Profile> => {
  const token = getAuthToken();
  if (!token) {
    throw new Error('No authentication token found');
  }

  const response = await fetch(`${API_BASE_URL}/profile`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ userId, ...data }),
  });

  if (!response.ok) {
    throw new Error(`Failed to create profile: ${response.statusText}`);
  }

  return response.json();
};
