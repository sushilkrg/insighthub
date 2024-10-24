function InsightCard({ tag, question, createdAt, isAcceptingMessage }: any) {
  return (
    <div className="border border-black flex flex-col ">
      <div className="flex space-between">
        <span>{isAcceptingMessage ? "active" : "not active"}</span>
        <span>{tag}</span>
      </div>
      <div>{question}</div>
      <div className="flex ">
        <span>10k responses</span>
        <span>{createdAt}</span>
      </div>
    </div>
  );
}

export default InsightCard;
