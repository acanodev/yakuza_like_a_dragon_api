import { useState, useEffect, useRef } from "react";
import axios from "axios";

// A App.tsx indicarem el tipus (<T>) de dades que volem rebre (<MainCharacter[]> o <Sujimon[]>)
export const useGetAxios = <T>(url: string | null) => {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  useEffect(() => {
    if (!url) {
      setData(null);
      return;
    }

    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    axios
      .get<T>(url, { signal: controllerRef.current.signal })
      .then((res) => setData(res.data))
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));

    return () => controllerRef.current?.abort();
  }, [url]);

  return { data, loading, error };
};

/* 

A App.tsx indicarem el tipus de resposta (<TResponse>) que volem rebre 
i el tipus de body (<TBody>) que enviarem.

Exemple d'ús:

const { handlePost } = usePostAxios<Sujimon, NewSujimon>(); // Volem rebre un Sujimon i enviarem un NewSujimon al body de la petició.

handlePost("/api/sujimon", newSujimon, (new) => {
  console.log(new.name);
});

*/
export const usePostAxios = <TResponse, TBody>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const handlePost = (
    url: string,
    data: TBody,
    onSuccess?: (data: TResponse) => void
  ) => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    axios
      .post<TResponse>(url, data, { signal: controllerRef.current.signal })
      .then((res) => {
        onSuccess?.(res.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return { handlePost, loading, error };
};

/*

A App.tsx indicarem el tipus de resposta (<TResponse>) que volem rebre 
i el tipus de body (<TBody>) que enviarem.

Exemple d'ús:

const { handlePut } = usePutAxios<Sujimon, NewSujimon>(); 
// Volem rebre un Sujimon actualitzat i enviarem un NewSujimon al body de la petició.

handlePut("/api/sujimon/123", updatedSujimon, (updated) => {
  console.log(updated.name);
});

*/
export const usePutAxios = <TResponse, TBody>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const handlePut = async (
    url: string,
    data: TBody,
    onSuccess?: (data: TResponse) => void
  ): Promise<TResponse | null> => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    try {
      const res = await axios.put<TResponse>(url, data, {
        signal: controllerRef.current.signal,
      });

      onSuccess?.(res.data);

      return res.data;
    } catch (err: any) {
      if (!axios.isCancel(err)) {
        setError(err.message);
      }
      return null;
    } finally {
      setLoading(false);
    }
  };

  return { handlePut, loading, error };
};

/*

Com que l'API només retorna un codi 204 No Content no fa falta indicar el tipus de resposta
a App.tsx, podem declarar-ho com a void:

const { handleDelete } = useDeleteAxios<void>();

handleDelete("/api/sujimon/123", () => {
  console.log("Eliminat");
});

*/
export const useDeleteAxios = <TResponse>() => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const controllerRef = useRef<AbortController | null>(null);

  const handleDelete = (
    url: string,
    onSuccess?: (data: TResponse) => void
  ) => {
    controllerRef.current?.abort();
    controllerRef.current = new AbortController();

    setLoading(true);
    setError(null);

    axios
      .delete<TResponse>(url, { signal: controllerRef.current.signal })
      .then((res) => {
        onSuccess?.(res.data);
      })
      .catch((err) => {
        if (!axios.isCancel(err)) {
          setError(err.message);
        }
      })
      .finally(() => setLoading(false));
  };

  return { handleDelete, loading, error };
};
