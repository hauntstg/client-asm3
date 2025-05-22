const REST_API = process.env.REACT_APP_API;
export async function fetchSignupUser(user) {
  try {
    const res = await fetch(`${REST_API}/users/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      // credentials: "include",
      body: JSON.stringify(user),
    });

    if (res.status === 409) {
      return { error: "Email already exists", status: res.status };
    }

    if (!res.ok) {
      throw new Error("Lỗi server: " + res.status);
    }

    const data = await res.json();
    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

export async function fetchSigninUser(user) {
  try {
    const res = await fetch(`${REST_API}/users/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      credentials: "include",
      body: JSON.stringify(user),
    });

    const data = await res.json();

    if (res.status === 404) {
      return { message: data?.message, status: res.status };
    }

    if (res.status === 401) {
      return { message: data?.message, status: res.status };
    }

    if (!res.ok) {
      throw new Error("Lỗi server: " + res.status);
    }

    return data;
  } catch (error) {
    console.log(error);
    return null;
  }
}

// export async function fetchProfile(user) {
//   try {
//     const res = await fetch("http://localhost:5000/users/profile", {
//       method: "GET",
//       credentials: "include",
//     });
//     const data = await res.json();
//     return data;
//   } catch (error) {
//     console.log(error);
//     return null;
//   }
// }
