interface FeedbackProps {
  score: number;
  suggestions: { tip: string }[];
}

export default function ATS({ score, suggestions }: FeedbackProps) {
  return <div>ATS</div>;
}
