import { IComment } from "@/app/types/Comment";

interface IProps {
  comment: IComment;
}

export const CommentItem: React.FC<IProps> = ({ comment }) => (
  <li className="w-[600px] min-h-[100px] py-[20px] px-[30px] border-[1px] rounded-[12px] hover:scale-[1.03] hover:shadow-lg flex flex-col transition-all justify-between">
    <p className="text-[#000] font-[400] text-[16px]">{comment.body}</p>

    <p className="text-[#000] font-[400] text-[14px] text-[#899499] self-end opacity-[0.8]">
      Posted by:{" "}
      <span className="text-[#708090] font-[400] text-[14px] underline">
        {comment.user.username}
      </span>
    </p>
  </li>
);
