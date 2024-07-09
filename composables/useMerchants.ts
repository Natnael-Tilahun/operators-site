import { Toast, ToastAction, toast, useToast } from "~/components/ui/toast";
import { useAuthUser } from "./useAuthUser";

export const useMerchants = () => {
    const runtimeConfig = useRuntimeConfig();
    const isLoading = ref<boolean>(false);
    const isSubmitting = ref<boolean>(false);

    const store = useAuthStore();

    const getProfile: () => Promise<Merchant> = async () => {
        try {
            const { data, pending, error, status } = await useFetch<Merchant>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

            isLoading.value = pending.value;

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.type == "/constraint-violation" ? error.value?.data?.fieldErrors[0]?.message : error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail);
            }

            if (!data.value) {
                throw new Error("No merchants data received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    const createNeweMerchant: (merchantData: any) => Promise<Merchant> = async (merchantData) => {
        try {
            const { data, pending, error, status } = await useFetch<Merchant>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/register`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(merchantData),
                },
            );

            isLoading.value = pending.value;

            if (status.value === "error") {

                toast({
                    title: error.value?.data?.title || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })

                console.log("Creating new merchant error: ", error.value?.data.detail, error)
                throw new Error(error.value?.data.detail);
            }


            if (!data.value) {
                throw new Error("No merchant with this customer id received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    const updateProfile: (merchantData: any) => Promise<Merchant> = async (merchantData) => {
        try {
            const { data, pending, error, status } = await useFetch<Merchant>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/update`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(merchantData),
                },
            );

            isSubmitting.value = pending.value;

            if (status.value === "error") {

                console.log("Error: ", error)
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.type == "/constraint-violation" ? error.value?.data?.fieldErrors[0]?.message : error.value?.data?.message,
                    variant: "destructive"
                })

                if (error.value?.data?.type == "/constraint-violation") {
                    console.log("Updating merchant error: ", error.value?.data?.fieldErrors[0].message)
                }
                else {
                    console.log("Updating merchant errorrr: ", error.value?.data?.message)
                }
                throw new Error((error as any).value);
            }

            if (!data.value) {
                throw new Error("No merchant with this merchant id received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    return {
        isLoading,
        getProfile,
        createNeweMerchant,
        updateProfile,
        isSubmitting
    };
};
