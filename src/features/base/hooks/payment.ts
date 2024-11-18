import Cookies from "js-cookie";
import { toast } from "react-toastify";
import { apiV1 } from "../../../utils/api";

export function usePayment() {
    const handlePay = async (cartId: number) => {
        try {
            const res = await apiV1.post(`/payment/trans/${cartId}`, {}, {
                headers: {
                    Authorization: `Bearer ${Cookies.get("token")}`
                }
            });
            if (res.data.result.redirect_url) {
                window.snap.pay(res.data.result.token, {
                    onSuccess: function () {
                        toast.success('Payment successful!');
                        console.log('success');
                    },
                    onPending: function () {
                        toast.info('Payment is pending...');
                        console.log('pending');
                    },
                    onError: function () {
                        toast.error('Payment failed!');
                        console.log('error');
                    },
                    onClose: function () {
                        toast.warn('Payment window closed.');
                        console.log('closed');
                    }
                });
            }
        } catch (error) {
            toast.error(`Error initiating payment: ${error instanceof Error ? error.message : 'An unexpected error occurred.'}`);
            console.log(error);
        }
    }

    return {
        handlePay
    }
}
