"use client";

import { useCallback, useEffect, useState } from "react";
import CommentsList from "./components/CommentsList";
import NewCommentForm from "./components/NewCommentForm";
import { deleteComment, getComments, postComment } from "./api/comments";
import { IComment } from "./types/Comment";
import { getFromStorage, setToStorage } from "./helpers/localStorageHelper";

export default function Home() {
  const [comments, setComments] = useState<IComment[]>([]);
  const [newComment, setNewComment] = useState(getFromStorage("comment") || "");
  const [limit, setLimit] = useState(5);
  const [loading, setLoading] = useState(false);
  const [deletingCommentId, setDeletingCommentId] = useState(0);

  useEffect(() => {
    setLoading(true);

    getComments(limit).then((data: IComment[]) => {
      setComments((prev) => [...prev, ...data]);
      setLoading(false);
    });
  }, [limit]);

  const handleLoadMore = useCallback(() => setLimit((prev) => prev + 5), []);

  const handleChangeText = useCallback((text: string) => {
    setNewComment(text);
    setToStorage("comment", text);
  }, []);

  const handleClearTextarea = useCallback(() => {
    setToStorage("comment", "");

    setNewComment("");
  }, []);

  const handleDeleteComment = useCallback(async (commentId: number) => {
    try {
      setDeletingCommentId(commentId);
      await deleteComment(commentId).then((res) => {
        setComments((prev) => prev.filter((com) => com.id !== res.id));
      });
    } catch (error) {
      console.log(error);
    } finally {
      setDeletingCommentId(0);
    }
  }, []);

  const handleAddComment = useCallback(async () => {
    try {
      setLoading(true);
      const comment = await postComment(newComment);

      setComments((prev) => [comment, ...prev]);
      handleClearTextarea();
    } catch (error) {
      alert(error);
    } finally {
      setLoading(false);
    }
  }, [handleClearTextarea, newComment]);

  return (
    <main className="py-[64px] px-10 flex min-h-screen flex-col items-center justify-center bg-[#fff]">
      <CommentsList
        loading={loading}
        deletingCommentId={deletingCommentId}
        handleLoadMore={handleLoadMore}
        comments={comments}
        handleDeleteComment={handleDeleteComment}
      />

      <div className="my-[100px]">
        <h2 className="text-[#000] text-[24px] mb-[10px]">
          Write new comment:
        </h2>
        <NewCommentForm
          handleChangeText={handleChangeText}
          text={newComment}
          handleAddComment={handleAddComment}
          handleClearTextarea={handleClearTextarea}
        />
      </div>
    </main>
  );
}
