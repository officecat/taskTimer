export default function timeStamp(id: number) {
  return (
    (new Date(id).getMonth() + 1).toString().padStart(2, "0") +
    "/" +
    new Date(id).getDate().toString().padStart(2, "0") +
    " " +
    new Date(id).getHours().toString().padStart(2, "0") +
    ":" +
    new Date(id).getMinutes().toString().padStart(2, "0") +
    ":" +
    new Date(id).getSeconds().toString().padStart(2, "0")
  );
}
