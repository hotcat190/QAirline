import isMobilePhone from "validator/es/lib/isMobilePhone";

const isVietnameseMobilePhone = (value) => isMobilePhone(value, "vi-VN");

export default isVietnameseMobilePhone;
