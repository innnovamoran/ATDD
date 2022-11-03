type LogError = {
  function_name: string;
  message: string;
};
const LOG_ERROR = ({ function_name, message }: LogError): void => {
  console.log(
    "__________________________",
    function_name,
    new Date(Date.now()).toISOString(),
    "___________________________"
  );
  console.log("");
  console.error("MESSAGE", message);
  console.log("__________________________", "___________________________");
  console.log("");
};

export { LOG_ERROR, LogError };
