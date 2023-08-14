"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function CreateNote() {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const router = useRouter();

  const create = async () => {
    await fetch("http://127.0.0.1:8090/api/collections/posts/records", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title,
        content,
      }),
    });
    setTitle("");
    setContent("");

    router.refresh();
  };

  return (
    <form onSubmit={create} className="flex-col flex text-black my-10 w-96">
      <h1 className="text-white">Create Note</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className="my-2"
      />
      <textarea
        placeholder="Content"
        value={content}
        onChange={(e) => setContent(e.target.value)}
        className="my-2"
      />
      <button className="bg-white mx-auto p-2 my-2" type="submit">
        Create
      </button>
    </form>
  );
}
