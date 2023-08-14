import Link from "next/link";
import PocketBase from "pocketbase";
import CreateNote from "./[id]/CreateNote";
const pb = new PocketBase("http://127.0.0.1:8090");

export const revalidate = 10;

async function getNotes() {
  const data = await pb.collection("posts").getFullList();
  // const res = await fetch(
  //   "http://127.0.0.1:8090/api/collections/posts/records",
  //   { cache: "no-store" }
  // );
  // const data = await res.json();
  return data;
}

export default async function NotesPage() {
  const notes = await getNotes();
  return (
    <div>
      <h1>Notes</h1>
      <div>
        {notes?.map((note) => {
          return <Note key={note.id} note={note} />;
        })}
      </div>
      <CreateNote />
    </div>
  );
}

function Note({ note }: any) {
  const { id, title, content, created } = note || {};

  return (
    <Link href={`/notes/${id}`}>
      <div>
        <h2>{title}</h2>
        <h5>{content}</h5>
        <p>{created}</p>
      </div>
    </Link>
  );
}
