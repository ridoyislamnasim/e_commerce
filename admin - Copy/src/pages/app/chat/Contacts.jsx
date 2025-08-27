import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { openChat } from "./store";
// import avatar from '/public/No_Image.jpeg'

const Contacts = ({ contact, setIssueId, setActiveChat, setMerchantName, setStatusText }) => {
  // const { fullName, avatar, status, lastmessage, unredmessage } = contact;

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

  const dispatch = useDispatch();

  return (
    <div
      className="block w-full py-5 focus:ring-0 outline-none cursor-pointer group transition-all duration-150 hover:bg-slate-100 dark:hover:bg-slate-600 dark:hover:bg-opacity-70"
      onClick={() => {
        setIssueId(contact.id); setMerchantName(contact?.merchant?.company_name); setStatusText(contact?.issue_sub_category?.name);
        dispatch(
          openChat({
            activechat: true,
          })
        );
      }}
    >
      <div className="flex space-x-3 px-6 rtl:space-x-reverse">
        <div className="flex-none">
          <div className="h-10 w-10 rounded-full relative">
            <span
              className={`  status ring-1 ring-white inline-block h-[10px] w-[10px] rounded-full absolute -right-0 top-0
                ${status === "active" ? "bg-success-500" : "bg-secondary-500"}
              `}
            ></span>
            <img
              src="/No_Image.jpeg"
              alt=""
              className="block w-full h-full object-cover rounded-full"
            />
          </div>
        </div>
        <div className="flex-1 text-start flex">
          <div className="flex-1">
            <span className="block text-slate-800 dark:text-slate-300 text-sm font-medium mb-[2px]">
              {contact?.merchant?.company_name}
            </span>
            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal">
              {contact?.issue_invoice}
            </span>
            <span className="block text-slate-600 dark:text-slate-300 text-xs font-normal">
              {formatDate(contact?.created_at)}
            </span>
          </div>
          <div className="flex-none ltr:text-right rtl:text-end">
            <div className="flex items-center">
              <span className="block text-xs text-slate-400 dark:text-slate-400 font-normal">
                {contact?.issue_sub_category?.name}
              </span>
              <span className={`inline-flex flex-col items-center justify-center text-[10px] font-medium w-13 ml-1 h-5 bg-[#FFC155] text-white rounded-full px-1 ${contact?.status === "pending" ? "bg-[#FFC155]" : contact?.status === "solved" ? "bg-[#17A2B8]" : contact?.status === "closed" ? "bg-green-500" : "bg-blue-500"}`}>
                {contact?.status?.charAt(0).toUpperCase() + contact?.status?.slice(1)}
              </span>
            </div>


            <span className="block text-xs text-slate-400 dark:text-slate-400 font-normal">
              {formatDate(contact?.updated_at)}
            </span>
            {/* {unredmessage > 0 && ( */}

            {/* )} */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contacts;
