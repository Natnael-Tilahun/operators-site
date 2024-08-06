import { Toast, ToastAction, toast, useToast } from "~/components/ui/toast";

export const useEmployees = () => {
    const runtimeConfig = useRuntimeConfig();
    const isLoading = ref<boolean>(false);

    const store = useAuthStore();

    const getEmployees: () => Promise<Employee[]> = async () => {
        try {
            const { data, error, status } = await useAsyncData<Employee[]>(`operators`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators`, {
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                })
            );

            if (status.value == "error") {
                console.log("Operator error : ", error);
                toast({
                    title: (error as any)?.value?.data?.title,
                    description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                    variant: "destructive",
                });
                throw new Error("Getting operators error: " + error.value);
            }

            if (!data.value) {
                throw new Error("No operators data received");
            }

            return data.value;

        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };


    const deleteEmployee: (id: string) => Promise<Employee[] | undefined> = async (id) => {

        try {
            const { data, error, status } = await useAsyncData<Employee[]>(`operators`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}`,
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
                throw new Error("Getting operators error: " + error.value);
            }

            if (status.value === "success") {
                if (!data.value) {
                    throw new Error("No operators data received");
                }
                return data.value;
            }

            return [];

        } catch (error) {
            throw new Error("Getting operators error: " + error);
        } finally {
            isLoading.value = false;
        }
    }

    const getEmployeeById: (id: string) => Promise<Employee> = async (id) => {
        try {
            const { data, pending, error, status } = await useFetch<Employee>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}`,
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
                throw new Error("No operator data received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const getBranchOperators: (id: string) => Promise<Employee[]> = async (id) => {
        try {
            const { data, pending, error, status } = await useFetch<Employee[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}/employees`,
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
                throw new Error("No branch operator data received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const createEmployee: (employeeData: Employee) => Promise<Employee> = async (employeeData) => {
        try {
            const { data, error, status } = await useFetch<Employee>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(employeeData),
                },
            );

            if (status.value === "error") {
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                console.log("Creating new operator error: ", error.value?.data.detail || error.value?.data?.message)
                throw new Error(error.value?.data.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No operator with this customer id received");
            }

            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const updateEmployee: (id: string, employeeData: Employee) => Promise<Employee> = async (id, employeeData) => {
        try {
            const { data, error, status } = await useFetch<Employee>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}`,
                {
                    method: "PATCH",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(employeeData),
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
                    console.log("Updating operator error: ", error.value?.data?.fieldErrors[0].message)
                }
                else {
                    console.log("Updating operator errorrr: ", error.value?.data?.message)
                }
                throw new Error((error as any).value);
            }

            if (!data.value) {
                throw new Error("No operator with this merchant id received");
            }

            return data.value;
        } catch (err) {
            // Throw the error to be caught and handled by the caller
            throw err;
        }
    };

    const resetEmployeePassword: (id: string, newPassword: string) => Promise<Employee | null> = async (id, newPassword) => {
        const employeeData = {
            newPassword: newPassword
        }

        try {
            const { data, error, status } = await useFetch<Employee>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}/reset-password`,
                {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                    body: JSON.stringify(employeeData),
                },
            );

            if (status.value === "error") {

                console.log("Error: ", error)
                toast({
                    title: error.value?.data?.type || "Something went wrong!",
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })

                throw new Error(error.value?.data.detail || error.value?.data?.message)
            }

            return data.value;
        } catch (err) {
            throw err;
        }
    };

    return {
        getEmployees,
        deleteEmployee,
        isLoading,
        getEmployeeById,
        createEmployee,
        updateEmployee,
        resetEmployeePassword,
        getBranchOperators
    };
};
