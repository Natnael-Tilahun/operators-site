import { jwtDecode } from "jwt-decode";

export default defineNuxtRouteMiddleware(async (to, from) => {
  const authStore = useAuthStore();
  const runtimeConfig = useRuntimeConfig();

  // Skip authentication check for routes that do not require authentication
  // if (to.meta.requiresAuth === false) {
  //   return;
  // }


  const publicRoutes = ["/login", "/invalid-2fa", "/forgotPassword", "/activateNewUser"];
  if (publicRoutes.includes(to.path)) {
    return;
  }

  if (!authStore.isAuthenticated && to.path !== "/login") {
    return navigateTo("/login");
  }

  // if (to.path !== '/register') {
  //   return navigateTo('/register')
  // }

  // If the access token is expired and there's a refresh token available
  if (
    authStore.isAuthenticated &&
    authStore.accessToken &&
    isTokenExpired(authStore.accessToken) &&
    authStore.refreshToken &&
    to.path !== "/login"
  ) {
    console.log("Token expired: ", isTokenExpired(authStore.accessToken));
    try {
      // Send a request to your refresh token endpoint
      const { data, error, status } = await useFetch<any>(
        `${runtimeConfig.public.API_BASE_URL}/api/v1/auth/refresh-token`,
        {
          method: "POST",
          body: {
            refreshToken: authStore.refreshToken,
          },
        }
      );

      if (status.value === "error") {
        throw new Error("Error refreshing token: " + error.value);
      }

      // Update the access token in the store with the new token from the response
      authStore.$patch({
        refreshToken: data.value.refreshToken,
        accessToken: data.value.accessToken,
        refreshTokenExpiresIn: data.value.refreshTokenExpiresIn,
      });
    } catch (error) {
      console.error("Error refreshing token:", error);
      // Handle token refresh failure, e.g., redirect to login page
      throw new Error("Error refreshing token: " + error);
    }
  }

  // Function to check if the token is expired
  function isTokenExpired(token: any) {
    // Decode the JWT token
    const decodedToken = jwtDecode(token);
    // Check if the expiration time (exp) is in the past
    if (decodedToken.exp)
      return decodedToken.exp * 1000 < Date.now();

    return false;

  }
});
