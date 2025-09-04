import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { Link, useSearchParams } from "react-router";

export default function PaymentSuccess() {
    const [searchParams] = useSearchParams();

    const transactionId = searchParams.get("transactionId");
    const message = searchParams.get("message");
    const amount = searchParams.get("amount");
    const status = searchParams.get("status");

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-50">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5 }}
            >
                <Card className="p-6 text-center shadow-lg rounded-2xl max-w-md">
                    <CardContent className="space-y-4">
                        <CheckCircle2 className="mx-auto h-16 w-16 text-green-500" />
                        <h1 className="text-2xl font-bold text-gray-800">Payment Successful 🎉</h1>
                        <p className="text-gray-600">{message}</p>

                        <div className="bg-gray-100 rounded-lg p-4 text-left space-y-2">
                            <p>
                                <span className="font-semibold">Transaction ID:</span> {transactionId}
                            </p>
                            <p>
                                <span className="font-semibold">Amount:</span> ${amount}
                            </p>
                            <p>
                                <span className="font-semibold">Status:</span>{" "}
                                <span className="text-green-600 font-medium capitalize">{status}</span>
                            </p>
                        </div>

                        <Button asChild className="w-full mt-4">
                            <Link to="/bookings">Go Back</Link>
                        </Button>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
