import { getAPIServiceURL } from "./APIServiceURL";
import { getCookie, setCookie } from "./helpers";

const headers: Record<string, string> = {
  "content-type": "application/json",
};

let isDemo = false;

if (import.meta.env.VITE_DEMO_MODE === "true") {
  isDemo = true;
}

if (isDemo) {
  setCookie("jwtToken", "demo");
}

const token = getCookie("jwtToken");

if (token) {
  headers.authorization = token;
}

export const setHeader = (name: string, value: string) => {
  headers[name] = value;
};

export const clearHeader = (name: string) => {
  delete headers[name];
};

export const fetcher = <TData, TVariables>(
  query: string,
  variables?: TVariables,
  requestHeaders?: Record<string, string>,
  abortController?: AbortController
) => {
  return async (opts?: any): Promise<TData> => {
    try {
      const data = { query, variables, extensions: {} };

      // TODO: temporarily disable operation regisry
      // const operationName = getOperationName(query);
      //
      // if (operationName && operationName !== "") {
      //   const persisted = persistedOperations[operationName as keyof typeof persistedOperations];
      //   if (persisted) {
      //     // @ts-ignore
      //     delete data['query']
      //     data['extensions'] = {
      //       operation_id: persisted.hash
      //     }
      //   }
      // }

      const captcha = getCookie("captcha");

      const res = await fetch(getAPIServiceURL(), {
        method: "POST",
        body: JSON.stringify(data),
        signal: abortController?.signal ?? opts?.signal,
        headers: {
          ...headers,
          "Inigo-Client-Version": "InigoUI",
          "X-Inigo-ReCaptcha-Token": captcha ?? "",
          "apollo-federation-include-trace": "ftv1",
          authorization: headers.authorization
            ? `Bearer ${headers.authorization}`
            : "",
          ...(requestHeaders ?? {}),
        },
      });

      const json = await res.json();

      if (json.errors) {
        const { message } = json.errors[0];

        if (message === "ent: user_data not found") {
          return json.data;
        }

        throw new Error(message);
      }

      return {
        ...json.data,
      };
    } catch (e) {
      throw new Error((e as any).message);
    }
  };
};

export { isDemo };
