function InsightCard({ insight }: any) {
  const { tag, question, createdAt, isAcceptingMessage } = insight;
  const date = new Date(createdAt);

  // Get the individual components
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // JavaScript months are 0-indexed
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();

  // Format the date and time
  const formattedTime = `${year}-${month.toString().padStart(2, "0")}-${day
    .toString()
    .padStart(2, "0")} ${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;

  return (
    <div className="mt-4 m-2 p-4 bg-gray-50 rounded-lg border border-gray-200 flex flex-col transform transition duration-300 hover:scale-105 hover:shadow-lg ">
      <div className="flex items-center justify-between p-2">
        {isAcceptingMessage ? (
          <div className="border py-2 px-4 bg-green-300 rounded-md">
            🟢 active
          </div>
        ) : (
          <div className="border py-2 px-4 bg-red-300 rounded-md">
            🔴 not active
          </div>
        )}
        <div className="border py-2 px-4 bg-gray-300 rounded-md">{tag}</div>
      </div>
      <div className="min-h-16 flex justify-start font-bold ml-3 pt-2">
        {question}
      </div>
      <div className="flex items-center justify-between p-2">
        <div className="font-thin opacity-50 italic">10k responses</div>
        <div className="font-sans italic">{formattedTime}</div>
      </div>
    </div>
  );
}

export default InsightCard;
