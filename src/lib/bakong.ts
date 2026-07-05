import { KHQR, CURRENCY, COUNTRY, TAG } from "ts-khqr";

// --- Merchant configuration (provided) ---
const BAKONG_ACCOUNT_ID = "sokpheng_phoeurn@bkrt";
const MERCHANT_NAME = "Coffee NT26";
const MERCHANT_CITY = "Phnom Penh";
const BAKONG_TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoiNDA4NGU3ODZmMjYwNGFkZCJ9LCJpYXQiOjE3ODMwMzc5MDMsImV4cCI6MTc5MDgxMzkwM30.fwh8D3BH6G3Q9DZQvfb2XyZbcO4NCOwtPniKtkag9S8";

const CHECK_TRANSACTION_URL =
  "https://api-bakong.nbc.gov.kh/v1/check_transaction_by_md5";

export interface GeneratedKHQR {
  qr: string;
  md5: string;
  expiresAt: number;
}

/**
 * Generate a dynamic KHQR code for a given amount (in KHR - Cambodian Riel).
 */
export function generateKHQR(amountKHR: number, billNumber: string): GeneratedKHQR {
  const expirationTimestamp = Date.now() + 5 * 60 * 1000; // expires in 5 minutes

  const result = KHQR.generate({
    tag: TAG.INDIVIDUAL,
    accountID: BAKONG_ACCOUNT_ID,
    merchantName: MERCHANT_NAME,
    merchantCity: MERCHANT_CITY,
    currency: CURRENCY.KHR,
    amount: Math.round(amountKHR),
    countryCode: COUNTRY.KH,
    expirationTimestamp,
    additionalData: {
      billNumber,
      storeLabel: MERCHANT_NAME,
      purposeOfTransaction: "Coffee order payment",
    },
  });

  if (result.status.code !== 0 || !result.data) {
    throw new Error(result.status.message ?? "Failed to generate KHQR code");
  }

  return {
    qr: result.data.qr,
    md5: result.data.md5,
    expiresAt: expirationTimestamp,
  };
}

export type TransactionStatus = "PAID" | "UNPAID" | "ERROR";

/**
 * Check the payment status of a KHQR transaction using its MD5 hash
 * via the Bakong Open API.
 */
export async function checkTransactionByMd5(
  md5: string,
): Promise<{ status: TransactionStatus; message?: string }> {
  try {
    const response = await fetch(CHECK_TRANSACTION_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${BAKONG_TOKEN}`,
      },
      body: JSON.stringify({ md5 }),
    });

    const json = await response.json();
    const payload = json?.data ?? json;
    const responseCode = Number(payload?.responseCode ?? json?.responseCode ?? 0);
    const statusValue = String(
      payload?.status ??
        payload?.transactionStatus ??
        payload?.paymentStatus ??
        payload?.state ??
        payload?.txStatus ??
        json?.status ??
        json?.transactionStatus ??
        json?.paymentStatus ??
        json?.state ??
        json?.txStatus ??
        "",
    ).toUpperCase();
    const messageValue = String(
      payload?.message ??
        payload?.responseMessage ??
        json?.responseMessage ??
        json?.message ??
        "",
    ).toLowerCase();
    const paymentStatusValue = String(payload?.paymentStatus ?? payload?.status ?? "").toLowerCase();
    const responseMessageValue = String(json?.responseMessage ?? "").toLowerCase();
    const transactionStatusValue = String(payload?.transactionStatus ?? payload?.txStatus ?? "").toLowerCase();
    const transactionStateValue = String(payload?.state ?? "").toLowerCase();

    const isPaid =
      responseCode === 0 ||
      statusValue === "PAID" ||
      statusValue === "SUCCESS" ||
      statusValue === "SUCCESSFUL" ||
      statusValue === "COMPLETED" ||
      statusValue === "SETTLED" ||
      statusValue === "CONFIRMED" ||
      statusValue === "DONE" ||
      paymentStatusValue === "paid" ||
      paymentStatusValue === "success" ||
      paymentStatusValue === "successful" ||
      paymentStatusValue === "completed" ||
      paymentStatusValue === "settled" ||
      paymentStatusValue === "confirmed" ||
      transactionStatusValue === "paid" ||
      transactionStatusValue === "success" ||
      transactionStatusValue === "successful" ||
      transactionStatusValue === "completed" ||
      transactionStatusValue === "settled" ||
      transactionStatusValue === "confirmed" ||
      transactionStateValue === "paid" ||
      transactionStateValue === "success" ||
      transactionStateValue === "successful" ||
      transactionStateValue === "completed" ||
      transactionStateValue === "settled" ||
      transactionStateValue === "confirmed" ||
      messageValue.includes("paid") ||
      messageValue.includes("success") ||
      messageValue.includes("completed") ||
      messageValue.includes("settled") ||
      messageValue.includes("already paid") ||
      messageValue.includes("already_paid") ||
      responseMessageValue.includes("paid") ||
      responseMessageValue.includes("success") ||
      responseMessageValue.includes("completed") ||
      responseMessageValue.includes("settled");

    if (isPaid) {
      return { status: "PAID" };
    }

    return {
      status: "UNPAID",
      message: json?.responseMessage ?? json?.message ?? "No payment detected yet",
    };
  } catch (error) {
    return {
      status: "ERROR",
      message: error instanceof Error ? error.message : "Network error",
    };
  }
}
