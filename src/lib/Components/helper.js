export function readableBytes(bytes) {
  if (bytes == 0) {
    return "0 B";
  }

  var i = Math.floor(Math.log(bytes) / Math.log(1000)),
    sizes = ["B", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

  return (bytes / Math.pow(1000, i)).toFixed(2) * 1 + " " + sizes[i];
}
export function intToString(num) {
  num = num.toString().replace(/[^0-9.]/g, "");
  if (num < 1000) {
    return num;
  }
  let si = [
    { v: 1e3, s: "K" },
    { v: 1e6, s: "M" },
    { v: 1e9, s: "B" },
    { v: 1e12, s: "T" },
    { v: 1e15, s: "P" },
    { v: 1e18, s: "E" },
  ];
  let index;
  for (index = si.length - 1; index > 0; index--) {
    if (num >= si[index].v) {
      break;
    }
  }
  return (
    (num / si[index].v).toFixed(0).replace(/\.0+$|(\.[0-9]*[1-9])0+$/, "$1") +
    si[index].s
  );
}
/**
 *
 * @param string Databasename
 * @condition
 * @returns
 */
export function Blacklist(OrginDb) {
  const MyBlacklist = ["admin", "local"];

  if (MyBlacklist.includes(OrginDb)) {
    console.log("Blocked", { OrginDb });
    return true;
  }
  return false;
}

export let Sortbyname = (a, b) => a.name.localeCompare(b.name);
