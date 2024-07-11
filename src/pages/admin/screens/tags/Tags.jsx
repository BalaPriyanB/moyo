import { Link } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { useDataTable } from "../../../../hooks/useDataTable";
import {
  createTagy,
  deleteTagy,
  getAllTags,
} from "../../../../services/index/postTags";
import DataTable from "../../components/DataTable";
import { useState } from "react";

const Tags = () => {
  const [TagyTitle, seTTagyTitle] = useState("");

  const { mutate: mutateCreateTagy, isLoading: isLoadingCreateTagy } =
    useMutation({
      mutationFn: ({ token, title }) => {
        return createTagy({
          token,
          title,
        });
      },
      onSuccess: (data) => {
        queryClient.invalidateQueries(["tags"]);
        toast.success("Tagy is created");
      },
      onError: (error) => {
        toast.error(error.message);
        console.log(error);
      },
    });

  const {
    userState,
    currentPage,
    searchKeyword,
    data: tagsData,
    isLoading,
    isFetching,
    isLoadingDeleteData,
    queryClient,
    searchKeywordHandler,
    submitSearchKeywordHandler,
    deleteDataHandler,
    setCurrentPage,
  } = useDataTable({
    dataQueryFn: () => getAllTags(searchKeyword, currentPage),
    dataQueryKey: "Tags",
    deleteDataMessage: "Tagy is deleted",
    mutateDeleteFn: ({ slug, token }) => {
      return deleteTagy({
        slug,
        token,
      });
    },
  });

  const handleCreateTagy = () => {
    mutateCreateTagy({
      token: userState.userInfo.token,
      title: TagyTitle,
    });
  };

  return (
    <div className="grid grid-cols-12 gap-x-4">
      <div className="col-span-4 py-8">
        <h4 className="text-lg leading-tight">Add New Tag</h4>
        <div className="d-form-control w-full mt-6">
          <input
            value={tagyTitle}
            className="d-input d-input-bordered border-slate-300 !outline-slate-300 text-xl font-medium font-roboto text-dark-hard"
            onChange={(e) => seTTagyTitle(e.target.value)}
            placeholder="Tagy title"
          />
          <button
            disabled={isLoadingCreateTagy}
            type="button"
            onClick={handleCreateTagy}
            className="w-fit mt-3 bg-green-500 text-white font-semibold rounded-lg px-4 py-2 disabled:cursor-not-allowed disabled:opacity-70"
          >
            Add Tag
          </button>
        </div>
      </div>
      <div className="col-span-8">
        <DataTable
          pageTitle=""
          dataListName="Tags"
          searchInputPlaceHolder="Tagy title..."
          searchKeywordOnSubmitHandler={submitSearchKeywordHandler}
          searchKeywordOnChangeHandler={searchKeywordHandler}
          searchKeyword={searchKeyword}
          tableHeaderTitleList={["Title", "Created At", ""]}
          isLoading={isLoading}
          isFetching={isFetching}
          data={TagsData?.data}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
          headers={tagsData?.headers}
          userState={userState}
        >
          {TagsData?.data.map((Tagy) => (
            <tr>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <div className="flex items-center">
                  <p className="text-gray-900 whitespace-no-wrap">
                    {tagy.title}
                  </p>
                </div>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200">
                <p className="text-gray-900 whitespace-no-wrap">
                  {new Date(tagy.createdAt).toLocaleDateString("en-US", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                  })}
                </p>
              </td>
              <td className="px-5 py-5 text-sm bg-white border-b border-gray-200 space-x-5">
                <button
                  disabled={isLoadingDeleteData}
                  type="button"
                  className="text-red-600 hover:text-red-900 disabled:opacity-70 disabled:cursor-not-allowed"
                  onClick={() => {
                    deleteDataHandler({
                      slug: tagy?._id,
                      token: userState.userInfo.token,
                    });
                  }}
                >
                  Delete
                </button>
                <Link
                  to={`/admin/Tags/manage/edit/${tagy?._id}`}
                  className="text-green-600 hover:text-green-900"
                >
                  Edit
                </Link>
              </td>
            </tr>
          ))}
        </DataTable>
      </div>
    </div>
  );
};

export default Tags;
