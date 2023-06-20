import { IComment } from "@/app/types/Comment";
import classNames from "classnames";
import Image from "next/image";
import Cross from "../../../../public/cross.png";
import { useCallback } from "react";

interface IProps {
  comment: IComment;
  deletingCommentId: number;
  handleDeleteComment: (commentId: number) => void;
}

export const CommentItem: React.FC<IProps> = ({
  comment,
  deletingCommentId,
  handleDeleteComment,
}) => {
  const onDeleteComment = useCallback(() => {
    handleDeleteComment(comment.id);
  }, [comment.id, handleDeleteComment]);

  return (
    <li
      className={classNames(
        "relative w-[600px] min-h-[100px] py-[20px] px-[30px] border-[1px] rounded-[12px] hover:scale-[1.03] hover:shadow-lg flex flex-col transition-all justify-between",
        {
          "pointer-events-none opacity-[0.3]": deletingCommentId === comment.id,
        }
      )}
    >
      <p className="text-[#000] font-[400] text-[16px]">{comment.body}</p>

      <p className="text-[#000] font-[400] text-[14px] text-[#899499] self-end opacity-[0.8]">
        Posted by:{" "}
        <span className="text-[#708090] font-[400] text-[14px] underline">
          {comment.user.username}
        </span>
      </p>

      <Image
        onClick={onDeleteComment}
        src={Cross}
        alt="cross"
        className="w-[20px] h-[20px] absolute right-[25px] top-[15px] cursor-pointer"
      />
    </li>
  );
};
