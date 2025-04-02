import { LOCAL_STORAGE_KEYS } from "@/constant/query-keys";
import { http } from "@/lib/http";
import { useMutation } from "@tanstack/react-query";

type TContactDTO = {
  name: string;
  email: string;
  phone: string;
  message: string;
};

export const useMutationContact = () => {
  const mutation = useMutation({
    mutationFn: async (dto: TContactDTO) => {
      const botToken = "7724158646:AAEwNqexZj-dN9B4NdBBz3qa0ZRMPhHdNJI";
      const chatId = "-4718078253"; // Replace with your chat ID if different
      const message = `
🚀 *New Contact Form Submission* 🚀

👤 *Name:* ${dto.name}
📧 *Email:* ${dto.email}
📱 *Phone:* ${dto.phone}
💬 *Message:* 
${dto.message}

From Recodepush Landing Page ✨
`;
      const response = await fetch(
        `https://api.telegram.org/bot${botToken}/sendMessage`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            chat_id: chatId,
            text: message,
          }),
        }
      );
      return response.json();
    },
  });
  return mutation;
};
