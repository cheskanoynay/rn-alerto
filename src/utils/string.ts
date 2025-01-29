import _ from "lodash";

/**
 * strings
 */
export const generateKeywords = (
  str: string,
  once: boolean = true,
): string[] => {
  const strArr: string[][] = [];
  const strSplit = str.split(" ");
  // const strSplitArr = strSplit.map(sp => )
  if (once && strSplit.length) {
    strSplit.forEach((sp) => {
      strArr.push(generateKeywords(sp, false));
    });
  }
  const keywords = Array.from(Array(str.length)).map((s, i) =>
    str.slice(0, i + 1).toLowerCase(),
  );

  return _.uniq(_.sortBy(_.union(keywords, ...strArr)).map((s) => s.trim()));
};
