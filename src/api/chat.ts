import apiInstance from "./index";

const endpoint = "/chat";

export const getMessagesAPI = async (chatId: string) => {
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

export const sendMessageAPI = async (payload: {
  chatId: string;
  prompt: string;
}) => {
  try {
    const response = await apiInstance.post(`${endpoint}/generate`, payload, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export const createChatAPI = async () => {
  try {
    const response = await apiInstance.get(`${endpoint}/create`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
