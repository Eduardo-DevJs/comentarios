import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { v4 as uuidv4 } from "uuid";

type ComentsProps = {
  id: string;
  author: string;
  coment: string;
  date: Date;
};

const schema = yup
  .object({
    author: yup.string().required("Nome obrigatório!"),
    coment: yup.string().required("Comentário obrigatório!"),
  })
  .required();

export default function App() {
  const [coments, setComents] = useState<ComentsProps[]>([]);
  const [author, setAuthor] = useState("");
  const [coment, setComent] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  function handleAddComent(data: any) {
    setComents((prevState) => [
      ...prevState,
      {
        id: uuidv4(),
        author: data.author,
        coment: data.coment,
        date: new Date(),
      },
    ]);

    setAuthor("");
    setComent("");
  }

  function handleDelete(id: string) {
    const filter = coments.filter((e) => e.id !== id);
    setComents(filter);
  }

  return (
    <div className="max-w-4xl mx-auto mt-3 px-4">
      <form
        onSubmit={handleSubmit(handleAddComent)}
        className="flex flex-col gap-2"
      >
        <input
          {...register("author")}
          className="border-2 outline-sky-500 p-2 text-base rounded"
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="seu nome"
        />
        <span className="text-red-500">{errors.author?.message}</span>
        <textarea
          {...register("coment")}
          value={coment}
          onChange={(e) => setComent(e.target.value)}
          placeholder="Faça seu comentario..."
          className="border-2 resize-none p-2 text-base outline-sky-500"
          name="coment"
          cols={30}
          rows={10}
        ></textarea>
        <span className="text-red-500">{errors.coment?.message}</span>
        <button className="bg-sky-500 w-full p-2 font-medium text-xl rounded-md hover:opacity-95 text-white">
          Comentar
        </button>
      </form>
      {coments.map((coment) => (
        <div
          key={coment.id}
          className="bg-white w-full p-4 mt-5 rounded flex items-end justify-between"
        >
          <div>
            <div>
              <span className="text-zinc-500 font-light">Autor</span>
              <h2 className="text-2xl">{coment.author}</h2>
            </div>
            <p className="font-normal text-xs italic">Postado em: {coment.date.getFullYear()}</p>

            <p className="mt-2 leading-normal text-slate-600">
              {coment.coment}
            </p>
          </div>

          <button
            className="bg-red-400 text-white font-medium rounded p-2"
            onClick={() => handleDelete(coment.id)}
          >
            Excluir
          </button>
        </div>
      ))}
    </div>
  );
}
