interface IRefreshTokenBody {
  refreshToken: string;
}

interface IRefreshTokenRes {
  type: string;
  accessToken: string;
  refreshToken: string;
}

export const GetNewToken = async () => {
  const baseUrl = 'https://office-project-kalinin.herokuapp.com';

  const refreshToken = localStorage.getItem('refreshToken');
  console.log('refresh token: ', refreshToken);
  if (!refreshToken) {
    localStorage.removeItem('token');
    localStorage.removeItem('refreshToken');
    return;
  }

  const body: IRefreshTokenBody = {
    refreshToken: refreshToken,
  };
  const res = await fetch(`${baseUrl}/api/auth/refresh`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  });
  const data: IRefreshTokenRes = await res.json();
  localStorage.setItem('token', data.accessToken);
  localStorage.setItem('refreshToken', data.refreshToken);
  console.log('new token: ', data.accessToken);
};
