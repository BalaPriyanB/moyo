import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getSingleTagy,
  updateTagy,
} from "../../../../services/index/postTags";

const EditTags = () => {
  const queryClient = useQueryClient();
  const [tagyTitle, setTagyTitle] = useState("");
  const navigate = useNavigate();
  const { slug } = useParams();
  const userState = useSelector((state) => state.user);

  const { isLoading, isError } = useQuery({
    queryFn: () => getSingleTagy({ slug }),
    queryKey: ["tags", slug],
    onSuccess: (data) => {
      setTagyTitle(data?.title);
    },
    refetchOnWindowFocus: false,
  });

  const { mutate: mutateUpdateTagy, isLoading: isLoadingUpdateTagy } =
    useMutation({
      mutationFn: ({ title, slug, token }) => {
        return updateTagy({
          title,
          slug,
          token,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tags", slug]);
        toast.success("Tagy is updated");
        navigate(`/admin/tags/manage/edit/${data._id}`, {
          replace: true,
        });
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const handleUpdateTagy = () => {
    if (!tagyTitle) return;
    mutateUpdateTagy({
      title: tagyTitle,
      slug,
      token: userState.userInfo.token,
    });
  };

  return (
    <div className="col-span-4 py-8">
      <h4 className="text-lg leading-tight">Update Tag</h4>
      <div className="d-form-control w-full mt-6">
        <input
          value={tagyTitle}
          className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
          onChange={(e) => setTagyTitle(e.target.value)}
          placeholder="Tagy title"
        />
        <button
          disabled={isLoadingUpdateTagy || isLoading || isError}
          type="button"
          onClick={handleUpdateTagy}
          className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
        >
          Update Tag
        </button>
      </div>
    </div>
  );
};

export default EditTags;
