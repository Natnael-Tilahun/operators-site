import { Toast, ToastAction, toast, useToast } from "~/components/ui/toast";

export const useBranches = () => {
    const runtimeConfig = useRuntimeConfig();
    const isLoading = ref<boolean>(false);

    const store = useAuthStore();

    const getBranches: () => Promise<Branch[]> = async () => {
        try {
            const { data, error, status } = await useAsyncData<Branch[]>(`branch`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches`, {
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                })
            );

            if (status.value == "error") {
                console.log("Branch error : ", error);
                toast({
                    title: (error as any)?.value?.data?.title,
                    description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                    variant: "destructive",
                });
                throw new Error("Getting branches error: " + error.value);
            }

            if (!data.value) {
                throw new Error("No branches data received");
            }

            return data.value;

        } catch (error) {
            console.error("Getting branches error: ", error);
            throw error;
        } finally {
            isLoading.value = false;
        }
    };


    const deleteBranch: (id: string) => Promise<Branch[]> = async (id) => {

        try {
            const { data, error, status } = await useAsyncData<Branch[]>(`branch`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}`,
                    {
                        method: 'DELETE',
                        headers: {
                            Authorization: `Bearer ${store.accessToken}`,
                        },
                    }

                )
            )

            if (status.value === "error") {
                console.log("error: ", error)
                toast({
                    title: (error as any)?.value?.data?.title,
                    description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                    variant: "destructive",
                });
                throw new Error("Getting branches error: " + error.value);
            }

            if (status.value === "success") {
                console.log("branch data: ", data.value)
                if (!data.value) {
                    throw new Error("No roles data received");
                }
                return data.value;
            }

            // If none of the conditions are met, return an empty array as a fallback
            return [];

        } catch (error) {
            console.error("Getting branches error: ", error);
            return [];
        } finally {
            // Ensure to stop loading state whether login is successful or not
            isLoading.value = false;
        }
    }

    const getBranchById: (id: string) => Promise<Branch> = async (id) => {
        try {
            const { data, pending, error, status } = await useFetch<Branch>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}`,
                {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                }
            );

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

    const createBranch: (branchData: Branch) => Promise<Branch> = async (branchData) => {
        try {
            const { data, pending, error, status } = await useFetch<Branch>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(branchData),
                },
            );

            isLoading.value = pending.value;

            if (status.value === "error") {

                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.type == "/constraint-violation" ? error.value?.data?.fieldErrors[0]?.message : error.value?.data?.message || error.value?.data?.detail,
                    variant: "destructive"
                })

                console.log("Creating new branch error: ", error.value?.data.detail)

                if (error.value?.data?.type == "/constraint-violation") {
                    console.log("Creating new branch error: ", error.value?.data?.fieldErrors[0].message)
                }
                else {
                    console.log("Creating new branch errorrr: ", error.value?.data?.message)
                }
                throw new Error(error.value?.data.detail);
            }

            if (!data.value) {
                throw new Error("No branch with this customer id received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    const updateBranch: (id: string, branchData: Branch) => Promise<Branch> = async (id, branchData) => {
        try {
            const { data, error, status } = await useFetch<Branch>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(branchData),
                },
            );


            if (status.value === "error") {

                console.log("Error: ", error)
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.type == "/constraint-violation" ? error.value?.data?.fieldErrors[0]?.message : error.value?.data?.message,
                    variant: "destructive"
                })

                if (error.value?.data?.type == "/constraint-violation") {
                    console.log("Updating branch error: ", error.value?.data?.fieldErrors[0].message)
                }
                else {
                    console.log("Updating branch errorrr: ", error.value?.data?.message)
                }
                throw new Error((error as any).value);
            }

            if (!data.value) {
                throw new Error("No branch with this merchant id received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    return {
        getBranches,
        deleteBranch,
        isLoading,
        getBranchById,
        createBranch,
        updateBranch,
    };
};
