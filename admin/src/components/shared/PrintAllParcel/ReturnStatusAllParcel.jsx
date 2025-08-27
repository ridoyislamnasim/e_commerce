
const ReturnStatusAllParcel = ({ status, delivery_type }) => {
    let status_name = "";
    let class_name = "";

    if (status === 26 && delivery_type === 2) {
        status_name = "Partial Delivered Branch Transfer";
    } else if (status === 27 && delivery_type === 2) {
        status_name = "Partial Delivered & Branch Transfer Cancel";
    } else if (status === 28 && delivery_type === 2) {
        status_name = "Partial Delivered Branch & Transfer Complete";
    } else if (status === 29 && delivery_type === 2) {
        status_name = "Partial Delivered Branch & Transfer Reject";
    } else if (status === 30 && delivery_type === 2) {
        status_name = "Partial Delivered & Return Run Create";
    } else if (status === 31 && delivery_type === 2) {
        status_name = "Partial Delivered Branch & Return Run start";
    } else if (status === 32 && delivery_type === 2) {
        status_name = "Partial Delivered Branch & Return Run Cancel";
    } else if (status === 33 && delivery_type === 2) {
        status_name = "Partial Delivered & Return Rider Accept";
    } else if (status === 34 && delivery_type === 2) {
        status_name = "Partial Delivered & Return Rider Reject";
    } else if (status === 35 && delivery_type === 2) {
        status_name = "Partial Delivered & Rider Returned";
    } else if (status === 36 && delivery_type === 2) {
        status_name = "Partial Delivered & Returned";
    }

    else if (status === 26 && delivery_type === 4) {
        status_name = "Return Transfer";
    } else if (status === 27 && delivery_type === 4) {
        status_name = "Return Transfer Cancel";
    } else if (status === 28 && delivery_type === 4) {
        status_name = "Return Transfer Complete";
    } else if (status === 29 && delivery_type === 4) {
        status_name = "Return Transfer Reject";
    } else if (status === 30 && delivery_type === 4) {
        status_name = "Return Run Create";
    } else if (status === 31 && delivery_type === 4) {
        status_name = "Return Run start";
    } else if (status === 32 && delivery_type === 4) {
        status_name = "Return Run Cancel";
    } else if (status === 33 && delivery_type === 4) {
        status_name = "Return Run Rider Accept";
    } else if (status === 34 && delivery_type === 4) {
        status_name = "Return Run Rider Reject";
    } else if (status === 35 && delivery_type === 4) {
        status_name = "Return Run Complete";
    } else if (status === 36 && delivery_type === 4) {
        status_name = "Return Complete";
    } else {
        null
    }

    return (
        <div className={` ${class_name}`}>
            <p className="">{status_name}</p>
        </div>
    );
};

export default ReturnStatusAllParcel;

