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
      const message = `
-------------------------------------------\n\n
New Contact Form Submission 

\n👤 Name: ${dto.name}
\n📧 Email: ${dto.email}
\n📱 Phone: ${dto.phone}
\n💬 Message: 
${dto.message}

From Recodepush Landing Page ✨
`;
      const response = await fetch(
        `https://discord.com/api/webhooks/1383004995082780785/A7ms4WD8-rIQdha7_zk-o5Tm4FJfXsBe6bPlbPJdt2w6LSq2YW2H3kkhyhjzF2ROghTh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            content: message,
          }),
        }
      );
      return response.json();
    },
  });
  return mutation;
};
