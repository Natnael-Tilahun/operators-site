import { Toast, ToastAction, useToast } from "~/components/ui/toast";
import { useAuthUser } from "./useAuthUser";
import type { AuthResponse, OtpDTO, TFAAccessTokenDTO, UserInput } from "~/types";
import { handleApiError, type ApiResult } from "~/types/api";

export const useAuth = () => {
  const runtimeConfig = useRuntimeConfig();
  const authUser = useAuthUser();
  const userAdmin = useState<boolean>("userAdmin", () => false);
  const isLoading = ref<boolean>(false);
  const store = useAuthStore();
  const { toast } = useToast();
  const {getProfile} = useProfile()
  const { fetch } = useApi();

  const login = async (user: UserInput) => {
    try {
      const { data, pending, error, status } = await fetch<AuthResponse>(
        "/api/v1/operators/sign-in",
        {
          method: "POST",
          body: user,
          includeAuth: false,
        }
      );

      if (status.value === "error") {
        handleApiError(error);
      }

      if (status.value === "success") {
        store.setAuth({
          ...user,
          ...data?.value,
          isAuthenticated: data?.value?.accessToken ? true : false,
        });
        await getProfile();
        navigateTo("/");
      }

      return data;
    } catch (error) {
      // handleApiError(error);
      return null;
    } finally {
      // Ensure to stop loading state whether login is successful or not
      isLoading.value = false;
    }
  }

  const userLoggedIn = async () => {
    if (!authUser.value) {


      try {
        const { data, pending, error, status } = await fetch<any>(
          "/api/v1/auth/status",
          {
            method: "POST",
            header: useRequestHeaders(["cookie"]),
          }
        );
  
        isLoading.value = pending.value;
  
        if (status.value === "error") {
          handleApiError(error);
        }
  
        return data.value ? (data.value as unknown as any) : null;
      } catch (err) {
        // handleApiError(err);
        return null;
      }

    }
  };

  const logout = async () => {
    store.$reset();
    return navigateTo("/login", { replace: true });
  };

  const requestTwoFactorAuth: (
    deliveryMethod?: string
  ) => ApiResult<OtpDTO> = async (deliveryMethod) => {
    try {
      const { data, pending, error, status } = await fetch<OtpDTO>(
        `/api/v1/auth/two-factor/request-token?deliveryMethod=${deliveryMethod}`,
        {
          method: "POST",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      const response = data.value as OtpDTO;
      if (status.value === "success" && response?.verificationId) {
        store.$patch({
          verificationId: response.verificationId,
        });
      }

      return response;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const validateTwoFactorAuth: (
    otp: string
  ) => ApiResult<TFAAccessTokenDTO> = async (otp) => {
    try {
      const { data, pending, error, status } = await fetch<TFAAccessTokenDTO>(
        `/api/v1/auth/two-factor/validate`,
        {
          method: "POST",
          body: {
            verificationId: store.verificationId,
            otp: otp,
          },
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        await handleApiError(error);
      }

      const response = data.value as TFAAccessTokenDTO;
      if (status.value === "success" && response?.token) {
        store.$patch({
          twoFactorToken: response.token,
        });
      }
      return response;
    } catch (err) {
      // handleApiError(err);
      return null;
    }
  };

  const getAuthorities = async () => {
    try {
      const { data, pending, error, status } = await fetch<any[]>(
        `/api/v1/auth/roles`,
        {
          method: "GET",
        }
      );

      isLoading.value = pending.value;

      if (status.value === "error") {
        handleApiError(error);
      }

      if (status.value === "success") {
        store.setPermissions({
          permissions: data?.value && data?.value?.permissions,
        });

        navigateTo("/");
      }

      return data.value ? (data.value as unknown as any) : null;
    } catch (err) {
      // handleApiError(err);
      return null;
    } finally {
      isLoading.value = false;
    }
  };



  return {
    login,
    userLoggedIn,
    userAdmin,
    Error,
    logout,
    authUser,
    // getRefreshToken,
    requestTwoFactorAuth,
    validateTwoFactorAuth,
    getAuthorities
  };
};
