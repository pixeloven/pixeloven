import { HttpClient } from "@shared/utils/HttpClient";

const baseUrl = "http://api.open-notify.org/iss-now.json";

const getExample = (fundUrl: string) => {
    const url = `${baseUrl}/${fundUrl}/campaign`;
    return () => HttpClient.get(url);
};

export { getExample };
