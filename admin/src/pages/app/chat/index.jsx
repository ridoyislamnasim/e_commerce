import React, { useEffect, useState } from "react";
import SimpleBar from "simplebar-react";
import useWidth from "@/hooks/useWidth";
import { useSelector, useDispatch } from "react-redux";
import Card from "@/components/ui/Card";
import Icon from "@/components/ui/Icon";
import MyProfile from "./MyProfile";
import Contacts from "./Contacts";
import Chat from "./Chat";
import Blank from "./Blank";
import Info from "./Info";


import { toggleMobileChatSidebar, setContactSearch } from "./store";
import { useGetAllIssueByPaginationQuery, useGetSingleIssueQuery } from "@/store/api/app/issueManagement/issueManagementApiSlice";
import { set, useForm } from "react-hook-form";
import SelectAllIssueCategory from "@/components/shared/Select/SelectAllIssueCategory";
import Textinput from "@/components/ui/Textinput";
import SelectIssueStatus from "@/components/shared/Select/SelectIssueStatus";
const ChatPage = () => {
  const [paginationPage, setPaginationPage] = useState(1);
  const [limit, setLimit] = useState(1000);
  const [order, setOrder] = useState('desc');
  const [search, setSearch] = useState('');
  const [issueId, setIssueId] = useState("");
  const [statusText, setStatusText] = useState("");
  // const [activechat, setActiveChat] = useState(false);
  const [merchantName, setMerchantName] = useState("");

  const [isMobileOpen, setIsMoblieOpen] = useState(false);
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();
  const { mobileChatSidebar, activechat } =
    useSelector((state) => state?.Chat);
  // console.log("mobileChatSidebar", chat);
  // const mobileChatSidebar = false;

  // const searchContacts = contacts?.filter((item) =>
  //   item.fullName.toLowerCase().includes(searchContact.toLowerCase())
  // );

  // const activechat = true;

  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors },
  } = useForm()

  const { isAuth, auth } = useSelector((state) => state.auth);

  const category_id = watch('issue_category_id');
  const issue_status = watch('issue_status');

  const onChange = (e) => {
    // setValue(e.target.value);
    setPaginationPage(1);
    setSearch(e.target.value || "");
  };

  const { data, isLoading, isFetching } = useGetAllIssueByPaginationQuery({
    page: paginationPage,
    limit: limit,
    order: order,
    search: search,
    issue_category_id: category_id,
    issue_sub_category_id: '',
    status: issue_status,
  });

  const { data: singleIssue, isLoading: singleLoading, isFetching: singleFetching } = useGetSingleIssueQuery(data?.data?.result?.length ? issueId : "");

  console.log("singleIssue", singleIssue);

  return (
    <>
      <div className=' mb-6'>
        {/* <h1 className='text-xl font-semibold'>Issue History</h1> */}
        <div className='md:flex gap-4 mt-4'>
          <div className='md:w-[255px] w-full md:mb-0 mb-3'>
            <label htmlFor="" className="form-label">
              Issues Category
            </label>
            <SelectAllIssueCategory control={control} selectAll={true} />
          </div>
          <div className='md:w-[255px] w-full md:mb-0 mb-3'>
            <label htmlFor="" className="form-label">
              Search
            </label>
            <Textinput
              value={search || ""}
              onChange={onChange}
              placeholder="search by invoice ID"
            />
          </div>
          <div className='md:w-[255px] w-full md:mb-0 mb-3'>
            <label htmlFor="" className="form-label">
              All Issues
            </label>

            <SelectIssueStatus control={control} />
          </div>
          {/* <Button text='Report Issue' />
                        <button className="border border-[#E83330] px-3 py-1 rounded-md hover:bg-[#E83330] hover:text-white">Report Issue</button> */}
        </div>
      </div>
      <div className="flex lg:space-x-5 chat-height overflow-hidden relative rtl:space-x-reverse">

        <div
          className={`transition-all duration-150 flex-none min-w-[260px] 
        ${width < breakpoints.lg
              ? "absolute h-full top-0 md:w-[360px] w-[200px] z-[999]"
              : "flex-none min-w-[450px]"
            }
            ${width < breakpoints.lg && mobileChatSidebar
              ? "left-0 "
              : "-left-full "
            }
        `}

        >
          <Card
            bodyClass=" relative p-0 h-full overflow-hidden "
            className="h-full"
          >
            <div className="border-b border-slate-100 dark:border-slate-700 pb-4">
              {/* <MyProfile /> */}
            </div>
            <div className="border-b border-slate-100 dark:border-slate-700 py-1">
              <div className="search px-3 mx-6 rounded flex items-center space-x-3 rtl:space-x-reverse">
                <div className="flex-none text-base text-slate-900 dark:text-slate-400">
                  <Icon icon="bytesize:search" />
                </div>
                <input
                  onChange={(e) => dispatch(setContactSearch(e.target.value))}
                  placeholder="Search..."
                  className="w-full flex-1 block bg-transparent placeholder:font-normal placeholder:text-slate-400 py-2 focus:ring-0 focus:outline-none dark:text-slate-200 dark:placeholder:text-slate-400"
                />
              </div>
            </div>
            <SimpleBar className="contact-height">
              {data?.data?.result?.map((contact, i) => (
                <>
                  <Contacts key={i} contact={contact} setIssueId={setIssueId} setMerchantName={setMerchantName} setStatusText={setStatusText} />
                </>
              ))}
            </SimpleBar>
          </Card>
        </div>

        {/* overlay */}
        {width < breakpoints.lg && mobileChatSidebar && (
          <div
            className="overlay bg-slate-900 dark:bg-slate-900 dark:bg-opacity-60 bg-opacity-60 backdrop-filter
         backdrop-blur-sm absolute w-full flex-1 inset-0 z-[99] rounded-md"
            onClick={() => dispatch(toggleMobileChatSidebar(!mobileChatSidebar))}
          ></div>
        )}

        {/* mai  chat box*/}
        <div className="flex-1">
          <div className="parent flex space-x-5 h-full rtl:space-x-reverse">
            {/* main message body*/}
            <div className="flex-1">
              <Card bodyClass="p-0 h-full" className="h-full">
                {activechat ? (
                  <div className="divide-y divide-slate-100 dark:divide-slate-700 h-full">
                    <Chat singleIssue={singleIssue} issueId={issueId} merchantName={merchantName} statusText={statusText} />
                  </div>
                ) : (
                  <Blank />
                )}
              </Card>
            </div>
            {/* right side information*/}
            {/* {width > breakpoints.lg && openinfo && activechat && (
            <div className="flex-none w-[285px]">
              <Card bodyClass="p-0 h-full" className="h-full">
                <Info />
              </Card>
            </div>
          )} */}
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatPage;
