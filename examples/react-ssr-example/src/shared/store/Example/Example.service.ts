import { HttpClient } from "@shared/utils/HttpClient";

const baseUrl = "http://api.open-notify.org/iss-now.json";

const getExample = (resourceUrl: string) => {
    const url = `${baseUrl}/${resourceUrl}`;
    return HttpClient.get(url);
};

export { getExample };
