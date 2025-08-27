import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { toggleMobileChatSidebar, infoToggle, sendMessage } from "./store";
import useWidth from "@/hooks/useWidth";
import Icon from "@/components/ui/Icon";
import Dropdown from "@/components/ui/Dropdown";
import image1 from "@/assets/images/users/user-1.jpg";
import envConfig from "@/configs/envConfig";
import { useCreateIssueChatMutation, useUpdateIssueStatusMutation } from "@/store/api/app/issueManagement/issueManagementApiSlice";
import useSubmit from '@/hooks/useSubmit';
import { useForm } from "react-hook-form";
// import { PhotoView } from "react-photo-view";
// import 'react-photo-view/dist/react-photo-view.css';

const chatAction = [
  {
    label: "Remove",
    link: "#",
  },
  {
    label: "Forward",
    link: "#",
  },
];
const time = () => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const ampm = hours >= 12 ? "pm" : "am";
  const hours12 = hours % 12 || 12;
  const minutesStr = minutes < 10 ? "0" + minutes : minutes;
  return hours12 + ":" + minutesStr + " " + ampm;
};

const Chat = ({ singleIssue, issueId, merchantName, statusText }) => {
  // const { activechat, openinfo, mobileChatSidebar, messFeed, user } =
  // useSelector((state) => state.chat);
  const { width, breakpoints } = useWidth();
  const dispatch = useDispatch();

  console.log("singleIssue", singleIssue);

  const id = undefined;
  const {
    control,
    reset,
    onSubmit,
    isLoading,
    register,
    watch,
    handleSubmit,
  } = useSubmit(id, id ? useCreateIssueChatMutation : useCreateIssueChatMutation, false);

  const { isAuth, auth } = useSelector((state) => state.auth);
  // const {
  //   register,
  //   watch,
  //   handleSubmit,
  //   formState: { errors },
  // } = useForm()

  console.log("singleIssue", singleIssue);

  const handleSendMessage = (e) => {
    if (e.target.value) {
      dispatch(
        sendMessage({
          content: e.target.value,
          sender: "me",
          img: image1,
        })
      );
    }
    e.target.value = "";
  };
  const chatheight = useRef(null);

  const issueChatSubmit = async (data) => {

    console.log(data);
    console.log("data?.attachment?.[0]", data?.attachment?.[0]);

    const formData = new FormData();

    const keys = Object.keys(data);

    formData.append('admin_id', auth?.user?.user_info?.id);
    formData.append('is_admin_reply', 1);
    formData.append('issue_id', issueId);
    formData.set('message', data.message);
    formData.set('attachment', data?.attachment?.[0]);

    await onSubmit(formData);
  }
  // useEffect(() => {
  //   chatheight.current.scrollTop = chatheight.current.scrollHeight;
  // }, [messFeed]);

  const [updateStatus] = useUpdateIssueStatusMutation();

  // console.log("updateStatus", updateStatus);
  const handleChange = async (event) => {
    await updateStatus({ issueId, status: event.target.value });
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
    };
    return date.toLocaleDateString(undefined, options);
  };



  const attachment = watch('attachment');

  return (
    <div className="h-full">
      <header className="border-b border-slate-100 dark:border-slate-700">
        <div className="flex py-6 md:px-6 px-3 items-center">
          <div className="flex-1">
            <div className="flex space-x-3 rtl:space-x-reverse">
              {width <= breakpoints.lg && (
                <span
                  onClick={() => dispatch(toggleMobileChatSidebar(true))}
                  className="text-slate-900 dark:text-white cursor-pointer text-xl self-center ltr:mr-3 rtl:ml-3"
                >
                  <Icon icon="heroicons-outline:menu-alt-1" />
                </span>
              )}
              <div className="flex-none">
                <div className="h-10 w-10 rounded-full relative">
                  <span
                    className={` status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0

                  
                  `}

                  ></span>
                  {/* ${user.status === "active"
                        ? "bg-success-500"
                        : "bg-secondary-500"
                      } */}
                  <img
                    src="/No_Image.jpeg"
                    alt=""
                    className="w-full h-full object-cover rounded-full"
                  />
                </div>
              </div>
              <div className="flex-1 text-start">
                <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium truncate">
                  {merchantName}
                </span>
                <span className="block text-slate-500 dark:text-slate-300 text-xs font-normal">
                  {statusText}
                </span>
              </div>

              <div className="flex justify-end">
                <div className="w-[170px]">
                  <select
                    value={singleIssue?.data?.status || ""}
                    onChange={handleChange}
                    className='text-base py-1 px-2 bg-[#5A6770] text-white rounded-md'
                  >
                    <option value="pending">Pending</option>
                    <option value="assigned">Assigned</option>
                    <option value="solved">Solved</option>
                    <option value="closed">Closed</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          {/* <div className="flex-none flex md:space-x-3 space-x-1 items-center rtl:space-x-reverse">
            <div className="msg-action-btn">
              <Icon icon="heroicons-outline:phone" />
            </div>
            <div className="msg-action-btn">
              <Icon icon="heroicons-outline:video-camera" />
            </div>

            <div
              // onClick={() => dispatch(infoToggle(!openinfo))}
              className="msg-action-btn"
            >
              <Icon icon="heroicons-outline:dots-horizontal" />
            </div>
          </div> */}
        </div>
      </header>
      <div className="chat-content parent-height">
        <div
          className="msgs overflow-y-auto msg-height pt-6 space-y-6"
          ref={chatheight}
        >
          {/* single issue */}
          {singleIssue?.data?.issue_chats?.map((item, i) => (
            <div className="block md:px-6 px-4" key={i}>
              {item.is_admin_reply === false && (
                <div className="flex space-x-2 items-start group rtl:space-x-reverse">
                  <div className="flex-none">
                    <div className="h-8 w-8 rounded-full">
                      <img
                        src="/No_Image.jpeg"
                        alt=""
                        className="block w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                  <div className="flex-1 flex space-x-4 rtl:space-x-reverse">
                    <div>
                      {
                        item?.attachment && (
                          // <PhotoView key={item?.id} src={envConfig.apiUrl + item?.attachment}>
                          //   <img src={envConfig.apiUrl + item?.attachment} alt="" className='w-auto h-[200px] mb-2' />
                          // </PhotoView>
                          <img src={envConfig.apiUrl + item?.attachment} alt="" className='w-auto h-[200px] mb-2' />
                        )
                      }
                      <div className="text-contrent p-3 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-600 text-sm font-normal mb-1 rounded-md flex-1 whitespace-pre-wrap break-all md:max-w-[350px] w-fit">
                        {item?.message}
                      </div>
                      <span className="font-normal text-xs text-slate-400 dark:text-slate-400">
                        {formatDate(item?.created_at)}
                      </span>
                    </div>
                    {/* <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <Dropdown
                        classMenuItems=" w-[100px] top-0"
                        items={chatAction}
                        label={
                          <div className="h-8 w-8 bg-slate-100 dark:bg-slate-600 dark:text-slate-300 text-slate-900 flex flex-col justify-center items-center text-xl rounded-full">
                            <Icon icon="heroicons-outline:dots-horizontal" />
                          </div>
                        }
                      />
                    </div> */}
                  </div>
                </div>
              )}
              {/* sender */}
              {item.is_admin_reply === true && (
                <div className="flex space-x-2 items-start justify-end group w-full rtl:space-x-reverse">
                  <div className="no flex space-x-4 rtl:space-x-reverse">
                    {/* <div className="opacity-0 invisible group-hover:opacity-100 group-hover:visible">
                      <Dropdown
                        classMenuItems=" w-[100px] left-0 top-0  "
                        items={chatAction}
                        label={
                          <div className="h-8 w-8 bg-slate-300 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full text-slate-900">
                            <Icon icon="heroicons-outline:dots-horizontal" />
                          </div>
                        }
                      />
                    </div> */}

                    <div className="whitespace-pre-wrap break-all">
                      {
                        item?.attachment && (
                          // <PhotoView key={item?.id} src={envConfig.apiUrl + item?.attachment}>
                          //   <img src={envConfig.apiUrl + item?.attachment} alt="" className='w-auto h-[200px] mb-2' />
                          // </PhotoView>
                          <img src={envConfig.apiUrl + item?.attachment} alt="" className='w-auto h-[200px] mb-2' />
                        )
                      }
                      <div className="text-contrent p-3 bg-slate-300 dark:bg-slate-900 dark:text-slate-300 text-slate-800 text-sm font-normal rounded-md flex-1 mb-1 md:max-w-[350px] w-fit">
                        {item?.message}
                      </div>
                      <span className="font-normal text-xs text-slate-400">
                        {formatDate(item?.created_at)}
                      </span>
                    </div>
                  </div>
                  <div className="flex-none">
                    <div className="h-8 w-8 rounded-full">
                      <img
                        src="/No_Image.jpeg"
                        alt=""
                        className="block w-full h-full object-cover rounded-full"
                      />
                    </div>
                  </div>
                </div>
              )}
              {/* me */}
            </div>
          ))}
        </div>
      </div>
      <footer className="md:space-x-4 sm:space-x-2">
        <form action="" onSubmit={handleSubmit(issueChatSubmit)} className="md:px-6 px-4 sm:flex md:space-x-4 sm:space-x-2 rtl:space-x-reverse border-t md:pt-6 pt-4 border-slate-100 dark:border-slate-700 w-full">
          <div className="flex-none sm:flex md:space-x-3 space-x-1 rtl:space-x-reverse">
            <div className='flex flex-col'>
              <label for="file-upload" className="w-6 h-6 cursor-pointer">
                <img src="/file.png" alt="Link Icon" class="w-full h-full" />
              </label>
              <input id="file-upload" type="file" class="hidden" {...register('attachment')} />

            </div>
            {/* <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
              <Icon icon="heroicons-outline:link" />
            </div> */}
            {/* <div className="h-8 w-8 cursor-pointer bg-slate-100 dark:bg-slate-900 dark:text-slate-400 flex flex-col justify-center items-center text-xl rounded-full">
            <Icon icon="heroicons-outline:emoji-happy" />
          </div> */}
          </div>
          <div className="flex-1 relative flex space-x-3 rtl:space-x-reverse">
            <div className="flex-1">
              <textarea
                type="text"
                placeholder="Type your message..."
                className="focus:ring-0 focus:outline-0 block w-full bg-transparent dark:text-white resize-none"
                {...register('message', { required: true })}
              // v-model.trim="newMessage"
              // @keydown.enter.exact.prevent="sendMessage"
              // @keydown.enter.shift.exact.prevent="newMessage += '\n'"
              // onKeyDown={(e) => {
              //   if (e.key === "Enter" && !e.shiftKey) {
              //     e.preventDefault();
              //     handleSendMessage(e);
              //   }
              // }}
              />
            </div>
            <div className="flex-none md:pr-0 pr-3">
              <button
                type="submit"
                className="h-8 w-8 bg-slate-900 text-white flex flex-col justify-center items-center text-lg rounded-full"
              >
                <Icon
                  icon="heroicons-outline:paper-airplane"
                  className="transform rotate-[60deg]"
                />
              </button>
            </div>
          </div>
        </form>
        <span className='text-[9px]'>{attachment && attachment[0]?.name}</span>
      </footer>
    </div>
  );
};

export default Chat;
