import classNames from "classnames";
import { FormEvent } from "react";

type TProps = {
  handleChangeText: (event: string) => void;
  text: string;
  handleAddComment: () => void;
  handleClearTextarea: () => void;
};

export const NewCommentForm: React.FC<TProps> = ({
  handleChangeText,
  text,
  handleAddComment,
  handleClearTextarea,
}) => (
  <section>
    <textarea
      onChange={(e) => handleChangeText(e.target.value)}
      className="w-[600px] h-[250px] rounded-[12px] border-[1px] shadow-lg text-[#000] px-[10px] py-[15px]"
      value={text}
    />

    <div className="w-[600px] flex justify-end gap-[15px] mt-[15px]">
      <div
        onClick={text.length > 0 ? handleAddComment : () => {}}
        className={classNames(
          "self-end cursor-pointer w-[150px] h-[40px] shadow-lg rounded-[6px] bg-[#2E8B57] font-[500] text-[#fff] flex items-center justify-center hover:shadow-xl transition-all active:bg-[#fff] active:text-[#2E8B57]",
          {
            "opacity-[0.5] pointer-events-none": text.length === 0,
          }
        )}
      >
        Add comment
      </div>

      <div
        onClick={handleClearTextarea}
        className={classNames(
          "self-end cursor-pointer w-[150px] h-[40px] shadow-lg rounded-[6px] bg-[#D2042D] font-[500] text-[#fff] flex items-center justify-center hover:shadow-xl transition-all active:bg-[red] active:text-[#fff]",
          {
            "opacity-[0.5] pointer-events-none": text.length === 0,
          }
        )}
      >
        Clear
      </div>
    </div>
  </section>
);
