export default function useModifyStrings() {
  const capitalizeStrings = (word) => {
    if (word === null || word === "") {
      return word;
    }
    return word.charAt(0).toUpperCase() + word.slice(1);
  };
  return {
    capitalizeStrings,
  };
}
