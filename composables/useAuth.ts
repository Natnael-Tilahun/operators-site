import { Toast, ToastAction, useToast } from "~/components/ui/toast";
import { useAuthUser } from "./useAuthUser";

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const authUser = useAuthUser();
  const userAdmin = useState<boolean>("userAdmin", () => false);
  const isLoading = ref<boolean>(false);
  const store = useAuthStore();
  const { toast } = useToast();

  // const login = async (user: UserInput) => {
  //   try {
  //     const { data, error, status } = await useFetch<any>(
  //       `${runtimeConfig.public.API_BASE_URL}/api/v1/auth/sign-in/password`,
  //       {
  //         method: "POST",
  //         body: JSON.stringify(user),
  //       }
  //     );

  //     if (status.value === "error") {
  //       console.log("error: ", error)
  //       // Handle the error, e.g., display a toast message or stay on the login page
  //       toast({
  //         title: error?.value?.data?.title,
  //         description: error?.value?.data?.detail || error?.value?.data?.message,
  //         variant: "destructive",
  //       });
  //       throw new Error("Login error: " + error.value);
  //     }

  //     console.log("faffd: ", data.value)
  //     store.setAuth({
  //       ...user,
  //       ...data?.value,
  //       isAuthenticated: data?.value.accessToken ? true : false,
  //     });
  //     await getAuthorities()
  //     return data.value;
  //   } catch (err) {
  //     // Throw the error to be caught and handled by the caller
  //     throw err;
  //   }
  // };

  const login = async (user: UserInput) => {

    try {
      const { data, error, status } = await useAsyncData<any>(`user`, () =>
        $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/operators/sign-in`,
          {
            method: "POST",
            body: JSON.stringify(user)
          })
      );

      if (status.value === "error") {
        toast({
          title: (error as any)?.value?.data?.title,
          description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
          variant: "destructive",
        });
        throw new Error("Login error: " + error.value);
      }

      if (status.value === "success") {
        store.setAuth({
          ...user,
          ...data?.value,
          isAuthenticated: data?.value.accessToken ? true : false,
        });
        // navigateTo("/", { replace: true });
        try {
          const { data: profileData, pending: profilePending, error: profileError, status: profileStatus } = await useFetch<Profile>(
            `${runtimeConfig.public.API_BASE_URL}/api/v1/operators/me`,
            {
              method: "GET",
              headers: {
                Authorization: `Bearer ${store.accessToken}`,
              },
            }
          );

          if (profileStatus.value == 'success') {
            if (profileData?.value) {
              store.setProfile(profileData?.value);
            }
            console.log("profile data: ", profileData.value)
            navigateTo("/", { replace: true });
          }

          if (profileStatus.value === "error" && profileError.value?.data?.detail == "404 NOT_FOUND") {
            console.log("error: ", profileError)
            toast({
              title: "Getting profile error",
              description: (profileError as any)?.value?.data?.detail || (profileError as any)?.value?.data?.message,
              variant: "destructive",
            });
            navigateTo("/", { replace: true });
          }
        } catch (error) {
          console.error("Getting profile error: ", error);

          // if ((error as any).value?.data?.detail == "404 NOT_FOUND") {
          navigateTo("/", { replace: true });
          // }
        }


        // try {
        //   const { data, pending, error, status } = await useFetch<Merchant>(
        //     `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants`,
        //     {
        //       method: "GET",
        //       headers: {
        //         Authorization: `Bearer ${store.accessToken}`,
        //       },
        //     }
        //   );

        //   if (status.value == 'success') {
        //     navigateTo("/", { replace: true });
        //   }

        //   if (status.value === "error" && error.value?.data?.detail == "404 NOT_FOUND") {
        //     navigateTo("/register", { replace: true });
        //   }
        // } catch (error) {
        //   console.error("Getting profile error: ", error);
        //   if ((error as any).value?.data?.detail == "404 NOT_FOUND") {
        //     navigateTo("/register", { replace: true });
        //   }
        // }
        // return data.value;
      }

    } catch (error) {
      console.error("Login error: ", error);
    } finally {
      isLoading.value = false;
    }
  }

  // const getRefreshToken = async () => {
  //   try {
  //     const { data, error, status } = await useFetch(
  //       `${runtimeConfig.public.API_BASE_URL}/v1/api/auth/refresh-token`,
  //       {
  //         method: "POST",
  //         body: {
  //           refreshToken: store.refreshToken,
  //         },
  //         headers: {
  //           Authorization: `Bearer ${store.accessToken}`,
  //         },
  //       }
  //     );

  //     if (status.value === "error") {
  //       // Handle the error, e.g., display a toast message or stay on the login page
  //       toast({
  //         title: error?.value?.data?.title,
  //         description: error?.value?.data?.detail,
  //         variant: "destructive",
  //       });
  //       console.log("Refresh-token error: ", error);

  //       throw new Error("Refresh-token error: " + error.value);
  //     }
  //     console.log("v1/api/auth/refresh-token: ", data);
  //     return data.value;
  //   } catch (err) {
  //     throw err;
  //   }
  // };

  // const getAuthorities = async () => {
  //   try {
  //     const { data, error, status } = await useFetch<any>(
  //       `${runtimeConfig.public.API_BASE_URL}/api/v1/auth/roles`,
  //       {
  //         method: "GET",
  //         headers: {
  //           Authorization: `Bearer ${store.accessToken}`,
  //         },
  //       }
  //     );

  //     if (status.value === "error") {
  //       // Handle the error, e.g., display a toast message or stay on the login page
  //       toast({
  //         title: error?.value?.data?.title || error?.value,
  //         description: error?.value?.data?.detail,
  //         variant: "destructive",
  //       });
  //       console.log("Getting roles error: ", error);

  //       throw new Error("Getting role error: " + error.value);
  //     }
  //     if (status.value === "success") {

  //       store.setPermissions({
  //         permissions: data?.value && data?.value?.permissions
  //       });

  //       navigateTo('/')
  //     }
  //     return data.value;
  //   } catch (err) {
  //     // Throw the error to be caught and handled by the caller
  //     throw err;
  //   }
  // };

  const userLoggedIn = async () => {
    if (!authUser.value) {
      const { data, error, status, pending } = await useFetch(
        `${runtimeConfig.public.API_BASE_URL}/api/v1/auth/status`,
        {
          headers: useRequestHeaders(["cookie"]),
        }
      );

      if (status.value === "error") {
        return error.value;
      }

      //   if (data.isAdmin) {
      //     userAdmin.value = true;
      //   } else {
      //     userAdmin.value = false;
      //   }
      //   setUser(data.user);

      //   if (data.value) {
      //     const token = useCookie('token'); // useCookie new hook in nuxt 3
      //     token.value = data?.value?.token; // set token to cookie
      //     this.authenticated = true; // set authenticated  state value to true
      //   }
      else {
        return data.value;
      }
      //   setUser(data.user);
    }
  };

  const logout = async () => {
    store.$reset();
    return navigateTo("/login", { replace: true });
  };


  return {
    login,
    userLoggedIn,
    userAdmin,
    Error,
    logout,
    authUser,
    // getRefreshToken,
  };
};
