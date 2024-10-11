import { useAuthStore } from "~/stores/auth";
import { useTransactionFilterStore } from "~/stores/transactionStore";
import { toast } from "~/components/ui/toast";

export const useTransactions = () => {
    const runtimeConfig = useRuntimeConfig();
    const store = useAuthStore();
    const isLoading = ref<boolean>(false);
    const transactionFilterStore = useTransactionFilterStore();


    const getTransactions: () => Promise<Transaction[]> = async () => {
        try {
            const { data, error, status } = await useAsyncData<Transaction[]>(`transactions`, () =>
                $fetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/operators/transactions?PaymentStatus=${transactionFilterStore.paymentStatus}&page=${transactionFilterStore.pageNumber}&size=${transactionFilterStore.pageSize}&sort=${transactionFilterStore.sortBy}`, {
                    headers: {
                        Authorization: `Bearer ${store.accessToken}`,
                    },
                })
            );

            if (status.value == "error") {
                console.log("Getting transactions error : ", error);
                toast({
                    title: (error as any)?.value?.data?.title,
                    description: (error as any)?.value?.data?.detail || (error as any)?.value?.data?.message,
                    variant: "destructive",
                });
                throw new Error("Getting transactions error: " + error.value?.message);
            }

            if (!data.value) {
                throw new Error("No transactions data received");
            }

            return data.value;
        } catch (error) {
            throw error;
        } finally {
            isLoading.value = false;
        }
    };

    const getTransactionById: (id: string) => Promise<Transaction> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions/${id}?PaymentStatus=NONE`,
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
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transaction data received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const getTransactionsByOperatorId: (id: string) => Promise<Transaction[]> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/operators/${id}/transactions`,
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
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transactions for operator received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };


    const getTransactionsByBranchId: (id: string) => Promise<Transaction[]> = async (id) => {
        try {
            const { data, error, status } = await useFetch<Transaction[]>(
                `${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/branches/${id}/transactions`,
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
                    description: error.value?.data?.detail || error.value?.data?.message,
                    variant: "destructive"
                })
                throw new Error(error.value?.data?.detail || error.value?.data?.message);
            }

            if (!data.value) {
                throw new Error("No transactions for branch received");
            }
            return data.value;
        } catch (err) {
            throw err;
        }
    };

    const initiateTransaction = async (transactionData: { amount: number; paymentReference: string }) => {
        try {
            const { data, error } = await useFetch(`${runtimeConfig.public.API_BASE_URL}/api/v1/merchants/transactions`, {
                method: 'POST',
                headers: {
                    Authorization: `Bearer ${store.accessToken}`,
                },
                body: JSON.stringify(transactionData),
            });

            if (error.value) {
                throw new Error(error.value.message);
            }

            return data.value;
        } catch (err) {
            console.error("Error initiating transaction:", err);
            throw err;
        }
    };

    return {
        getTransactions,
        getTransactionById,
        initiateTransaction,
        getTransactionsByOperatorId,
        getTransactionsByBranchId
    };
};