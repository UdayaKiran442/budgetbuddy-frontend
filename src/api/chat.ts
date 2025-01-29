import apiInstance from "./index";

const endpoint = "/chat";

export const getMessages = async (chatId: string) => {
  try {
    const response = await apiInstance.post(
      `${endpoint}/messages`,
      { chatId },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
