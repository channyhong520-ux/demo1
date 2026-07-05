import { formatPrice } from "../data/products";
import type { CartItem } from "../types";

const TELEGRAM_BOT_TOKEN = "8822852010:AAFf3tOSupVet3t2zW8qlQCLiQmQoV9XxH0";
const TELEGRAM_CHANNEL = "@sokphengnetcafe";

function drawReceiptCanvas(items: CartItem[], amount: number, orderNumber: string) {
  const canvas = document.createElement("canvas");
  const width = 900;
  const height = 1400;
  canvas.width = width;
  canvas.height = height;

  const ctx = canvas.getContext("2d");
  if (!ctx) {
    throw new Error("Canvas is not supported in this browser");
  }

  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "#0f172a";
  ctx.font = "bold 42px Arial";
  ctx.fillText("Coffee NT26", 60, 90);

  ctx.font = "24px Arial";
  ctx.fillStyle = "#475569";
  ctx.fillText("Phnom Penh", 60, 130);
  ctx.fillText(`Order #${orderNumber}`, 60, 170);
  ctx.fillText(`Date ${new Date().toLocaleString("en-US")}`, 60, 205);

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, 240);
  ctx.lineTo(width - 60, 240);
  ctx.stroke();

  ctx.font = "bold 26px Arial";
  ctx.fillStyle = "#0f172a";
  ctx.fillText("Items", 60, 290);
  ctx.fillText("Qty", 620, 290);
  ctx.fillText("Amount", 760, 290);

  let y = 330;
  items.forEach((item) => {
    const lineAmount = item.unitPrice * item.quantity;
    ctx.font = "24px Arial";
    ctx.fillStyle = "#334155";
    const name = `${item.product.name}`;
    const detailParts = [
      item.toppings.length ? `Toppings: ${item.toppings.join(", ")}` : null,
      item.sugar ? `Sugar: ${item.sugar}` : null,
      item.ice ? `Ice: ${item.ice}` : null,
      item.note ? `Note: ${item.note}` : null,
    ].filter(Boolean);

    ctx.fillText(name, 60, y);
    ctx.fillText(String(item.quantity), 620, y);
    ctx.fillText(`៛ ${formatPrice(lineAmount)}`, 760, y);
    y += 30;

    if (detailParts.length) {
      ctx.font = "19px Arial";
      ctx.fillStyle = "#64748b";
      detailParts.forEach((detail) => {
        ctx.fillText(detail, 80, y);
        y += 24;
      });
    }

    y += 8;
  });

  ctx.strokeStyle = "#cbd5e1";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(60, y + 20);
  ctx.lineTo(width - 60, y + 20);
  ctx.stroke();

  ctx.font = "bold 30px Arial";
  ctx.fillStyle = "#0f172a";
  ctx.fillText("Total", 60, y + 78);
  ctx.fillText(`៛ ${formatPrice(amount)}`, 760, y + 78);

  ctx.font = "22px Arial";
  ctx.fillStyle = "#16a34a";
  ctx.fillText("Payment successful", 60, y + 130);
  ctx.fillText("Thank you for your order", 60, y + 165);

  return canvas;
}

export async function sendReceiptToTelegram(items: CartItem[], amount: number, orderNumber: string) {
  const canvas = drawReceiptCanvas(items, amount, orderNumber);
  const blob = await new Promise<Blob | null>((resolve) => canvas.toBlob(resolve, "image/png"));

  if (!blob) {
    throw new Error("Unable to create receipt image");
  }

  const formData = new FormData();
  formData.append("chat_id", TELEGRAM_CHANNEL);
  formData.append(
    "caption",
    `🧾 New order received\nOrder: ${orderNumber}\nTotal: ៛ ${formatPrice(amount)}\nItems: ${items.length}`,
  );
  formData.append("photo", blob, `receipt-${orderNumber}.png`);

  const response = await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendPhoto`, {
    method: "POST",
    body: formData,
  });

  const data = await response.json();
  if (!response.ok || !data.ok) {
    throw new Error(data.description ?? "Unable to send receipt to Telegram");
  }

  return data;
}
