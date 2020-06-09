const url: string = "http://localhost:3000/keys/";

export const fetchKey = (keyPhrase: string) => {
  return fetch(`${url}${keyPhrase}`).then((resp) => resp.json());
};
