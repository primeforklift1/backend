const uuid4 = require("uuid4");
const callsite = require("callsite");

function logFunctionName() {
  const stack = callsite();
  const caller = stack[2].getFunctionName();
  if (caller) {
    const func = caller.split(".");
    // Jika nama fungsi diawali dengan 'exports.', ambil bagian setelahnya
    return func.length > 1 && func[0] === "exports" ? func[1] : func[0];
  }
  return "anonymous";
}

exports.loggerData = ({
  req,
  logLevel = "INFO",
  protocol = "REST",
  excecType = "ASYNC",
  funcName = "",
  result = {},
  flag = "START",
  message = "",
  timeStart = new Date().toISOString(),
}) => {
  const TimeStamp = new Date().toISOString();
  const LogLevel = logLevel;
  const TransactionID = uuid4();
  const ServiceName = "prime-forklift";
  const Endpoint = req.path;
  const Protocol = protocol;
  const MethodType = req.method.toUpperCase();
  const ExecutionType = excecType;
  const ContentType = req.headers["content-type"];
  const FunctionName = funcName || logFunctionName();
  // Menghitung waktu eksekusi dalam milidetik
  const startTimestamp = new Date(timeStart).getTime(); // Mengubah waktu start ke milidetik
  const endTimestamp = new Date().getTime(); // Waktu saat fungsi loggerData dijalankan
  const ExecutionTime = endTimestamp - startTimestamp;
  const ServerIp = req.hostname; // atau req.headers.host
  const ClientIp = req.ip || req.connection.remoteAddress;
  const TraceID = req.headers["x-trace-id"] || "TC-";
  const PrevTransactionID = req.headers["x-prev-trans-id"] || "TR-";
  const Body = req.body;
  const Result = result;
  const Flag = flag;
  const Message = message;

  let body = {};
  if (Endpoint == "/login") {
    body = { ...Body };
    delete body["g-recaptcha-response"];
    delete body.password;
  }else{
    body = { ...Body };
  }
  let resultMod = {...Result};
  // resultMod = { ...Result };
  // if (resultMod.data) {
  //   delete resultMod.data.token;
  // }

  const logger = `\n ${TimeStamp} \t [${LogLevel}] \t TR-${TransactionID} \t ${ServiceName} \t ${Endpoint} \t ${Protocol} \t ${MethodType} \t ${ExecutionType} \t ${ContentType} ${FunctionName} \t ${ExecutionTime}ms \t ${ServerIp} \t ${ClientIp} \t ${TraceID} \t ${PrevTransactionID} \t ${JSON.stringify(
    body
  )} \t ${JSON.stringify(resultMod)} \t [${Flag}] \t ${Message}`;

  console.log(logger);
  return { TransactionID, TimeStamp };
};
