"use client";

import { getComments } from "@/app/api/comments";
import { IComment } from "@/app/types/Comment";
import { useCallback, useEffect, useMemo, useState } from "react";
import CommentItem from "../CommentItem";
import Lottie from "react-lottie";
import animationData from "../../../../public/lotties/loadMore.json";
import classNames from "classnames";

const defaultOptions = {
  loop: true,
  autoplay: true,
  animationData: animationData,
};

type TProps = {
  loading: boolean;
  comments: IComment[];
  handleLoadMore: () => void;
  deletingCommentId: number;
  handleDeleteComment: (commentId: number) => void;
};

export const CommentsList: React.FC<TProps> = ({
  loading,
  comments,
  handleLoadMore,
  deletingCommentId,
  handleDeleteComment,
}) => {
  const isListVisible = useMemo(
    () => (loading && comments.length === 0 ? false : true),
    [comments.length, loading]
  );

  return (
    <section className="mx-auto flex flex-col items-center">
      <h1 className="self-start text-[48px] text-[#000] font-[500] mb-[30px]">
        List of comments
      </h1>

      <ul className="list-none flex flex-col gap-[20px]">
        {isListVisible &&
          comments.map((comment) => (
            <CommentItem
              comment={comment}
              key={comment.id}
              deletingCommentId={deletingCommentId}
              handleDeleteComment={handleDeleteComment}
            />
          ))}
      </ul>

      {loading && (
        <div
          className={classNames("mt-[20px]", {
            "fixed bottom-[100px] right-[100px]": comments.length > 0,
          })}
        >
          <Lottie options={defaultOptions} height={50} width={50} />
        </div>
      )}

      <div
        onClick={handleLoadMore}
        className="cursor-pointer mt-[40px] w-[300px] h-[50px] border-1 shadow-md hover:shadow-xl transition-all flex justify-center items-center text-[#000] text-center rounded-[6px]"
      >
        Load 5 more
      </div>
    </section>
  );
};
