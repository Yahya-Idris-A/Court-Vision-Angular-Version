import axiosIns from '../lib/axios';

// Tambahkan type untuk data login dan register jika tersedia
interface AuthPayload {
  email: string;
  password: string;
  [key: string]: any;
}

export interface UserData {
  id: number;
  name: string;
  email: string;
  photo_url: string;
}

interface UserResponse {
  data: {
    user: UserData;
  };
}

// login
export const signin = (data: AuthPayload) => {
  return axiosIns.post('/api/auth/login', data);
};

// registrasi
export const signup = (data: AuthPayload) => {
  return axiosIns.post('/api/auth/register', data);
};

// get user profile
export const getUser = async (): Promise<UserData | null> => {
  axiosIns.defaults.headers.common['Content-Type'] = 'application/json';
  axiosIns.defaults.headers.common['Authorization'] = `Bearer ${
    localStorage.getItem('token')?.replace(/['"]+/g, '') || ''
  }`;

  try {
    const res = await axiosIns.get('/api/users/profile');
    return res.data.user;
  } catch (err) {
    console.error('Error fetching user:', err);
    return null;
  }
};

// update user profile
export async function updateUserData(
  name: string,
  email: string,
  photo_url: string
) {
  axiosIns.defaults.headers.common['Content-Type'] = 'application/json';
  axiosIns.defaults.headers.common['Authorization'] = `Bearer ${
    localStorage.getItem('token')?.replace(/['"]+/g, '') || ''
  }`;
  const res = await axiosIns.put('/api/users/profile', {
    name,
    email,
    photo_url,
  });
  return res;
}
